#  dir_symbols.mk  -  get directory symbols

comma := ,
empty :=
space := $(empty) $(empty)

cwd_dirs := $(subst /,$(space),$(PWD))
#cwd_dirs := $(subst .hw_,hw_,$(cwd_dirs))
#cwd_dirs := $(subst .os_,os_,$(cwd_dirs))

word	:= $(words $(cwd_dirs))
#hw_name	:= $(word $(word), $(cwd_dirs))
#ifneq ($(findstring hw, $(hw_name)),hw)
#include ___error___hw
#endif

#prev	:= pred_ $(word)
#pred	:= $(subst $(space),$(empty),$(prev))
#word	:= $(shell expr $(word) - 1)
#os_name	:= $(word $(word), $(cwd_dirs))
#ifneq ($(findstring os,$(os_name)),os)
#include ___error___os
#endif

#prev	:= pred_ $(word)
#pred	:= $(subst $(space),$(empty),$(prev))
#word	:= $(shell expr $(word) - 1)
src_name	:= $(word $(word), $(cwd_dirs))
#ifneq ($(src_name),src)
#include ___error___no_source_subdirectory
#endif

word	:= $(shell expr $(word) - 1)
comp_name	:= $(word $(word), $(cwd_dirs))

word	:= $(shell expr $(word) - 1)
type_name	:= $(word $(word), $(cwd_dirs))

word	:= $(shell expr $(word) - 1)
root_name	:= $(word $(word), $(cwd_dirs))
