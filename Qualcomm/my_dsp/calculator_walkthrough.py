#!/usr/bin/env python
# child python script

### Imports ###
import os		# provide output to command prompt
import signal	# allow communication between child and parent processes
import time		# delay functions
import sys		# flush command prompt output
from sys import platform as _platform
import argparse
import re
from argparse import RawTextHelpFormatter


HEXAGON_SDK_ROOT=os.getenv('HEXAGON_SDK_ROOT')
script_dir = HEXAGON_SDK_ROOT + '/scripts/'
sys.path.append(script_dir)
import Common_Walkthrough
from Common_Walkthrough import *

pid = os.getpid()	# return the current process ID
received = False	# initialize signal received to false

unsupported_target_info = []

target_info = target_list()

#******************************************************************************
# Parser for cmd line options
#******************************************************************************
parser = argparse.ArgumentParser(prog='calculator_walkthrough.py', description=__doc__, formatter_class=RawTextHelpFormatter)
call_parser(parser)
options = parser.parse_args()

# signal handler
def signal_usr1(signum, frame):	# signum is signal used to call handler 'signal_usr1', frame is current stack frame
	print "Exiting..."			# print appropriate message
	sys.stdout.flush()			# flush output to command prompt
	sys.exit(0)					# exit child process
	
#print command and execute with the error check
def print_and_run_cmd(cmd):
	print cmd
	if os.system(cmd) != 0 : sys.exit(2) # in error stop execution and exit

def print_and_run_push_cmd(cmd):
	print cmd
	if os.system(cmd) != 0 : 
		sys.exit(2) # in error stop execution and exit

# run calculator
def run_calc():
	if not os.getenv('SDK_SETUP_ENV'):
		sys.exit("\nSDK Environment not set up -> please run setup_sdk_env script from SDK's root directory.")

	target_name=""
	if options.target in unsupported_target_info:
		print "Error! "+ options.target+" is not supported."
		sys.exit()
	for target_name in target_info:
		if options.target==target_name: 
			break
		else : target_name=""
	if target_name=="" : 
		print "Error! Target name is not in list \nPlease pass -T with below supported targets :"
		for target_name in target_info: print "\t"+target_name
		sys.exit()

	object_new = get_config() #creating an object for get_config class in Common_Walkthrough script
	hex_variant, Flag, variant = object_new.get_parameters()
	
	#parsing the subsystem Flag 

	if "True" != options.hex_version:
		regex = 'v\d+_v\d+'
		m = re.match(regex, options.hex_version)
		if m is None:
			print "Error! unknown Hexgon version please give like below \nexample : v82_v65"
			sys.exit()
		hex_variant="hexagon_Debug_dynamic_tool"+options.hex_version

	print "hex_variant = "+hex_variant


	HEXAGON_SDK_ROOT=os.getenv('HEXAGON_SDK_ROOT')
	calculator_exe='{}/examples/common/calculator/{}/ship/calculator'.format(HEXAGON_SDK_ROOT,variant)
	libcalculator='{}/examples/common/calculator/{}/ship/libcalculator.so'.format(HEXAGON_SDK_ROOT,variant)
	libcalculator_skel='{}/examples/common/calculator/{}/ship/libcalculator_skel.so'.format(HEXAGON_SDK_ROOT,hex_variant)
	
	if _platform == "win32":
		clean_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree_clean V='+variant+' '+Flag+' VERBOSE=1 || exit /b'
		build_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree V='+variant+' '+Flag+' VERBOSE=1 || exit /b'
		clean_hexagon_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree_clean V='+hex_variant+' VERBOSE=1 || exit /b'
		build_hexagon_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree V='+hex_variant+' VERBOSE=1 || exit /b'
	else:
		clean_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree_clean V='+variant+' '+Flag+' VERBOSE=1 || exit 1'
		build_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree V='+variant+' '+Flag+' VERBOSE=1 || exit 1'
		clean_hexagon_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree_clean V='+hex_variant+' VERBOSE=1 || exit 1'
		build_hexagon_variant = 'make -C ' + HEXAGON_SDK_ROOT + '/examples/common/calculator tree V='+hex_variant+' VERBOSE=1 || exit 1'

	call_test_sig , APPS_DST, DSP_DST, LIB_DST, ADSP_LIB_PATH = get_DST_PARAMS(HEXAGON_SDK_ROOT)

	if not options.no_rebuild:
		print "---- Build calculator example for both Android and Hexagon ----"
		print_and_run_cmd(clean_variant)
		print_and_run_cmd(build_variant)
		print_and_run_cmd(clean_hexagon_variant)
		print_and_run_cmd(build_hexagon_variant)
	else: 
		print "---- Skip rebuilding calculator example for both Android and Hexagon ----"
	
	print_and_run_cmd('adb logcat -c')
	if not options.no_signing :
                os.system(call_test_sig)
	
	print "---- root/remount device ----"
	mount_device()
	
	print "---- Push Android components ----"
	print_and_run_cmd('adb wait-for-device shell mkdir -p '+APPS_DST)
	print_and_run_push_cmd('adb wait-for-device push '+calculator_exe+' '+APPS_DST)
	print_and_run_cmd('adb wait-for-device shell chmod 777 '+APPS_DST+'/calculator')
	print_and_run_cmd('adb wait-for-device push '+libcalculator+' '+LIB_DST)

	print " ---- Push Hexagon Components ----"
	print_and_run_cmd('adb wait-for-device shell mkdir -p '+DSP_DST)
	print_and_run_cmd('adb wait-for-device push '+libcalculator_skel+' '+DSP_DST)

	print "---- Direct dsp messages to logcat ---"
	print_and_run_cmd('adb wait-for-device shell "echo 0x1f > '+DSP_DST+'calculator.farf"')

	# print_and_run_cmd('adb wait-for-device reboot')
	print_and_run_cmd('adb wait-for-device')

	if _platform == "win32":
		print "---- Launch logcat window to see aDSP diagnostic messages"
		print_and_run_cmd('start cmd.exe /c adb logcat -s adsprpc')
		print_and_run_cmd('sleep 2')

	print "---- Run Calculator Example Locally on Android ----"
	print_and_run_cmd('adb wait-for-device shell ADSP_LIBRARY_PATH='+ADSP_LIB_PATH+' '+APPS_DST+'/calculator 1 1000')
	print("---- Run Calculator Example on " +Flag[:4] +" ----")
	print_and_run_cmd('adb wait-for-device shell ADSP_LIBRARY_PATH='+ADSP_LIB_PATH+' '+APPS_DST+'/calculator 0 1000')

	print "Done"


# main entry point for child process
if __name__ == '__main__':
	signal.signal(signal.SIGINT, signal_usr1)				# register signal handler 'signal.SIGINT' to function handler 'signal_usr1'
	run_calc()												# call function to initialize debug_agent
	sys.stdout.flush()										# show output immediately in command prompt

