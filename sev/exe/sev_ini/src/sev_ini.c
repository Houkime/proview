/* 
 * Proview   $Id: sev_ini.c,v 1.1 2008-09-05 08:38:58 claes Exp $
 * Copyright (C) 2005 SSAB Oxel�sund AB.
 *
 * This program is free software; you can redistribute it and/or 
 * modify it under the terms of the GNU General Public License as 
 * published by the Free Software Foundation, either version 2 of 
 * the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful 
 * but WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the 
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with the program, if not, write to the Free Software 
 * Foundation, Inc., 675 Mass Ave, Cambridge, MA 02139, USA.
 */

#include <stdio.h>
#include <sys/wait.h>
#include <fcntl.h>
#include "co_ver.h"
#include "co_time.h"
#include "co_dcli.h"
#include "ini.h"
#include "rt_errl.h"
#include "rt_errh.h"
#include "rt_qini.h"
#include "rt_qcom.h"
#include "rt_ini_event.h"
#include "rt_ini_msg.h"
#include "rt_errh_msg.h"
#include "rt_pwr_msg.h"

extern int getopt();

static ini_sContext	*createContext (int argc, char **argv);
static int		checkErrors (ini_sContext*);
static pwr_tStatus	events (ini_sContext *cp);
static pwr_tStatus	stop (int argc, char **argv, ini_sContext *cp);
static pwr_tStatus	terminate (ini_sContext *cp);
static pwr_tStatus	start (ini_sContext *cp);
static void		usage (char*);
static void             ini_errl_cb( void *userdata, char *str, char severity, 
				     pwr_tStatus sts, int anix, int message_type);


int main (int argc, char **argv)
{
  ini_sContext *cp;
  pwr_tStatus sts;

  cp = createContext(argc, argv);

  ver_WriteVersionInfo("Proview/R Storage Environment");

  if (cp->flags.b.stop) {
    sts = stop(argc, argv, cp);
  } else {
    sts = start(cp);
    sts = events(cp);
    errh_LogInfo(&cp->log, "Ich sterbe!!");
  }

  exit(sts);
}

static pwr_tStatus start( ini_sContext *cp)
{
  pwr_tStatus sts;
  char console[80];
  qini_sNode		*nep;
  qcom_sAid aid;

  int	fd;

  if ( strcmp( cp->console, "") == 0)
    strcpy( console, "/dev/console");
  else
    strcpy( console, cp->console);
  if ((fd = open(console, O_APPEND | O_WRONLY)) == -1)
    errl_Init(NULL, ini_errl_cb, cp);
  else {
    close(fd);
    errl_Init(console, ini_errl_cb, cp);
  }

  errh_Init("pwr_ini", errh_eAnix_ini);

  if ( cp->flags.b.interactive)    
    errh_Interactive();

  ini_CheckContext(&sts, cp);

  ini_ReadBootFile(&sts, cp);
  ini_ReadNodeFile(&sts, cp);


  for (nep = tree_Minimum(&sts, cp->nid_t); nep != NULL; nep = tree_Successor(&sts, cp->nid_t, nep)) {
    if ( strcmp( cp->nodename, nep->name) == 0) {
      cp->me = nep;
      break;
    }
  }      
  if (cp->me == NULL) {
    errh_LogFatal(&cp->log, "Cannot find my own node in %s\n", cp->nodefile.name);
    exit(QCOM__WEIRD);
  }

  if (!checkErrors(cp))
    exit(0);

  /* Logfile is always $pwrp_log/pwr.log from V4.0.0 and handled by Linux log rotation */ 

  char fname[256];
  sprintf(fname, "$pwrp_log/pwr_%s.log", cp->nodename);
  dcli_translate_filename(fname, fname);
  errl_SetFile(fname);
  errh_LogInfo(&cp->log, "Setting log file to: %s", fname);

  // ini_SetSystemStatus( cp, PWR__STARTUP);
  errh_SetStatus( PWR__STARTUP);

  qini_BuildDb(&sts, cp->nid_t, cp->me, NULL, cp->busid);


  ini_ProcTable(&sts, cp);
  ini_ProcIter(&sts, cp, proc_mProcess_system, ini_ProcStart);
  ini_ProcIter(&sts, cp, proc_mProcess_system, ini_ProcPrio);

  ini_ProcIter(&sts, cp, proc_mProcess_user, ini_ProcStart);
  ini_ProcIter(&sts, cp, proc_mProcess_user, ini_ProcPrio);

  qcom_Init(&sts, &aid, "pwr_sev_init");
  if (EVEN(sts)) {
    errh_LogFatal(&cp->log, "qcom_Init, %m", sts);
    exit(sts);
  }

  qcom_CreateQ(&sts, &cp->eventQ, NULL, "iniEvent");
  if (EVEN(sts)) {
    errh_LogFatal(&cp->log, "qcom_CreateQ, %m", sts);
    exit(sts);
  }
         
  // ini_SetSystemStatus( cp, PWR__RUNNING);
  errh_SetStatus( PWR__SRUN);

  return sts;
}

static pwr_tStatus stop (
  int		argc,
  char		**argv,
  ini_sContext	*cp
)
{
  pwr_tStatus	sts;
  qcom_sQid	qid;
  qcom_sPut	put;
  char          data[] = "Shutdown you fool!";

  if (!qcom_Init(&sts, 0, "pwr_ini_stop")) {
    exit(sts);
  } 

  
  qid.qix = 550715;
  qid.nid = 0;
  put.type.b = 11;
  put.type.s = 1;
  put.reply.qix = 0;
  put.reply.nid = 0;
  put.data = data;
  put.size = sizeof(data) + 1;
  qcom_Put(&sts, &qid, &put);

  return 0;
}

static pwr_tStatus
terminate (
  ini_sContext	*cp
)
{
  pwr_tStatus	sts;

  qcom_SignalAnd(&sts, &qcom_cQini, 0);
  qcom_SignalOr(&sts, &qcom_cQini, ini_mEvent_terminate);

  qcom_Exit(NULL);

  /* Now sleep for a while */
  
  sleep(3);
  
  /* Unlink shared memory and semaphores */
  
  qdb_UnlinkDb();

  /* Unlink errlog mwessage queue */
  errl_Unlink();

  exit(1);
}


static int
ask_yes_no (
  ini_sContext	*cp,
  char *text
)
{

  printf("%s ? (y|n) [n]: ", text);
  printf("n\n");

  return 0;
}

static int
checkErrors (
  ini_sContext	*cp
)
{

  if (cp->warnings == 0 && cp->errors == 0 && cp->fatals == 0)
    return 1;

  if (cp->fatals > 0) {
    errh_LogFatal(&cp->log, "Found %d warning(s), %d error(s) and %d fatal error(s)", cp->warnings, cp->errors, cp->fatals);
    if (cp->flags.b.ignoreFatal) {
      errh_LogInfo(&cp->log, "Ignoring fatal errors, errors and warnings, continued...");
      return 1;
    } else {
      return ask_yes_no(cp, "Do you want to continue");
    }
  }
  if (cp->errors > 0) {
    errh_LogError(&cp->log, "Found %d warning(s), %d error(s) and %d fatal error(s)", cp->warnings, cp->errors, cp->fatals);
    if (cp->flags.b.ignoreError) {
      errh_LogInfo(&cp->log, "Ignoring errors and warnings, continued...");
      return 1;
    } else {
      return ask_yes_no(cp, "Do you want to continue");
    }
  }
  if (cp->warnings > 0) {
    errh_LogWarning(&cp->log, "Found %d warning(s), %d error(s) and %d fatal error(s)", cp->warnings, cp->errors, cp->fatals);
    if (cp->flags.b.ignoreWarning) {
      errh_LogInfo(&cp->log, "Ignoring warnings, continued...");
      return 1;
    } else {
      return ask_yes_no(cp, "Do you want to continue");
    }
  }
  return 1;
}

static ini_sContext *
createContext (int argc, char **argv)
{
  int c;
  extern char *optarg;
  extern int optind;
#if 1
  extern int optind;
#endif
  ini_sContext *cp;
  pwr_tStatus sts;
#if defined(OS_LYNX) || defined(OS_LINUX)
  char *options = "a:b:c:d:efg:hin:p:q:rsu:vwA:H:V";
#else
  char *options = "a:b:d:efhin:p:q:rvwA:H:V";
#endif

#if 0
  extern int opterr;
  opterr = 0;
#endif
  optind = 0;

  if ( argc > 1 && strcmp( argv[1], "--version") == 0) {
    system( "cat $pwr_exe/rt_version.dat");
    exit(1);
  }
  if (!(cp = ini_CreateContext(&sts))) {
    fprintf(stderr, "%s: could not allocate context\n", argv[0]);
    exit(1);
  }

  while ((c = getopt(argc, argv, options)) != -1) {
    switch (c) {
    case 'a':
      cp->flags.b.applfile = 1;
      strcpy(cp->applfile.name, optarg);
      break;
    case 'c':
      strcpy(cp->console, optarg);
      break;
    case 'd':
      strcpy(cp->dir, optarg);
      break;
    case 'e':
      cp->flags.b.ignoreError = 1;
      break;
    case 'f':
      cp->flags.b.ignoreFatal = 1;
      break;
    case 'h':
      cp->flags.b.hostname = 1;
      strcpy(cp->hostname, optarg);
      break;
    case 'i':
      cp->flags.b.interactive = 1;
      break;
    case 'n':
      cp->flags.b.nodename = 1;
      strcpy(cp->nodename, optarg);
      break;
    case 'q':
      cp->flags.b.busid = 1;
      cp->busid =  atoi(optarg);
      break;
    case 'r':
      cp->flags.b.restart = 1;
      cp->flags.b.interactive = 1;
      break;
    case 's':
      cp->flags.b.stop = 1;
      break;
    case 'v':
      cp->flags.b.verbose = 1;
      break;
    case 'w':
      cp->flags.b.ignoreWarning = 1;
      break;
    case 'A':
      cp->flags.b.aliasfile = 1;
      strcpy(cp->aliasfile.name, optarg);
      break;
    case '?':
      usage(argv[0]);
      break;
    }
  }

  return cp;
}
static void
usage (
  char *name
)
{
#if defined(OS_LYNX) || defined(OS_LINUX)
  fprintf(stderr, "usage: %s -a arg -b arg -d arg -efg arg -hip arg -q arg -ru arg -s arg -vwA arg -H arg\n", name);
#else
  fprintf(stderr, "usage: %s -a arg -b arg -d arg -efhip arg -q arg -rvwA arg -H arg\n", name);
#endif
  fprintf(stderr, "  -?    : give help\n");
  fprintf(stderr, "  -a arg: use 'arg' as application file\n");
  fprintf(stderr, "  -b arg: use 'arg' as boot file\n");
  fprintf(stderr, "  -d arg: use files from directory 'arg'\n");
  fprintf(stderr, "  -e    : ignore errors\n");
  fprintf(stderr, "  -f    : ignore fatal errors\n");
#if defined(OS_LYNX) || defined(OS_LINUX)
  fprintf(stderr, "  -g arg: setgid to 'arg' before starting\n");
#endif
  fprintf(stderr, "  -h    : give help\n");
  fprintf(stderr, "  -i    : interactive, log to stdout\n");
  fprintf(stderr, "  -p arg: use 'arg' as PLC\n");
  fprintf(stderr, "  -q arg: use 'arg' as qcom bus id\n");
  fprintf(stderr, "  -r    : restart with new versions of loadfiles and PLC\n");
#if defined(OS_LYNX) || defined(OS_LINUX)
  fprintf(stderr, "  -s    : stop of Proview/R\n");
  fprintf(stderr, "  -u arg: setuid to 'arg' before starting\n");
#endif
  fprintf(stderr, "  -v    : verbose\n");
  fprintf(stderr, "  -w    : ignore warnings\n");
  fprintf(stderr, "  -A arg: use 'arg' as alias file\n");
  fprintf(stderr, "  -H arg: use 'arg' as hostname\n");
  fprintf(stderr, "  -N arg: use 'arg' as nodename\n");
  exit(1);
}

static pwr_tStatus events (
  ini_sContext	*cp
)
{
  pwr_tStatus	sts = INI__SUCCESS;
  qcom_sGet	get;
#if defined(OS_LYNX) || defined(OS_LINUX)
  int		tmo_ms = 1000;
#else
  int		tmo_ms = qcom_cTmoEternal;
#endif

  cp->myQ.qix = 550715;
  cp->myQ.nid = 0;

  qcom_CreateQ(&sts, &cp->myQ, NULL, "events");
  if (EVEN(sts)) {
    errh_LogFatal(&cp->log, "qcom_CreateQ, %m", sts);
    exit(sts);
  }

  for (;;) {

    get.data = NULL;
    qcom_Get(&sts, &cp->myQ, &get, tmo_ms);
    
    /* Request for termination ?? */
    if (sts != QCOM__TMO && sts != QCOM__QEMPTY && get.type.b == 11) {
      sts = terminate(cp);
      return sts;
    }    

  }
  return INI__SUCCESS;
}


static void ini_errl_cb( void *userdata, char *str, char severity, pwr_tStatus sts, int anix,
			 int message_type)
{
}





