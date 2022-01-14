<!-- hide script from old browsers
var urls=[]
var titles=[]
var idx = lunr(function () {
	this.field('title', { boost: 10 })
	this.field('body')
	this.ref('id')
})
var doc = {
	"title": "DSP Concurrency",
	"body": " \
		Overview \
		For MSM8996/MSM8998 targets the aDSP may be shared among \
		audio voice HVX camera streaming sensors and compute processing \
		such as computer vision video postprocessing and camera postprocessing . \
		The aDSP real time environment is designed to ensure that real time aDSP users \
		i.e HVX camera streaming audio/voice and sensors have reliable quality of \
		service QoS while non real time users i.e compute run in the background \
		using leftover available resources Therefore under aDSP concurrencies compute \
		applications may see degraded performance And under certain heavy concurrencies \
		it may be required to remove compute processing from the aDSP to \
		prevent possible degradation to audio/voice or other real time users. \
		SDM660 and SDM845 have separate DSP s for audio/voice aDSP and imaging/compute cDSP . \
		The aDSP Eviction and L2 Cache partitioning information below only applies to MSM8996 \
		and MSM8998 targets where the aDSP is shared by audio/voice and imaging/compute. \
		aDSP Eviction \
		A well behaved compute application should periodically at least every 30 msec check the aDSP concurrency \
		level and either terminate pause or migrate processing from the aDSP to the CPU if the \
		concurrency is deemed too heavy The [dspCV library] FastCV/Applications_Computer Vision.html dspCV Library \
		offers a simple concurrency check API \
		to advise a compute application whether it is safe to continue operating on the aDSP or not based on \
		currently existing concurrencies and target specific thresholds Usage of this API is demonstrated in the \
		[Computer Vision examples] Examples_ComputeHVX.html . \
		L2 Cache \
		L2 cache is shared by all concurrent aDSP users The runtime environment is tuned to seamlessly \
		manage partitioning of the cache depending on the concurrency present at any given time For \
		cache partitioning to work as designed all concurrent applications must vote for resources through \
		HAP_Power API s including the specification of the application s client class.	",
	"id":1
}
idx.add(doc)
urls[1]='DSP%20Concurrency.html'
titles[1]="DSP Concurrency"

var doc = {
	"title": "Common Examples",
	"body": " \
		Overview \
		The Hexagon SDK contains example projects which are intended to serve as \
		templates for creating computational offload modules. \
		Before you go further check out this page for a general overview on how a typical example in the SDK is structured and how to work with an example [WorkingWithExamples] WorkingWithExamples.html \
		Computational work can be offloaded to the aDSP application DSP cDSP compute DSP mDSP modem DSP and SLPI Sensors Low Power Island depending on the target support The mDSP is available on platforms that don t \
		support modem functionality like dragonboards APQs in these cases the mDSP is \
		sitting mostly idle and an advantage of the mDSP is it sits on a higher bandwidth \
		bus and memorywise closer to the applications processor. \
		The [[calculator]] example shows how to offload computational work to the desired DSP \
		The [[calculator_multi_legacy and calculator_multi_domains examples]] example shows how to offload computational work to \
		both the aDSP and mDSP NOTE this example doesn t work on targets where mDSP off loading is not available \
		All the examples have a walk through script similar to [calculator_walkthrough] calculator_android.html .This script is provided so that the user can run a single step procedure to run each example. \
		calculator \
		The Hexagon SDK s calculator example demonstrates the ability to offload \
		computation on the DSP by calling a function on the HLOS and have it executed \
		on the DSP This is done via [FastRPC] APIs_FastRPC.html in which the complexity \
		of the remote procedure call is made transparent to the caller by only requiring \
		the caller to call a library function on the HLOS That library on the HLOS is \
		referred to as a stub and its corresponding implementation on the DSP is \
		referred to as a skel. \
		The calculator example supports the simple math function sum which when called \
		from the application processor performs the work on the DSP. \
		Contents of the example \
		Makefile root makefile that points to a build variant specific min file \
		eg hexagon.min \
		hexagon.min android.min WinNT.min contains the make.d directives used to \
		build that variant s products. \
		inc/calculator.idl IDL interface defines the calculator API. \
		This IDL is compiled by the [QAIC IDL compiler] Tools_IDL Compiler.html into the \
		following files \
		calculator.h c/c++ includable header \
		calculator_stub.c stub source that needs to be built for the HLOS \
		Android Windows etc . \
		calculator_skel.c skel source that needs to be built for Hexagon \
		src/calculator.c Android executable example source that calls the \
		calculator stub on the HLOS side of the RPC call. \
		src/calculator_test.c contains a HLOS side test function This file is \
		compiled for Android as a .so. \
		src/calculator_imp.c this is the source for the Hexagon side implementation \
		of the calculator interface and is compiled into a shared object. \
		Customizing the calculator example \
		The calculator example may be expanded by adding additional calculation methods. \
		The following steps are required to add new methods \
		Add a new method to the calculator interface in inc/calculator.idl for example \
		.ccode \
		long diff in sequence long vec rout long long res \
		Add a new implementation of that function in src/calculator_imp.c \
		.ccode \
		int calculator_diff const int* vec int vecLen int64* res \
		int ii 0 \
		*res vec[0] \
		for ii 1 ii vecLen ++ii \
		*res *res vec[ii] \
		FARF HIGH DSP diff result %lld *res \
		return 0 \
		TODO using the .ccode directive screws up subsequent bullets \
		Call the new function from the executable src/calculator_main.c \
		.ccode \
		assert 0 calculator_diff test num &result \
		The difference method is already exemplified in the calculator example and just \
		needs to be uncommented. \
		Building and testing \
		Step by step procedure to build and test the example is provided in [calculator_walkthrough] calculator_android.html . \
		calculator C++ example \
		These are examples to demonstrate the use of C++ support There are two examples provided. \
		[calculator C++.] calculator_c++.html \
		This can be used on 8996/8998 devices Also please compile with 7.x toolset to run this on 8996. \
		[calculator C++ 11/14.] calculator_c++14.html \
		This can be used only on 8998 device \
		calculator C++ APK \
		The example [calculator_c++_app] calculator_c++_app.html can be used to demonstrate the use of C++ APIs on Android side. \
		calculator_multi_legacy and calculator_multi_domains examples \
		These examples offloads the calculator functionality to different DSP s available More details of these examples are provided in this [calculator_multi examples] calculator_multi.html . \
		asyncdspq_sample \
		This example illustrates a new asynchronous message queueing mechanism between application CPU and DSP. \
		There is detailed documentation available in [Asynchronous DSP Message Queue] APIs_Async Message Queue.html \
		QuRT examples \
		QuRT is the priority preemptive real time operating system running on the DSPs. \
		The following example projects demonstrate how to use various functionality of \
		QuRT \
		examples/common/qurt_mutexes \
		examples/common/qurt_thread_t1 \
		examples/common/qurt_multithread \
		Rpc Perf \
		This example will guide you through measuring the overhead associated with the FastRPC invocations For more detailed explanation of working with this example you can refer to [RPC Perf] Common_Rpcperf.html \
		template_so \
		The template_so example is an empty shared library that may be used as a template \
		to create a shared object which may be loaded via dlopen . \
		This example can be found in examples/common/template_so and consists of a \
		source and test file. \
		The source file named template_so.c contains the following function \
		.ccode \
		int template_so int n \
		FARF ALWAYS template_so received %d n \
		return n \
		This function can be expanded or replaced based on the intent of the new \
		shared object It is recommended when creating a new shared object that the \
		template_so example be first cloned and the modified To clone the template_so \
		example please refer to [clone_project.py] Tools_Scripts.html clone_project.py .	",
	"id":2
}
idx.add(doc)
urls[2]='Examples_Common.html'
titles[2]="Common Examples"

var doc = {
	"title": "FastRPC FAQ",
	"body": " \
		How does the FastRPC mechanism work? \
		See the [FastRPC] APIs_FastRPC.html documentation. \
		Why is FastRPC failing \
		First run your application with adb logcat s adsprpc running in another shell and run QXDM if it is available. \
		* Dynamic Loading / File Not Found Errors \
		Dynamic Loading is failing see [FAQ_Dynamic Loading.html] Why is dynamic loading failing] \
		Signature Check if failing see [Signing] Tools_Signing.html \
		* /dev/adsprpc smd Errors \
		/dev/adsprpc smd is failing see [if FastRPC is Enabled] APIs_FastRPC.html Setup \
		* DSP does not respond without errors \
		adsprpcd/cdsprpcd/mdsprpcd is not running see [if FastRPC is Enabled] APIs_FastRPC.html Setup . \
		Is there any documentation for the IDL Compiler? \
		[IDL compiler] Tools_IDL Compiler.html \
		Do you have a simple example of FastRPC? \
		[Calculator example] Examples_Common.html calculator \
		How to verify FastRPC is working on my setup? \
		Run the [Calculator] Examples_Common.html calculator example \
		Why do we need to return 0 from all remote functions \
		The biggest factor in RPC latencies is flushing and invalidating \
		buffers between HLOS and DSP A non zero return value is used by \
		the RPC driver to ignore synchronizing output buffers from DSP to \
		HLOS when an error has occurred So a zero return value indicates \
		success and output buffers will get propagated a non zero return \
		value indicates a failure and output buffers will not be flushed \
		their contents may be out of sync. \
		Why can t I have a dual input/output parameter \
		There is no additional performance benefit of an additional parameter \
		type over passing the same memory as an input and output parameter. \
		Users that want to do in place transformations on the DSP should ask \
		the caller to pass the same memory as input and output. \
		Because memory is mapped and flush/invalidate between output and \
		input buffers is done in parallel there is no performance hit with \
		this approach On the DSP side the caller can do the following \
		to handle the two buffers in all cases. \
		.ccode \
		if outbufLen ! srcbufLen \
		return 1 \
		if srcbuf ! outbuf \
		memmove outbuf srcbuf outbufLen \
		inplace_alg outbuf outbufLen \
		Why should I use ion and what if I don t? \
		ION is a contiguous memory allocator for android It allows android \
		applications allocate memory that is physically contiguous The \
		DSP can only access a limited number of physically contiguous \
		pages so without ION a 4mb buffer on android allocated at 4kb \
		contiguous chunks would severely degrade DSP performance. \
		If users do not use ION the /dev/adsprpc smd kernel driver will \
		copy the memory into a local physically contiguous buffer In cases \
		where ION is used the driver doesn t need to do any coping and the \
		memory can be mapped directly. \
		What memory can I pass to a FastRPC function? \
		Any memory but ION allocated memory is the only memory that will \
		be passed to the DSP directly without a copy Stack general heap \
		and static buffers will be copied. \
		Even though ION memory isn t copied because DSP and APPS do not \
		share the same cache cache synchronization still has to occur and \
		those operations are the most significant factor in RPC performance. \
		How much stack space do I have in a FastRPC function? \
		FastRPC function may use up to 500kb of stack space and depending \
		on the idl interface the skel may additionally allocate on the stack. \
		On 8x9x devices and later FastRPC thread are allocated with 16kb of stack. \
		On earlier devices they are allocated with 4kb of stack. \
		Do buffers get copied over when using FastRPC mechanism? \
		For security and stability reasons HLOS memory may not be visible \
		to DSP in future targets and only ION carve out buffers can be \
		used between HLOS and DSP While using FastRPC if you pass in \
		HLOS memory allocated via malloc it would result in a copy from \
		HLOS memory to ION buffer for input buffers and from ION buffer to \
		HLOS memory for output buffers To avoid this the HLOS can allocate \
		from ION buffer and send that over in which case this extra copy \
		would not happen. \
		What is the page granularity of mappings on DSP? \
		The FastRPC framework maps buffers at a page granularity supported \
		by the DSP 4K 16K 64K 256K 1M For example if the client \
		passes a 512K buffer it would be mapped with 2 entries of 256K \
		each as long as the physical address received is aligned correctly. \
		The mapping exists only for the duration of that remote invocation \
		when the DSP returns from the invocation it would unmap the pages \
		associated with that invocation So the mapping and unmapping \
		happen for each RPC call made. \
		What happens if application is terminated in the middle of remote invocation? \
		The FastRPC framework keeps track of all resources used for the \
		remote invocation and would perform the necessary cleanup such as \
		notifying the DSP processor to kill the threads servicing the \
		remote invocation The application would be blocked from exiting \
		until the clean up is complete so as to guarantee that the buffers \
		passed to the DSP is not in use before HLOS can re allocate it. \
		Can more than one remote invocation be made at any given point? \
		Yes there can be multiple threads that can be spawned from the \
		user space application with each making a remote invocation \
		simultaneously. \
		What cache attribute is used to map the input and output buffers? \
		The input and output buffers are mapped by default with write back \
		cache attribute both L1 and L2 cacheable . \
		How do I create persistent state on the DSP \
		see [Using persistent threads on the DSP] APIs_FastRPC.html Using persistent threads on the DSP . \
		How can I manage the clocks when making a fastrpc call? \
		see HAP_power.h. \
		How do I get FARF messages posted in a fastrpc call? \
		see [FARF] Debugging_Message Logging.html . \
		How to handle sub system restart SSR when offloading to CDSP? \
		A subsystem restart or SSR occurs when a subsystem eg ADSP CDSP crashes and only the \
		crashed subsystem gets restarted instead of restarting the device In case of a SSR \
		the running applications need to catch a connection reset by peer error **AEE_CONNRESET** \
		Error code 104 When a FastRPC call returns AEE_CONNRESET it should not terminate the \
		running process To handle an SSR the return value can be caught and the running process \
		can be restarted at the instant an SSR occurs. \
		Suppose an SSR happened when an example like benchmark_v65 is running on CDSP The running \
		benchmark FastRPC API will return AEE_CONNRESET as error The example code given below \
		can be used as an error handler to prevent termination of the running process. \
		if retVal AEE_ECONNRESET \
		printf Attempting to restart session and continue/n \
		// close handle \
		if handle ! 1 \
		void benchmark_close handle \
		handle 1 \
		. \
		// reopen handle \
		printf Waiting for 5 seconds before another attempt/n \
		sleep 5 \
		retVal benchmark_open benchmark_URI_Domain &handle \
		VERIFY 1 ! handle && 0 retVal \
		// set clocks \
		printf setting clocks/n \
		retVal benchmark_setClocks handle POWER_LEVEL LATENCY DCVS_ENABLE \
		VERIFY 0 retVal	",
	"id":3
}
idx.add(doc)
urls[3]='FAQ_FastRPC.html'
titles[3]="FastRPC FAQ"

var doc = {
	"title": "SDK 3.4 Feature Matrix",
	"body": " \
		For older targets please refer to [this] feature_matrix_old.html \
		.pre \
		Hexagon SDK Feature Matrix \
		Targets \
		Simulator SDM845 SDM670/ QCS605 SM8150 SM7150 SM6150 SM6125 QCS405/ Notes \
		SDM710 QCS403 \
		Operating System \
		AP None LA LA LA/LE LA LA LA/LE LA LE* QCS403 is 32 bit variant of QCS405 \
		DSP QuRT* QuRT QuRT Qurt QuRT Qurt Qurt Qurt Qurt Standalone simulation is supported on all architectures. \
		Qurt based simulation is supported on v65 v66. \
		DSPs Supported* \
		aDSP Yes v65 Yes v65 Yes v65 Yes v66 Yes v65 Yes v66 Yes v66 Yes v66 \
		cDSP Yes v65 Yes v65 Yes v65 Yes v66 Yes v65 Yes v66 Yes v66 Yes v66 \
		sDSP No No No No No No No No \
		mDSP No No No No No No No No \
		Language \
		C++ 98 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		C++ 11/14 Yes Yes Yes Yes Yes Yes Yes Yes Yes 8.x tools needed for C++11/14 support \
		Debugging \
		LLDB Yes Yes Yes* Yes Yes Yes* Yes* Yes* No LLDB is supported only on cDSP for SDM670 SM6150 and SM7150 \
		logcat No Yes Yes Yes Yes Yes Yes Yes Yes* Runtime FARF is not supported on Nightfury \
		printf Yes Yes Yes Yes Yes Yes Yes Yes Yes Please use runtime farf on targets not supporting printf. \
		LLDB user pd exception handler Yes Yes* Yes Yes Yes Yes Yes Yes Yes Not supported on all SDM845 releases \
		Profiling \
		Sysmon No Yes Yes Yes Yes Yes Yes Yes No Android APK to profile all DSPs Captures clock votes eight default metrics and heap statistics \
		Configurable PMU metrics No Yes Yes Yes Yes Yes Yes Yes No User can select more metrics to get more PMU details but not all \
		hexagon trace analyzer No No No No No Yes Yes Yes No hexagon trace analyzer is a Software trace analysis tool that processes Hexagon ETM traces \
		HVX arch benchmarks No Yes Yes Yes Yes Yes Yes Yes No Runs different HVX kernels at different clock plans and presents HVX and RPC processing time \
		SysMonApp Command Line Interface No Yes Yes Yes Yes Yes Yes Yes Yes \
		Marker based Profiling No Yes Yes Yes Yes Yes Yes Yes Yes User can add markers in code to get performance of specific codemetrics \
		SW thread MPPS MCPS CPP No Yes Yes Yes Yes yes Yes Yes Yes via CLI Gets software thread metrics \
		Clock settings No Yes Yes Yes Yes Yes Yes Yes Yes via CLI Ability to set QDSP6 bus clock and sleep latency vote \
		Thread list No Yes Yes Yes Yes Yes Yes Yes Yes via CLI Display list of all existing PDs and threads in each PD \
		FastRPC timelines No Yes Yes Yes Yes yes Yes Yes Yes via CLI Display fastrpc timelines and correlates it with sysmon data \
		Features \
		HVX Yes cDSP cDSP cDSP cDSP cDSP cDSP cDSP cDSP \
		DCVS No DCVS v2 DCVS v2 DCVS v2 DCVS v2 DCVS v2 DCVS v2 DCVS v2 DCVS v2 DCVS_v2 APIs are defined but implementation stubbed out in simulator environment. \
		CAPI v2 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		FastRPC Domains No Yes Yes Yes Yes Yes Yes Yes Yes \
		CPZ No cDSP cDSP cDSP cDSP cDSP cDSP cDSP cDSP \
		VTCM APIs Yes cDSP cDSP cDSP cDSP cDSP cDSP cDSP cDSP APIs for managing VTCM \
		Cache locking API v2* Yes cDSP cDSP cDSP cDSP cDSP cDSP cDSP No Updated APIs for cache locking allowing better cache management \
		Libraries \
		fastCV Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		dspCV Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		qmath Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		qfxp Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		qprintf Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		asyncdspq No Yes Yes Yes Yes Yes Yes Yes Yes \
		hexagon_nn Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		Examples \
		capi_v2_decimate Yes No No No No No No No No \
		capi_v2_dummy_ecns Yes No No No No No No No No \
		capi_v2_gain Yes Yes Yes No Yes No No No No \
		capi_v2_gain_32ch Yes No No No Yes No No No No \
		capi_v2_passthru Yes No No No No No No No No \
		capi_v2_sp Yes No No No No No No No No \
		capi_v2_voice_imc Yes Yes No No No No No No No \
		hvx_add_constant No No No No No No No No No \
		calculator Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		calculator_c++ No Yes Yes Yes Yes Yes Yes Yes Yes \
		calculator_c++14 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		calculator_multi_legacy Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		calculator_multi_domains Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		calculator_c++_app No Yes Yes No Yes Yes Yes Yes No \
		farf_runtime_test No Yes Yes Yes Yes Yes Yes Yes Yes* Runtime FARF is not supported on Nightfury \
		qurt_multithread Yes No No No No No No No No \
		qurt_mutexes Yes No No No No No No No No \
		qurt_thread_t1 Yes No No No No No No No No \
		rpcperf No Yes Yes Yes Yes Yes Yes Yes Yes \
		template_so Yes No No No No No No No No \
		benchmark Yes No Yes Yes No No No No No \
		benchmark_v65 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		bilateral_v60 Yes Yes Yes Yes No No No No No \
		conv3x3a16_v60 Yes Yes Yes Yes No No No No No \
		conv3x3a32_v60 Yes Yes Yes Yes No No No No No \
		dilate3x3_v60 Yes Yes Yes Yes No No No No No \
		dilate5x5_v60 Yes Yes Yes Yes No No No No No \
		downscaleBy2 Yes Yes Yes Yes No No No No No \
		epsilon_v60 Yes Yes Yes Yes No No No No No \
		fast9 Yes Yes Yes Yes No No No No No \
		gaussian7x7 Yes Yes Yes Yes No No No No No \
		histogram Yes Yes Yes Yes No No No No No \
		median3x3_v60 Yes Yes Yes Yes No No No No No \
		qprintf_example Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		qfxp_sample Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		qmath_sample Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		qmath_sample_8996 Yes No No No No No No No No \
		sigma3x3_v60 Yes Yes Yes Yes No No No No No \
		sobel Yes Yes Yes Yes No No No No No \
		ubwcdma Yes Yes Yes Yes Yes Yes No No No \
		Asynchronous Queue Test No Yes Yes Yes Yes Yes Yes No No \
		fcvqueuetest No Yes Yes Yes Yes Yes Yes No No \
		queueperf No Yes Yes Yes Yes Yes Yes No No \
		cornerApp Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		run_main_on_hexagonSrc Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		hexagon_nn Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		Halide Examples \
		sg_histogram Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		sg_lookup Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		blur Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		camera_pipe Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		conv3x3a16 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		conv3x3a32 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		median Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		sobel Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		dilate3x3 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		gaussian5x5 Yes Yes Yes Yes Yes Yes Yes Yes Yes \
		hexagon_benchmarks Yes Yes Yes Yes Yes Yes Yes Yes Yes	",
	"id":4
}
idx.add(doc)
urls[4]='feature_matrix.html'
titles[4]="SDK 3.4 Feature Matrix"

var doc = {
	"title": "Remote Debugger Command-line Interface Guide",
	"body": " \
		Overview \
		This document provides steps to use the remote debugger command line interface. \
		Refer to [Debugger User Guide] Debugging_Target.html to \
		get an overview of the debugger framework and to ensure the hardware and \
		software requirements are met Run the [Debugger Verification \
		Script] debugger_verification_script_user_guide.html to ensure that the device \
		being debugged has all the necessary software on it. \
		Steps for debugging \
		Connect a USB cable from the host machine to the device. \
		Ensure you have adb in your path and its able to recognize the device \
		Launch LLDB \
		issue the target_connect command \
		follow the prompts \
		The following section goes into much more detail and walks you through debugging \
		the calculator example \
		Debugging the calculator example \
		Connect a USB cable from the host machine to the device. \
		In this example we debug calculator First step is to run the calculator \
		walkthrough to push it s binaries and verify it is working properly \
		Open a new Windows cmd shell and run the calculator walkthrough script Note that it is required to \
		run setup_sdk_env.cmd in the shell before running your example Make sure to pass the device model you \
		are using and subsystem to run your application on to the walkthrough script. \
		cd HEXAGON_SDK_ROOT \
		setup_sdk_env.cmd For Windows and source setup_sdk_env.source For Linux See [Setup Instructions] readme.html \
		cd examples/common/calculator \
		python calculator_walkthrough.py T sdm845 \
		calculator_walkthrough.py builds for CDSP by default If you want to build calculator for ADSP please pass D adsp to the walkthrough. \
		python calculator_walkthrough.py T sdm845 D adsp \
		You should see something like the following at the end \
		starting calculator test \
		allocate 4000 bytes from ION heap \
		creating sequence of numbers from 0 to 999 \
		compute sum on the DSP \
		sum 499500 \
		success \
		. \
		Done \
		Note that the walkthrough script opens an additional window to show logcat output It s ok to close this window whenever you want. \
		Open a second Windows cmd shell on the host machine and start LLDB Note that it is required to \
		run setup_sdk_env.cmd in the second CLI shell before starting LLDB. \
		cd HEXAGON_SDK_ROOT \
		setup_sdk_env.cmd \
		Hexagon SDK Dir /tools/HEXAGON_Tools/8.3.x/Tools/bin/hexagon lldb.exe \
		You should see the following \
		Hexagon utilities pagetable tlb pv target_connect loaded \
		lldb \
		Issue the target_connect command on the LLDB command line and follow the \
		presented instructions \
		lldb target_connect \
		When asked to choose which DSP select the DSP you are debugging in this \
		case the calculator example runs on the CDSP \
		LLDB will eventually pause and ask you to run your program LLDB has \
		configured your device so that all new user processes will halt on start. \
		This allows LLDB to connect to the process before calling your use code It \
		also allows you to configure your debug session before running any of your \
		code like set breakpoints etc . This also means you will have to reboot \
		your device after you are done debugging in order to return the device back \
		to the default non halting configuration. \
		Run the calculator example on the first cmd shell The calculator program \
		should hang indefintelty waiting for the debugger to attach. \
		adb shell \
		sdm845 / /vendor/bin/calculator 0 1000 \
		After you run your program press ENTER on the LLDB prompt LLDB will \
		present you a list of processes you can connect to There will be a few \
		processes there choose the one that matches your program s name In this \
		case the calculator process Your list should looks something like this \
		you would choose 3 to debug calculator \
		Reading list of active user processes . \
		Please select the process to debug if you don t see your process ensure you application is running \
		1 _ASID0_ \
		2 audio_process \
		3 /frpc/f049fd50 calculato \
		LLDB will then set a breakpoint in the user process s exception handler so \
		that if an exception occurs the debugger will stop in the exception so that \
		you can determine the reason for the exception Please refer to \
		[Hexagon exception handling] file images/Hexagon_Document_Bundle.pdf page 141 \
		for more information on how to debug an exception. \
		Next LLDB will ask you for the search path to your shared object This step is \
		optional but if you choose to enter nothing then you must set a search path \
		later using the following lldb command \
		lldb image search paths add local path to your shared objects \
		Take note that only one search path mapping to can \
		Exist If you have multiple search paths the results are unpredictable. \
		In this example we are running calculator so enter the calculator s ship \
		directory. \
		Be sure to replace HEXAGON_SDK_ROOT with the actual location \
		of the SDK on your host machine. \
		HEXAGON_SDK_ROOT /examples/common/calculator/hexagon_Debug_dynamic_toolv82_v65/ship \
		Take note that if you don t add a search path or the search path is \
		incorrect then LLDB won t be able to halt at any of the breakpoints in your code. \
		It s good practice to check your search path for accuracy if you are having trouble \
		getting LLDB to hit breakpoints in your user code. \
		Last LLDB will connect to your user process on device and halt at the start \
		of the process This halt location is not your user code it is early in \
		the start up code of the process You should see something like this \
		Process 8370 stopped \
		* thread 1 stop reason signal SIGTRAP \
		frame 0 0x17224ff0 fastrpc_shell_0 qurt_ptrace + 4 \
		fastrpc_shell_0 qurt_ptrace \
		0x17224ff0 +4 jumpr r31 \
		. \
		fastrpc_shell_0 qurt_signal_wait \
		0x17224ff4 +0 r28 0 \
		0x17224ff8 +4 p3 tstbit r2 0 \
		0x17224ffc +8 r5 4 memd_locked r0 \
		0x17225000 +12 p1 !bitsclr r4 r1 \
		0x17225004 +16 p0 cmp.eq r5 0 if !p0.new jump nt 0x1722508c \
		0x17225008 +20 r8 memw r0+ 12 +152 \
		This is a good place to set any user breakpoints you wish to set. \
		For this example lets set a breakpoint in calculator_sum \
		lldb b calculator_sum \
		You will see something like this \
		Breakpoint 2 no locations pending . \
		WARNING Unable to resolve breakpoint to any actual locations. \
		This is normal and just means that LLDB has added a future breakpoint. \
		Since the calculator shared object is not loaded yet LLDB has no idea where \
		in memory to put that breakpoint Once the calculator shared object is \
		loaded LLDB will set the breakpoint in the correct location \
		To make it easier then entering each breakpoint every time you debug you \
		can instead put your breakpoints and search path in a file and have LLDB \
		load and run each command There must be one command per line. \
		An example file \
		echo commands.txt \
		image search paths add C /Qualcomm/Hexagon_SDK/3.4.x/examples/common/calculator/hexagon_Debug_dynamic_toolv82_v65/ship/ \
		b calculator_sum \
		Then in LLDB you can load and run these commands by issuing \
		lldb commands source commands.txt \
		Now its time to let calculator execute and for LLDB to stop at the breakpoint \
		you set Issue the continue command \
		lldb c \
		You should see something like this \
		Process 8370 resuming \
		1 location added to breakpoint 2 \
		Process 8370 stopped \
		* thread 2 stop reason breakpoint 2.1 \
		frame 0 0xe041a83c libcalculator_skel.so calculator_sum vec 0xe2efc000 vecLen 1000 res 0x2fab3e00 at calculator_imp.c 26 \
		23 \
		24 int calculator_sum const int* vec int vecLen int64* res \
		25 \
		26 int ii 0 \
		27 *res 0 \
		You can see from the output that the calculator process has stopped and \
		the reason was a breakpoint LLDB will show you the line number and \
		source code of the location where the breakpoint stopped. \
		If the breakpoint is not hit check that you entered a correct search path \
		At this point you are free to use LLDB to debug the program For a list \
		of LLDB commands take a look at [LLDB commands] https //lldb.llvm.org/lldb gdb.html \
		Here are some useful commands \
		breakpoint list list of breakpoints \
		registers read list the registers \
		thread list list the threads in the system at that instance of time \
		where shows the current line number and which file you are in \
		bt show trace of where you are currently Prints stack backtrace \
		frame v print values of local variables \
		fr v variable name print value stored in variable \
		fr v f x variable name print variable in hex \
		finish step out of the currently selected frame \
		quit exit LLDB debugger \
		Its important to read the [Debugger Known Issues] Debugging_Target.html Known issues \
		section because there are a number of points you need to be aware of when \
		debugging on target \
		Debugging using Eclipse plugin \
		There is an Eclipse plugin that will allow to debug the device using Eclipse. \
		Please refer to the [Eclipse Documentation] eclipse_target_debug.html on \
		how to do it. \
		References \
		[Hexagon Tools 8.3] Tools_Hexagon Tools 8.3.html \
		[Hexagon LLDB Debugger] file images/Hexagon_Document_Bundle.pdf page 6000 \
		[Hexagon exception handling] file images/Hexagon_Document_Bundle.pdf page 141 \
		[LLDB commands] https //lldb.llvm.org/lldb gdb.html \
		[ADB Commands] http //developer.android.com/tools/help/adb.html \
		[Remote Debugger Verification] debugger_verification_script_user_guide.html \
		[Using Eclipse plugin for debugging] eclipse_target_debug.html \
		[Remote Debugger User Guide] Debugging_Target.html	",
	"id":5
}
idx.add(doc)
urls[5]='debugger_cmdline_guide.html'
titles[5]="Remote Debugger Command-line Interface Guide"

var doc = {
	"title": "Building APK using Android SDK",
	"body": " \
		Overview \
		This chapter will guide you to use an android app to link c++ libraries dynamically In Android P due to treble limitations the binaries present in /vendor do not have access to the libc++_shared.so library located in /system Since it is not supported to link libc++.so dynamically using android NDK on android P builds it is required to create an APK to use basic C++ in android application layer. \
		Install APK \
		Refer to the source code of the calculator app from HEXAGON_SDK_ROOT /examples/common/calculator_c++_app To run the apk on your device install the apk and push the hexagon shared object onto your device. \
		adb install calculator_c++_app.apk \
		Compile DSP Shared Object \
		On the Hexagon SDK side use the [documentation] calculator_android.html Building to compile libcalculator_skel.so . \
		cd calculator_c++_app folder \
		make tree V build_variant \
		Sign the compiled shared object using elfsigner The signed shared obejct can be retrieved from HEXAGON_SDK_ROOT /tools/elfsigner/output . \
		cd HEXAGON_SDK_ROOT /tools/elfsigner \
		python elfsigner.py i Location_of_compiled_shared_object \
		When the signed shared object is ready push it to the android device in the location /data/app This location is set using ADSP_LIBRARY_PATH in the java activity MainCalculator Use the following command to push it to the device \
		adb root \
		adb remount \
		adb push Location_of_signed_shared_object /data/app \
		Customize the app \
		To offload to Hexagon using Android SDK follow the steps mentioned below to create and customize an APK using Android SDK \
		Step 1 Download Android SDK \
		You can use this [link] https //developer.android.com/studio/ to download. \
		Step 2 Create a new Android project \
		Create a new Android project with C/C++ compatibility You can refer to the steps given in the [link] https //developer.android.com/training/basics/firstapp/creating project for more information. \
		Create Android Project tab \
		Write Application name as calculator_c++_app . \
		Write Company domain as qualcomm.example.com \
		Edit Package name as com.example.qualcomm.calculator \
		Choose Include C++ Support in Create Android Project tab This is required to enable native development which will enable the application interface to make a call to stub and offload to hexagon. \
		Click Next. \
		Target Android Devices tab \
		Click Next. \
		Add an Activity to Mobile tab \
		Choose Empty Activity. \
		Click Next. \
		Configure Activity tab \
		Write Activity Name as MainCalculator . \
		Click Next. \
		Customize C++ Support tab \
		Click Finish. \
		Please note that if you are facing gradle sync issues after building a new app use the documentation provided in the [link] https //developer.android.com/studio/intro/update to update your IDE and SDK tools. \
		Step 3 Include IDL \
		In the directory calculator_c++_app/app/ make a new directory called inc to add the IDL file calculator.idl . \
		Step 4 Changes to the existing files \
		Make changes to the activity file MainCalculator in app/src/main/java This is the main activity file of the app which should call the functions init and sum in calculator jni.cpp . \
		Create a new blank activity DisplayResult in app/src/main/java to display the result. \
		In the directory app/src/main/res/layout make changes to the layout files activity_calculator.xml and activity_display_result.xml Next make changes to strings.xml in the directory app/src/main/res/values similar to the files shared in the example. \
		Rename the file native lib.cpp to calculator jni.cpp and modify it according to the same file present in app/src/main/cpp This jni file contains the definitions of the functions init and sum which are used to initialize the ADSP_LIBRARY_PATH environment variable and make a call to the calculator_sum function in stub file respectively. \
		Note that the variable ADSP_LIBRARY_PATH is needed to set the location of DSP shared object It is required to push the shared object to this location for the app to work. \
		Step 5 Changes to the build file \
		Make the following changes to the build file Build.gradle \
		Add the following to dynamically link libc++_shared.so to the app \
		externalNativeBuild \
		cmake \
		cppFlags \
		arguments DANDROID_STL c++_shared \
		Since different Android handsets use different CPUs it is required to specify an Android Binary Interface ABI for each CPU architecture an application works with To specify the supported ABI use the following \
		ndk \
		moduleName calculator \
		abiFilter armeabi v7a \
		ldLibs log \
		Step 6 Changes to the Make file \
		Make the following changes to the make file CMakeLists.txt . \
		Include helper file hexagon_helper.cmake \
		Use the file hexagon_helper.cmake as helper to CMakeLists.txt It contains the definition of functions buildIDL and prepare_hexagon_helper_libraries . \
		include $ CMAKE_CURRENT_SOURCE_DIR /hexagon_helper.cmake \
		The HEXAGON_SDK_ROOT and Build variant are also set in hexagon_helper.cmake Edit this file if the HEXAGON_SDK_ROOT is not the same. \
		set HEXAGON_SDK_ROOT C /Qualcomm/Hexagon_SDK/3.4.1 \
		set V android_Debug \
		Build IDL \
		This function will set up a custom_target to build idlFile using qaic IDL compiler For foo.idl it wll generate foo.h foo_stub.c and foo_skel.c into $ CMAKE_CURRENT_BINARY_DIR diretory This function will also add the custom_target created as the dependency of currentTarget \
		buildIDL inc/calculator.idl calculator \
		Build and link static library rpcmem.a and dynamic library libcdsprpc.so \
		prepare_hexagon_helper_libraries hexagonTargets_1 hexagonIncs_1 hexagonLibs_1 rpcmem.a cdsprpc \
		include_directories $ hexagonIncs_1 $ incs \
		add_dependencies calculator $ hexagonTargets_1 \
		target_link_libraries calculator $ hexagonLibs_1 \
		Add library libcalculator.so \
		add_library calculator \
		SHARED \
		$ CMAKE_CURRENT_SOURCE_DIR /src/main/cpp/calculator jni.cpp \
		$ CMAKE_CURRENT_BINARY_DIR /calculator_stub.c \
		$ CMAKE_CURRENT_BINARY_DIR /calculator.h \
		Specify the target link libraries \
		This is used to link NDK library log lib with the library libcalculator.so . \
		find_library log lib log \
		target_link_libraries calculator $ log lib \
		This completes the app development on the Android side Now there is a need to build libcalculator_skel.so using Hexagon SDK and push it to the Android device for the app to work Once the DSP shared object has been pushed to the desired location build your application in Android SDK and install the app on the device The APK is ready to use.	",
	"id":6
}
idx.add(doc)
urls[6]='calculator_c%2B%2B_app.html'
titles[6]="Building APK using Android SDK"

var doc = {
	"title": "calculator_c++ walk-through",
	"body": " \
		Overview \
		Calculator_c++ is an example for using standard c++ in shared objects. \
		**NOTE This example if compiled with 8.x Tools DOES NOT work on 8996 target.** \
		Please use 7.x tools for 8996 and 8.x tools for 8998. \
		Refer [calculator_c++14] calculator_c++14.html for c++14. \
		This walk through is a step by step guide to building loading \
		and executing the calculator_c++ example on Android. \
		It assumes you have an Android device working with adb See [[Prerequisites]] for more \
		information. \
		The following steps except [[Prerequisites]] are captured in the scripts \
		For Windows \
		Hexagon SDK Dir /examples/common/calculator_c++/calculator_c++_walkthrough.py \
		For Linux \
		Hexagon SDK Dir /examples/common/calculator_c++/calculator_c++_walkthrough.py \
		calculator_c++ example creates an android application which remotely invokes \
		C++ functions on DSP using fastrpc. \
		calculator_plus arguments \
		For example \
		calculator_plus 10 \
		Prerequisites \
		This walk through assumes you have an Android device that supports \
		both FastRPC and Dynamic Loading. \
		The device should be loaded with DSP image \
		If you are using an existing DSP image confirm and setup FastRPC on Android \
		by following these [instructions] APIs_FastRPC.html Setup . \
		Building \
		Before building ensure the Hexagon SDK s dependencies are properly setup The \
		installer should have done this for you If you encounter issues please see \
		[Dependencies] Dependencies_Common.html . \
		Rules to build libraries are specified in hexagon.min and android.min files. \
		Libraries building for hexagon are \
		libcalculator_plus_skel.so skel file of calculator_c++ \
		calculator_q Simulator test application \
		Application building for Android is \
		calculator_plus application to run tests on hexagon from android shell \
		Link libstdc++ library with skel shared object for using c99 standard code. \
		For Dynamic Linking \
		libcalculator_plus_skel_DLLS + $ TARGET_DIR /pic/libstdc++ \
		For Static Linking \
		libcalculator_plus_skel_LIBS + $ TARGET_DIR /pic/libstdc++ \
		When building the calculator_c++ example both the stub and skel must be \
		compiled and linked This can be done by compiling both for the variant desired \
		on the DSP as well as the application processor For example to create a \
		stub/skel pair for Android and Hexagon the following commands must be \
		executed \
		First change directory to the calculator_c++ example \
		For Windows \
		cd Hexagon SDK Dir /examples/common/calculator_c++ \
		For Linux \
		cd Hexagon SDK Dir /examples/common/calculator_c++ \
		Next build the Android and Hexagon modules \
		make tree V android_Debug_aarch64 \
		make tree V hexagon_Debug_dynamic_toolv82_v65 VERBOSE 0 \
		For more information on build syntax see [Make.d] Environments_Build System.html \
		Simulator testing \
		make script automatically runs simulator testing at the end of \
		successful compilation. \
		make tree V hexagon_Debug_dynamic_toolv82_v65 VERBOSE 0 \
		Files will be copied to ship directory only if simulator testing pass. \
		On target testing \
		To execute the calculator_plus test on Android perform the steps mentioned here. \
		These steps are mentioned in calculator_c++_walkthrough.py script for easy run. \
		Use adb as root and remount system read/write \
		adb root \
		adb wait for device \
		adb remount \
		The HLOS side calculator_plus test executable and supporting calculator_c++ stub \
		library must be pushed onto the device as follows \
		adb push android_Debug_aarch64/ship/calculator_plus /vendor/bin \
		adb shell chmod 777 /vendor/bin/calculator_plus \
		adb push ANDROID_ROOT_DIR/sources/cxx stl/gnu libstdc++/4.9/libs/arm64 v8a/libgnustl_shared.so /vendor/lib/ \
		The Hexagon Shared Object must be pushed on to the device s file system as \
		follows \
		adb push hexagon_Debug_dynamic_toolv82_v65/ship/libcalculator_plus_skel.so /vendor/lib/rfsa/adsp/ \
		Push input data file \
		adb push calculator.input /vendor/lib/rfsa/adsp/ \
		Generate a device specific test signature based on the device s serial number. \
		This only has to be done once The same test signature will enable loading \
		of any module and therefore should be used for your own projects as well. \
		Follow these steps [Signing] Tools_Signing.html Walk through \
		Redirect DSP FARF messages to adb logcat by creating a farf file \
		adb shell touch /vendor/lib/rfsa/adsp/calculator_plus.farf \
		Execute the example as follows \
		adb shell \
		./vendor/bin/calculator_plus 10 \
		All tests returns 0 on success Refer DSP logs for output of these tests. \
		Output data file for iostream test will be generated at /vendor/lib/rfsa/adsp/calculator.output. \
		common queries \
		How to dynamically link PIC versions of libc++ library? \
		library_name _DLLS + libstdc++ \
		What to look on test fails? \
		Check test signature generated for loading unsigned shared objects \
		Refer DSP logs for \
		Failed to load shared object due to missing dependent libraries \
		Test signature verification failed \
		Failed to load shared object due to unresolved symbols found in library \
		Actually test fails with error messages	",
	"id":7
}
idx.add(doc)
urls[7]='calculator_c%2B%2B.html'
titles[7]="calculator_c++ walk-through"

var doc = {
	"title": "Glue-free projects",
	"body": " \
		Historically every SDK example has contained a glue folder which has variant .mak and V_ variant .min files When a glue based SDK example is built using make tree V variant variant .mak in the project’s glue folder will be invoked and this variant.mak has the rules to build the example and its dependencies using libraries and includes mentioned in V_ variant .min When dependencies are modified in a project this requires modifying the glue folder contents which is not practical to do. \
		Glue free projects are being introduced to provide an easy way to change/add dependencies Glue has been replaced in the calculator example HEXAGON_SDK_ROOT/examples/common/calculator with a new dependency specification mechanism as described below note that other SDK examples may also be converted in the future . \
		A Glue free project should have the following files in its root directory \
		hexagon_deps.min hexagon.min for building the Hexagon variant and android_deps.min android.min for building the Android variant. \
		Makefile that includes above files please see HEXAGON_SDK_ROOT/examples/common/calculator/Makefile \
		A project’s dependencies and supported variants must be defined in hexagon_deps.min and android_deps.min. \
		Define DEPENDENCIES of your project in hexagon_deps.min and android_deps.min with the DEPENDENCIES variable as in the following example \
		DEPENDENCIES / \
		ATOMIC / \
		RPCMEM / \
		Each dependency needs a directory definition of the form DEPENDENCY NAME _DIR. \
		For example \
		DEPENDENCIES FOO \
		FOO_DIR $ HEXAGON_SDK_ROOT /examples/common/foo \
		If you would like to be able to build all variants supported by the SDK define your supported variants as follows \
		SUPPORTED_VS $ default_VS \
		The hexagon android and UbuntuARM default_VS variants are defined respectively in hexagon_vs.min android_vs.min and UbuntuARM_vs.min in HEXAGON_SDK_ROOT /build/make.d. \
		Alternatively you can define SUPPORTED_VS so that you can only build variants of your own choosing as follows \
		SUPPORTED_VS / \
		hexagon_Debug_dynamic_toolv82_v65 / \
		hexagon_Debug_dynamic_toolv82_v66 / \
		Here is a full example of a hexagon_deps.min file. \
		SUPPORTED_VS $ default_VS \
		. \
		DEPENDENCIES / \
		ATOMIC / \
		RPCMEM / \
		TEST_MAIN / \
		TEST_UTIL \
		. \
		ATOMIC_DIR $ HEXAGON_SDK_ROOT /libs/common/atomic \
		RPCMEM_DIR $ HEXAGON_SDK_ROOT /libs/common/rpcmem \
		TEST_MAIN_DIR $ HEXAGON_SDK_ROOT /test/common/test_main \
		TEST_UTIL_DIR $ HEXAGON_SDK_ROOT /test/common/test_util \
		android_deps.min and UbuntuARM_deps.min have the same form but with dependencies specific to those variants. \
		Build commands for a glue free project remain same as glue project \
		To build android variant \
		make tree V android_Debug \
		To build hexagon variant \
		make tree V hexagon_Debug_dynamic_toolv82_v65 \
		To build UbuntuARM variant \
		make tree V UbuntuARM_Debug	",
	"id":8
}
idx.add(doc)
urls[8]='Glue_free_projects.html'
titles[8]="Glue-free projects"

var doc = {
	"title": "SDK Dependencies",
	"body": " \
		Overview \
		The Hexagon SDK s installer will download all the dependencies required. \
		Below is a list of the dependencies the Hexagon SDK installer downloads If you \
		have trouble with the installation please refer to this page to set up the \
		Hexagon SDK dependencies manually or you can use [install_dependencies.py] Tools_Scripts.html install_dependencies.py . \
		Python 2.7 is needed to execute [install_dependencies.py] Tools_Scripts.html install_dependencies.py script. \
		If python 2.7 is not installed or it is not the default version in your system please refer [[Python]] section. \
		Using the Hexagon SDK requires that the local environment be set up To do this see [Setup Instructions] readme.html \
		Required packages \
		Hexagon tools \
		Hexagon Tools version 7.2 or later is required to build Hexagon variants of the \
		examples. \
		Hexagon tools are available from Qualcomm Please [contact] Support_Contact.html \
		Qualcomm to obtain them. \
		The Hexagon SDK prefers that the tools be installed at the default location \
		%HEXAGON_SDK_ROOT%/tools/HEXAGON_tools/ Version For Windows \
		$ HEXAGON_SDK_ROOT /tools/HEXAGON_tools/ Version For Linux \
		If the tools are installed anywhere but the default location then set the environment \
		variable HEXAGON_TOOLS_ROOT to point to the installed tools. \
		For example if the tools were installed in their default location then set \
		HEXAGON_TOOLS_ROOT to \
		set HEXAGON_TOOLS_ROOT C /Qualcomm/HEXAGON_Tools/ Version On Windows \
		export HEXAGON_TOOLS_ROOT HOME /Qualcomm/HEXAGON_Tools/ Version On Linux \
		Gnu On Windows \
		Gnu On Windows GOW provides the basic linux like tools required by the Hexagon SDK s command \
		line build system. \
		More information on GOW can be found at \
		https //github.com/bmatzelle/gow/wiki \
		Instructions on how to install GOW can be found at \
		https //github.com/bmatzelle/gow/releases \
		GOW must be installed in the Hexagon SDK s tools directory at \
		tools/utils/gow 0.8.0 \
		Once installed the following steps must be performed \
		Copy tools/gow 0.8.0/bin/gfind.exe to tools/gow 0.8.0/bin/find.exe \
		Create empty directory tools/gow 0.8.0/etc \
		Devcon \
		Devcon is a command line tool that displays detailed information about devices on computer. \
		Devcon must be installed in the Hexagon SDK s tools directory at \
		tools/debug/devcon \
		You can obtain it from here \
		https //www.intrinsyc.com/hexagonsdk/windows/devcon.exe \
		Eclipse \
		Eclipse must be installed in the Hexagon SDK s tools directory at \
		/tools/hexagon_ide In Windows \
		/tools/hexagon_ide In Linux \
		You can obtain it from here \
		http //www.intrinsyc.com/hexagonsdk/windows/eclipse cpp juno SR2 win32 x86_64.zip For Windows \
		https //www.intrinsyc.com/hexagonsdk/linux/eclipse cpp juno SR1 linux gtk x86_64.tar.gz For Linux \
		Hexagon IDE plugins \
		The Hexagon IDE plugins come with the Hexagon SDK and can be found at \
		/tools/hexagon_ide/ide_plugins In Windows \
		/tools/hexagon_ide/ide_plugins In Linux \
		Once Eclipse and the JRE are installed you must install the plugins to Eclipse \
		by running the following script \
		python tools/scripts/manage_plugins.py E tools/hexagon_ide \
		Z HEXAGON_SDK_ROOT /tools/hexagon_ide/ide_plugins/juno/IDE.zip \
		V HEXAGON_SDK_ROOT /tools/hexagon_ide/jre/bin \
		If you want to install Hexagon plug ins to an eclipse other than the default Hexagon SDK eclipse \
		If you want to install into juno or below version \
		python tools/scripts/manage_plugins.py E path_to_eclipse_folder \
		Z HEXAGON_SDK_ROOT /tools/hexagon_ide/ide_plugins/juno/IDE.zip \
		V HEXAGON_SDK_ROOT /tools/hexagon_ide/jre/bin \
		Otherwise \
		python tools/scripts/manage_plugins.py E path_to_eclipse_folder \
		Z HEXAGON_SDK_ROOT /tools/hexagon_ide/ide_plugins/kepler/IDE.zip \
		V HEXAGON_SDK_ROOT /tools/hexagon_ide/jre/bin \
		Note the path to IDE.zip must be an absolute path. \
		Hexagon IDE plugins can be uninstalled by running the following script \
		python /tools/scripts/manage_plugins.py E /tools/hexagon_ide U \
		Python \
		For Windows \
		The 64 bit version can be obtained from \
		http //www.intrinsyc.com/hexagonsdk/windows/python 2.7.2.msi \
		For Linux \
		On Ubuntu 14.04 and 16.04 python is available by default SDK needs python 2.7 if python 2.7 is not installed install it by using below command \
		$ apt get install python2.7 \
		If you have multiple python versions installed use virtualenv to set python2 as default by following steps \
		$ pip install virtualenv \
		$ virtualenv p python2 env2 \
		$ source env2/bin/activate \
		If you do not have pip installed you can install it with $ apt get install python pip \
		Above commands will create a new virtual environment for python2 only for the install session. \
		Android NDK \
		The Android NDK is required to build FastRPC modules Contrary to what some of \
		the Android documentation says the Android SDK is not required in order to use \
		the Android NDK. \
		Download the Android NDK version r14b and unzip into the Hexagon SDK s tools/android ndk r14b \
		/tools/android ndk r14b \
		Android NDK can be obtained from \
		https //www.intrinsyc.com/hexagonsdk/windows/android ndk r14b windows x86_64.zip For Windows \
		https //www.intrinsyc.com/hexagonsdk/linux/android ndk r14b linux x86_64.zip For Linux \
		If you choose to install the NDK to another location you must set the following \
		environment variables \
		ANDROID_ROOT_DIR path to android ndk \
		For example extract android NDK to D /android ndk r14b in Windows and to /local/mnt/workspace/android ndk r14b in Linux \
		set ANDROID_ROOT_DIR D /android ndk r14b For Windows \
		export ANDROID_ROOT_DIR /local/mnt/workspace/android ndk r14b For Linux \
		If you plan to use android ndk r16b or higher please follow below steps \
		Create Android ndk standalone toolchain using \
		python location of your android ndk /build/tools/make_standalone_toolchain.py arch arm \
		api 21 install location of your android ndk /install/ \
		above command creates standalone toolchain for arm architecture in your_android_ndk /install folder. \
		Set below environment variables \
		export ANDROID_ROOT_DIR location of your r16b ndk \
		export ANDROID_TOOLS_DIR location of your r16b ndk /install/ \
		export ANDROID_PLATFORM_DIR location of your r16b ndk /install/sysroot \
		Define Android API level in android.min of the example that you want build. \
		DEFINES + _ANDROID_API_ 21 \
		After following above steps you will be able to build your example with make tree V android_Debug. \
		ADB/Fastboot on Linux \
		Install adb/fastboot by \
		sudo apt get update \
		sudo apt get install adb \
		sudo apt get install fastboot \
		Installing SDK on a machine with no internet access \
		Installer needs internet access to download its dependencies If you want to install SDK on a machine with no internet acceces you need to configure the installer to pick the dependencies locally The procedure of specifying dependencies locally is explained using the following steps. \
		Steps to configure the installer to pick the dependencies locally \
		1 Copy the installer.exe installer.bin for Linux and hexagon_sdk_local.properties hex_sdk_lnx_local.properties for Linux to your local machine \
		2 Rename hexagon_sdk_local.properties to installer.properties \
		3 Change the dependencies paths in installer.properties to the location on your local machine where the dependencies are downloaded to. \
		You can download the dependencies from the following locations \
		unzip http //www.intrinsyc.com/hexagonsdk/windows/7z922.msi \
		gow http //www.intrinsyc.com/hexagonsdk/windows/gow 0.8.0.zip \
		eclipse http //www.intrinsyc.com/hexagonsdk/windows/eclipse cpp juno SR2 win32 x86_64.zip For Windows \
		eclipse https //www.intrinsyc.com/hexagonsdk/linux/eclipse cpp juno SR1 linux gtk x86_64.tar.gz For Linux \
		python http //www.intrinsyc.com/hexagonsdk/windows/python 2.7.2.msi \
		androidndk https //www.intrinsyc.com/hexagonsdk/windows/android ndk r14b windows x86_64.zip For Windows \
		androidndk https //www.intrinsyc.com/hexagonsdk/linux/android ndk r14b linux x86_64.zip For Linux \
		devcon http //www.intrinsyc.com/hexagonsdk/windows/devcon.exe \
		libusb http //www.intrinsyc.com/hexagonsdk/linux/libusb 1.0.so \
		4 Make sure that the installer and installer.properties are in the same folder and run the Installer \
		5 Hexagon tools will need to be installed manually because it requires the gnu tools to be downloaded	",
	"id":9
}
idx.add(doc)
urls[9]='Dependencies_Common.html'
titles[9]="SDK Dependencies"

var doc = {
	"title": "Application type/Client class (HAP_power_set)",
	"body": " \
		Overview \
		**HAP_power_set ** API exposes an API for users to register for an application type also referred as Client class . \
		HAP_power_set_apptype \
		**HAP_power_set_apptype** request type in HAP_power_set request allows user to register an application as one of the \
		following client classes \
		.ccode \
		typedef enum \
		HAP_POWER_UNKNOWN_CLIENT_CLASS 0x00 /** Unknown client class */ \
		HAP_POWER_AUDIO_CLIENT_CLASS 0x01 /** Audio client class */ \
		HAP_POWER_VOICE_CLIENT_CLASS 0x02 /** Voice client class */ \
		HAP_POWER_COMPUTE_CLIENT_CLASS 0x04 /** Compute client class */ \
		HAP_POWER_STREAMING_1HVX_CLIENT_CLASS 0x08 /** Camera streaming with 1 HVX \
		client class */ \
		HAP_POWER_STREAMING_2HVX_CLIENT_CLASS 0x10 /** Camera streaming with 2 HVX \
		client class */ \
		HAP_power_app_type_payload \
		Setting an appropriate client class is important as this information is used in DSP DCVS QoS DSP power management drivers. \
		Users of Client class information \
		DCVS selects **HAP_DCVS_V2_POWER_SAVER_MODE** as default DCVS policy for COMPUTE and STREAMING class clients Client can always \
		power their own DCVS policy by issuing a DCVS_v2 request see [here] Hap_power_set_dcvs_2.html for more details on DCVS_v2 request type of **HAP_power_set**. \
		QoS driver modifies L2 scoreboard thresholds on detecting STREAMING class clients to allow DSP L2 slave accesses. \
		On 8996/8998 chipsets where compute applications coexist with Audio/Voice applications on ADSP \
		DSP power manager based on need can partition cache between AUDIO/VOICE and COMPUTE applications for better \
		QoS to avoid DSP L2 cache thrashing between them.	",
	"id":10
}
idx.add(doc)
urls[10]='HAP_power_set_application_type.html'
titles[10]="Application type/Client class (HAP_power_set)"

var doc = {
	"title": "IDL compiler",
	"body": " \
		qaic QAIC s Another IDL Compiler is a command line executable used \
		to implement *remote shared objects* for the Hexagon cDSP Platform via FastRPC \
		[QAIC user s guide] qaic_users_guide.html \
		[QAIC IDL reference] qaic_idl_reference.html	",
	"id":11
}
idx.add(doc)
urls[11]='Tools_IDL%20Compiler.html'
titles[11]="IDL compiler"

var doc = {
	"title": "VTCM Manager",
	"body": " \
		Supported targets \
		SDM845 CDSP SDM710 CDSP QCS605 CDSP SM8150 CDSP SM6150 CDSP QCS405 CDSP \
		Overview \
		VTCM Vector TCM of 256 Kilo Bytes is available on supported targets with CDSP HVX scatter and gather instructions added in v65 architecture operate on memory from VTCM VTCM Manager exposes APIs to allocate free and \
		query availability of VTCM using the following header file \
		Hexagon SDK /incs/HAP_vtcm_mgr.h . \
		HAP_request_VTCM \
		API to request VTCM memory of desired size and single page requirement. \
		+ + + \
		API void/* **HAP_request_VTCM** unsigned int **size** unsigned int **single_page_flag** \
		+ + + \
		Return Returns a void pointer to the allocated memory region on success Returns 0 on failure \
		+ + + + \
		Parameters **size** Size of the request in bytes \
		if **single_page_flag** 0 The size will be aligned to 4KB \
		if **single_page_flag** 1 The size will be aligned to the closest \
		possible page size i.e 4KB / 16KB / 64KB / 256KB \
		+ + + + \
		**single_page_flag** single page requirement for this allocation \
		1 for single page requests 0 otherwise \
		Single page requests are mandatory for scatter/gather operations \
		as they require to be contained within a single page of memory \
		The memory region used by scatter/gather instructions must \
		reside in VTCM and cannot cross a page boundary \
		+ + + + \
		HAP_release_VTCM \
		API to release a successful request for VTCM memory by providing the pointer to the previously allocated VTCM block. \
		+ + + \
		API int **HAP_release_VTCM** void/* **pVA** \
		+ + + \
		Return Returns 0 on success Non zero for failures \
		+ + + + \
		Parameters **pVA** pointer returned by the corresponding VTCM request call \
		+ + + + \
		Example \
		.ccode \
		// Request for a single page of 4000 bytes \
		void *pVTCM HAP_request_VTCM 4000 1 \
		if 0 ! pVTCM \
		// Allocation is successful Try a release \
		int result HAP_release_VTCM pVTCM \
		if 0 result \
		//Release successful \
		HAP_query_avail_VTCM \
		API to query VTCM allocation status. \
		+ + + \
		API int **HAP_query_avail_VTCM** unsigned int/* **avail_block_size** unsigned int/* **max_page_size** unsigned int/* **num_pages** \
		+ + + \
		Return Returns 0 for success and non zero for failures \
		+ + + + \
		Parameters **avail_block_size** Pointer to an unsigned int variable \
		On success return 0 if **avail_block_size** is non zero the memory location will contain \
		maximum continguous memory chunk in bytes available in VTCM \
		+ + + \
		**max_page_size** Pointer to an unsigned int variable \
		On success return 0 if **max_page_size** is non zero the memory location will contain \
		maximum possible page size allocation in bytes in available portion of VTCM \
		+ + + \
		**num_pages** Pointer to an unsigned int variable \
		On success return 0 if **num_pages** is non zero the memory location will contain \
		number of **max_page_size** blocks available in VTCM \
		+ + + + \
		Example \
		.ccode \
		unsigned int avail_block_size max_page_size num_pages \
		if 0 HAP_query_avail_VTCM &avail_block_size &max_page_size &num_pages \
		/* Query successful. \
		* Use avail_block_size max_page_size num_pages */ \
		HAP_query_total_VTCM \
		API to query VTCM size defined on target. \
		+ + + \
		API int **HAP_query_total_VTCM** unsigned int/* **page_size** unsigned int/* **page_count** \
		+ + + \
		Return Returns 0 for success and non zero for failures \
		+ + + + \
		**page_size** Pointer to an unsigned int variable \
		On success return 0 if **page_size** is non zero the memory location will \
		contain maximum possible page size in bytes allocation in VTCM \
		+ + + \
		**page_count** Pointer to an unsigned int variable \
		On success return 0 if **page_count** is non zero the memory location will \
		contain number of **page_size** blocks in VTCM \
		+ + + + \
		Example \
		.ccode \
		unsigned int page_size page_count \
		if 0 HAP_query_total_VTCM &page_size &page_count \
		/* Query successful. \
		* For SDM845/SDM670 CDSP \
		* page_size will be 256 * 1024. \
		* page_count will be 1. \
		* VTCM memory defined for this chipset 256 KB */ \
		unsigned int total_vtcm page_size * page_count \
		HAP_request_async_VTCM \
		API to request VTCM memory of desired size and single page requirement with a timeout option This API can be used to \
		wait till the provided time out for the request to be fulfilled The calling thread will be suspended till \
		the requested VTCM memory is available or till the timeout which ever happens first. \
		**NOTE ** \
		Possibility of a dead lock when calling this API in below scenario \
		The same thread holding a part of or entire VTCM memory prior to this call. \
		**This API is not supported from SecurePD and CPZ processes** \
		+ + + \
		API void/* **HAP_request_async_VTCM** unsigned int **size** \
		unsigned int **single_page_flag** \
		unsigned int **timeout_us** \
		+ + + \
		Return Returns a void pointer to the allocated memory region on success Returns 0 on failure \
		+ + + + \
		Parameters **size** Size of the request in bytes \
		if **single_page_flag** 0 The size will be aligned to 4KB \
		if **single_page_flag** 1 The size will be aligned to the closest \
		possible page size i.e 4KB / 16KB / 64KB / 256KB \
		+ + + + \
		**single_page_flag** single page requirement for this allocation \
		1 for single page requests 0 otherwise \
		Single page requests are mandatory for scatter/gather operations \
		as they require to be contained within a single page of memory \
		The memory region used by scatter/gather instructions must \
		reside in VTCM and cannot cross a page boundary \
		+ + + \
		**timeout_us** Timeout in micro seconds \
		If the request is readily available return success with a void \
		pointer If request cannot be served waits for the available \
		VTCM memory till the provided timeout or returns failure on \
		timeout \
		Value should be greater than 200 micro seconds for the timeout \
		implementation to work treated as **HAP_request_VTCM** \
		otherwise \
		+ + + + \
		Example \
		.ccode \
		/* Request for a single page of 256 * 1024 bytes with \
		* timeout set to 5 milli seconds */ \
		void *pVTCM HAP_request_async_VTCM 256 * 1024 1 5000 \
		if 0 ! pVTCM \
		// Allocation is successful Try a release \
		int result HAP_release_VTCM pVTCM \
		if 0 result \
		//Release successful \
		Usage \
		Example 1 \
		.ccode \
		/* Supported page sizes 4KB 16KB 64KB 256KB 1MB 4MB 16MB. \
		* \
		* Query for the VTCM defined for this chipset and try allocate \
		* all of VTCM possible under single page */ \
		unsigned int page_size page_count \
		if 0 ! HAP_query_total_VTCM &page_size &page_count \
		/* Query failed return */ \
		return \
		/* Query successful. \
		* For SDM845/SDM670 CDSP \
		* page_size will be 256 * 1024. \
		* page_count will be 1. \
		* VTCM memory defined for this chipset 256 KB */ \
		void *pVTCM HAP_request_VTCM page_size 1 \
		if 0 ! pVTCM \
		/* Allocation is successful \
		* Use VTCM */ \
		. \
		/* Done using VTCM release */ \
		HAP_release_VTCM pVTCM \
		else \
		/* page_size page is not available. \
		* Try a query to get the availability of VTCM */ \
		unsigned int avail_block_size max_page_size num_pages \
		if 0 HAP_query_avail_VTCM &avail_block_size &max_page_size &num_pages \
		/* Query successful. \
		* Read avail_block_size max_page_size num_pages */ \
		FARF ALWAYS Maximum single page allocation possible in VTCM in bytes %d number of such pages available %d max_page_size num_pages \
		FARF ALWAYS Maximum allocation possible in VTCM in bytes %d avail_block_size \
		if 0 max_page_size \
		/* 256KB page is not available This is the maximum memory size \
		* possible to be allocated as a single page */ \
		pVTCM HAP_request_VTCM max_page_size 1 \
		if 0 ! pVTCM \
		/* Allocation is successful. \
		* Allocation size is max_page_size bytes */ \
		. \
		/* Release VTCM allocation once done */ \
		HAP_release_VTCM pVTCM \
		Example 2 \
		.ccode \
		/* Try a 8000 bytes single page VTCM request */ \
		void *pVTCM HAP_request_VTCM 8000 1 \
		if 0 ! pVTCM \
		/* Allocation is successful. \
		* The nearest possible page for a 8000 bytes request \
		* is 16KB 16 * 1024 bytes VTCM manager would have \
		* allocated a 16KB memory section for this allocation */ \
		. \
		/* Release VTCM once done */ \
		HAP_release_VTCM pVTCM \
		else \
		/* A single page for 8000 bytes allocation failed. \
		* Query to check availability */ \
		unsigned int avail_block_size max_page_size num_pages \
		if 0 HAP_query_avail_VTCM &avail_block_size &max_page_size &num_pages \
		/* Query successful. \
		* Check maximum allocation possible in VTCM */ \
		FARF ALWAYS Maximum single page allocation possible in VTCM in bytes %d number of such pages available %d max_page_size num_pages \
		FARF ALWAYS Maximum allocation possible in VTCM in bytes %d avail_block_size \
		if 8000 max_page_size && 8000 avail_block_size \
		/* 8000 bytes can t be allocated in a single page but can be allocated \
		* without the single page requirement will be aligned to nearest 4KB multiple i.e 8192 bytes */ \
		pVTCM HAP_request_VTCM 8000 0 \
		if 0 ! pVTCM \
		/* Allocation is successful. \
		* Use Allocated block of VTCM */ \
		. \
		/* Once done release VTCM block */ \
		HAP_release_VTCM pVTCM	",
	"id":12
}
idx.add(doc)
urls[12]='VTCM%20Manager.html'
titles[12]="VTCM Manager"

var doc = {
	"title": "﻿Editors",
	"body": " \
		Overview \
		The Hexagon IDE includes editors which are specifically designed for editing the following kinds of code \
		Hexagon assembly language \
		Interface Definition Language IDL \
		Application programming interface API \
		These editors support language specific features which make coding faster and more efficient \
		**Syntax highlighting** Display keywords comments and preprocessor constructs in distinctive colors \
		**Syntax checking** Perform syntax checking in the editor itself on each file open or save \
		**Editing options** Auto format code use short cuts for adding or removing blocks or single line comments \
		**Mark occurrences** Highlight all occurrences of a search item \
		In addition to these features the editors support the standard Eclipse editor features \
		undo/redo copy/paste etc. . \
		Assembly language editor \
		The assembly language editor supports the following features \
		Syntax highlighting \
		Content assist \
		Code formatting \
		Syntax checking \
		Auto indent and auto complete \
		Mark occurrences \
		Miscellaneous \
		.lua \
		return E.left E.img src images/editors_asm_window.png \
		**Syntax highlighting** \
		Highlighting displays the various syntax elements of Hexagon assembly language in different colors The \
		colors used are configurable through preference settings Assembly Editor Syntax Coloring . \
		**Content assist** \
		Content assist provides automatic completion by displaying possible alternatives on the screen as \
		you type in assembly language instructions For example if you type the text R0 ADD the editor \
		will display all the possible syntax options for the Hexagon ADD instruction You can then choose one \
		of the displayed options to complete the instruction. \
		Whenever you type in the editor the option display automatically appears This can be disabled \
		through preference settings Assembly Editor Content Assist . \
		The option display can be displayed in the editor at any time by pressing Ctrl Space . \
		**Code formatting** \
		Code formatting automatically formats the assembly code as you type it Code formatting can be enabled \
		by pressing Ctrl F The formatting can be configured through preference \
		settings Assembly Editor Code Formatting . \
		**Syntax checking** \
		Syntax checking automatically checks the assembly code syntax whenever a file is saved in the \
		editor If any errors are found the erroneous text is marked in the edit window. \
		NOTE Syntax checking is performed by the Hexagon GNU G++ compiler. \
		NOTE Syntax checking does not work if the compiler is not present in the system path \
		checking does not work or if the file is not in the IDE workspace. \
		**Auto indent and auto complete** \
		Auto indent automatically indents code as it is typed based on various code formatting \
		options Whenever you type a paired symbol e.g. a quote or left bracket auto complete \
		automatically inserts the corresponding closing symbol into the text. \
		**Mark occurrences** \
		If you select a text string in the edit window the mark occurrences feature automatically \
		highlights all the other occurrences of that string in the file. \
		If the selected string is a register all occurrences of that register are highlighted in color Different colors are used to indicate whether the register is being read or written. \
		If the selected string is a register all occurrences of register pairs that contain the selected register are additionally highlighted. \
		If the selected string is a register pair all occurrences of registers that are contained in the selected register pair are additionally highlighted. \
		**Miscellaneous** \
		The assembly language editor supports additional features such as toggle comments Ctrl / and \
		add/remove block comments Ctrl+Shift+/ Ctrl+Shift+/ . \
		**Configuration** \
		The assembly language editor features are configurable through the preference settings \
		Window Preferences Hexagon Assembly Editor . \
		IDL editor \
		The Interface Definition Language IDL editor supports the following features \
		Syntax highlighting \
		Code formatting \
		Syntax checking \
		Mark occurrences \
		Miscellaneous \
		.lua \
		return E.left E.img src images/editors_idl_window.png \
		**Syntax highlighting** \
		Highlighting displays the various syntax elements of IDL code in different colors The colors used are \
		configurable through preference settings IDL Editor Syntax Coloring . \
		**Code formatting** \
		Code formatting automatically formats the IDL code as you type it Code formatting can be \
		enabled by pressing Ctrl F The formatting can be configured through preference \
		settings IDL Editor Code Formatting . \
		**Syntax checking** \
		Syntax checking automatically checks the IDL code syntax whenever a file is saved in the \
		editor If any errors are found the erroneous text is marked in the edit window. \
		NOTE Syntax checking is performed by the qaic compiler. \
		NOTE Syntax checking does not work if the compiler is not present in the system path checking \
		does not work or if the file is not in the IDE workspace. \
		**Mark occurrences** \
		If you select a text string in the edit window the mark occurrences feature automatically \
		highlights all the other occurrences of that string in the file. \
		**Miscellaneous** \
		The IDL editor supports additional features such as toggle comments Ctrl / and add/remove \
		block comments Ctrl+Shift+/ Ctrl+Shift+/ . \
		**Configuration** \
		The IDL editor features are configurable through the preference settings \
		Window Preferences Hexagon IDL Editor . \
		API editor \
		The application programming interface API editor is mainly used to convert the parameters of an API function to IDL format This is useful for cases where the API parameters are more complex than what is supported by IDL The conversion automates the normally tedious task of reducing such parameters to IDL. \
		The API editor supports the following features \
		Add new API \
		Modify existing API \
		Remove API \
		Search for an existing API function \
		Convert API function parameters to IDL format \
		**Launch editor** \
		The API editor operates on header files with the suffix .api . \
		To open an existing header file right click on the file. \
		To create a new header file right click on the project in Project Explorer and choose New File Name the new file with the .api suffix. \
		The editor then appears with the specified header file. \
		.lua \
		return E.left E.img src images/editors_api_window.png \
		NOTE Changes made in the API editor must be explicitly saved with File Save or Ctrl S . \
		**Search for existing API** \
		The List Of Available APIs pane lists all the API functions defined in the current header file. \
		To search for specific API functions in the header file type one or more search strings into the Type to filter field The pane is automatically updated to display only those APIs whose names contain the specified search strings. \
		.lua \
		return E.left E.img src images/editors_api_window_search.png \
		**Add new API** \
		To add a new API function in the current header file click on the Add new API button and enter the required values into the input fields under the Selected API label. \
		Use the Next and Previous buttons to quickly navigate through the input fields. \
		**Modify existing API** \
		To edit an existing API function in the current header file select the API name in the List Of Available APIs panel and update the values in the input fields under the Selected API label. \
		**Remove API** \
		To delete an existing API function from the current header file select the API name in the List Of Available APIs panel and click on the Remove API button. \
		**Convert API parameters to IDL** \
		To convert the parameters of an API to IDL format select the API name in the List Of Available APIs panel and click on the Generate button. \
		The conversion inputs the parameters associated with the API each with a name and data type and outputs the following files \
		IDL file \
		Interface C file \
		Skel file \
		This is useful for cases where the parameters of an API function are more complex than the IDL convention of simply passing a buffer and buffer size The conversion automates the normally tedious task of reducing such parameters to IDL. \
		NOTE Any changes made to an API in the editor will not be reflected in the IDL files until the Generate button is clicked. \
		NOTE All IDL files are generated inside the project.	",
	"id":13
}
idx.add(doc)
urls[13]='eclipse_editors.html'
titles[13]="﻿Editors"

var doc = {
	"title": "Build environment",
	"body": " \
		Overview \
		Make.d is a GNU Make library which allows developers to write descriptions \
		of *what* their build produces rather than *how* to produce it By \
		removing the how developers can render multiple build variants using \
		the same declarative descriptions. \
		The make.d system can be used to build libraries shared objects etc from \
		the command line using the GNU make utility. \
		Make.d is located in the tools/make.d and its extensions are located in the \
		tools/make.d.ext directory. \
		The make utility requires a makefile which contains definitions and rules. \
		The makefile is created by the developer and resides in the directory with the \
		source code A makefile that is used with make.d typically includes two make.d \
		files make.d/defines.min and make.d/rules.min and defines a number of \
		variables that identify the targets and the source files libraries etc. \
		required to build the targets Makefiles used with make.d are simplified \
		because make.d defines the rules that specify how targets are built Make.d \
		also defines the variables that are used to identify the targets and the \
		required files. \
		When you run the make command you can specify the following on the command line \
		A variant which specifies the target platform Hexagon Windows etc. . \
		The make.d system defines a number of variants See \
		[[Variants]]. \
		A goal which specifies which of the targets in the makefile will be built. \
		This reference provides information on using make.d to create makefiles \
		that use the variables goals variants and rules defined by make.d. \
		Make.d increases productivity \
		Make.d improves developer productivity by allowing developer to use their \
		preferred toolchain without sacrificing software quality Binaries produced \
		by Make.d are *functionally consistent* across build variants Make.d s build \
		rules carefully manage the subtle differences between toolchains to ensure the \
		resulting product functions identically regardless of which build variant \
		is chosen A developer can troubleshoot bugs with the Visual Studio \
		debugger make fixes and test locally and then recompile for the ARM \
		architecture and expect the target device to function identically. \
		Make.d improves software quality \
		Make.d users use *qualification tests* Q tests to ensure functional \
		consistency at build time For example a Make.d user might build \
		both a static library and Q test executable The Q test links in the \
		library and runs tests to ensure it works as expected When the \
		user runs Make the static library is built then the Q test is \
		built and immediately executed If any of its tests fail the Q test \
		returns non zero which halts the build and informs the user of the \
		failure. \
		With Q tests Make.d users can verify that not only does their code work \
		but it works consistently across build variants In the case of target \
		builds Make.d will run Q tests locally on the configured simulator. \
		Make.d Dependencies \
		The make.d system requires Gnu On Windows for more information see [Dependencies] \
		Dependencies_Common.html . \
		The make.d system requires Gnu make On Linux. \
		Variants \
		When you run a make command you can specify a variant on the command line to \
		build the targets for a specific platform The variant is specified on the \
		command line as follows \
		make V variant \
		The variant is made up of three parts \
		TARGET _FLAVOR _OPTION \
		TARGET specifies the processor target Mandatory \
		FLAVOR specifies the amount of debug information Mandatory \
		OPTION specifies any build options Optional \
		Supported TARGET s \
		hexagon Hexagon DSP \
		android 32 bit Android on target \
		aarch64 64 bit Android on target \
		UbuntuARM Ubuntu Linux on target \
		WinNT Windows 7 \
		Linux Ubuntu Linux on host \
		Supported FLAVOR s \
		Debug full debug info including diagnostic messages \
		Release no Debug info no diagnostic messages \
		ReleaseG debug symbols only no diagnostic messages \
		Supported OPTION s \
		dynamic build products support dynamic loading Specifying this option will \
		build shared objects .so and all libraries will be built to be \
		compatible with dynamic options and should not be linked with \
		static images. \
		vX specifies the Hexagon processor architecture Possible values are \
		v4 v5 the default being v5. \
		architecture is v5. \
		toolvXX specifies the Hexagon tool chain version Possible values are \
		toolv50. \
		Example hexagon_Debug full debug info includes diagnostic messages \
		Example hexagon_Debug_dynamic dynamic full debug info includes \
		diagnostic messages \
		Example hexagon_Debug_dynamic_toolv82_v65 dynamic modules full debug info includes \
		diagnostic messages v65 architecture using toolset 8.2 \
		Building a make.d project \
		For Windows \
		Before calling make be sure that the Hexagon SDK environment is set [Setup Instructions] readme.html \
		Navigate to the specific example directory you want to \
		build and issue the command \
		make tree \
		Issuing the make command without tree will just build the example and not \
		its dependencies This is OK if the dependencies have already been built but \
		in general its a good idea to always build the tree If you attempt to build \
		and example without tree and the dependencies have not been built you will see \
		errors complaining about not being able to find headers/libraries Rebuild \
		using make tree. \
		A simple make command specifies the variant as follows \
		make V variant \
		This command builds all targets of this makefile. \
		The following command builds all dependencies and then targets of this makefile. \
		make V variant tree \
		For example to build a makefile and all its dependencies using the Hexagon \
		debug variant which supports building dynamic shared objects \
		make tree V hexagon_Debug_dynamic_toolv82_v65 \
		If the variant is not specified the default variant is built. \
		To off load to a specific DSP in case multiple DSP support is available xDSP_FLAG 1 can be specified during the build of HLOS variants For example to off load to CDSP \
		make V android_Debug CDSP_FLAG 1 \
		The make system bundled with the Hexagon SDK is mostly quiet and outputs very \
		little information unless a problem is encountered To increase the amount of \
		information displayed add VERBOSE 1 to the make command as follows \
		make tree VERBOSE 1 \
		The result of a successful build will be a library created in the specific \
		example s variant sub folder For example when building calculator \
		with variant hexagon_Debug_dynamic_toolv82_v65 the following library will be created \
		SDK root /examples/common/calculator/hexagon_Debug_dynamic_toolv82_v65/calculator.so \
		Recommended processor/tools combinations \
		+ + + + + \
		Hexagon Version Example Targets Recommended Build variant appended to \
		Tools Version hexagon_Release_ or hexagon_Debug_ \
		for building simulation executables \
		and hexagon_Release_dynamic_ or \
		hexagon_Debug_dynamic_ for building \
		shared libraries for target HW \
		+ + + + + \
		V60 MSM8996 8.3.x toolv83_v60 \
		+ + + + + \
		V62 MSM8998 8.3.x toolv83_v62 \
		+ + + + + \
		V60 cDSP SDM660 8.3.x toolv83_v60 \
		+ + + + + \
		V65 cDSP SDM845 8.3.x toolv83_v65 \
		+ + + + + \
		The make.d directory \
		The /tools/make.d directory contains the .min files for make.d which contain \
		the common rules and definitions for the make.d system. \
		The make.d directory contains the following \
		defines.min \
		This file contains the standard defines used in the make.d system. \
		defines_ compiler .min \
		These files contain the compiler specific \
		definitions such as compiler and linker flags tool paths target extension \
		names and other compiler definitions. \
		V_ variant .min \
		Each variant file specifies the target flavor and \
		architecture flags for that variant. \
		rules.min \
		This is the primary rules file It contains general rules on how \
		to process source files into target files. \
		Build goals \
		A goal used in the make command specifies which of the targets in the makefile \
		will be built. \
		Goals are defined in the rules.min file There are several categories of goals \
		that are supported by the make.d system \
		Note The current variant is specified by the variable V If the variant is not \
		specified on the command line the default variant is specified in the project s \
		glue/lastv.min file. \
		Target goals \
		Target goals specify the source files and dependencies required to build that \
		target If no variant is specified the targets apply to the current variant V. \
		The make.d system defines the following target goals \
		all \
		Build the libs exes imgs oks and dlls defined in this makefile. \
		If a variant is not specified the default variant is used. \
		clean \
		Attempt to clean targets that have been built by removing the object \
		directories for the current variant. \
		tree \
		Builds the current project and all it s dependencies. \
		tree_clean \
		Clean the current project and all it s dependencies. \
		libs \
		Build the libraries defined in this makefile. \
		dlls \
		Build the dlls defined in this makefile. \
		exes \
		Build the Windows executables defined in this makefile. \
		imgs \
		Build the binary images for example .elf format defined in this makefile. \
		oks \
		Build and run the QEXE targets The QEXE executables are compiled \
		and run during the make process frequently used for build time tests . \
		If no target is specified make.d will build the libs exes imgs oks and dlls \
		defined in this makefile only not it s dependencies. \
		Packaging goals \
		These goals package an installation into an archive ZIP file The make.d \
		system defines the following packaging goals \
		zips \
		Create zip packages. \
		zips_clean \
		Remove zip packages. \
		Diagnostic and information goals \
		Diagnostic and information goals can be used for debugging makefile problems. \
		The make.d system defines the following diagnostic and information goals \
		echo \
		Report the set of items which can be built by the all target which can be \
		used to identify the items built by a makefile. \
		echo_xxx \
		Report the value of variable xxx This can be used to display most build \
		variables. \
		help \
		List the supported variants. \
		build_srcs \
		List all source files for this build. \
		q_srcs \
		List all sources for quick executables in this build. \
		Makefiles \
		Each makefile should include the following make.d files \
		defines.min at the beginning of the makefile. \
		rules.min at the end of the makefile. \
		A makefile typically contains rules for one or more libraries shared objects \
		images or executables A makefile can also contain variables that define \
		the source files and resources required for each target as well as the \
		directories to search for include files. \
		The following hexagon version of the makefile for calculator which is included \
		in the examples. \
		This builds the skel \
		BUILD_LIBS + libcalculator_skel \
		. \
		only build the shared object if dynamic option specified in V \
		ifeq 1 $ V_dynamic \
		BUILD_DLLS libcalculator_skel \
		endif \
		. \
		libcalculator_skel_C_SRCS $V/calculator_skel \
		libcalculator_skel_QAICIDLS inc/calculator \
		. \
		This builds the actual implementation \
		libcalculator_skel.C_SRCS src/calculator_imp.c \
		. \
		specify final build products in this case the module s header file and \
		its associated libraries and shared objects \
		BUILD_COPIES / \
		$ DLLS / \
		$ LIBS / \
		$ SHIP_DIR / \
		Defining build targets \
		The first step when creating a makefile using the make.d rules is to \
		identify all of the items which are to be built by this makefile. \
		As an enhancement over standard make files the make system has rules to \
		generate and use a dependency tree for each source file This saves having \
		to list each include dependency for each source file Since the make rules \
		also map an object file to a source file in most cases it is sufficient to \
		specify only the object file in the list of dependencies The source file \
		dependency generation tool for C and C++ is called cdep. \
		VPATH and vpath are used to add search paths for the object to source mapping \
		rules For more information on VPATH see the GNU make manual. \
		Build target variables \
		The following variables can be used in a makefile to define build targets \
		BUILD_LIBS \
		Specifies the names of libraries to build The make system assumes that \
		additional variables exist that are based on the library names such as \
		targetName _OBJS and targetName _C_SRCS For example if BUILD_LIBS lib1 \
		lib2 then the variables lib1_OBJS and lib2_OBJS are expected to hold the \
		list of objects used to build the respective libraries. \
		BUILD_EXES \
		Specifies the set of executable targets. \
		BUILD_QEXES \
		Specifies the list of quick executables These files are executed after \
		they have been built and are often used for unit testing what was just built. \
		QEXE_ARGS \
		Specifies the list of arguments to the user program. \
		QEXE_SIM_OPTIONS \
		Specifies the list of arguments to the hexagon simulator. \
		PRIMORDIAL_STACK_SIZE \
		Specifies the value to override the default 16k user thread stack size \
		BUILD_DLLS \
		Specifies the set of shared objects to build These may be Hexagon .so \
		Windows .dll Android/Ubuntu .so etc shared objects. \
		BUILD_IMGS \
		Specifies the list of images to build. \
		BUILD_ZIPS \
		Specifies the set of ZIP files to be created Use target _ZIP_SPEC to \
		specify the files that are \
		placed into each ZIP file. \
		Variables common across all targets \
		. \
		CC_FLAGS \
		Used to specify compiler flags for all C objects Compiler flags may be compiler specific this variable may need to be set conditionally. \
		CXX_FLAGS \
		Used to specify additional compiler flags for all C++ objects Compiler flags may be compiler specific this variable may need to be set conditionally. \
		Target specific variables \
		. \
		The target specific variables allow you to change definitions for a specific \
		target For example objectName _CC can be used to redefine the tool used \
		to compile objectName . \
		targetName _C_SRCS \
		Specifies a list of .c source files required to build this target Do not \
		specify the .c extension. \
		targetName .C_SRCS \
		Specifies a list of C sources files required to build this target You must \
		specify the file s extension. \
		targetName _CPP_SRCS \
		Specifies a list of CPP source files required to build this target Do not \
		specify the .cpp extension. \
		targetName .CPP_SRCS \
		Specifies a list of CPP sources files required to build this target You must \
		specify the file s extension. \
		targetName _CXX_SRCS \
		Specifies a list of CXX source files required to build this target Do not \
		specify the .cxx extension. \
		targetName .CXX_SRCS \
		Specifies a list of CXX sources files required to build this target You must \
		specify the file s extension. \
		targetName _ASM_SRCS \
		Specifies a list of ASM source files required to build this target Do not \
		specify the .s extension. \
		targetName .ASM_SRCS \
		Specifies a list of ASM sources files required to build this target You must \
		specify the file s extension This is useful when you need to distinguish \
		between ASM sources that use the extension .s vs .S \
		targetName _INSTALL_DIR \
		Specifies a directory name to append to the associated install dir For \
		example if targetName is a LIB and targetName _INSTALL_DIR oem then \
		targetName is installed in $ LIB_INSTALL_DIR /oem This works for LIBS \
		EXES and DLLS. \
		targetName _LIBS \
		Specifies a list of libraries to link with this target When a variable \
		lib _DIR is defined for any of these libraries the make system will recurse \
		to that directory to update the library dependency. \
		libname _DIR \
		Similar to targetName _LIBS. \
		targetName _DATA \
		Specifies a list of data files associated with the targetName . \
		targetName _DLLS \
		Specifies a list of shared objects from which symbols will be imported \
		similar to IMPLIB . \
		targetName _RCS \
		Specifies a list of resource RES files. \
		targetName _LD_FLAGS \
		Used to specify additional linker flags for a specifc shared object \
		or executable target Linker flags may be compiler specific this \
		variable may need to be set conditionally. \
		objectName _CC_FLAGS \
		Used to specify additional compiler flags for a specifc C \
		object Compiler flags may be compiler specific this variable may \
		need to be set conditionally. \
		objectName _CXX_FLAGS \
		Used to specify additional compiler flags for a specifc C++ \
		object Compiler flags may be compiler specific this variable may \
		need to be set conditionally. \
		targetName _DEFS \
		Specifies DLL specific DEF files. \
		targetName _ZIP_SPEC \
		Specifies the files to include in the ZIP file Paths should be specified \
		relative to targetName _ZIP_SRCHROOT Wildcards are supported for \
		directories and files. \
		targetName _ZIP_SRCHROOT \
		Specifies the base path for files listed in targetName _ZIP_SPEC Paths in \
		the ZIP file are relative to this base. \
		targetName _QAICIDLS \
		Specifies the IDL files to be compiled into C/C++ prior to building the \
		target Targets should add the stub or skel sources to their list of C \
		sources. \
		targetName _QAICIDLS idl \
		targetName _C_SRCS+ $V/ interface _stub \
		or \
		targetName _QAICIDLS idl \
		targetName _C_SRCS+ $V/ interface _skel \
		Typically only the stub or the skel is built into a single target. \
		objectName _CC \
		Used to change the default tool used to compile this C object. \
		objectName _CXX \
		Used to change the default tool used to compile this CPP or CXX object. \
		objectName _INCDIRS \
		Specifies additional include paths to use for objectName . \
		objectName _DEFINES \
		Specifies additional defines that are added when building objectName . \
		Note objectname _DEFINES + DMYDEFINE1 –DMYDEFINE2 should not be used instead \
		objectname _DEFINES + MYDEFINE1 MYDEFINE2 should be used D will be picked up by default. \
		objectName _UNDEFINES \
		Removes the specified defines when building objectName . \
		DEFINES \
		Specifies define names passed to the compiler Always append to this \
		variable when adding defines When possible use the alternate \
		objectname _DEFINES. \
		Note DEFINES + DMYDEFINE1 –DMYDEFINE2 should not be used instead \
		DEFINES + MYDEFINE1 MYDEFINE2 should be used D will be picked up by default. \
		INCDIRS \
		Specifies additional include paths that are passed to the compiler Always \
		append to this variable when adding include paths When possible use the \
		alternate objectname _INCDIRS. \
		LIBDIRS \
		Specifies the paths to search for libraries DLLS and import \
		libraries Always append to this variable when adding paths. \
		Here is a simple snippet that shows how to run both qurt and standalone simulator in the same project. \
		Qurt based simulator test \
		BUILD_QEXES + qurt_test \
		qurt_test_C_SRCS + src_app/qurt_test \
		qurt_test_OSTYPE QURT \
		qurt_test_PRIMORDIAL_STACK_SIZE 0x6000 \
		qurt_test_QEXE_ARGS foobar \
		qurt_test_QEXE_SIM_OPTIONS dsp_clock 1000 ahb lowaddr 0xc0000000 ahb highaddr 0xc0ffffff \
		Standalone based simulator test \
		BUILD_QEXES + standalone_test \
		standalone_test_C_SRCS + src_app/standalone_test \
		standalone_test_QEXE_ARGS foobar \
		standalone_test_QEXE_SIM_OPTIONS dsp_clock 1000 ahb lowaddr 0xc0000000 ahb highaddr 0xc0ffffff \
		Customizing build rules \
		It is sometimes necessary to define custom build rules For example when a \
		single file needs a custom compile option or there is a generator tool which \
		generates a known extension These rules can be added to the makefile after \
		the include $ RULES_MIN line. \
		For example \
		$ OBJ_DIR /example.c example.bin \
		bin2src.exe s$ subst / // $ dfs /example.bin o$@ \
		Make.d BUILD_COPIES \
		BUILD_COPIES may be used to copy both pre existing or generated files This is \
		useful when creating a ship directory which contains the output of the build \
		that will be used by either another project or intended to be shipped. \
		BUILD_COPIES holds a list of delimited copy specs Copy specs come in two \
		forms \
		1 two file names \
		2 zero or more file names \
		Followed by a directory name ending in / . \
		srcFile destFile \
		.srcFile destDir/ \
		For example \
		BUILD_COPIES + inc/myfoo.h ship/inc/foo.h \
		BUILD_COPIES + src/foo.h $V/foo$ OBJ_EXT ship/ \
		The calculator makefile contains the following BUILD_COPIES definition \
		BUILD_COPIES / \
		$ DLLS / \
		$ LIBS / \
		$ SHIP_DIR / \
		Which copies all the generated DLLs and all the generated libs to the SHIP_DIR. \
		SHIP_DIR \
		The ship directory can be overridden to be any directory on the file system. \
		For example in the makefile set the ship directory like so \
		SHIP_DIR $ V /ship \
		Common issues \
		This topic describes common makefile issues and their resolutions. \
		Recursive variables \
		Recursive variable __updirs references itself \
		The full text of this error is Makefile 11 *** Recursive variable __updirs \
		references itself eventually Stop. \
		This error indicates that an older version of make is being invoked Verify the \
		version of make you are using is at least 3.81 with the command \
		make version If not install a newer version of make You may need to \
		update cygwin to cygwin 1.5.24. \
		Target Patern contains no % \
		target pattern contains no % . \
		This error is typically found in the dependency files generated by cdep GNU \
		make doesn t handle drive letters in make rules since the colon after the \
		letter looks like a dependency rule itself For example make interprets the \
		following \
		c /mypath/inc/header.h headerb.h \
		as c depends on /mypath/inc/header.h and then chokes on the second \
		The first time make compiles a file it generates the .dep and then compiles \
		the file On subsequent invocations make includes the .dep file generated \
		previously to add the dependency rules and rebuilds the file if necessary. \
		This means that the error only occurs on the second attempt to compile the file. \
		No such file or directory \
		no such file or directory \
		For example \
		/bin/sh /Vc7/bin/cl.exe No such file or directory \
		This occurs when the variable which defines the path to a tool \
		such as a compiler is not defined. \
		In most cases make.d can determine the correct path from the environment \
		variable s set up by the tool at installation. \
		Cannot create short name \
		cygpath cannot create short name of xxxx \
		For example \
		cygpath cannot create short name of C /Progra~1/Qualcomm \
		. \
		Usage cygpath d m u w t TYPE [ f FILE] [OPTION] NAME . \
		. \
		cygpath [ c HANDLE] \
		. \
		cygpath [ ADHPSW] \
		File access denied \
		File Access Privileges access denied \
		This problem can occur when using cygwin After using make.d to install files \
		the user may receive an access denied error when trying to copy or access \
		the installed files. \
		This is due to Cygwin s inability to map unix style permissions to Windows ACLs. \
		To resolve this add the line to the cygwin/etc/fstab file. \
		none /cygdrive cygdrive binary noacl posix 0 user 0 0 \
		If modifying fstab does not work configuring cygwin with the NONTSEC setting \
		may resolve this problem The setting can be applied by setting the \
		environment variable for CYGWIN as follows \
		set CYGWIN NONTSEC \
		Glossary \
		cdep \
		Dependency generation tool \
		ELF \
		Executable and Linking File. \
		goal \
		A goal used in the make command specifies which of the targets in the makefile \
		will be built. \
		quick executable \
		A quick executable or qexe is compiled and run during the make process. \
		variant \
		A variant can be specified in the make command and indicates the target \
		platform such as Windows or Hexagon.	",
	"id":14
}
idx.add(doc)
urls[14]='Environments_Build%20System.html'
titles[14]="Build environment"

var doc = {
	"title": "On Target Profiling Services",
	"body": " \
		Overview \
		This page covers on target profiling utilities enabled by SysMon service running on ADSP CDSP and SDSP. \
		sysMon DSP Profiler \
		sysMon DSP Profiler is an Android UI application for profiling ADSP/CDSP/SDSP work loads Based on the chipset we have 2 variants \
		Version 1 \
		For the chipsets 8952 8976 8937 8953 8996 8998 and the latest chipsets with ADSP use [sysMon DSP Profiler Version 1] sysMon_DSP_Profiler.html Click [here] sysMon_DSP_Profiler.html to know more on this. \
		Version 2 \
		For the chipsets 8998 SDM660 SDM630 SDM710 SDM845 QCS605 SM8150 use [sysMon DSP Profiler Version 2] sysMon_DSP_Profiler_V2.html Click [here] sysMon_DSP_Profiler_V2.html to know more on this. \
		sysMonApp Android Executable \
		Apart from sysMon DSP Profiler user can also use the sysMonApp android executable from the cmd prompt using adb shell to profile desired DSP subsystem. \
		To know more about the services that are supported by the executable click [here] sysMonApp.html . \
		sysMon Markers \
		SysMon Markers is a framework to enable user profile a piece of code or an algorithm of interest using it s APIs. \
		Click [here] SysMonMarker.html to know more about this framework. \
		Hexagon Trace Analyzer \
		Hexagon Trace Analyzer Tool is a Software trace analysis tool It processes Hexagon ETM Embedded Trace Macrocell traces generated by the software running on the Compute DSP and derives the flow of each thread of the processor It is a valuable tool for giving insights into code execution and allows in depth analysis and optimization. \
		To know more on hexagon trace analyzer click [here] hexagon_trace_analyzer_doc.html	",
	"id":15
}
idx.add(doc)
urls[15]='Tools_On%20Target%20Profiling.html'
titles[15]="On Target Profiling Services"

var doc = {
	"title": "sysMon Markers",
	"body": " \
		Overview \
		This feature provides a framework to allow profiling piece of code or algorithm to study its \
		load on processor bus bandwidth metrics and various other profiling metrics useful in measuring \
		performance debugging performance related issues and in identifying possible optimizations \
		instead of profiling the entire text section. \
		sysMon Marker APIs \
		sysMon markers has two APIs which user need to use them while profiling the desired piece of code. \
		HP_profile MarkerID 1 This API is used to enable the marker When this API gets hit \
		a profile packet related to this marker starts tracing MarkerID \
		can be any unsigned integer. \
		HP_profile MarkerID 0 This API is used to disable the marker When this API gets hit \
		a profile packet which has started tracing the required profile \
		data at the time of enabling is pushed as part of profile packet. \
		MarkerID used to enable the marker based profiling should be same while disabling the profiling. \
		Using sysMon Markers \
		User need to compile the Q6 build by declaring the sysMon markers enable and disable APIs Below is the \
		snippet of the same \
		include sysmon_marker.h \
		or \
		extern HP_profile uint_32 MarkerID boolean enable \
		HP_profile 10 1 \
		User code to profile . \
		. \
		. \
		. \
		HP_profile 10 0 \
		After compiling the build successfully the Q6 image needs to be flashed onto the target. \
		Collecting the sysMon marker data \
		sysMon marker data will be collected by the sysmon profiler API only in user mode defaultSetEnable set to \
		0 DCVS is disabled in this user mode by default If DCVS is explicitly enabled by user the decisions taken \
		by DCVS with markers enabled may not be the same as without markers. \
		Execute the testcase which will pass through the piece of code that user is interested to profile Follow the \
		sysMonApp profiler service explained under the sysMonApp and execute the profiler cmd. \
		Cmd to exeute the profiler with markers \
		adb shell /data/sysMonApp profiler defaultSetEnable 0 q6 adsp/cdsp \
		This will collect the bin file which needs to be parsed. \
		User can go though the sections Stats collection and Post processing in the below link provided. \
		Use [Hexagon Profiler Version 2] sysMon_DSP_Profiler_V2.html Click [here] sysMon_DSP_Profiler_V2.html to know more on this. \
		This will explain how to collect the profiler bin file and postprocess the same. \
		Summary sheet with Marker data \
		Below is the data that is shown in the post processed summary sheet of the marker metrics along with the Overall summary metrics. \
		A set of profiling statistics is shown in Summary for each markerID makerID is 10 in this case The Avg data shown \
		for each metric is the Accumulated Metric data collected at the markerID/Over all time . \
		.lua \
		return E.left E.img src images/markersummary.png \
		PostProcessed sheet with Marker data \
		In PostProcessed data marker data along with the post processed profiling metrics are shown for every markerID In the PostProcessed \
		data the column markerID shows the user provided ID which is 10 in this case The row corresponding to each non zero markerID \
		shows the instantaneous profiling statistics for the marked portion executed between start and end of the marker identified with the markerID The SysClock Ticks \
		Time ms in the post processed sheet is time taken by the portion that is placed in between the marker start and end. \
		The instantaneous profiling metrics captured in this sheet for each markerID enabled sample is calculated using Metric data collected at the markerID/Time \
		that marked portion spent equation. \
		.lua \
		return E.left E.img src images/markerrawdata.png \
		Limitations \
		Nested markers are not supported As shown below \
		extern HP_profile uint_32 MarkerID boolean enable \
		HP_profile 10 1 \
		User code to profile . \
		. \
		HP_profile 11 1 \
		HP_profile 11 0 \
		. \
		HP_profile 10 0 \
		Any other entities running in parallel with the piece of code where markers are defined their profile \
		stats also gets captured. \
		.lua \
		return E.left E.img src images/MarkerEg.png \
		Profile window contains the colored profile stats of HWT0 and HWT1 though the markers are initiated by HWT0.	",
	"id":16
}
idx.add(doc)
urls[16]='SysMonMarker.html'
titles[16]="sysMon Markers"

var doc = {
	"title": "adsp_ps",
	"body": " \
		Overview \
		adsp_ps is an android application that allows the caller to query the ADSP for \
		a list of running FastRPC processes. \
		Setup \
		The SDK ships adsp_ps as an android application. \
		The adsp_ps android executable can be found at \
		For Windows \
		sdk root /libs/common/adsp_ps/ship/android_Release/ship \
		For Linux \
		sdk root /libs/common/adsp_ps/ship/android_Release/ship \
		Run below script to install adsp_ps on the device. \
		python HEXAGON_SDK_ROOT /scripts/install_adsp_ps.py \
		Usage Examples \
		adb shell /vendor/bin/adsp_ps 0 to show the processes Running on ADSP. \
		adb shell /vendor/bin/adsp_ps 3 to show the processes Running on CDSP. \
		sdm845 /vendor/bin ./adsp_ps 3 \
		FastRPC process list \
		. \
		***************************************************************************** \
		ASID HLOS PID HLOS Process Name DSP Process Name \
		***************************************************************************** \
		8 999 vppservice vppservice \
		7 4676 adsp_ps adsp_ps \
		. \
		*****************************************************************************	",
	"id":17
}
idx.add(doc)
urls[17]='adsp_ps.html'
titles[17]="adsp_ps"

var doc = {
	"title": "Asynchronous DSP Message Queue",
	"body": " \
		Introduction \
		This document describes the new asynchronous message queue library introduced in \
		Hexagon SDK 3.3.1 The queue codebase works on SDM845 and later attempting to \
		use it on earlier devices will fail from missing symbols. \
		The queue is designed to provide a utility library for asynchronous \
		communication between the application CPU and DSP Typically the CPU \
		communicates with the DSP using FastRPC and the SDK contains a number of \
		examples on how to use FastRPC FastRPC can have relatively high latency and is \
		by design synchronous Applications that use synchronous FastRPC calls can \
		suffer from long idle times while waiting for calls to complete the DSP is \
		effectively idle while the RPC messages are passed between the CPU and the DSP. \
		An asynchronous communication approach resolves this by letting the CPU queue \
		up multiple requests without waiting for the DSP to complete This can help \
		decouple throughput from latency Even if there are delays in communicating \
		between the two processors the DSP can continue to process requests from its \
		input queue without waiting for the CPU to make new RPC calls. \
		The asynchronous message queue library also lets the client manage its own \
		buffer management and cache maintenance This can make sophisticated clients \
		more efficient since they can avoid unnecessary map/unmap operations and defer \
		cache maintenance operations to a point when they re truly necessary. \
		The downside of using the message queue library is that it is just that A \
		method to asynchronously send opaque messages between the DSP and the CPU The \
		client must marshal its own messages to byte arrays manage buffer mappings and \
		handle cache maintenance and maintain separate queues for requests and \
		responses if necessary. \
		Note that the queue library does not replace FastRPC Clients must still use \
		FastRPC to load and initialize their DSP side library and map buffers to the \
		DSP The queue also uses FastRPC internally for signaling. \
		Message Queue Library \
		The asynchronous message queue is included in the Hexagon SDK as asyncdspq . \
		The queue has a number of key properties and features \
		* Asynchronous Read and write operations are asynchronous and communication \
		with the other endpoint is done in parallel \
		* In order The queue is ordered messages are delivered to the other endpoint \
		in the same order they are written in \
		Asynchronous DSP Message Queue Application Note Introduction \
		* Userspace The queue is implemented as a userspace library and does not \
		require system level changes on SDM845 or later It uses FastRPC internally \
		to communicate between the DSP and the application CPU. \
		* Simple messages Messages are arrays of bytes without any further structure. \
		Use Cases \
		Using the message queue can be more complex than simply making FastRPC calls to \
		the DSP so all developers must consider whether their application benefits \
		from switching to an asynchronous communication model before using the queue. \
		Each application is different but there are a number of use cases that can \
		benefit from asynchronous messaging \
		* Multiple operations on the same data e.g processing different regions of \
		the same image \
		* Multi step operations with intermediate data that stays on the DSP such as \
		sequences of image processing filters \
		* Executing neural networks processing one layer at a time \
		* Queueing multiple images on the DSP for image processing \
		Generally the asynchronous queue model benefits applications that can queue \
		multiple requests to the DSP before expecting results back keeping the DSP \
		busy even if there are delays on the application CPU. \
		Use cases that may not show benefits include \
		* Latency sensitive control The queue model does not improve worst case \
		latency. \
		* Single shot image/video processing algorithms Sending just one request to \
		the DSP and waiting for a response with the queue is not any more efficient \
		than using FastRPC directly. \
		* Fundamentally synchronous applications If the application needs the results \
		from each operation back on the CPU before it can issue the next request it \
		will not be able to maintain a queue of tasks for the DSP to process. \
		Getting Started \
		The best way to get started with the asynchronous message queue is probably the \
		asyncdspq_sample example Build it run it on target hardware and start following \
		the call sequences from fcvqueuetest.c For more information see \
		[[Image Processing Queue]] \
		API \
		This section documents the message queue API For detailed function definitions \
		see the header file asyncdspq.h All API functions return an error code with \
		zero AEE_SUCCESS representing success. \
		Data Types \
		asyncdspq_endpoint_t \
		Identifies the queue endpoint \
		+ + + \
		Value Description \
		+ + + \
		ASYNCDSPQ_ENDPOINT_APP_CPU Main application CPU \
		+ + + \
		ASYNCDSPQ_ENDPOINT_CDSP Compute DSP or the ADSP used for compute workloads \
		+ + + \
		Callback Functions \
		asyncdspq_callback_t \
		void asyncdspq_callback asyncdspq_t queue void *context \
		Data/space available callback The callback signals there is a new message \
		available to read or more space available in the queue depending on where it is \
		used. \
		Note that a read/write operation can still fail or block after the callback is \
		received there may not be enough space for the given message or another \
		thread may have consumed the message already Clients must be prepared to \
		handle a AEE_NOMORE response or be prepared to block There may also be more \
		than one message available or space for multiple messages in the queue. \
		Clients are expected to drain all the messages from the queue after each \
		callback and should not wait for a new callback until the queue is completely \
		empty or full. \
		+ + + \
		Parameter Description \
		+ + + \
		queue The queue this callback refers to \
		+ + + \
		context Callback context from asyncdspq_create /asyncdspq_attach \
		+ + + \
		asyncdspq_error_callback_t \
		void asyncdspq_error_callback asyncdspq_t queue void *context AEEResult error \
		Error callback Called from different thread contexts. \
		+ + + \
		Parameter Description \
		+ + + \
		queue The queue this callback refers to \
		+ + + \
		context Callback context from asyncdspq_create /asyncdspq_attach \
		+ + + \
		error Error code \
		+ + + \
		Main API Functions \
		asyncdspq_create \
		AEEResult asyncdspq_create asyncdspq_t *queue \
		asyncdspq_attach_handle_t *attach_handle \
		asyncdspq_endpoint_t writer \
		asyncdspq_endpoint_t reader \
		unsigned queue_length \
		asyncdspq_error_callback_t error_callback \
		asyncdspq_callback_t message_callback \
		asyncdspq_callback_t space_callback \
		void *callback_context \
		uint32_t flags \
		Creates a new queue allocating the queue and creating threads as necessary Queues can currently be created on the application CPU only Valid writer/reader endpoint combinations are CPU/CDSP and CDSP/CPU. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Output Queue handle \
		+ + + \
		attach_handle Output Queue handle used with asyncdspq_attach at the other endpoint \
		+ + + \
		writer Queue writer endpoint See asyncdspq_endpoint_t \
		+ + + \
		reader Queue reader endpoint See asyncdspq_endpoint_t \
		+ + + \
		queue_length Queue length in bytes Must be a multiple of 4 and a minimum of 256 bytes \
		+ + + \
		error_callback Error callback Called from different thread contexts \
		+ + + \
		message_callback Message callback or NULL Called when there is new data available in the message queue Called from a message handler thread contexts \
		+ + + \
		space_callback Queue space available callback or NULL Called when there is more space available in the queue to write data Called from a message \
		handler thread context \
		+ + + \
		callback_context Context pointer passed to callbacks \
		+ + + \
		flags Queue creation flags 0 for default configuration \
		+ + + \
		asyncdspq_destroy \
		AEEResult asyncdspq_destroy asyncdspq_t queue \
		Destroys a queue Deallocates queue memory and terminates threads Must be called from the same processor where the queue was created The other endpoint must detach from the queue before it is destroyed. \
		There must be no outstanding blocking read or write requests in progress when this function is called Clients can use asyncdspq_cancel to cancel requests before destroying the queue. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Output Queue handle from asyncdspq_create \
		+ + + \
		asyncdspq_attach \
		AEEResult asyncdspq_attach asyncdspq_t *queue \
		asyncdspq_attach_handle_t attach_handle \
		asyncdspq_error_callback_t error_callback \
		asyncdspq_callback_t message_callback \
		asyncdspq_callback_t space_callback \
		void *callback_context \
		Attachs to a queue created at the other endpoint. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Output Queue handle \
		+ + + \
		attach_handle Output Queue handle used with asyncdspq_attach at the other endpoint \
		+ + + \
		error_callback Error callback Called from different thread contexts \
		+ + + \
		message_callback Message callback or NULL Called when there is new data available in the message queue Called from a message handler thread contexts \
		+ + + \
		space_callback Queue space available callback or NULL Called when there is more space available in the queue to write data Called from a message \
		handler thread context \
		+ + + \
		callback_context Context pointer passed to callbacks \
		+ + + \
		asyncdspq_detach \
		AEEResult asyncdspq_detach asyncdspq_t queue \
		Detach from a queue the reverse of asyncdspq_attach Must be called before the other endpoint destroys the queue There must be no outstanding blocking read or write requests in progress when this function is called Clients can use asyncdspq_cancel to cancel requests before detaching from the queue. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Queue handle from asyncdspq_create or asyncdspq_attach \
		+ + + \
		asyncdspq_write \
		AEEResult asyncdspq_write asyncdspq_t queue const uint8_t *msg unsigned length \
		Writes a message to the queue Blocks if there is no space in the queue This function can only be called at the writer endpoint of the queue This function must not be called from a asyncdspq \
		+ + + \
		Parameter Description \
		+ + + \
		queue Queue handle from asyncdspq_create or asyncdspq_attach \
		+ + + \
		msg Pointer to the message Must be 32 bit aligned This function will copy the data to the queue and the buffer can be rewritten once this function returns \
		+ + + \
		length Message length in bytes Must be a multiple of 4 \
		+ + + \
		Common error codes \
		* AEE_EEXPIRED The request was cancelled \
		* AEE_EBUFFERTOOSMALL The queue is too small to fit the message even if empty \
		* AEE_EUNSUPPORTED The queue has a space available callback set \
		asyncdspq_write_noblock \
		AEEResult asyncdspq_write_noblock asyncdspq_t queue const uint8_t *msg unsigned length \
		Writes a message to the queue Non blocking fails with AEE_ENOMORE if there is no space in the queue This function can only be called at the writer endpoint of the queue. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Queue handle from asyncdspq_create or asyncdspq_attach \
		+ + + \
		msg Pointer to the message Must be 32 bit aligned This function will copy the data to the queue and the buffer can be rewritten once this function returns \
		+ + + \
		length Message length in bytes Must be a multiple of 4 \
		+ + + \
		Common error codes \
		* AEE_ENOMORE If there isn t enough space in the queue \
		* AEE_EBUFFERTOOSMALL The queue is too small to fit the message even if empty \
		asyncdspq_read \
		AEEResult asyncdspq_read asyncdspq_t queue uint8_t *buf unsigned buf_length unsigned *msg_length \
		Reads a message from the queue Blocks if there is no message available This function can only be called from the reader endpoint of the queue This function must not be called from a asyncdspq callback and cannot be used if a message callback has been set. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Queue handle from asyncdspq_create or asyncdspq_attach \
		+ + + \
		buf Pointer to the message buffer Must be 32 bit aligned \
		+ + + \
		buf_length Buffer length in bytes Must be a multiple of 4 \
		+ + + \
		msg_length Output Message length in bytes \
		+ + + \
		Common error codes \
		* AEE_ENOMEMORY The buffer is too small for the next message \
		* AEE_EEXPIRED The request was cancelled. \
		* AEE_EUNSUPPORTED The queue has a message callback set \
		asyncdspq_read_noblock \
		AEEResult asyncdspq_read_noblock asyncdspq_t queue \
		uint8_t *buf \
		unsigned buf_length \
		unsigned *msg_length \
		Reads a message from the queue Non blocking returns AEE_ENOMORE if the queue is empty This function can only be called from the reader endpoint of the queue. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Queue handle from asyncdspq_create or asyncdspq_attach \
		+ + + \
		buf Pointer to the message buffer Must be 32 bit aligned \
		+ + + \
		buf_length Buffer length in bytes Must be a multiple of 4 \
		+ + + \
		msg_length Output Message length in bytes \
		+ + + \
		Common error codes \
		* AEE_ENOMEMORY The buffer is too small for the next message \
		* AEE_ENOMORE There is no message currently in the queue \
		asyncdspq_cancel \
		AEEResult asyncdspq_cancel asyncdspq_t queue \
		Starts canceling any outstanding synchronous read or write requests at this queue endpoint This function can be used to cancel requests before destroying the queue or detaching from it This function will only cancel requests from the current endpoint calling it on the application CPU will only cancel application CPU requests. \
		**Note that this function will not wait for all requests to be canceled** but will rather return immediately after the cancel request has been sent The client must wait for requests to complete typically by joining any read/write threads relatedto the queue. \
		Also note that detaching the queue on the DSP side will effectively cancel any outstanding read/write requests on the application CPU. \
		+ + + \
		Parameter Description \
		+ + + \
		queue Queue handle from asyncdspq_create or asyncdspq_attach \
		+ + + \
		Usage Model Polling vs Blocking \
		The queue can be used in two different mode Polling or blocking. \
		* Polling reader Set a message callback in \
		asyncdspq_create /asyncdspq_attach use \
		non blocking asyncdspq_read_noblock in the callback The callback must \
		drain all messages from the queue by calling asyncdspq_read_noblock \
		repeatedly until it returns AEE_ENOMORE . \
		* Polling writer Set a space available callback in \
		asyncdspq_create /asyncdspq_attach use non blocking \
		asyncdspq_write_noblock in the callback This is not a common \
		configuration. \
		* Blocking reader Do not set a message callback Use a blocking \
		asyncdspq_read call to wait for and read a message typically in a \
		different thread. \
		* Blocking writer Do not set a space available callback Use a blocking \
		asyncdspq_write call This a common configuration and often creating a \
		separate thread is not necessary. \
		Most clients are best off using non blocking reads with message callbacks and \
		blocking writes This works well for scenarios where the application CPU \
		offloads tasks to the DSP and the DSP is typically the slow part blocking \
		writes cause the CPU to wait for the DSP while it is busy and the queue is full \
		and responses coming back from the DSP typically do not block since the CPU is \
		able to drain the queue fast enough The fcvqueue example demonstrates this. \
		Call Flows \
		Initialization \
		.lua \
		return E.center E.img src images/asyncdspq_initialize.png \
		The above shows a typical message queue initialization sequence The client \
		creates the queue on the application CPU passes the attach handle to its DSP \
		side and attaches to the queue on the DSP Note that the client needs to use \
		FastRPC to communicate with its DSP side for initialization purposes the \
		queue library does not completely replace FastRPC. \
		Each queue is unidirectional Clients that send requests to the DSP and require \
		responses back must either create two queues or use another mechanism for \
		responses. \
		Unitialization \
		.lua \
		return E.center E.img src images/asyncdspq_teardown.png \
		The above illustrates message queue uninitialization The client must detach \
		the queue on the DSP side first before destroying it on the application CPU. \
		Simpe Messages \
		.lua \
		return E.center E.img src images/asyncdspq_message.png \
		The above shows how a CPU client send messages to the DSP using synchronous \
		writes and a message callback a DSP client can similarly send messages to the \
		CPU Two important features to note \
		* The writer can continue to write more messages to the queue before the reader \
		has received any Eventually the queue will fill up and the write operations \
		will block or fail. \
		* When the reader receives a message callback it must call read_noblock \
		repeatedly until it returns AEE_ENOMORE to indicate the queue is empty The \
		client may not get a separate callback for each message. \
		Example Projects \
		Basic Messaging \
		The queuetest example application contains a number of basic message queue \
		tests and examples In all cases the application CPU sends two integers to the \
		DSP the DSP adds them together and delivers a result back. \
		The following tests are located in the function test_asyncdspq . \
		Simple Messages \
		The first two tests send a single message from the application CPU to the DSP \
		and vice versa The basic sequence is as follows \
		The application CPU creates a queue with asyncdspq_create \
		For read tests the CPU writes a message to the queue with asyncdspq_write \
		The CPU passes the queue attach handle from asyncdspq_create to the DSP \
		over a regular FastRPC call \
		The DSP attaches to the queue with asyncdspq_attach \
		The DSP either reads the message from the queue or writes one \
		The DSP detaches from the queue with asyncdspq_detach \
		The application CPU verifies the result \
		The application CPU destroys the queue with asyncdspq_destroy \
		Note that both tests use only a single queue and use other mechanisms to \
		verify the response This is a valid configuration and can be useful for some \
		clients that mostly only send messages in one direction. \
		The third tests simply sends multiple messages from the DSP to the application \
		CPU. \
		Tests with Multiple Queues \
		The following tests in test_asyncdspq send messages between the CPU and the \
		DSP using multiple queues both using blocking read/write operations and using \
		callbacks. \
		Canceling Operations \
		The tests in test_asyncdspq_cancel test canceling synchronous read/write \
		operations under different circumstances Many clients may not need to use \
		asyncdspq_cancel if they have another mechanism to ensure queues are \
		empty before destroying them typically this is done by sending an explicit \
		close message and waiting for a response. \
		Threading \
		test_asyncdspq_threads tests different threading scenarios The message \
		queue library is designed to be thread safe for read and write operations but \
		queues should be created and destroyed from the same thread Most clients will \
		use a single thread for reading and writing the queue either from their own \
		thread or callbacks from the queue library. \
		Image Processing Queue \
		The fcvqueue example implements a queue of image processing operations using \
		FastCV It illustrates a more complex message queue use case and also shows how \
		to handle buffer allocation memory mapping and cache management The threading \
		and callback model is typical for most message queue clients fcvqueue uses \
		blocking writes and non blocking reads with message callbacks. \
		The fcvqueue example is split between three main files \
		* fcvqueue.c Application CPU side library The rest of this section refers \
		primarily to functions in this file \
		* fcvqueue_dsp_imp.c DSP side implementation for the example Contains FastRPC \
		methods called from fcvqueue.c and message queue client code \
		* fcvqueuetest.c Test application Start here to follow calling sequences. \
		This section briefly describes the key parts of the example For more details \
		refer to the source code starting with the test application. \
		Note that fcvqueue is not thread safe and while the code checks for errors \
		codes from all the functions it calls it does not attempt to recover from \
		errors The queue library generally does not return recoverable errors except \
		where separately noted errors result from either programming errors or running \
		out of system resources such as memory. \
		Initialization and Uninitialization \
		fcvqueue_create allocates internal structures and creates two queues one \
		for requests and one for responses and calls the DSP side implementation to \
		attach to them. \
		fcvqueue_destroy ensures the queues are empty cancels any operations on the \
		DSP side and detaches and destroys queues. \
		Memory Allocation and Deallocation \
		fcvqueue_alloc_buffer allocates shareable ION buffers using the rpcmem \
		library and sends them to the DSP to be mapped FastRPC handles mapping the \
		buffer to the DSP s SMMU and internal MMU as long as the DSP code keeps a \
		mapping open with HAP_mmap the buffers won t be unmapped. \
		Subsequent operations on the buffer refer to it by its file descriptor FD . \
		The DSP side code maintains a mapping of FDs to buffer addresses This avoids \
		having to map/unmap buffers for each operation but also requires explicit cache \
		maintenance operations. \
		fcvqueue_free_buffer is the reverse of allocation It unmaps buffers from the \
		DSP releasing FastRPC MMU/SMMU mappings and deallocates the memory. \
		Synchronization \
		Most fcvqueue operations apart from initialization and memory allocation are \
		asynchronous The client queues requests which are processed by the DSP \
		asynchronously without immediate feedback To determine that processing has \
		reached a specific point the client queue a synchronization request. \
		fcvqueue_enqueue_sync sends a synchronization request to the DSP The DSP \
		simply responds to the request with the same token when the application CPU \
		receives the response it calls a callback function This informs the client \
		that all operations through the synchronization request have been completed. \
		fcvqueue_sync is a synchronous variant of the same request It simply calls \
		fcvqueue_enqueue_sync and waits for a callback before returning Once \
		fcvqueue_sync returns both the request and response queues are empty. \
		Cache Maintenance \
		In addition to memory mapping FastRPC also handles cache maintenance on its \
		clients behalf Message queue clients must handle this explicitly which can \
		be more complex but also gives the client an opportunity to determine when to \
		manage the cache. \
		The fcvqueue example exposes cache maintenance through two operations \
		fcvqueue_enqueue_buffer_in and fcvqueue_enqueue_buffer_out \
		corresponding to cache invalidate and flush After a buffer is allocated it is \
		considered to be in application CPU ownership and the CPU can place input data \
		in the buffer. \
		Before the DSP can use the buffer it must be transferred to DSP ownership with \
		fcvqueue_enqueue_buffer_in This invalidates the buffer on the DSP side to \
		ensure there is no stale data in DSP caches While the buffer is in DSP \
		ownership the application CPU must not access it. \
		To make a buffer and its contents available to the application CPU again the \
		client must call fcvqueue_enqueue_buffer_out This flushes DSP caches to \
		ensure all data is written back to memory and is available to the CPU Since \
		this is an asynchronous operation the client must synchronize with the queue \
		before accessing the buffer. \
		Note that the fcvqueue implementation does not perform cache maintenance \
		operations on the application CPU side but rather assumes buffers are cache \
		coherent SDM845 supports one way cache coherency with the Compute DSP and \
		buffers are allocated as coherent by default to use non coherent buffers the \
		client must perform cache maintenance on the application CPU too. \
		Image Processing Operations \
		fcvqueue exposes four simple image processing operations Copy 3x3 Dilate \
		3x3 Gaussian Blur and 3x3 Median Filter The copy operation is implemented as \
		a simple memcpy while the other operations use the FastCV library. \
		fcvqueue_enqueue_op enqueues an image processing operation Both input and \
		output buffers must be in DSP ownership i.e the client must first request \
		cache invalidation with fcvqueue_enqueue_buffer_in Since fcvqueue does not \
		automatically perform cache maintenance the output will not be available to the \
		application CPU before the client calls fcvqueue_enqueue_buffer_out and waits \
		for its completion. \
		There is no need to perform cache maintenance operations on temporary buffers \
		if the output of one operation is just used as the input of another one on the \
		DSP the buffers can stay local to the DSP This is a common pattern for many \
		use cases including chains of image processing filters or per layer neural \
		network processing. \
		Basic Usage Sequence \
		A basic fcvqueue sequence consists of 8 steps \
		Initialize fcvqueue_create See [[Initialization and Uninitialization]] \
		Allocate and map buffers fcvqueue_alloc_buffer fcvqueue_buffer_ptr . \
		See [[Memory Allocation and Deallocation]] \
		Place input data in input buffers \
		Cache maintenance move buffers to DSP ownership fcvqueue_enqueue_buffer_in . \
		See [[Cache Maintenance]] \
		Use the buffers for image processing operations fcvqueue_enqueue_op See \
		[[Image Processing Operations]] \
		Cache maintenance to get output data back to the CPU \
		fcvqueue_enqueue_buffer_out See [[Cache Maintenance]] \
		Use output data \
		Uninitialization \
		fcvqueuetest.c illustrates several scenarios with additional documentation. \
		Performance \
		fcvqueuetest.c contains a couple of simple performance benchmarks They help \
		illustrate when using the asynchronous message queue is beneficial over simple \
		FastRPC calls A single synchronous operation dilate is faster as a FastRPC \
		call but the queue shows benefit when the client can enqueue multiple \
		operations before synchronizing. \
		Queue Performance \
		The queueperf example illustrates how message queue performance is affected \
		by different queue depths and message sizes Communication overhead grows when \
		the queue can hold fewer messages at the worst case when the queue only fits \
		one message communication becomes synchronous and there is no benefit over \
		using regular FastRPC calls.	",
	"id":18
}
idx.add(doc)
urls[18]='APIs_Async%20Message%20Queue.html'
titles[18]="Asynchronous DSP Message Queue"

var doc = {
	"title": "Working with an SDK Example",
	"body": " \
		Overview of a typical example in the SDK \
		The Hexagon SDK contains examples projects which are intended to serve as \
		templates and starting points for your own projects \
		There are two sets of examples in the SDK \
		/examples Documentation for these examples can be found under the Examples section in the \
		sidebar to the left. \
		/tools/HEXAGON_Tools/8.x.xx/Examples Documentation for these are found in the README file in the respective folders. \
		Contents of an example folder \
		The contents of the examples are organized into the following directories and \
		files \
		example \
		/glue autogenerated build system files that contain project specific build \
		rules dependencies and definitions These files will normally not need \
		modification but if adding new dependencies they will need to be \
		modified by hand. \
		/inc header files that the example wants to make public to other projects \
		/src source and include files local to the example \
		all.mak use to build all variants [./Environments_Build System.html Variants] of the project \
		makefile tells the build system what to build for more information refer \
		[here] ./Environments_Build System.html \
		Cloning an Example \
		All the examples in the Hexagon SDK can be cloned to create a new project. \
		Cloning consists of copying an existing example and renaming it to a new name. \
		This is a good first place to start when developing a new project. \
		To clone a project please run the script \
		Hexagon SDK Dir /tools/scripts/clone_project.py \
		Example to clone the calculator example \
		python ./tools/scripts/clone_project.py ./examples/common/calculator custom_calculator \
		Note \
		Projects that use the Hexagon SDK must remain within the Hexagon SDK tree and \
		cloned projects may only be cloned into the same directory as the original. \
		For example if cloning the calculator example the new cloned calculator example \
		will also reside in /examples/common/ . \
		Building an example in SDK \
		[Building a make.d project] Environments_Build System.html Building a make.d \
		project provides information on how to build the Hexagon SDK examples and how \
		to interpret and modify \
		the makefiles. \
		The Hexagon SDK installer should have setup all the dependencies for you If \
		you encounter issues please see [Dependencies] Dependencies_Common.html . \
		To build a shared object the build variation must have the _dynamic_ option \
		For example \
		make tree V hexagon_Debug_dynamic_toolv82_v65 \
		For more information on build syntax see [Make.d] Environments_Build System.html \
		For more information on the variants to be used you can use the [Feature matrix] feature_matrix.html as guidance. \
		Building Examples Outside of SDK directory \
		SDK examples can be built without any dependancy on SDK directory structure. \
		You can create your example at any location and build by just setting the SDK environment \
		Steps to build your example that is located out of SDK directory \
		cd to Example_Location \
		run SDK_INSTALL_LOCATION /setup_sdk_env script [Setup Instructions] readme.html \
		build example using make tree V variant	",
	"id":19
}
idx.add(doc)
urls[19]='Examples_GeneralOverview.html'
titles[19]="Working with an SDK Example"

var doc = {
	"title": "Hexagon Standard libraries",
	"body": " \
		[Hexagon C Library User Guide] images/Hexagon_Document_Bundle.pdf page 3011 \
		[Hexagon C++ Library User Guide] images/Hexagon_Document_Bundle.pdf page 3369	",
	"id":20
}
idx.add(doc)
urls[20]='hexagon_libraries.html'
titles[20]="Hexagon Standard libraries"

var doc = {
	"title": "FastRPC QoS",
	"body": " \
		Overview \
		FastRPC latency is the time between CPU application making the remote \
		call and beginning of DSP method execution It usually includes lot \
		of uncontrolled overhead like non RT scheduler CPU low power modes \
		interrupts etc FastRPC clients can directly use perflock PM QoS and \
		other methods to control CPU clocks and low power modes Providing a \
		common interface through FastRPC will help clients to maintain target \
		specific data to control latency. \
		remote_handle64_control is an existing fastrpc API exported in the \
		libXdsprpc.so userspace libraries that can be used to control FastRPC \
		latency and this API works across all targets However its usage is \
		restricted to only applications that use the multi domain feature. \
		Recently a new API remote_handle_control was added and this can be \
		used for QoS control even in non multi domain applications These APIs \
		are not available on all targets So if you want your application to \
		have a common code that can work across targets without any errors \
		then you can declare these QoS APIs as weak pragmas. \
		Enabling PM QoS \
		Usage of remote_handle64_control \
		Interface handle has to be acquired first using remote_handle64_open \
		before invoking remote_handle64_control i.e the domain is chosen at \
		run time. \
		.ccode \
		include remote.h \
		pragma weak remote_handle64_control // Declare as weak symbol \
		// Sample function to acquire the handle. \
		// Similar to calculator_multi_domains example from Hexagon SDK \
		remote_handle64 open_domain_handle int domain \
		char *uri \
		remote_handle64 h 1 \
		if domain DOMAIN_ID_ADSP // ADSP is 0 \
		uri fastrpc_tests1_URI &_dom adsp \
		else if domain DOMAIN_ID_CDSP // CDSP is 3 \
		uri fastrpc_tests1_URI &_dom cdsp \
		else if domain DOMAIN_ID_MDSP // MDSP is 1 \
		uri fastrpc_tests1_URI &_dom mdsp \
		else if domain DOMAIN_ID_SDSP // SDSP is 2 \
		ifndef __hexagon__ \
		remote_handle64 fd \
		remote_handle64_open ITRANSPORT_PREFIX attachuserpd&_dom sdsp &fd \
		endif \
		uri fastrpc_tests1_URI &_dom sdsp \
		else \
		printf ERROR unsupported domain %d/n domain \
		return 1 \
		if interface_name_open uri &h // Auto generated multi domain func \
		printf ERROR Failed to open handle for domain %d/n domain \
		return 1 \
		else \
		printf Opened handle 0x%x to domain %d uri %s/n h domain uri \
		return h \
		. \
		Usage of remote_handle_control \
		The libXdsprpc.so you link to your stub in your makefile will determine \
		which domain QoS will be invoked for i.e the domain is chosen at compile \
		time. \
		.ccode \
		include remote.h \
		pragma weak remote_handle_control // Declare it as a weak symbol \
		// Non domains QoS invocation \
		struct remote_rpc_control_latency data \
		data.enable 1 \
		if remote_handle_control // Check if API is available before invoking \
		remote_handle_control DSPRPC_CONTROL_LATENCY void* &data sizeof data \
		else \
		printf remote_handle_control not available on this target \
		// No need to worry about opening and closing the handles \
		. \
		How FastRPC PM QoS works \
		* RPC latency control is disabled by default \
		* RPC control detects active remote calls in 100 ms windows and \
		decides whether to enable or disable low power modes. \
		enable 1 will enable FastRPC driver to auto control low power \
		modes of CPU Currently only CPU power collapse is controlled. \
		If any RPC activity is found – it will vote to disable power \
		collapse \
		If there is no RPC activity for 100ms – then it removes vote \
		to disable power collapse \
		enable 0 will disable auto control of low power modes \
		Limitations \
		* PM Qos Currently only CPU power collapse disabling to reduce \
		latency We have plans is to extend this interface to control \
		other fastrpc parameters in future. \
		Enabling Adaptive QoS \
		From Hana onwards fastrpc will be offering another feature called \
		adaptive QoS whose usage is almost exactly similar to PM QoS and \
		is more power efficient. \
		Using APIs \
		Exactly same as above except simply replace the data.enable field with 2 instead of 1 \
		.ccode \
		// Invoking the fastrpc QoS method \
		struct remote_rpc_control_latency data \
		data.enable 2 \
		. \
		For multi domain apps \
		. \
		.ccode \
		remote_handle64 h open_domain_handle DOMAIN_ID_CDSP \
		remote_handle64_control h DSPRPC_CONTROL_LATENCY void* &data sizeof data \
		. \
		For non multidomain apps \
		.ccode \
		remote_handle_control DSPRPC_CONTROL_LATENCY void* &data sizeof data \
		. \
		Using the adb command line \
		* You need to set the fifth bit of the environment variable. \
		adb root \
		adb shell setprop fastrpc.process.attrs 16 \
		* If you are using Android P build then use this command \
		adb shell setprop vendor.fastrpc.process.attrs 16 \
		How it is more power efficient than PM QoS \
		As explained before PM QoS is a CPU only feature which stops the \
		CPU from going into low power modes Adaptive QoS is a machine \
		learning based smart feature. \
		After every RPC call to the DSP the CPU waits for a response \
		from the DSP and while waiting it may go into low power modes if \
		the DSP processing time is high So when the DSP finally responds \
		there is extra overhead to wake the CPU up thus resulting in \
		higher RPC latencies. \
		If adaptive QoS is enabled then the DSP starts keeping track of \
		the method execution times for that process using Sysmon Once \
		enough data is available the DSP will be able to predict when \
		the method will finish executing and will send a ping to wake \
		the CPU up early and votes via PM QoS to disallow low power modes \
		for a small duration in preparation for DSP method to return. \
		However this time there is the added advantage of the CPU not \
		always running in high power modes as it is being woken up only \
		when required which is why this feature is more power efficient. \
		As an example say the DSP is able to estimate that the average \
		method execution time for a particular process is ~30 ms then \
		it will wake up the CPU out of low power modes at say ~25 ms \
		itself and disallows CPU LPM modes till say ~35ms so that when \
		the method finishes execution and sends a response the CPU \
		will already be up. \
		This method adds a small overhead on DSP for detection and \
		sending ping messages to CPU based on a timer User can profile \
		and measure the benefits of both these QoS features to determine the \
		one suitable for their needs. \
		Enabling diag logging of skel library parameters for profiling \
		To build complete profiling data of how much time each function \
		on the DSP took to execute the DSP also needs to load the \
		symbols of the client app s skel library for which it needs the \
		load address and size of the library For security reasons \
		this feature can be enabled only when fastrpc debug mode is \
		also enabled i.e the user needs to have adb root privileges. \
		Here s how to enable this additional level of logging \
		Using adb command line \
		* You need to set the fifth bit of the environment variable. \
		adb root \
		adb shell setprop fastrpc.process.attrs 17 \
		* If you are using Android P build then use this command \
		adb shell setprop vendor.fastrpc.process.attrs 17 \
		QoS profile data and comparisons \
		* Measured using benchmark example from SDK \
		/vendor/bin/benchmark f conv3x3 w 1024 h 1024 L 500 l 1 p 0 m 0 s q \
		* Build SM8150.LA.1.0.r1 58408 STD.PROD 1 Post CS2 External Release Build \
		* Using secondary boot image CPU perf mode OFF and DSP clock at Turbo \
		+ + + \
		**DSP duration** Average RPC overhead us \
		+ + + + \
		No QoS Adapt QoS PM QoS \
		+ + + + + \
		**11 ms** 1700 591 449 \
		+ + + + + \
		**1.2 ms** 1163 543 431 \
		+ + + + + \
		**100 us** 792 688 435 \
		+ + + + + \
		FastRPC round trip latency with QoS disabled gradually increased \
		from ~700 us to greater than 1 ms same as Napali performance \
		over the last few post CS metabuilds Currently investigating \
		whether this is due to necessary power optimization CPU scheduler \
		changes or can be fixed. \
		Recommendation \
		* Use PM QoS for \
		latency sensitive applications \
		Applications without consistent DSP processing times \
		* And use adapt QoS for \
		Moderately power sensitive applications with a consistent DSP processing time	",
	"id":21
}
idx.add(doc)
urls[21]='FastRPC_QoS.html'
titles[21]="FastRPC QoS"

var doc = {
	"title": "DSP Power and Performance Management",
	"body": " \
		Overview \
		SDK provides APIs to control DSP core and bus clocks based on power and performance needs By default on 8998 and SDM660 every compute session votes for NOMINAL voltage corner and powers on HVX Clients can choose to overwrite this by HAP power APIs below. \
		HAP Power API \
		The HAP power API contains a set of interfaces that allow programmers to adjust the system power usage as per the \
		application s power requirement thereby providing a good balance between power consumption and performance. \
		The API provides two major interfaces \
		HAP_power_set This is used to vote for performance levels on the aDSP \
		HAP_power_get This is used to query the aDSP for current performance levels \
		HAP_power_set can be used to control these parameters on the aDSP \
		aDSP MIPS \
		Bus speed / bandwidth \
		CPU scaling DCVS \
		Application type client class more details on this can be found [here] HAP_power_set_application_type.html \
		L2 cache line locking \
		Hexagon Vector eXtension HVX blocks \
		HAP_power_get can be used to query the aDSP for these parameters \
		Max MIPS supported \
		Max bus speed / bandwidth supported \
		Current Core clock speed \
		Current application type client class \
		Aggregate Mpps used by audio and voice \
		Usage \
		. \
		See sdk_root /inc/HAP_power.h for more information on this API. \
		HAP_power_set This accepts two parameters \
		context Unique identifier \
		request The power request. \
		context is a uniqueue identifier to differentiate the clients used for voting. \
		When a new context is provided a new client is created and any voting requests \
		happen using this client This allows users to create different clients and \
		vote as per their needs with respective clients. \
		Eg Say Computer Vision and Camera are two different clients running in the \
		same user PD on DSP CV can create a new client with a unique identifier and \
		vote for their needs Similarly Camera can also create a new client \
		and vote for their needs. \
		The type in the request is set to one of \
		* HAP_power_set_mips_bw Used to set MIPS and / or bus speed bandwidth . \
		The payload in this case should contain HAP_power_mips_bw_payload. \
		* HAP_power_set_HVX Used to enable / disable power for HVX. \
		The payload in this case should contain HAP_power_hvx_payload. \
		* HAP_power_set_apptype Used to set the application type. \
		The payload in this case should contain HAP_power_app_type_payload. \
		* HAP_power_set_linelock Used to line lock memory in the L2 cache. \
		The payload in this case should contain HAP_power_linelock_payload. \
		* HAP_power_set_DCVS Used to participate / stop participating in DCVS. \
		The payload in this case should contain HAP_power_dcvs_payload. \
		* HAP_power_set_DCVS_v2 Enhanced version of HAP_power_set_DCVS with more options The payload in this case should contain HAP_power_dcvs_v2_payload. \
		NOTE HAP_power_set_DCVS_v2 is supported from only 8998 onwards More details can be found [here] Hap_power_set_dcvs_2.html . \
		Example is provided below for CV. \
		.ccode \
		//Vote \
		/* Populate request structure */ \
		int retVal \
		HAP_power_request_t request \
		memset &request 0 sizeof HAP_power_request_t //Important to clear the structure if only selected fields are updated. \
		request.type HAP_power_set_DCVS_v2 \
		request.dcvs_v2.dcvs_enable TRUE \
		request.dcvs_v2.dcvs_option HAP_DCVS_V2_PERFORMANCE_MODE \
		request.dcvs_v2.set_latency TRUE \
		request.dcvs_v2.latency 1000 \
		request.dcvs_v2.set_dcvs_params TRUE \
		request.dcvs_v2.dcvs_params.min_corner HAP_DCVS_VCORNER_SVS \
		request.dcvs_v2.dcvs_params.max_corner HAP_DCVS_VCORNER_TURBO \
		request.dcvs_v2.dcvs_params.target_corner HAP_DCVS_VCORNER_NOM \
		/* Call HAP_power_set API with the updated request structure */ \
		/* cv is a global variable */ \
		retVal HAP_power_set &cv &request \
		. \
		HAP_power_get This accepts two parameters \
		context This is ignored \
		response The power response. \
		The type in the request is set to one of \
		* HAP_power_get_max_mips Used to query for maximum MIPS supported \
		* HAP_power_get_max_bus_bw Used to query for maximum bus bandwidth supported \
		* HAP_power_get_client_class Used to query for current application type. \
		* HAP_power_get_clk_Freq Used to query for current core clock frequency. \
		* HAP_power_get_aggregateAVSMpps Used to query for aggregate Mpps used by audio and voice.	",
	"id":22
}
idx.add(doc)
urls[22]='DSP%20Power%20%26%20Perf.html'
titles[22]="DSP Power and Performance Management"

var doc = {
	"title": "Remote file system",
	"body": " \
		Overview \
		The Remote File System is used by the loader on the Hexagon DSP to \
		read shared object files The shared object files are stored on \
		the HLOS s file system. \
		Dynamic loading within a FastRPC invocation \
		On these Android builds the remote file system is implicitly \
		implemented by libadsprpc.so \
		It uses the calling processes context to open files \
		The default file system root directory is /vendor/lib/rfsa/adsp \
		The optional environment variable ADSP_LIBRARY_PATH can be used to override \
		the default file system root directory It contains a list of \
		directories to search when dlopen library is called For more \
		information see [[Using ADSP_LIBRARY_PATH ]] \
		Dynamic loading outside of a FastRPC invocation \
		For non rpc started threads calling dlopen from static DSP \
		code a daemon /system/bin/adsprpcd will provide the context for \
		requests back to the Android environment Audio modules are loaded this way. \
		The default file system root on the Application processor is \
		/vendor/lib/rfsa/adsp but it can be configured via the ADSP_LIBRARY_PATH environment \
		variable This means the remote file system s root will be \
		/vendor/lib/rfsa/adsp unless ADSP_LIBRARY_PATH is defined See \
		[[Using ADSP_LIBRARY_PATH]] for more information on how to configure \
		ADSP_LIBRARY_PATH. \
		Follow these steps to setup the Remote File System \
		Check if the driver exists \
		adb shell ls /system/bin/adsprpcd \
		If that file does not exist contact the supplier of the Android Image. \
		Check that the driver is running \
		adb shell ps \
		Look for /system/bin/adsprpcd in the output if found the remote file \
		system is already running and no further action is required \
		If not already running you must start it The following command will not \
		return so it must be started in its own instance of adb. \
		adb root \
		adb wait for device \
		adb remount \
		adb shell chmod 777 /system/bin/adsprpcd \
		adb shell /system/bin/adsprpcd \
		If you are able to recompile the Android build start the adsprpcd \
		daemon automatically add the following lines to the \
		init.target.rc file The init.target.rc file is located in a target \
		specific location device/qcom/msm target /init.target.rc For example \
		for 8974 its located at device/qcom/msm8974/init.target.rc. \
		service adsprpcd /system/bin/adsprpcd \
		class main \
		user media \
		group media \
		. \
		on property sys.boot_completed 1 \
		start adsprpcd \
		Remote File System is now setup. \
		Using ADSP_LIBRARY_PATH \
		ADSP_LIBRARY_PATH is a delimited variable used for specifying \
		search paths for dlopen to use when opening dynamic modules. \
		Default value \
		. \
		When ADSP_LIBRARY_PATH is unset a default value for the module directory is used. \
		This value is specific to the HLOS. \
		* on Android the path is \
		/system/lib/rfsa/adsp /vendor/lib/rfsa/adsp /dsp \
		* on Windows the path is \
		c /Program Files/Qualcomm/RFSA/aDSP \
		Note When you run any HVX example that uses libdspCV_skel.so it is recommended to \
		set ADSP_LIBRAY_PATH to /vendor/lib/rfsa/adsp /system/lib/rfsa/adsp /dsp because sdk \
		walkthrough script pushes libdspCV_skel.so to /vendor/lib/rfsa/adsp On some of \
		SDM820/SDM835 builds libdspCV_skel.so is present in /system/lib/rfsa/adsp and if \
		/vendor/lib/rfsa/adsp is not present in beginning of the ADSP_LIBRARY_PATH old version \
		of libdspCV_skel.so present in /system/lib/rfsa/adsp will be loaded and example tests \
		will fail. \
		Examples \
		unset \
		code on the DSP \
		dlopen libfoo.so \
		will search libfoo.so from the following path in this order \
		/vendor/lib/rfsa/adsp/libfoo.so \
		/system/lib/rfsa/adsp/libfoo.so \
		/dsp \
		single directory only \
		adb shell \
		export ADSP_LIBRARY_PATH foo \
		. \
		code on the DSP \
		dlopen libfoo.so \
		will try to open \
		foo/libfoo.so \
		multiple directories \
		adb shell \
		export ADSP_LIBRARY_PATH foo bar \
		. \
		code on the DSP \
		dlopen libfoo.so \
		will try to open \
		foo/libfoo.so \
		bar/libfoo.so \
		multiple directories and process working directory \
		adb shell \
		export ADSP_LIBRARY_PATH foo bar \
		. \
		code on the DSP \
		dlopen libfoo.so \
		will try to open \
		foo/libfoo.so \
		bar/libfoo.so \
		./libfoo.so \
		multiple directories and process working directory first \
		adb shell \
		export ADSP_LIBRARY_PATH foo bar \
		. \
		code on the DSP \
		dlopen libfoo.so \
		will try to open \
		./libfoo.so \
		foo/libfoo.so \
		bar/libfoo.so \
		paths in file to open \
		adb shell \
		export ADSP_LIBRARY_PATH foo bar \
		. \
		code on the DSP \
		dlopen far/libfoo.so \
		will try to open \
		./far/libfoo.so \
		foo/far/libfoo.so \
		bar/far/libfoo.so	",
	"id":23
}
idx.add(doc)
urls[23]='remote_file_system.html'
titles[23]="Remote file system"

var doc = {
	"title": "SDK Utilities",
	"body": " \
		SDK comes with some utilities that are useful for the user to find information about the DSP on their device and its \
		current state If the user is need of finding the processes running on the DSP at any given point of time [adsp_ps] adsp_ps.html \
		PS Please note these following are only available on ADSP as of now in all the chipsets. \
		Common \
		[adsp_ps] adsp_ps.html \
		Displays the process status of all the processes running on the DSP. \
		[test_profile] profiling_library.html \
		Provides profiling information while running on the hexagon simulator.	",
	"id":24
}
idx.add(doc)
urls[24]='Tools_Utilities.html'
titles[24]="SDK Utilities"

var doc = {
	"title": "﻿Developing your first project",
	"body": " \
		Overview \
		A *project* in the Hexagon IDE is simply a directory which contains all the source files and related files and settings that make up a program Projects are stored in your IDE workspace. \
		This chapter leads you step by step through creating building running and debugging your first Hexagon IDE project. \
		Step 1 – Create new project \
		To create a new project [start the Hexagon IDE] eclipse_starting_eclipse.html . \
		The main IDE window appears \
		.lua \
		return E.left E.img src images/first_proj_default_eclipse_window.png \
		Choose New Hexagon Project from the File menu \
		.lua \
		return E.left E.img src images/first_proj_new_proj_dialog.png \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/first_proj_new_hex_proj_name_dialog.png \
		In the Project name field enter factorial as the name of the new project. \
		NOTE Project names cannot contain spaces – if they do Eclipse will have problems building and executing the project. \
		Project location defaults to the workspace Tools location defaults to the value defined in the system environment variable PATH. \
		You can change either of these fields or use the checkbox to restore the original default. \
		In the Hexagon SDK location field specify the SDK location This field is auto filled if the IDE was launched \
		from the Hexagon SDK. \
		In the Project type drop down list choose Executable .exe . \
		Select Empty Executable as the project type. \
		Select Hexagon LLVM Tool Chain as the project toolchain. \
		Click on the Finish button. \
		The main IDE window now displays a new project named factorial \
		.lua \
		return E.left E.img src images/first_proj_hex_proj_factorial_window.png \
		Step 2 – Create project source code \
		Next add a source file to the project to contain the factorial program code. \
		To do this right click on the project in Project Explorer and choose New Source File . \
		.lua \
		return E.left E.img src images/first_proj_source_file_menu.png \
		A dialog box appears prompting you to create a new source file. \
		Enter the name of the source file factorial.cpp and select the file template Default C++ source template . \
		.lua \
		return E.left E.img src images/first_proj_source_file_dialog.png \
		Click on the Finish button to create the new source file. \
		Next copy the following code or any other factorial implementation you wish to use to the source file factorial.cpp . \
		This code computes the factorial of a number passed to the program as a command line argument. \
		.ccode \
		include stdio.h \
		include stdlib.h \
		int fact int n \
		if n 1 \
		return 1 \
		else \
		return n*fact n 1 \
		int main int argc char *argv[] \
		int num factorial \
		if argc 2 \
		num atoi argv[1] \
		printf User input is %d num \
		else \
		printf Invalid number of arguments \
		return 1 \
		if num 0 \
		printf Invalid input Must be positive \
		return 1 \
		factorial fact num \
		printf /nFactorial of %d is %d num factorial \
		return 0 \
		Step 3 – Build project \
		To build the project right click on the project in Project Explorer and choose Build Project . \
		.lua \
		return E.left E.img src images/first_proj_build_menu.png \
		The status of the build can be viewed in the Console tab at the bottom of the main IDE window. \
		.lua \
		return E.left E.img src images/first_proj_build_console.png \
		Step 4 – Run project \
		To run the project right click on the project in Project Explorer and choose Run As Hexagon C/C++ Application . \
		.lua \
		return E.left E.img src images/first_proj_run_as_menu.png \
		Running the program produces the following output in the console. \
		.lua \
		return E.left E.img src images/first_proj_run_as_console.png \
		Note the message Invalid number of arguments which appears in the console output – the factorial program expects its input value to \
		be specified as a command line argument and generates this error message because no argument was specified. \
		To fix this problem right click on the project in Project Explorer and choose Run As Run Configuration . \
		This command displays the Run Configurations dialog box which enables you to configure the simulator program arguments and runtime environment. \
		.lua \
		return E.left E.img src images/first_proj_run_configs_dialog_main.png \
		The dialog box display tabs for configuring the simulator program arguments and runtime environment. \
		Note that the left hand pane in the dialog box includes a newly created runtime configuration \
		named factorial which appears under the item Hexagon C/C++ Application . \
		To specify the program argument for the factorial program click on the Arguments tab in the dialog box. \
		The factorial program expects one user argument namely the number whose factorial will be computed Enter the value 5 as a program argument. \
		.lua \
		return E.left E.img src images/first_proj_run_configs_dialog_args.png \
		To execute the factorial program with the specified argument click on the Run button at the bottom of the dialog box. \
		The dialog box closes and the following output which includes the factorial output is displayed in the console of the main IDE window. \
		.lua \
		return E.left E.img src images/first_proj_run_console_args.png \
		Step 5 – Debug project \
		To debug the executable generated by the project right click on the project in Project Explorer and choose Debug As Hexagon C/C++ Application . \
		A prompt will appear asking you to Select Preferred Launcher This dialog won t appear if Run was performed previously \
		.lua \
		return E.left E.img src images/select_preffered_launcher.png \
		Click on Use configuration specific settings and then select Standard Create Debug Process Launcher if project tool chain is GNU or if project tool chain is LLVM select Standard Create LLVM Debug Process Launcher \
		A prompt appears asking you to confirm switching to the IDE debug perspective. \
		.lua \
		return E.left E.img src images/first_proj_confirm_switch_dialog.png \
		Click on the Yes button to switch to the debug perspective. \
		The debug perspective enables you to perform debugging operations such as stepping disassembly setting breakpoints viewing/modifying variables and viewing registers. \
		.lua \
		return E.left E.img src images/first_proj_debug_perspective.png \
		For example clicking on the Registers tab of the debug perspective displays the contents of the Hexagon processor registers. \
		.lua \
		return E.left E.img src images/first_proj_debug_perspective_registers.png \
		If any debug related information is not displayed you can display it by choosing Show View from the Window menu. \
		.lua \
		return E.left E.img src images/first_proj_debug_show_view_menu.png \
		NOTE Each Hexagon processor thread has its own set of resources registers memory etc. . \
		If a thread is selected in the Debug tab window the corresponding resources are displayed. \
		To configure the debug environment right click on the project in Project Explorer and choose Debug As Debug configuration . \
		This command displays the Debug Configurations dialog box Using the tabs in this dialog box you can configure the debugger program arguments and runtime environment. \
		.lua \
		return E.left E.img src images/first_proj_debug_configs_dialog.png \
		NOTE This completes the tutorial for developing projects in the Hexagon IDE [Working with Projects] eclipse_projects.html serves \
		as a reference for the content covered in the tutorial.	",
	"id":25
}
idx.add(doc)
urls[25]='eclipse_first_project.html'
titles[25]="﻿Developing your first project"

var doc = {
	"title": "Message logs",
	"body": " \
		Overview \
		The Hexagon SDK provides ability to collect diagnostic messages from the DSP. \
		Read [[FARF]] for information on the recommended framework for sending log messages from the DSP. \
		Read [[printf]] for information on how sending log messages from the DSP via standard printf prototype. \
		Read [[Runtime FARF]] for information on how to enable DSP messages at runtime. \
		READ [[logcat]] for information on how to view DSP messages in logcat. \
		Read [[mini dm]] for information on how to view DSP the messages on \
		the host PC. \
		FARF \
		Diagnostic messages are sent via the FARF API defined in /inc/HAP_farf.h. \
		FARF level msg . \
		Logging is controlled via conditional compilation A FARF level should be \
		defined to 1 for FARF macros to be compiled in For example \
		.ccode \
		define FARF_LOW 1 \
		include HAP_farf.h \
		FARF LOW something happened %s const char* string \
		If FARF_LOW is defined to 0 as it is by default the above FARF string will \
		not be compiled in if it is defined to 1 it will be compiled in Users can \
		also define their own custom levels For example \
		.ccode \
		include HAP_farf.h \
		define FARF_MYTRACE 1 \
		define FARF_MYTRACE_LEVEL HAP_LEVEL_LOW \
		FARF MYTRACE custom trace in file %s on line %d __FILE__ __LINE__ \
		The LEVEL define tells FARF what runtime logging level to use These are \
		mapped to their diag level counterparts in the above example the message will \
		be logged to diag s LOW level. \
		When building the Debug variant or builds defining _DEBUG the \
		following FARF levels will be enabled \
		ALWAYS \
		HIGH \
		ERROR \
		FATAL \
		Note To push the FARF messages to logcat check [[logcat]] column \
		printf \
		printf is enabled on newer targets and it can be used to send diagnostic messages \
		similar to FARF printf is supported in its standard prototype. \
		Any messages sent to STDOUT are considered as FARF_HIGH message Messages sent \
		to STDERR is considered as FARF_ERROR messages and displayed in QXDM. \
		.ccode \
		printf Helloworld!!!/n \
		Runtime FARF \
		Introduction \
		Note Support introduced on Snapdragon 810 targets. \
		Runtime FARF can be used to log messages that are disabled by default and \
		can be enabled at runtime as and when desired Runtime FARF messages have \
		no or significantly low overhead unless enabled. \
		Runtime FARF messages are always compiled in A message can be logged via runtime \
		FARF as below \
		.ccode \
		include HAP_farf.h \
		FARF RUNTIME_LOW Runtime Low FARF message \
		FARF RUNTIME_MEDIUM Runtime Medium FARF message \
		FARF RUNTIME_HIGH Runtime High FARF message \
		FARF RUNTIME_ERROR Runtime Error FARF message \
		FARF RUNTIME_FATAL Runtime Fatal FARF message \
		Just as in regular FARF The LEVEL tells FARF what runtime logging level to use. \
		Runtime FARF messages can be enabled either by \
		[Adding a config file to the HLOS] Enabling%20runtime%20FARF%20via%20config%20file \
		[Programmatically calling an API in HLOS code] Enabling%20runtime%20FARF%20programmatically \
		Enabling runtime FARF via config file \
		The FastRPC Android user library libadsprpc.so watches the folder defined by \
		ADSP_LIBRARY_PATH /vendor system/lib/rfsa/adsp for config files that can be \
		used to enable / disable runtime FARF message. \
		**Config file name** \
		. \
		In order to reference a particular FastRPC process the config file can be \
		named in any one of the following formats \
		rpc_hlos_process_name .farf \
		rpc_hlos_pid .farf \
		rpc_adsp_asid .farf \
		The FastRPC process PID and ASID can be discovered using the [adsp_ps tool] \
		Obtaining%20PID%20and%20ASID%20of%20FastRPC%20processes included with the SDK. \
		For example in order to reference a FastRPC process say farf_runtime_test \
		the corresponding config file can be named \
		farf_runtime_test.farf \
		2.farf Assuming that the ASID of this process is 2 \
		3492.farf Assuming that the PID of this process is 3492 \
		**Contents of the config file** \
		. \
		The contents of the config file are formatted as below \
		hex_mask comma separated filenames optional \
		The mask has one bit for each level \
		0x01 – LOW \
		0x02 – MEDIUM \
		0x04 – HIGH \
		0x08 – ERROR \
		0x10 FATAL \
		For example \
		To enable all levels of runtime messages for all files in the process \
		0x1f \
		To enable all levels of runtime messages for the file farf_runtime_test_adsp.c \
		0x1f farf_runtime_test_adsp.c \
		To enable all levels of runtime messages for the files farf_runtime_test_adsp.c and foo.c \
		0x1f farf_runtime_test_adsp.c foo.c \
		**Enabling at process start up** \
		If you would like to enable runtime FARF messages for a particular FastRPC \
		process at **process startup** place a config file with the name \
		rpc_hlos_process_name .farf in the appropriate folder defined by ADSP_LIBRARY_PATH The FastRPC user library \
		scans for this file before it starts the RPC process It will not look for \
		the other filenames at startup since the PID / ASID are non deterministic \
		Enabling runtime FARF programmatically \
		You can enable runtime FARF programmatically by calling the method \
		.ccode \
		int HAP_setFARFRuntimeLoggingParams unsigned int mask const char* files[] short numberOfFiles \
		You can then use your own mechanism to enable or disable runtime logging See \
		For Windows \
		sdk root /examples/common/farf_runtime_test \
		For Linux \
		sdk root /examples/common/farf_runtime_test \
		for an example on how to enable and use runtime FARF messages programmatically. \
		Obtaining PID and ASID of FastRPC processes \
		It is possible to enable logging in a particular process by referencing that \
		process using either its ASID or HLOS PID This allows you to target a specific \
		process if there are multiple processes with the same name running. \
		In order to obtain the ASID and PID of the running FastRPC processes you can \
		use the adsp_ps executable See [adsp_ps] adsp_ps.html \
		for more information \
		root@msm8994 /data ./adsp_ps \
		./adsp_ps \
		. \
		FastRPC process list \
		. \
		***************************************************************************** \
		ASID HLOS PID HLOS Process Name DSP Process Name \
		***************************************************************************** \
		2 3389 adsp_ps /frpc/f09f75d0 adsp_ \
		. \
		***************************************************************************** \
		logcat \
		Regular FARF messages on DSP can be directed to logcat When enabled FARF \
		messages on the DSP will show up in the logcat stream with the tag adsprpc. \
		How to enable \
		. \
		The same mechanism used for Runtime FARF is used to direct regular FARF messages \
		to logcat. \
		For example to see the calculator example s messages printed in logcat place \
		an file an empty is also sufficient in ADSP_LIBRARY_PATH /system vendor/lib/rfsa/adsp \
		named \
		calculator.farf \
		Follow the [[Runtime FARF]] instructions for more on enabling logcat messages \
		How to filter logcat for DSP messages \
		. \
		To view DSP messages from ADSP/CDSP/SLPI/MDSP use logcat s built in logcat \
		filtering mechanism. \
		adb logcat s adsprpc \
		Example output should look like this \
		05 25 19 25 57.275 4442 4443 W adsprpc calculator_imp.c 17 0x40a6 DSP sum result 499500 \
		mini dm \
		mini dm.exe is the mini diagnostic monitor provided by Qualcomm s Hexagon \
		Access Program It is a tool that displays diagnostic messages generated by the \
		Hexagon DSP. \
		Diagnostic messages are generated by calling FARF on the DSP either from static \
		or dynamic code \
		For more information on generating diagnostic messages see [[FARF]] or \
		[[Runtime FARF]] \
		Connecting to a device \
		Host PC Target \
		+ Control \
		+ Messages + \
		COM DIAG \
		port \
		+ Diag Messages + \
		mini dm \
		+ \
		Hardware requirements \
		. \
		Target device \
		USB drivers For Windows tools/debug/usb For Linux libusb is provided with SDK \
		USB cable \
		Software requirements \
		. \
		mini dm tools/debug/mini dm \
		Steps to run mini dm.exe \
		Install USB drivers tools/debug/usb For more details please go through [Connecting to Device] Debugging_Connect to Device.html section. \
		Power on the target device. \
		Connect the USB cable from the PC to the target device. \
		Open CLI shell and type \
		cd tools/debug/mini dm/WinNT_Debug \
		mini dm.exe comport port number \
		Eg mini dm.exe comport com35 \
		Port number can be discovered by running the [com_finder.py] \
		Tools_Scripts.html com_finder.py script. \
		Port number can also be discovered by looking in Control Panel Device manager Ports. \
		The port number to consider is the one corresponding to the diagnostics port. \
		Play audio on the device or make a fastRPC call to generate messages \
		Diagnostic messages will start printing to console. \
		Command line options available for mini dm.exe \
		Connection options \
		Specify com port to use when connecting to device via USB Default none. \
		For Windows \
		comport port number \
		[com_finder.py] Tools_Scripts.html com_finder.py python script can be \
		used to discover active com ports \
		For Linux \
		usbport port number \
		Logging options \
		. \
		Output format of diag messages Default [%05d SS /%02d MASK ] %02d M %02d S .%03d MS %s STR %04d L %s F \
		format \
		Enable the mesgs from sensor subsystems 122 123 124 and 125. \
		enable_sensor_ssids true/false \
		Enable subsystem messages using masks Upto 6 values each corresponding to to subsystemId 8500 53 122 123 124 and 125. \
		Note that by default all default message are also written to a file msg.txt \
		subsystem_masks mask_value1 mask_value2 . \
		Change the default subsystem mask. \
		default_ss_mask mask_value \
		Diag log codes to activate Default 0 Note that the logs are written into a file indicated by log_file option. \
		log_codes \
		Activate default log codes Default false \
		log_defaults \
		Shows the default log codes log codes activated by log defaults Default false \
		show_default_log_codes \
		File name for logging of log messages Default logs.dlf \
		log_file \
		Shows more output than you want Default false \
		verbose \
		Shows the available color schemes for diag message output Default false \
		show_color_schemes \
		Color scheme for diag message output Default 0 no color \
		color_scheme color_scheme_number \
		File name for debug logging of all diag packets \
		debug_log_file \
		Enable verbose debug messages \
		Performance monitor options \
		. \
		Activates performance monitor output of the given type Default none \
		The following types can be used \
		2 task profiler output \
		4 performance monitor output \
		perfmon \
		Performance monitor time interval in milliseconds between logs Default 500 msec \
		perfmon_interval \
		Number of logs needs to be captured for each event in event configuration file for performance monitor This is not applicable to task profiler Default 8 \
		perfmon_logs \
		Performance monitor output mode Logs in xml format Default 0 \
		0 no performance monitor output \
		1 performance monitor output sent to stdout \
		2 performance monitor output sent to stderr \
		Anything else is considered a filename. \
		perf_mon_output \
		Events configuration file for performance monitor output This file should contain the events that needs to be logged Each line should have four events separated by space This is not applicable to task profiler Default none \
		pmef \
		Log the events until mini dm is stopped Circularly This is not applicable for task profiler Default false \
		pmm_circular \
		Usage exmaples \
		For Windows \
		mini dm.exe comport COM12 \
		mini dm.exe comport COM12 log_codes 0x1530 1531 1532 \
		mini dm.exe comport COM29 verbose true enable_sensor_ssids true logs 0x1527 0x19c5 0x19c6 0x19c7 0x19c8 0x19c9 0x19cb 0x19cc 0x19d6 0x19d8 subsystem_masks 0x1F 0x10 0x1C log file test.dlf \
		For Linux \
		mini dm.exe usbport 6 \
		mini dm.exe showdevices \
		mini dm.exe usbport 6 \
		mini dm.exe usbport 9 log_codes 0x1530 1531 1532 \
		mini dm.exe usbport 12 verbose true enable_sensor_ssids true logs 0x1527 0x19c5 0x19c6 0x19c7 0x19c8 0x19c9 0x19cb 0x19cc 0x19d6 0x19d8 subsystem_masks 0x1F 0x10 0x1C log file test.dlf \
		getpkt \
		getpkt.exe is a tool for extracting and analyzing audio packets from .dlf logfiles. \
		It s located at tools/debug/getpkt/WinNT_Debug \
		Usage of getpkt \
		getpkt.exe file_name \
		file_name is the .dlf file. \
		The following diagram shows an overview of the audio log codes \
		.lua \
		return E.left E.img src images/audio_log_codes.png	",
	"id":26
}
idx.add(doc)
urls[26]='Debugging_Message%20Logging.html'
titles[26]="Message logs"

var doc = {
	"title": "Build Environment Porting Guide",
	"body": " \
		Overview \
		The target audience of this document are build system engineers who wish to \
		build hexagon offload modules in their own build system This document covers \
		the details of *how to generate command line options for compiler and linker* \
		with Hexagon SDK and use such information when packaging or porting to a \
		different build system. \
		The exact details of command line options and directory layout are subject \
		to change in future releases It s always good practice to log the command \
		out in verbose way to confirm when verifying on a different build system. \
		This guide will try to be written in a build system agnostic way but \
		still assumes reasonable knowledge of common make systems like gnu make. \
		To use and understand the build system provided with the Hexagon SDK developers \
		are advised to refer to [Build System] Environments_Build \
		System.html? . \
		Technical Background \
		The Hexagon SDK is based on the working model of [Computational \
		Offload] Applications_Compute offload.html Please follow [Quick start] \
		index.html to get the overview of whole picture how tasks are offloaded to \
		the DSP. \
		Build Variants \
		A very important goal of coding up a build system is to support different \
		build configurations or variants targets release vs debug modules \
		architectures Hexagon SDK s make.d build system supports this with an \
		expandable way of defining a **variant** string that feeds into **V** makefile \
		variable Most of the logic in the build system depends on the definition of \
		the **V** variable passed in This detail is specific to make.d but \
		would be good to have this background knowledge as some of the following \
		discussion depend on the existing of variable **V** Please refer \
		to [Build System] Environments_Build%20System.html Variants for more \
		details. \
		One important thing to note about make.d is the location of both the intermediate \
		and the output files .o .so .a . as well as the location of the dependent \
		libraries are named in accordance with the variant that is being built. \
		Conventions \
		In this document we are going use the /$ VARAIBLE nomenclature for environment \
		variables such as **HEXAGON_SDK_ROOT** and build variant variables such as **V**. \
		For windows users you can always interpret it as %VARIABLE%. \
		QAIC IDL Compiler \
		Location of Executable \
		[IDL Compiler] Tools_IDL%20Compiler.html is the key part of the compute \
		offload model IDL Compiler is located at *$ HEXAGON_SDK_ROOT /tools/qaic/* \
		Common Include Paths \
		$ HEXAGON_SDK_ROOT /incs \
		$ HEXAGON_SDK_ROOT /incs/stddef \
		$ HEXAGON_SDK_ROOT /libs/common/remote/ship/$ V \
		$ HEXAGON_SDK_ROOT /libs/common/rpcmem/$ V /ship \
		$ HEXAGON_SDK_ROOT /libs/common/adspmsgd/ship/$ V \
		Example command line \
		Please refer to [User Guide] qaic_users_guide.html Command line%20usage for \
		more details \
		* mdll Generate DLL mapping. \
		* o output directory \
		.pre \
		$ HEXAGON_SDK_ROOT /tools/qaic/Linux/qaic \
		mdll \
		o android_Release \
		I$ HEXAGON_SDK_ROOT /libs/fastcv/dspCV/android_Release/ship \
		I$ HEXAGON_SDK_ROOT /libs/common/rpcmem/android_Release/ship \
		I$ HEXAGON_SDK_ROOT /libs/common/adspmsgd/ship/android_Release \
		I$ HEXAGON_SDK_ROOT /incs \
		I$ HEXAGON_SDK_ROOT /libs/common/remote/ship/android_Release \
		I$ HEXAGON_SDK_ROOT /incs/stddef \
		Iandroid_Release inc/benchmark.idl \
		Expected output for foo.idl \
		We shall be expecting the following 3 files that are generated in the *out* \
		directory. \
		foo.h \
		The header file containing the C function declarations This file should \
		be included in both the *caller* and *callee* s source code and used when \
		calling the offloaded function as well as when defining the implementation of \
		the offloaded function. \
		foo_sub.c \
		Stub source file that shall be built into the *caller* side of the code. \
		AP side if calling from the AP to the Hexagon DSP. \
		foo_skel.c \
		Skeleton source file that shall be included into *callee* side of the code. \
		Hexagon DSP side if calling from the AP to the Hexagon DSP. \
		Building the Application Processor AP side module \
		Dependent modules \
		+ + + + + \
		Module source/binary location header location Description \
		+ + + + + \
		lib*a*dsprpc.so / lib*c*dsprpc.so /$ HEXAGON_SDK_ROOT /libs/common/remote/ship//$ V / /$ HEXAGON_SDK_ROOT /libs/common/remote/ship//$ V / [FastRPC app side lib] APIs_FastRPC.html Software%20components \
		+ + + + + \
		rpcmem.a /$ HEXAGON_SDK_ROOT /libs/common/rpcmem /$ HEXAGON_SDK_ROOT /libs/common/rpcmem [sample code on using Android s ION memory allocator] APIs_FastRPC.html RPCMem \
		+ + + + + \
		Common Headers /$ HEXAGON_SDK_ROOT /incs Common headers suck as HAP_/*.h and AEE/*.h files \
		+ + + + + \
		IDL Header & _stub.c IDL output dir /foo.h & foo_stub.c fastRPC caller side \
		+ + + + + \
		set rpcmem_src $ HEXAGON_SDK_ROOT /libs/common/rpcmem \
		set rpcmem_inc $ HEXAGON_SDK_ROOT /libs/common/rpcmem/inc \
		set atomic_src $ HEXAGON_SDK_ROOT /libs/common/atomic \
		set atomic_inc $ HEXAGON_SDK_ROOT /libs/common/atomic/inc \
		set remote_src $ HEXAGON_SDK_ROOT /libs/common/remote \
		set remote_inc $ HEXAGON_SDK_ROOT /libs/common/remote/ship/$ V / \
		set adsprpc_prebuilt $ remote_src /ship/$ V / \
		Compiler/Linker Options \
		libadsprpc.so and libcdsprpc.so are delivered as prebuilt libraries So \
		by including the right header file and linking with them at link time you \
		should be able to call into the library. \
		For C code for rpcmem.a you shall be able to just use compiler options \
		that work for other files within your build system No special \
		compiler/linker options are needed. \
		Building the Hexagon DSP side module \
		Dependent modules \
		+ + + + + \
		Module source/binary location header location Description \
		+ + + + + \
		Common Headers /$ HEXAGON_SDK_ROOT /incs Common headers as AEE/*.h files \
		+ + + + + \
		IDL Header & _skel.c IDL output dir /foo.h & foo_skel.c fastRPC callee side \
		+ + + + + \
		Compiler Options \
		The Hexagon Tools compiler linker etc are based on LLVM and so most of \
		the options adhere to either standard LLVM options or legacy GNU options. \
		The following is the example of compiler options for a C file All others \
		are standard compiler options except mv65 and mhvx double These are \
		*Processor version* flags that you can find the detail in section \
		4.3.14 Processor Version from *Hexagon C/C++ Compiler User Guide 80 VB419 89 P * \
		* mv65 specify the Hexagon processor version \
		* mhvx double specifies the HVX extensions in double mode \
		.pre \
		/ / /qctp406/pkg/hexagon/ /8.2.04 Linux/Tools/bin/hexagon clang \
		mv65 \
		c v G0 g O2 Wall Werror Wno cast align Wpointer arith \
		Wno missing braces Wno strict aliasing fno exceptions \
		fno strict aliasing fno zero initialized in bss fdata sections \
		Wstrict prototypes Wnested externs \
		mhvx double \
		D__FILENAME__ / benchmark_skel.c/ \
		I / / /qctp406/pkg/qurt_install//computev65/include \
		I / / /qctp406/pkg/qurt_install//computev65/include/qurt \
		I / / /qctp406/pkg/qurt_install//computev65/include/posix \
		I /dspCV/hexagon_ReleaseG_toolv82_v65/ship \
		I / / /qctp406/pkg/rpcmem/hexagon_ReleaseG_toolv82_v65/ship \
		I / / /qctp406/pkg/test_util/hexagon_ReleaseG_toolv82_v65/ship \
		I / / /qctp406/pkg/HAP \
		I / / /qctp406/pkg/hexagon_ReleaseG_toolv82_v65 \
		I / / /qctp406/pkg/stddef Ihexagon_ReleaseG_toolv82_v65 o \
		hexagon_ReleaseG_toolv82_v65/benchmark_skel.o \
		hexagon_ReleaseG_toolv82_v65/benchmark_skel.c \
		Linker Options \
		This is an example linker command line Key options are architecture arch ones \
		and all others are common linker options For details of the definition please \
		refer to Linker chapter in *Hexagon Utilities User Guide 80 N2040 15N * \
		* march hexagon mcpu hexagonv65 Specify the Hexagon process version \
		.pre \
		/local/mnt/workspace/xqi/Qualcomm/Hexagon_SDK/3.4.0/tools/HEXAGON_Tools/8.2.04/Tools/bin/hexagon link \
		march hexagon mcpu hexagonv65 \
		shared call_shared G0 \
		o hexagon_ReleaseG_dynamic_toolv82_v65/libbenchmark_skel.so \
		$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/bin/ /target/hexagon/lib/v65/G0/pic/initS.o \
		L$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/bin/ /target/hexagon/lib/v65/G0/pic \
		L$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/bin/ /target/hexagon/lib/v65/G0 \
		L$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/bin/ /target/hexagon/lib/v65 \
		L$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/bin/ /target/hexagon/lib \
		Bsymbolic \
		$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/target/hexagon/lib/v65/G0/pic/libgcc.a \
		wrap malloc wrap calloc wrap free wrap realloc wrap memalign \
		wrap __stack_chk_fail lc \
		Map hexagon_ReleaseG_dynamic_toolv82_v65/libbenchmark_skel.so.map \
		soname libbenchmark_skel.so \
		start group \
		hexagon_ReleaseG_dynamic_toolv82_v65/benchmark_skel.o \
		hexagon_ReleaseG_dynamic_toolv82_v65/benchmark_imp.o \
		hexagon_ReleaseG_dynamic_toolv82_v65/dilate5x5_imp.o \
		. \
		$ HEXAGON_SDK_ROOT /libs/fastcv/dspCV/hexagon_ReleaseG_dynamic_toolv82_v65/ship/libdspCV_skel.so \
		end group start group lgcc end group \
		$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/bin/ /target/hexagon/lib/v65/G0/pic/finiS.o \
		Building a Hexagon Simulator based executable \
		Dependent modules \
		We need special helper libraries from QuRT OS most of them reside in \
		$ HEXAGON_SDK_ROOT/libs/common/qurt directory And a couple C and architectural \
		helper libraries from the Hexagon tool chain. \
		For more details on building with QuRT please refer to *Hexagon QuRT RTOS \
		System Build Guide 80 VB419 79 * \
		Compiler/Linker Options \
		Building for the simulator is similar to building dynamic libraries The \
		Difference is we need special linker options to generate executable stand alone \
		binary that the simulator loads and executes. \
		As you can see from the following sample command line we need a \
		specific starting address and a group of helper libraries to generate the \
		complete executable for the simulator. \
		Take particular note to the order of the .o and libs specified For example \
		init.o must be first and fini.o must be last Your custom libraries will go \
		in the middle taking the place of libdsdpCV_skel.a for example. \
		.pre \
		$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/bin/hexagon clang \
		mv65 \
		g nodefaultlibs nostdlib \
		Wl section start Wl .start 0x23000000 \
		o $ OUT /benchmark_q \
		Wl start group \
		$ OUT /benchmark_skel.o \
		$ OUT /benchmark_imp.o \
		$ OUT /benchmark.o \
		$ OUT /dilate5x5_ref.o \
		. \
		HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/target/hexagon/lib/v65/G0/init.o \
		HEXAGON_SDK_ROOT /libs/common/qurt//computev65/lib/crt1.o \
		HEXAGON_SDK_ROOT /libs/common/qurt//computev65/lib/libqurt.a \
		HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/target/hexagon/lib/v65/G0/libc.a \
		HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/target/hexagon/lib/v65/G0/libqcc.a \
		HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/target/hexagon/lib/v65/G0/libhexagon.a \
		HEXAGON_SDK_ROOT /libs/common/qurt//computev65/lib/libqurtcfs.a \
		HEXAGON_SDK_ROOT /libs/common/qurt//computev65/lib/libtimer.a \
		HEXAGON_SDK_ROOT /libs/common/qurt//computev65/lib/libposix.a \
		HEXAGON_SDK_ROOT /test/common/test_util/hexagon_ReleaseG_toolv82_v65/ship/test_util.a \
		HEXAGON_SDK_ROOT /libs/common/atomic/hexagon_ReleaseG_toolv82_v65/ship/atomic.a \
		HEXAGON_SDK_ROOT /libs/fastcv/dspCV/hexagon_ReleaseG_toolv82_v65/ship/libdspCV_skel.a \
		HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.2.04/Tools/target/hexagon/lib/v65/G0/fini.o \
		Wl end group \
		set rpcmem_src $ HEXAGON_SDK_ROOT /libs/common/rpcmem \
		set rpcmem_inc $ HEXAGON_SDK_ROOT /libs/common/rpcmem/inc \
		set atomic_src $ HEXAGON_SDK_ROOT /libs/common/atomic \
		set atomic_inc $ HEXAGON_SDK_ROOT /libs/common/atomic/inc \
		set remote_src $ HEXAGON_SDK_ROOT /libs/common/remote \
		set remote_inc $ HEXAGON_SDK_ROOT /libs/common/remote/ship/$ V / \
		set adsprpc_prebuilt $ remote_src /ship/$ V / \
		set libdspCV_skel_src $ HEXAGON_SDK_ROOT /libs/fastcv/dspCV \
		set libdspCV_skel_inc \
		$ HEXAGON_SDK_ROOT /libs/fastcv/dspCV/inc \
		$ HEXAGON_SDK_ROOT /libs/fastcv/dspCV/$ V /ship/ \
		set libdspCV_src $ HEXAGON_SDK_ROOT /libs/fastcv/dspCV \
		set libdspCV_inc \
		$ HEXAGON_SDK_ROOT /libs/fastcv/dspCV/inc \
		$ HEXAGON_SDK_ROOT /libs/fastcv/dspCV/$ V /ship/ \
		set test_util_src $ HEXAGON_SDK_ROOT /test/common/test_util \
		set test_util_inc \
		set proj qaic_src $ HEXAGON_SDK_ROOT /tools/qaic/ \
		set HEXAGON_ALL_INCS \
		$ HEXAGON_SDK_ROOT /incs/ \
		$ HEXAGON_SDK_ROOT /incs/stddef/ \
		$ HEXAGON_SDK_ROOT /libs/common/rpcmem/inc \
		$ HEXAGON_SDK_ROOT /libs/common/remote/ship/$ V / \
		Forward compatibility \
		Now that you have successfully ported the Hexagon commands onto your own build \
		system and it s working perfectly How to make sure your own build system \
		continues to work once you pick up a new version of the Hexagon SDK? \
		Hexagon SDK should upgrade this build guide to the latest information in \
		future releases so refer to the latest to determine if anything has changed. \
		But it s always a good practice to keep some referencing point from current \
		build system \
		One suggestion would be that you structure your build system supporting \
		file similar to the following two files. \
		* $ HEXAGON_SDK_ROOT /build/make.d.ext/hexagon/defines_hexagon_8_1.min \
		defines the compiler and linker options for dynamic libraries \
		* $ HEXAGON_SDK_ROOT /libs/common/qurt/qurt_libs.min \
		defines the linker options for simulator based executables \
		When the next version of tools and micro architecture comes out the \
		above two files will be updated with the latest working configuration. \
		Reference & External Links \
		LLVM Cross compilation [https //clang.llvm.org/docs/CrossCompilation.html] \
		https //clang.llvm.org/docs/CrossCompilation.html	",
	"id":27
}
idx.add(doc)
urls[27]='Environments_Build%20System%20Porting.html'
titles[27]="Build Environment Porting Guide"

var doc = {
	"title": "General FAQ",
	"body": " \
		unable to build examples or failure calling elfsigner \
		Be sure to setup your shell local environment Refer [Setup Instructions] readme.html \
		/bin/sh line 0 igncr invalid option name \
		This results from a conflict between Cygwin and GOW related to the SHELLOPTS \
		environment variable In Cygwin you can set the SHELLOPTS variable to ingcr to \
		tell cygwin to ignore cr in line ends GOW does not understand this shell \
		option and therefore complains. \
		The solution is to remove ingcr from your SHELLOPTS environment variable. \
		/usr/bin/sh c line 0 syntax error near unexpected token \
		You might be using Cygwin to build the examples instead of GOW \
		The solution is to run the [setup_sdk_env.cmd] readme.html \
		script from the Hexagon SDK s root directory in the CLI shell you \
		are building in. \
		make is pulling the Hexagon Tools from the wrong location \
		The Hexagon Tools are by default pulled from \
		%HEXAGON_SDK_ROOT%/tools/HEXAGON_Tools/ version For Windows \
		$ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/ version For Linux \
		unless HEXAGON_TOOLS_ROOT is defined If see the wrong tools being used check your \
		definition of HEXAGON_TOOLS_ROOT to make sure it correctly points to a supported \
		version of the Hexagon Tools For more information on the Hexagon Tools \
		dependency please see [Hexagon tools] Dependencies_Common.html Hexagon tools \
		fatal error remote.h No such file or directory \
		remote.h remote64.h and remote.idl have been moved from libs/common/remote/ship to common incs in SDK 3.4.2. \
		To fix this issue include the common incs of SDK in the incs of your project. \
		for e.g INCDIRS + $ HEXAGON_SDK_ROOT /incs \
		undefined PLT symbol error \
		Introduction to whole archive The whole archive option is used to link every object file that is contained in the specified archives into the program Prior to SDK 3.4.1 it was used to link the libraries libc libgcc and libstdc++ completely to the simulator executable The whole archive linker option is removed SDK 3.4.1 onwards as it was increasing the size of the executable binary. \
		This error might arise due to the removal of whole archive option from linker command of the simulator executable These undefined symbols are probably defined in one of the linker input files and are required to be added to the external symbol table to force additional object files to be linked to the program The symbols can be added to the external symbol table using the option extern list file to the linker. \
		Please refer to the Makefile of capi_v2_decimate to learn to use the option The symbol file dynsymbols.lst is located at HEXAGON_SDK_ROOT /incs . \
		The symbols in the external symbol table are garbage collected during linking If the specified symbol is already defined in one of the linker input files the linker will use that definition and not add the symbol to the external symbol table and the symbol and its dependencies will not be garbage collected. \
		For more information about linker options refer to [Hexagon_Document_Bundle] images/Hexagon_Document_Bundle.pdf page 6676	",
	"id":28
}
idx.add(doc)
urls[28]='FAQ_Common.html'
titles[28]="General FAQ"

var doc = {
	"title": "Hexagon Tools 8.3",
	"body": " \
		Introduction \
		The Hexagon SDK includes the complete Hexagon tools package compiler linker \
		profiler etc . \
		Programmers References \
		[Hexagon V6x] images/Hexagon_Document_Bundle.pdf page 7 \
		[Hexagon V5x] images/Hexagon_Document_Bundle.pdf page 4616 \
		User Guides \
		[Hexagon QuRT User Guide] images/80 VB419 178_QuRT_User_Guide.pdf \
		[Hexagon LLVM C/C++ Compiler] images/Hexagon_Document_Bundle.pdf page 5318 \
		[Hexagon C Library] images/Hexagon_Document_Bundle.pdf page 5451 \
		[Hexagon C++ Library] images/Hexagon_Document_Bundle.pdf page 5809 \
		[Hexagon Utilities] images/Hexagon_Document_Bundle.pdf page 6628 \
		[Hexagon Simulator] images/Hexagon_Document_Bundle.pdf page 6779 \
		[Hexagon LLDB Debugger] images/Hexagon_Document_Bundle.pdf page 6969 \
		[Hexagon Profiler] images/Hexagon_Document_Bundle.pdf page 7073 \
		[Hexagon gprof Profiler] images/Hexagon_Document_Bundle.pdf page 7097 \
		[Hexagon Code Coverage Profiler] images/Hexagon_Document_Bundle.pdf page 7114 \
		[Hexagon Resource Analyzer] images/Hexagon_Document_Bundle.pdf page 7129 \
		[Hexagon Stand alone Application] images/Hexagon_Document_Bundle.pdf page 7180 \
		[Hexagon exception handling] images/Hexagon_Document_Bundle.pdf page 7221 \
		Shared Object Format \
		[Hexagon Application Binary Interface Specification] images/Hexagon_Document_Bundle.pdf page 7201	",
	"id":29
}
idx.add(doc)
urls[29]='Tools_UserGuides.html'
titles[29]="Hexagon Tools 8.3"

var doc = {
	"title": "﻿SDK release notes",
	"body": " \
		3.4.3 \
		Introduces support for SM6125 and QCS403 targets \
		Incorporates Hexagon NN release 2.6 \
		Removes adsp_ps dependency on libstdc++ and updates install_adsp_ps.py for Android P builds \
		adsp_ps is an android application that allows the caller to query the DSP for a list of running FastRPC processes \
		please see Hexagon_SDK_root_folder /docs/adsp_ps.html for more details about adsp_ps \
		Exposes apps_mem_share_map and apps_mem_share_munmap in apps_mem.h located at Hexagon_SDK_root_folder /incs \
		Updated apps_mem.h located at Hexagon_SDK_root_folder /incs with apps_mem_share_map and apps_mem_share_unmap \
		to map the buffers on DSP using an APPS fd \
		Introduces a new capiV2 example capi_v2_gain_cpp for C++11/14 support \
		Updates capiV2 audio events \
		Updates voice IMC module config file \
		General bug fixes \
		Fixes Hexagon IDE bug related to compilation of Hexagon projects created with Hexagon Project wizard for arch v62 and above \
		3.4.2 \
		Summary \
		Introduces support for SM7150 target \
		Incorporates Hexagon Tools release 8.3.02 which introduces automatic vectorization support for HVX \
		Incorporates Halide Tools release 2.2 see Halide tools release notes for detailed info \
		Incorporates Hexagon NN release 2.5 \
		Introduces Hexagon Trace Analyzer to process Hexagon ETM Traces \
		Incorporates installer support to install USB drivers \
		Introduces support for sysMon command line tool \
		Introduces simultaneous build support for Ubuntu 32 bit and 64 bit variants \
		Updates benchmark_v65 example to remove /glue folder dependency \
		Adds an automatic vectorization example to conv3x3 in benchmark_v65 \
		Adds support to configure simulator test thread stack size \
		General bug fixes \
		Fixed issue of ambiguity in variable values in IDE \
		Solved the issue of passing environment variables to LLDB using IDE \
		Fixed issue of passing args to simulator test main \
		Fixed calculator_c++ simulator test failure \
		Documentation \
		Introduction to Sub system Restart SSR handling \
		QoS document \
		Steps to find out crash location from crash signature \
		FastRPC Error logs document \
		New QURT simulation framework \
		3.4.1 \
		Summary \
		Introduces support for QCS405 \
		Introduces support for SM6150 \
		Introduces first APK based Calculator C++ example \
		Incorporates Halide Tools release 2.1.04 \
		Incorporates Hexagon Tools release 8.2.07 \
		Introduces support for Audio H2XML Tool \
		Introduces support for Signature free Compute processing \
		Deprecates qdebug library \
		Adds simulator support for the new timeout based VTCM allocation API. \
		Introduces LE support for sysMon \
		Introduces an utility called run_main_on_hexagon to run a user test with main on simulator and DSP. \
		Starting from 3.4.1 all the qurt simulator tests in SDK are run with this utility. \
		General bug fixes \
		Documentation \
		Updated DCVS_v2 HAP_power_set documentation with CPU L3 clock voting options. \
		Updated VTCM Manager documentation with a new timeout based VTCM allocation API. \
		Reorganized documentation \
		3.4.0 \
		Summary \
		Introduces support for SM8150 \
		Incorporates LLVM Tools release 8.2.04 see tools release notes for detailed info \
		Incorporates Halide Tools release 2.1.02 see Halide tools release notes for detailed info \
		Introduce qprintf library that extends printf support to assembly language and HVX register types \
		Introduce Hexagon NN library and examples allowing to run Neural Networks on the Hexagon DSP \
		v66 Hexagon Architecture support \
		Camera streaming example support on SDM845 \
		Remote debugger support on SM8150 \
		Added fastrpc system libraries to support system applications to offload to DSP on Treble enabled builds. \
		Added SysmonParser executables with SM8150 support. \
		Updated rpcmem library to allocate memory from ION for Linux platforms AGL linaro \
		SysMon \
		Updated sysMon_DSP_Profiler_V2.apk with support from SM8150 \
		New benchmarks histogram and ncc8x8 under CDSP tap \
		HVX units configurability for benchmarks on SM8150 \
		Added fix power level option for full suite under benchmarks \
		Added support for Android P \
		Updated SysmonParser executables for windows and linux with SM8150 support \
		Location of the executables is \
		Windows ‘ Hexagon_SDK /tools/utils/sysmon/parser_win_v2/’ \
		Linux ‘ Hexagon_SDK /tools/utils/sysmon/parser_linux_v2/’ \
		Debugger \
		Command line on target debugging has been simplified. \
		3.3 \
		Summary \
		This release build upon the Hexagon SDK 3.2 and adds features capabilities and improvements listed below. \
		Hardware \
		* Support added for the Hexagon architecture v.65 \
		* Hexagon architectures supported by this release \
		o v60 v60 HVX v61 v62 v62 HVX v65 v65 HVX \
		* Snapdragon devices supported by this release \
		o Simulator \
		o SDM630 \
		o SDM660 CDSP \
		o SDM820 \
		o SDM835 \
		o SDM845 ADSP and CDSP \
		o SDM670 ADSP and CDSP \
		Development Tools and Environment \
		Elfsigner update \
		* New elfsigner package that is compatible to OpenSSL 1.1.0 \
		Installation update \
		* The full NDK installation support now contains all the C++ headers libraries and tools which are needed for c++11 compilations. \
		SysMon in 3.3.1 \
		* Added SysmonParser executables for windows and linux with SDM845 support. \
		o Location of the executables is \
		Windows ‘ Hexagon_SDK /tools/utils/sysmon/parser_win_v2/’ \
		Linux ‘ Hexagon_SDK /tools/utils/sysmon/parser_linux_v2/’ \
		o SysmonParser utility helps users post process the raw profiling data captured via sysMon DSP Profiler on a host machine. \
		Known issue SysmonParser.exe Windows can sometimes fail to post process any data when there is a perl installation under C /Perl64 Workaround is to temporarily rename the folder to something else ex C /Perl64 ? C /Perl before running the parser. \
		* Updated sysMon_DSP_Profiler_V2.apk \
		o Added new benchmarks fft1024 fft1024_vtcm under CDSP tab. \
		o Added ‘Profiler’ option to enable or disable profiling for benchmark runs. \
		Sysmon for 3.3.0 \
		* sysMon DSP Profiler allows collection of DSP metrics & statistics that help in analyzing performance of the SW running on the DSP things like MPPS used DDR/AXI BW usage various clock speeds while running the SW cache hits/misses etc. \
		Debugger support \
		* Support for LLDB is included allowing users via USB connection between development workstation and reference board perform common debugging operations such as single stepping through the code using breakpoints and inspecting register or memory contents The debugger is accessible from the SDK IDE Eclipse or from the command line. \
		* Issues fixed from lldb debugger side in 3.3.1 \
		o LLDB hang with v65 simulator tests. \
		o Registers are not displayed correctly while debugging on target. \
		o LLDB debug server crash with v65 simulator tests. \
		* Issues fixed from lldb debugger side in 3.3.2 \
		o Changing the value of a variable from debugger was failing This issue is now fixed and the user can change the value of the variable from the debugger. \
		o Retrieving disassembly data used to fail randomly during debug session This issue is now fixed. \
		* Issues fixed from hexagon IDE \
		o IDE throws error popup with adb 1.0.39 adb 1.0.39 returns non zero error code if adb shell ls filepath gives no such file or directory Older versions of adb returns Success even when file not found. \
		o Hexagon Processor version Dropdown under project preferences is not listing v65 option. \
		Toolset \
		* Incorporates LLVM Tools release 8.1.04 see tools release notes for detailed info. \
		* Link time optimizations LTO better performance and code size by giving compiler a larger scope for optimization Compiler works one file at the time but with LTO it optimizes across all the files in the build Observed 25% code size reduction but your mileage can vary. \
		* Thread Local Storage TLS declare a variable with 1 instance per thread https //en.wikipedia.org/wiki/Thread local_storage \
		* Integrated assembler speeds up compilation time. \
		* Enabling OpenCV TensorFlow and other frameworks written in C++ 11/14 to execute on Hexagon DSP \
		QuRT \
		* Historically QuRT has provided access to system resources such as hardware I/O registers or shared memory resources using an on demand model If you are ever authorized to access the resource then you can map it and un map it at any time This model of unmanaged on demand access leaves a lot of room for improvement. \
		* Among the weaknesses are \
		o No ability to dynamically change the authorization model. \
		o There is no enforcement of exclusive access. \
		o No cleanup of hardware I/O state when a process exits If a user process maps some hardware I/O and puts it into an unknown state the hardware stays in that unknown state if the process crashes. \
		* The Secure Resource Manager will address the issues above and will allows system resources drivers to be used in both the normal and secure context DRM for example without having to explicitly enforce separation between contexts. \
		* HVX Preemption enables saving and restoring of HVX registers when context switch takes place due to process preemption. \
		* Fix for the slow file load during execution. \
		* Timer co sim for using timer functions in simulator was corrected. \
		* Pick up latest libposix.a for posix mutex default behavior non recursive . \
		Halide \
		We are including support for Halide which is a is a programming language for vision processing http //halide lang.org/ Halide is designed as a dialect of C++ This allows programmers who are familiar with C++ to start authoring Halide programs The Halide toolset available as part of the Hexagon SDK and the Hexagon LLVM toolset contains a Halide compiler that targets the Hexagon DSP and Hexagon Vector eXtensions HVX architecture Halide for Hexagon with HVX allows programmers to exploit the powerful features of the Qualcomm DSP without knowledge of the underlying processor architecture This in turn enables a higher level of abstraction and significantly increases the number of developers who can take advantage of it Specifically programmers can focus solely on the image algorithm and achieve high levels of performance from DSP The Halide runtime also makes the task of offloading kernels to Hexagon very easy for a programmer The programmer merely has to add a .hexagon directive in the Halide program and the Halide runtime will ensure that the kernel is transparently dispatched to the Hexagon processor With this release we are shipping Halide and example code Halide user guide and training material is placed under SDK_ROOT/tools/HALIDE_Tools/ \
		* This release paired up with Hexagon Neural Network Libraries available here \
		https //wiki.codeaurora.org/xwiki/bin/+Qualcomm+Hexagon+NN+Offload+Framework/ provide a starting point for sophisticated Machine Learning use cases with ops optimized for Hexagon architecture Developers can use TensorFlow to offload Neural Network graphs inferences to Hexagon. \
		New Libraries \
		qmath library \
		Offers non IEEE compliant HVX vectorized floating point arithmetic \
		Conversion to/from arrays of float or double. \
		Add/subtract/multiply/mac/compare/sqrt/recip/recipsqrt \
		qfxp library \
		Utility library for helping to convert a floating point implementation to a fixed point implementation. \
		UBWCDMA firmware and cosim libraries \
		Firmware library for access to the UBWCDMA cosim The UBWCDMA is hardware included on the SDM845 CDSP. \
		Cosim library for use with the hexagon simulator to develop applications using the UBWCDMA \
		Asynchronous communication APIs \
		Starting with Hexagon SDK 3.3.1 we are introducing a library that can enable asynchronous communication between CPU and DSP The asynchronous message queue is included in the Hexagon SDK as “asyncdspq” as a user space library and does not require system level changes on SDM845 or later More details including API descriptions are included in the “Asynchronous DSP Message Queue” document accompanying the Hexagon SDK. \
		Mini DM \
		Added support for new log types 0x 19C5 0x19C6 0x19C7 0x19C8 0x19C9 0x19CB 0x19CC 0x19D6. \
		Also added support for messages from additional subsystems SSID 122 123 124 and 125. \
		Check out the mini dm documentation for more details. \
		Support for new logcodes 0x19d8 and 0x19cd. \
		Fixes for missing logs in the generated log file. \
		Message in stdout made optional. \
		Examples \
		Hexagon HVX benchmark_v65 example best starting point for SDM845/Hexagon v65 development . \
		Demonstrates best practice for using multi domain FastRPC to find appropriate DSP across targets. \
		Demonstrates using HVX without explicit HVX lock/unlock calls supported starting in SDM845 . \
		Demonstrates using new v65 HVX scatter/gather and Vector TCM VTCM in the bilateral filter. \
		Added a 1024x1024 FFT which also uses VTCM when available as scratch. \
		UBWCDMA memcpy blend and hvx_sum simulator only examples to illustrate the programming flow when using the UBWCDMA firmware library. \
		This is only for 3.3.1 With this release we are shipping Halide example code. \
		Documentation \
		Updated documentation for sysMon_DSP_Profiler_V2. \
		Added descriptions for the new benchmarks fft1024 fft1024_vtcm \
		Added description for ‘Profiler’ option usage. \
		Updated documentation for sysMonApp and Markers. \
		Added more details on Markers usage for profiling user selectable portions of code. \
		Updated documentation of simulator/target debugging. \
		Updated Getting Started document \
		Comprehensive guide for beginning users of Hexagon. \
		Covers run time environment debugging profiling optimization techniques etc. and pointers to further info. \
		Added user guide for QuRT \
		Hexagon DSP for Compute Guide \
		Introduction guide for software developers whose main task is to run code efficiently on the Hexagon DSP \
		Added documentation for VTCM manager APIs SDM845 CDSP \
		Added documentation for HAP cache lock APIs SDM845 CDSP HAP cache lock APIs are currently not supported in simulator environment \
		Updated documentation for sysMon DSP Profiler formerly Hexagon Profiler \
		Added documentation for HVX Resource Manager SDM660 CDSP and APIs exposed. \
		Added documentation for services provided by sysMonApp Android executable \
		Added documentation to describe the UBWCDMA and the firmware programming model \
		Added documentation to describe what raw materials are needed to integrate into another build system \
		Added documentation changes to deprecate RPCMEM_DEFAULT_HEAP. \
		Added documentation changes to cover rpcmem_init limitation. \
		Documentation toolset and other documentation added to the sidebar \
		Known Issues \
		* On LE 8096 \
		rpcperf example is not working. \
		FARF messaging is not working. \
		Histogram example is not working. \
		Calculator_C++ example is failing on simulator with toolv72_v55. \
		* On SDM845 \
		Calculator_multi_domain failure on SDSP on SD845. \
		* On SDM670 \
		Async DSP Q test failure on SD670 Causes device crash. \
		Calculator_multi_legacy failure on SD670 Fails to allocate contiguous memory that is used for SDSP If we change the heaped/flag this is working. \
		3.2 \
		This SDK is mainly meant for SDM660 support. \
		Support for SDM660 \
		Updated camera streaming example \
		Updated benchmark example to support v60 \
		Updated makefiles to support flags to off load to different DSPs \
		Updated sysmon \
		Support for SDM660 \
		3.1 \
		This SDK is mainly meant to support C++ 11/14 Hexagon toolset qurt and other libs have been updated to support this feature Also an example to showcase this has been added. \
		New features \
		Support for SDM835 MSM8998 \
		Updated Hexagon toolset version 8.0.08 which supports C++ 11/14 \
		Updated qurt libs \
		Support to 8.0 variants \
		Support to LE targets Note LE toolset is not released as part of SDK You need to install it separately \
		Added an example for computation domains support \
		CV \
		Added new Computer Vision HVX example ‘benchmark’ for MSM8998 \
		Added new Computer Vision HVX examples dilate5x5_v60 gemm for MSM8996 and MSM8998 \
		Added rpcperf epplication to measure the overhead associated with FastRPC with various buffer sizes \
		Bug fixes mini dm \
		Document updates and fixes \
		Hexagon IDE \
		Bug fixes \
		Features not supported \
		Remote debugger support is not available for 8996 in this version of SDK \
		APPI and CAPI are not supported on 8998 Only CAPIv2 is supported on 8998. \
		Installer updates \
		Mininal NDK support This SDK can be used if you are using the standard build system options provided in the SDK and variants If you need anything more you might have to install full NDK from Google \
		Installer_Dependencies.py script helps in installing SDK dependecies in case the installer fails to download \
		3.0 \
		New features \
		Support for Snadragon 820 8096 Note For previous generation chipsets please use SDK 2.x \
		Support of 7.2 and 7.4 Hexagon toolsets \
		Support for v62 and v64 Hexagon architectures \
		Audio/Voice \
		CAPI V2 Voice wakeup example CAPI V2 Speaker Protection example Dummy ECSN example Voice IMC example \
		Updates to Audio/Voice unit test frameworks \
		Added Machine learning examples k means linear regression \
		Added new Computer Vision examples for integral image and histogram computation \
		Updates to camera streaming examples Added simulation example for HVX_add_constant \
		First release of Hexagon Profiler sysmon in SDK \
		First release of unit test profiling library \
		Features not supported \
		Remote debugger support is not available for 8996 in this version of SDK \
		Audio/Voice integration support on simulator is no longer supported \
		Installer updates \
		Selectable SDK components Installation \
		Reduced installation time \
		Error logging \
		For troubleshooting installation issues please look at this document [InstallAnywhere Error recovery] InstallAnywhere.html \
		2.0 \
		New features \
		Support for the Snapdragon 810 8094 \
		[Computational offload to a 2nd DSP] Applications_Compute offload.html \
		[Audio calibration Set/Get parameters from Android Java application] Audio/audio_calibration_using_app.html \
		[Audio CAPI_V2 support] CAPIv2/CAPIv2_Introduction.html \
		[APPI to CAPI_V2 migration guide] CAPIv2/APPI_to_CAPIv2%20Migration.html Purpose \
		Framework to support heterogeneous computing for image processing \
		Lots more free memory to load bigger dynamic modules \
		Support for the LLVM compiler \
		Android Position Independent Executable PIE support \
		64 bit native Android application support \
		Get your serial number from the Android UI \
		[Discover com ports connected to Qualcomm HS HSB devices] Tools_Scripts.html com_finder.py \
		Auto discover ION heap used by calculator examples \
		[Extract pcm samples from a mini dm log] Debugging_Message Logging.html getpkt \
		[Support for run time message logging Runtime FARF ] Debugging_Message Logging.html Runtime FARF \
		Simulated test framework for Snapdragon 810 8094 \
		[Memory architecture documentation] Memory Management.html Memory Management \
		[QuRT example projects] Examples_Common.html QuRT examples \
		Support for running QuRT in simulation for unit testing \
		[Added Voice workflow recommendation for static integration and dynamic loading] Voice/voice_overview.html \
		Major bug fixes \
		mini dm flushes output on successful connection \
		Known issues \
		Remote debugger is temporarily not supported on Snapdragon 810 8094 devices \
		1.2.2 \
		New features \
		[Dynamic voice post processing] Voice/Applications.html \
		[FastCV libraries upgraded to 1.5.0 release] \
		[Debugger non stop mode support] \
		Remote debugger page table support \
		Debugger verification script \
		[Target debugging using IDE] eclipse_target_debug.html \
		[RTOS Profiling and amdb_mgr views in IDE] eclipse_utilities.html \
		[Android NDK based project creation in IDE] eclipse_ndk_projects.html \
		[Comparative module profiler] eclipse_utilities.html Profiling library \
		Expose stdlib string symbols \
		[Template shared object example] Examples_Common.html template_so \
		[Developer registration for updates] https //developer.qualcomm.com/hexagon updates \
		[Switched to finer grained Hexagon build variants] Environments_Build System.html Variants \
		Support for 5.1 Hexagon Tools 5.1 tools obtained separately \
		Improved DSP state information when running TISE \
		[elfsigner supports production signing] Tools_Signing.html \
		Major bug fixes \
		Fixed segment fault when running calculator example on build that does not support adspmsgd \
		Known issues \
		Lua Debugger crashes so has been disabled \
		1.1.0 \
		New features \
		Trepn \
		Lua debugger \
		Equalizer example \
		mini dm \
		FFT examples \
		Improved loader and security error reporting \
		Run time get/set param of APPI modules \
		Performance monitor \
		Utilities to query test root and symbol support \
		Improved remote debugger stability \
		1.0.0 \
		First public release of the Hexagon SDK \
		Notable features \
		FastRPC \
		Dynamic loading \
		Remote debugger \
		Audio customization \
		FastCV support \
		Hexagon IDE plugins \
		Logger	",
	"id":30
}
idx.add(doc)
urls[30]='Release%20Notes_Common.html'
titles[30]="﻿SDK release notes"

var doc = {
	"title": "sysMon DSP Profiler V2",
	"body": " \
		Overview \
		sysMon DSP Profiler is an Android UI application for profiling DSP work load This UI app uses FastRPC to communicate with SysMon service running on DSP for profiling activities The Android application can be used to profile services running on DSP to gather information like the clocks voted for resource usage load distribution across available hardware threads load on processor bus bandwidth metrics and various other profiling metrics useful in measuring performance debugging performance related issues and in identifying possible optimizations This document captures steps to setup and use sysMon DSP Profiler and ways to analyze the captured profiling data. \
		Supported chipsets \
		8998 SDM660 SDM630 SDM845 SDM710 QCS605 SM8150. \
		Setup \
		Install **sysMon_DSP_Profiler_V2.apk** file from SDK_DIR /tools/utils/sysmon/ SDK directory on the device connected to the host machine by running following ADB command. \
		adb install sysMon_DSP_Profiler_V2.apk \
		sysMon DSP Profiler V2 Latest Updates \
		Following screenshot captures the new UI of **sysMon DSP Profiler** V2 application where one can select the desired \
		DSP subsystem tab. \
		.lua \
		return E.left E.img src images/hp_profiler_UI_adsp.png \
		This sysMon DSP Profiler UI provides user flexibility to choose from different modes of profiling \
		DCVS Mode option checked \
		DSP DCVS if supported and enabled algorithm will be active for the profiling duration which can adjust DSP core and bus clocks dynamically. \
		DCVS Mode option un checked \
		DSP DCVS if supported will be disabled during profiling in this mode. \
		Default Mode option checked \
		A fixed set of performance metrics 8 PMU events will be monitored in this mode By default sampling period is either 1 or 50 milli seconds Profiler generates a packet at the end of every sampling rate window with the performance metrics captured in the window. \
		User can also provide a desired sampling period in multiples of one milli second with DCVS mode option unchecked to override sampling period in DSP while the collecting a fixed set of performance metrics 8 PMU events If DCVS Mode option is checked a sampling period input of 0 and 50 milli seconds will result in 1 milli second sampling interval while for 50 milli seconds sampling period input the sampling interval in DSP will be either 1 or 50 milli seconds as dictated by DCVS algorithm. \
		**NOTE ** The sampling period override option in this mode is **not** available for 8998. \
		Default Mode option un checked \
		With Default Mode option un checked user has choices to select the desired PMU events to be captured Click on Configuration button after un checking the Default Mode. \
		.lua \
		return E.left E.img src images/hp_profiler_pmu_config_button.png \
		Following screenshot lists the supported PMU events. \
		.lua \
		return E.left E.img src images/hp_profiler_pmu_config_1.png \
		.lua \
		return E.left E.img src images/hp_profiler_pmu_config_2.png \
		Configuration Settings button \
		This gets enabled only in user mode and user can select his desired PMU events to be captured The list of PMU events depends on the Q6 version of the DSP subsystem that are open for selection are \
		1 0x03 MPPS \
		2 0x03 pCPP \
		3 0x04 DMTV2 \
		4 0x07 DMTV3 \
		5 0x08 SMT \
		6 0x2A IPP \
		7 0x03 0x2A MIPS \
		8 0x7F L2 Fetch Miss \
		9 0x11 IU Stall \
		10 0x11 0xE9 Total Stall Cycles MCPS \
		13 0x41 AXI 32 Byte Line Read \
		14 0x43 AXI 32 Byte Line Write \
		11 0xCE AXI 64 Byte Line Read \
		12 0xCF AXI 64 Byte Line Write \
		13 0x3F AXI 128 Byte Line Read **Q6 version v66** \
		14 0x46 AXI 128 Byte Line Write **Q6 version v66** \
		15 0x44 AHB Read BW \
		16 0x45 AHB Write BW \
		17 0x3B 1 Thread Active % \
		18 0x3C 2 Thread Active % \
		19 0x3D 3 Thread Active % \
		20 0x3E 4 Thread Active % \
		21 0x25 1 Thread CPP \
		22 0x26 2 Thread CPP \
		23 0x27 3 Thread CPP \
		24 0x2F 4 Thread CPP \
		25 0xF0 HVX Thread MPPS **Q6 version v60** / 0x118 HVX Thread MPPS **Q6 version v65** \
		27 0xFC HVX L2 Load Miss / 0x11D HVX L2 Load Miss **Q6 version v65** \
		28 0xFC 0xF4 HVX Stall Cycles / 0x11D 0x106 HVX Stall Cycles **Q6 version v65** \
		Performance metrics captured are post processed and published on UI continuously with a refresh rate of one second. \
		8 PMU Mode option checkbox \
		8 PMU Mode checkbox gets enabled if Default Mode and DCVS Mode options are un checked In Default mode and DCVS modes disabled case user can select desired PMU events by Configuration Settings The list of PMU events selected from configuration settings can be profiled in two ways \
		1 4 PMU Mode Default 4 constant default PMU events and user configured PMU events scheduled 4 at a time from list of selected events \
		2 8 PMU Mode All the 8 PMU events are user configured scheduled 8 at a time from list of selected events \
		Stats collection \
		A binary is generated by profiler for post processing to excel sheet for further analysis. \
		In general one can pull the binary files from sdcard in the below mentioned path The app displays saved file path on stopping profiler for the corresponding subsystems. \
		**/sdcard/sysmon.bin** for ADSP \
		**/sdcard/sysmon_CDSP.bin** for CDSP \
		**/sdcard/sysmon_SDSP.bin** for SDSP \
		Command to pull the profiler output file from device using ADB \
		adb pull /sdcard/sysmon _cdsp/sdsp .bin destination directory / filename.bin \
		Post processing \
		Post processing executable can be found at \
		+ + + \
		**Chipset** **Parser location in SDK** \
		+ + + \
		8998 SDM660 SDM630 **Windows ** SDK_DIR /tools/utils/sysmon/parser_win/ \
		**Linux ** SDK_DIR /tools/utils/sysmon/parser_linux/ \
		+ + + \
		SDM845 SDM710 **Windows ** SDK_DIR /tools/utils/sysmon/parser_win_v2/ \
		SDM710 SDM845 \
		QCS605 SM8150 **Linux ** SDK_DIR /tools/utils/sysmon/parser_linux_v2/ \
		+ + + \
		Parser executable usage \
		Windows SysmonParser.exe Input file name .bin Output file name ModeType \
		LInux SysmonParser Input file name .bin Output file name ModeType \
		+ + + + + \
		**Parameter** **Property** **Value** **Description** \
		+ + + + + \
		Input file name Required Path to the profiler output bin file \
		including the file name with extension \
		extracted from the target \
		+ + + + + \
		Output file name Required Desired output file path including the \
		filename without extension \
		+ + + + + \
		ModeType Required default If Default mode option checked \
		+ + + \
		user If Default mode option is un checked \
		+ + + + + \
		**Example commands ** \
		SysmonParser sysmon.bin SysmonProfStat default \
		SysmonParser.exe sysmon.bin SysmonProfStat user \
		SysmonParser c /temp/sysmon.bin c /temp/SysmonProfStat user \
		Post processing script output file \
		Output of **SysmonParser** is an excel sheet saved with the name provided in Output file name argument The excel \
		sheet consists of below worksheets \
		Summary sheet \
		. \
		This work sheet will have the **AVG** **MAX** and **MIN** of all the metrics captured during profiling The overall statistics \
		are grouped under core bus L1 L2 and HVX metrics This is named as **Overall summary**. \
		Apart from publishing **Overall summary** the parser also detects ADSP core power collapse entry and exit and \
		assumes samples between power collapse exit to entry as one test case and displays the summary of each test case. \
		Under **Customized Data** user can enter the desired start and end row from **PostProcessed** sheet to generate \
		summary for the selected rows. \
		.lua \
		return E.left E.img src images/hp_sample_summary_sheet.png \
		PostProcessed sheet \
		. \
		This work sheet will have the post processed data of each PMU event at sampling period configured by user. \
		Apart from the post processed PMU events this sheet also captures NPA clock votes ADSPPM static votes DCVS votes \
		for ADSP core and bus clocks in each profiling window Also captured are heap statistics of GuestOS and UserPDs . \
		.lua \
		return E.left E.img src images/hp_sample_postprocessed_sheet.png \
		Analyzing profiling data \
		Summary sheet \
		. \
		Overall summary section and individual test sections of this sheet helps in understanding the use case performance \
		using the published metrics like MPPS pCPP AXI read and write bandwidths clock votes etc. \
		**MPPS Million packets per second ** \
		This metric captures the work done by the core for the given use case Average MPPS of real time use case is \
		constant independent of core clock Increase in MPPS for non real time use case for a given clock indicates \
		effective utilization of L1 and L2 cache. \
		**HVX Thread MPPS Million packets per second ** \
		This metric publishes the packets executed by HVX co processor in ADSP MPPS metrics captures both scalar core \
		and HVX core packets The MPPS executed on the scalar Q6 core can be calculated using \
		Q6 scalar MPPS MPPS HVX Thread MPPS \
		**Effective Q6 frequency MHz ** \
		This metric captures the actual load on the processor for the given work Ratio of effective Q6 frequency and \
		NPA core clock frequency can be used to get Q6 usage. \
		Q6 usage percentage Effective Q6 frequency / NPA core clock * 100 \
		The Q6 usage percentage approaching 100 indicates need for ADSP core to run at higher frequency to avoid any \
		glitches or frame drops MPPS and pCPP metrics together can be used to decide if the ADSP core clock vote or \
		bus clock vote has to be adjusted in this case. \
		**pCPP Processor cycles per packet ** \
		pCPP metric captures the average processor cycles taken per packet Lower the pCPP factor more is the work \
		done in ADSP for a given core clock frequency Core stalls due to bus accesses can result in a higher pCPP \
		factor Increasing the bus clock vote or prefetching data memory prior to actual usage can help in lowering \
		this factor and hence increasing the work done for a given core clock frequency. \
		**IU stall frequency MHz ** \
		IU stall frequency is derived from measured cycles that the core has stalled on instruction unit cache \
		accesses due to demand misses Higher the IU stall frequency higher can be the pCPP factor. \
		**DU stall frequency MHz ** \
		DU stall frequency is derived from measured cycles that the core has stalled on accessing L1 Data cache lines \
		due to demand misses Higher the DU stall frequency higher can be the pCPP factor DMT Dynamic Multi Threading \
		uses DU stalls of stalled thread and schedules other threads for efficient utilization of core clock DU stall \
		frequency will not fully convey stall of entire processor. \
		**AXI cached read/write bandwidth MBps ** \
		This metric publishes the AXI bus bandwidth DDR accesses generated by read/write access from the core due \
		to a cache line miss in L2 This includes both demand and prefetch misses in L2 cache. \
		**L2 fetch bandwidth MBps ** \
		Bus bandwidth generated by L2fetch instruction to prefetch data into L2 cache. \
		**Clock votes MHz ** \
		Core clock captures core clock frequency that ADSP Q6 is running at. \
		Bus clock vote captures overall ADSP vote for bus clock in MHz. \
		The final bus clock frequency done outside of ADSP will be based on votes from other subsystems \
		Application processor Modem etc. as well. \
		**Static clock votes MHz ** \
		Aggregated static votes from all clients for core and bus clocks. \
		**DCVS clock votes MHz ** \
		DCVS vote for core and bus clocks. \
		Post processed sheet \
		This sheet captures PMU metrics along with clock votes and heap statistics per profiling window Data collected \
		in each sample is extrapolated to per second data and published here This sheet is especially useful in \
		understanding the instantaneous load on ADSP and also work load distribution in a time frame. \
		Example plot of **Effective Q6 frequency** metric over time from **PostProcessed** sheet \
		.lua \
		return E.left E.img src images/hp_effec_q6_plot.png \
		Example of **Q6 load** plotted along with **core clock frequency** and **pCPP** over time \
		.lua \
		return E.left E.img src images/hp_q6load_plot.png \
		Example plot of **AXI bandwidth** over time \
		.lua \
		return E.left E.img src images/hp_axi_plot.png \
		Example plot of **MPPS** and **pCPP** over time \
		.lua \
		return E.left E.img src images/hp_mpps_cpp_plot.png \
		Command Line Execution \
		sysMon DSP Profiler can be invoked from command line using the below commands. \
		The below command will open the sysMon DSP Profiler app with Profiler UI displayed on the screen. \
		adb shell am start n com.qualcomm.qti.sysmonappExternal/com.qualcomm.qti.sysmonappExternal.AdspProfiler e q6 2 \
		e q6 DSPproc_value Input the required DSP on which you need to run the Profiler It is a mandatory parameter Default is ADSP 0 . \
		1 ADSP 0 \
		2 SDSP 2 \
		3 CDSP 3 \
		**To Start Profiler ** \
		adb shell am broadcast a com.qualcomm.qti.sysmonapp.RUN_EXT_FROM_ADB e startProfiler 1 e q6 2 e defaultMode 1 e samplingPeriod 10 e dcvsMode 0 n com.qualcomm.qti.sysmonappExternal/com.qualcomm.qti.sysmonappExternal.BootCompleteReceiverExternal \
		e q6 DSPproc_value Input the same DSP value with which you opened the Profiler app 0 ADSP 2 SDSP 3 CDSP . \
		e defaultMode 0/1 Input 1 if Profiler has to be run in Default Mode or 0 for User Mode when Default Mode is disabled By default Default Mode is enabled. \
		e samplingPeriod time_in_msec Input the desired samplingPeriod in milli seconds By default it is 1 milli second in User Mode and combination of 1 and 50 milli seconds in Default Mode. \
		e dcvsMode 0/1 Input 1 to enable DCVS during profiling or 0 to disable By default DCVS Mode is enabled when Default Mode is selected and disabled under User Mode. \
		e pmuMode 0/1 Input 1 to run profiler in 8 PMU mode By default this is 0 and it runs in 4 PMU mode. \
		This input becomes valid only when profiler is run in user mode and D \
		**To Stop Profiler ** \
		adb shell am broadcast a com.qualcomm.qti.sysmonapp.RUN_EXT_FROM_ADB e stopProfiler 1 e q6 2 n com.qualcomm.qti.sysmonappExternal/com.qualcomm.qti.sysmonappExternal.BootCompleteReceiverExternal \
		e q6 DSPproc_value Input the same DSP value on which you started the Profiler. \
		The pair of start and stop commands for Profiler can be run any number of times on the given DSP once the sysMon DSP Profiler app is opened. \
		The below command is to close the sysMon DSP Profiler app finally. \
		adb shell am force stop com.qualcomm.qti.sysmonappExternal \
		To run Profiler on different DSP one has to close the app and re open it with different DSP value and run start and stop commands with the corresponding DSP value. \
		CDSP Benchmarking Overview \
		CDSP Benchmarking is a feature in sysMon DSP Profiler for studying the performance of common image processing APIs \
		on DSP for the given duration and their performance metrics are captured. \
		Supported chipsets \
		All HVX based CDSP subsystems from SDM660. \
		SDM660 SDM845 SDM710 QCS605 SM8150 \
		Usage \
		Following screenshot captures the UI of **CDSP Benchmark** The chipset is auto detected and **CDSP Benchmark** tab appears under the appropriate Q6 tab. \
		.lua \
		return E.left E.img src images/hp_cdspbenchmark_UI.png \
		The user has choices to select \
		1 desired API \
		2 screen resolution \
		3 duration of execution \
		4 FPS \
		5 Power Level \
		6 DCVS Mode \
		7 Fix Power Level \
		8 HVX Units \
		9 Profiler \
		**Functions ** \
		+ + + \
		**Function Test** **Description** \
		+ + + \
		conv3x3 3x3 Convolution of image \
		+ + + \
		dilate3x3 3x3 Dilation filter of image \
		+ + + \
		dilate5x5 5x5 Dilation filter of image \
		+ + + \
		gaussian7x7 7x7 Gaussian filter of image \
		+ + + \
		integrate Performs image Integration to increase the light in an image \
		+ + + \
		epsilon Epsilon filter of image \
		+ + + \
		bilateral Bilateral filter of image \
		+ + + \
		fast9 Fast 9 version of Fast feature detector of image \
		+ + + \
		bilateral_vtcm Bilateral filter of image with VTCM and scatter/gather \
		+ + + \
		sobel3x3 3x3 Sobel filter of image \
		+ + + \
		fft1024 2D 1024x1024 FFT 8 bit real input 32 bit fixed point Q29.3 \
		complex output each row is 1024 reals followed by 1024 imaginary \
		+ + + \
		fft1024_vtcm 2D 1024x1024 FFT using VTCM as scratch buffer 8 bit real input \
		32 bit fixed point Q29.3 complex output each row is 1024 reals \
		followed by 1024 imaginary \
		+ + + \
		histogram Contrast adjustment using the image s histogram \
		+ + + \
		ncc8x8 Normalized cross correlation of two images To check degree to \
		which two images are similar \
		+ + + \
		**Note ** Functions listed after fast9 in the above table are available only from SDM845/SDM710. \
		.lua \
		return E.left E.img src images/hp_cdspbenchmark_api_list.png \
		**Screen Resolution ** \
		The functions can run on an image with the user specified image resolution The supported resolutions are 1080p 2160p 720p 480p and 16MP Default is 1080p. \
		**FPS ** \
		Frame per second can be chosen among 30 60 15 and 10 Default is 30 fps The function is called in the loop on the given image buffer at the rate of given fps. \
		**Total Time ** \
		User can specify duration of execution in seconds The function will execute in loop for the specified time duration at the rate of given fps and displays the average of \
		actual execution time on DSP Default is 10 seconds \
		**Power Level ** \
		The testcase can run in the user specified power level among Turbo Nominal Plus Nominal SVS Plus SVS SVS2 and MINSVS Default is Turbo. \
		**Fix Power Level ** \
		This option is applicable only for fullsuite If it s enabled all the supported benchmarks run only at the selected power level Else each benchmark will run in all the listed power levels. \
		**Power Mode ** \
		The testcase can run either in Perf mode or Power mode Perf mode will execute the API back to back with no sleep between the successive loop calls \
		whereas Power mode will execute the API at the rate of given fps Perf mode is irrespective of the input fps. \
		**DCVS Mode ** \
		DSP DCVS if enabled logic can adjust the DSP core and bus clocks dynamically during the execution of the testcase. \
		**HVX Units ** \
		User can select the number of HVX units to be used for the benchmark to run from min of 1 to max 4 Benchmarks such as integrate fft1024 and fft1024_vtcm supports max of 2 HVX units. \
		Supported only from SM8150. \
		**Profiler ** \
		Profiler option enabled by default will capture profiling metrics for the benchmark kernel when executed via **Execute Command** User can uncheck this option if profiling information is not needed. \
		After selecting the required parameters Click on **Execute Command** button to start the test case. \
		**Full Suite ** \
		Clicking on **Full Suite** button runs all the APIs on the all the possible power levels for the given fps and screen resolution Each API will run for the given duration. \
		Analyzing output data \
		Once the testcase is done the UI displays the result of execution DSP profiler also runs in default mode in parallel with the testcase and displays the PMU data. \
		.lua \
		return E.left E.img src images/hp_cdspbenchmark_resultscreen_1.png \
		The screenshot shows the profiler output of the testcase. \
		.lua \
		return E.left E.img src images/hp_cdspbenchmark_resultscreen_2.png \
		Also The result of the testcase can be pulled from /sdcard/CDSP_Benchmark.csv for future reference. \
		Following screenshot shows the result of Full Suite run on 1080p with 30fps. \
		.lua \
		return E.left E.img src images/hp_cdspbenchmark_resultcsv.png \
		**DSP Clock MHz ** \
		This captures core clock frequency of DSP Q6 during the testcase. \
		**RPC loops ** \
		RPC loops is the loop count that decides the number of times the API is executed at the rate of given fps RPC loops is calculated from user specified total time and FPS. \
		RPC loops total time / time per frame 1 sec * 1000 / 33.333 ms ~ 30 \
		**Total Time ** \
		This displays the actual time for the completion of the testcase. \
		**DSP time uSec ** \
		This displays the total time for the API to run on DSP excluding the RPC latency. \
		**DSP time per iteration uSec ** \
		This displays the average time on DSP per iteration excluding the RPC latency. \
		**RPC overhead per call uSec ** \
		This displays the average RPC latency on API call to DSP. \
		**Average NCC ROI Search Time uSec ** \
		The time taken to find the region of interest that limits the search area Applicable only for ncc8x8 benchmark.	",
	"id":31
}
idx.add(doc)
urls[31]='sysMon_DSP_Profiler_V2.html'
titles[31]="sysMon DSP Profiler V2"

var doc = {
	"title": "HVX Resource Manager (HVX RM) for SDM660",
	"body": " \
		Overview \
		SDM660 CDSP has 2x128B / 4x64B HVX units Once a thread locks a HVX resource it can t be shared with others untill it s unlocked Depending on the type of QuRT HVX lock call when there is no available HVX unit to lock either the API returns failure qurt_hvx_try_lock or waits indefinitely for an available HVX unit qurt_hvx_lock HVX Resource Manager HVX RM implements a timeout for each of these QuRT HVX lock requests and is transparent to the user A thread requesting for a HVX unit is pushed to a wait queue when there is no available HVX unit until the requested resource is available or on the timeout event which ever happens first. \
		HVX RM is by default enabled in SDM660 CDSP builds. \
		HVX RM QURT \
		4 x 64B units available \
		qurt_hvx_try_lock 128B \
		PD0 Thread 1 2 units locked by PD0 Thread 1 Lock request/response \
		Lock success \
		2 x 64B units available \
		qurt_hvx_try_lock 128B \
		Lock request/response \
		PD0 Thread 2 2 units locked by PD0 Thread 2 \
		Lock success \
		No unit available \
		qurt_hvx_try_lock 128B \
		PD1 Thread 1 No unit is available to lock Put \
		the thread into a wait queue and \
		dequeue when there is a free unit \
		or when a timeout event happens \
		Uses timeout for qurt_hvx_try_lock \
		corresponding to this PD Timeout configured \
		Timeout running \
		qurt_hvx_unlock \
		Unlock request/response \
		PD0 Thread 1 2 units are available check the \
		wait queue and assign the free Timeout cancelled \
		Lock success unit to the one waiting and reset Lock request/response \
		PD1 Thread 1 corresponding timeout event \
		Unlock success \
		PD0 Thread 1 \
		No unit available \
		qurt_hvx_try_lock 128B \
		PD0 Thread 1 No unit is available to lock Put \
		the thread into a wait queue and \
		dequeue when there is a free unit \
		or when a timeout event happens \
		Uses timeout for qurt_hvx_try_lock \
		corresponding to this PD Timeout configured \
		Timeout running \
		Timed out \
		Request timed out in wait queue \
		Lock failure Dequeue and return failure \
		PD0 Thread 1 \
		HVX RM Configuration \
		HVX RM configuration parameters are stored in device configuration data of sysMon This device configuration data is part of a CDSP build \
		Device configuration XML file CDSP Build /cdsp_proc/performance/sysmon/config/660/sysmon_660_cdsp.xml \
		Device configuration data file CDSP Build /cdsp_proc/performance/sysmon/config/660/sysmon_configdata_660_cdsp.c \
		HVX RM Enable field \
		HVX RM is enabled by default in SDM660 CDSP builds and can be disabled if needed by compiling corresponding CDSP build using the device configuration data of sysMon. \
		.ccode \
		//Device configuration XML file CDSP Build /cdsp_proc/performance/sysmon/config/660/sysmon_660_cdsp.xml \
		. \
		props name HVX_RESOURCE_MGR_ENABLE type DALPROP_ATTR_TYPE_UINT32 \
		1 \
		/props \
		. \
		Modifying the HVX_RESOURCE_MGR_ENABLE property value to 0 from 1 will disable HVX RM. \
		Default timeout fields \
		There are default timeouts configured for each of the QuRT HVX lock calls i.e qurt_hvx_lock and qurt_hvx_try_lock Following methods can be used to override these default timeout values \
		1 Compile time needs CDSP build re compilation \
		Change device configuration data of sysMon providing desired timeout values for qurt_hvx_try_lock / qurt_hvx_lock calls and recompile the CDSP build. \
		.ccode \
		//Device configuration data file CDSP Build /cdsp_proc/performance/sysmon/config/660/sysmon_configdata_660_cdsp.c \
		. \
		const sd_hvx_rm_descriptor_t hvxRMDesc \
		/* resThresPerc 100 */ 50 //Threshold in percentage to be used in HVX reserve calls Max 100. \
		/* tryLockTimeout */ 200 //Default timeout in milli seconds for qurt_hvx_try_lock call \
		/* lockTimeout */ 200 //Default timeout in milli seconds for qurt_hvx_lock call \
		/* obsWinDur */ 200 //Observation window for tracking resource activity \
		. \
		2 Run time per user process \
		Use int resmgr_hvx_config_update resmgr_hvx_config_t* config API to override the defaults for the calling process/PD exposed under Hexagon SDK /incs/hvx_resmgr.h . \
		Also int resmgr_hvx_lock_timeout qurt_hvx_mode_t lock_mode unsigned int timeout API is exposed under Hexagon SDK /incs/hvx_resmgr.h which accepts timeout value as a parameter instead of relying on the defaults This can be used instead of qurt_hvx_lock and qurt_hvx_try_lock calls. \
		Existing QuRT APIs and their behavior \
		+ + + + \
		API without HVX RM with HVX RM \
		+ + + + \
		**qurt_hvx_lock** Returns success if unit is free Returns success if unit is free \
		or or \
		Indefinite wait till free unit is available Wait till a free unit is available until a timeout event is triggered \
		Returns success if a unit becomes available within timeout failure otherwise \
		+ + + + \
		**qurt_hvx_try_lock** Retruns success if unit is free Returns success if unit is free \
		or or \
		Returns failure if no unit is free or on mode mismatch Return failure if the unit being locked is of a different HVX mode then the current configured one \
		or or \
		Wait till a free unit is available until a timeout event is triggered \
		Returns success if a unit becomes available within timeout failure otherwise \
		+ + + + \
		**qurt_hvx_reserve** Only one process can reserve Allows multiple reserves from different processes Only allows one reserve per process \
		Returns failure for subsequent reserves called from Returns success with number of units as long as total units reserved across processes are less than 4 OR \
		other processes or from the same process if usage of requested HVX units is in limits **resThresPerc** in the observation window **obsWinDur** \
		Returns failure otherwise \
		**Note** To allow concurrency HVX reserve doesn t actually block the requested HVX units but treats \
		the lock requests originating for the process with higher priority \
		+ + + + \
		Other QuRT HVX APIs functionality remains unchanged Refer qurt_hvx.h file for all QuRT HVX APIs \
		Newly added APIs \
		The newly added APIs are valid only when HVX RM is enabled and are exposed using the header file at Hexagon SDK /incs/hvx_resmgr.h \
		resmgr_hvx_lock_timeout \
		HVX lock with user provided timeout in micro seconds Provided timeout should be a multiple of 100 the API will internally round it to the nearest 100 micro second multiple otherwise 100 will be treated as 0 . \
		+ + + \
		API int **resmgr_hvx_lock_timeout** qurt_hvx_mode_t **lock_mode** unsigned int **timeout** \
		+ + + \
		Return 0 for success non zero for failures \
		+ + + + \
		Parameters **lock_mode** **qurt_hvx_mode_t** Desired HVX mode \
		.ccode \
		//file qurt_hvx.h \
		typedef enum \
		QURT_HVX_MODE_64B 0 /** HVX mode of 64 bytes */ \
		QURT_HVX_MODE_128B 1 /** HVX mode of 128 bytes */ \
		qurt_hvx_mode_t \
		+ + + \
		**timeout** timeout value in micro seconds multiple of 100 \
		+ + + + \
		Example \
		. \
		.ccode \
		//Acquire HVX lock on a 128B unit with a timeout of 3 milli seconds \
		int result resmgr_hvx_lock_timeout QURT_HVX_MODE_128B 3000 \
		if 0 ! result \
		//failed to allocate the resource Return. \
		return \
		//Successfully acquired HVX unit \
		//Do necessary operations \
		//Release the unit once done \
		qurt_hvx_unlock \
		resmgr_hvx_config_update \
		Overrides default timeouts for qurt_hvx_lock and qurt_hvx_try_lock calls with user provided values for the subsequent calls originating from the caller process. \
		+ + + \
		API int **resmgr_hvx_config_update** resmgr_hvx_config_t/* **config** \
		+ + + \
		Return 0 for success non zero for failures \
		+ + + + \
		Parameters **config** **resmgr_hvx_config_t/*** pointer to the configuration structure \
		.ccode \
		//file hvx_resmgr.h \
		typedef struct \
		unsigned char bTryLockTimeout \
		/** 1 enable tryLockTimeout override \
		0 use default tryLockTimeout */ \
		unsigned int tryLockTimeout \
		/** Desired timeout for qurt_hvx_try_lock API in micro seconds \
		Will be honored only if btryLockTimeout 1 \
		Should be a multiple of 100 micro seconds */ \
		unsigned char bLockTimeout \
		/** 1 enable tryLockTimeout override \
		0 use default tryLockTimeout */ \
		unsigned int lockTimeout \
		/** Desired timeout for qurt_hvx_lock API in micro seconds \
		Will be honored only if bLockTimeout 1 \
		Should be a multiple of 100 micro seconds */ \
		resmgr_hvx_config_t \
		+ + + + \
		Example \
		. \
		.ccode \
		/* Try acquiring a 64B HVX unit using default timeout */ \
		int result qurt_hvx_try_lock QURT_HVX_MODE_64B \
		if 0 result \
		/* Successfully acquired a HVX unit */ \
		. \
		/* Release the acquired resource */ \
		qurt_hvx_unlock \
		/* Override default timeout for qurt_hvx_try_lock calls while leaving the default timeout for qurt_hvx_lock calls \
		* originating from this user process */ \
		resmgr_hvx_config_t hvxRMConfig \
		hvxRMConfig.bTryLockTimeout 1 //Enable qurt_hvx_try_lock timeout override \
		hvxRMConfig.tryLockTimeout 3000 //3 milli seconds timeout \
		hvxRMConfig.bLockTimeout 0 //Disable qurt_hvx_lock timeout override i.e use default timeout from device configuration data \
		resmgr_hvx_config_update &hvxRMConfig \
		. \
		int result qurt_hvx_try_lock QURT_HVX_MODE_64B //This lock call will use the new timeout of 3 milli seconds as configured for this PD \
		if 0 result \
		/* Successfully acquired a HVX unit */ \
		. \
		/* Release the acquired resource */ \
		qurt_hvx_unlock \
		. \
		/* Remove timeout override to fallback to the defaults */ \
		resmgr_hvx_config_t hvxRMConfig \
		hvxRMConfig.bTryLockTimeout 0 //Disable qurt_hvx_try_lock timeout override i.e use default timeout from device configuration data \
		hvxRMConfig.bLockTimeout 0 //Disable qurt_hvx_lock timeout override i.e use default timeout from device configuration data \
		resmgr_hvx_config_update &hvxRMConfig	",
	"id":32
}
idx.add(doc)
urls[32]='HVX%20Resource%20Manager.html'
titles[32]="HVX Resource Manager (HVX RM) for SDM660"

var doc = {
	"title": "FastRPC Debugging",
	"body": " \
		Introduction \
		For a FastRPC session between a client application on the apps processor and a service running on the DSP error message logging is available from both the apps processor and the DSP. \
		The messages from user space and kernel space on the apps processor are logged in logcat and dmesg respectively The messages from DSP are logged to either mini DM please refer [mini DM] Debugging_Message%20Logging.html mini dm or in logcat please refer [logcat] Debugging_Message%20Logging.html logcat . \
		To search FastRPC errors from apps or dsp adsp/cdsp/mdsp/slpi on logcat use following tag names adsprpc or process name e.g adb logcat s adsprpc. \
		To search FastRPC errors from dsp adsp/cdsp/mdsp/slpi on mini DM use following tag names fastrpc rtld listener sigverify map_object or mod_table \
		If you don t find your error code here then please refer HEXAGON_SDK_ROOT /incs/stddef/AEEStdErr.h file for complete list of error codes. \
		Error Analysis \
		Operation not permitted \
		.pre \
		Error ffffffff apps_dev_init failed domain 3 errno Operation not permitted \
		This error is seen when FastRPC fails to open a session with DSP or fails to create a corresponding user process on DSP. \
		* Check whether DSP is up and running Refer [[Checking DSP State]] section for details. \
		If DSP is not up and running then please contact Customer Engineering CE Team. \
		* Check whether the timestamp of fastrpc_shell_ 0/3 file located on target at /dsp/ adsp/cdsp / For Android P /vendor/dsp/ adsp/cdsp / matches with timestamp of fastrpc_shell_ 0/3 file on ADSP/CDSP image located at adsp_proc/cdsp_proc /build/dynamic_modules/670.cdsp.prod/ . \
		If timestamp doesn t match then flash ADSP/CDSP build again properly. \
		* Check mini DM logs for any errors during user PD creation. \
		Transport endpoint not connected \
		.pre \
		Error 0xffffffff apps_dev_init failed for domain 0 errno Transport endpoint is not connected \
		This error happens when DSP is not up To check whether DSP is up and running refer [[Checking DSP State]] section for details. \
		If DSP is not up and running then please contact Customer Engineering CE Team. \
		rpcmem_alloc Error \
		.pre \
		adsprpc src/rpcmem_android.c 284 error 1 0 ioctl rpcmem_ionfd ION_IOC_ALLOC_KK &alloc \
		adsprpc src/rpcmem_android.c 158 rpcmem jb allocation error 1 trying ics \
		adsprpc src/rpcmem_android.c 329 error 1 0 ioctl rpcmem_ionfd ION_IOC_ALLOC_ICS &alloc \
		adsprpc src/rpcmem_android.c 159 error 1 0 nErr rpcmem_contig_alloc_ics m heap_mask size &po \
		Above errors will be seen if you are using SDK version 3.3.3 for SM8150 or any later device. \
		FastRPC s rpcmem module has been updated in SDK 3.4.0 for SM8150 due to ION upgrade. \
		* So if you see above errors on logcat and if you are using SM8150 or any later device then please update your SDK to 3.4.0 or later. \
		Sigverify failure \
		.pre \
		1 CDSP signature verify start failed for xxxx _skel.so \
		Above error is seen when signature file testsig xxxx .so for the particular target is not found This file is needed to run dynamic shared object xxxx _skel.so on DSP. \
		Please check for the steps given below \
		* Check whether testsig xxxx .so is present in the ADSP_LIBRARY_PATH environment variable which the user is free to re define The default search paths are \
		ADSP_LIBRARY_PATH /system/lib/rfsa/adsp /system/vendor/lib/rfsa/adsp /dsp \
		* If testsig xxxx .so is present then check whether the serial number for the generated testsig and the device matches \
		The testsig xxxx .so file name contains the serial number in hexadecimal format for e.g testsig 0x980162fc .so \
		This serial number should match with the device serial number which can be obtained by pushing getserial application from SDK Please refer [Get Device Serial Number] Tools_Signing.html Obtaining%20Device%20Serial%20Number document for details. \
		* If testsig xxxx .so is not present then please refer [Signing the Device] Tools_Signing.html TestSigs document for details. \
		.pre \
		2 [sigverify.c 552] 00 CDSP failed to finalize verify segment 15 9b d6 vs pHash C01FC1E1 \
		[map_object.c 805] 00 CDSP Segment [0] failed streamed SigVerify for fastrpc_shell_ 0/3 \
		Above error is seen when there is a mismatch between FastRPC shell on target and ADSP/CDSP image. \
		* Check whether the timestamp of fastrpc_shell_ 0/3 file located on target at /dsp/ adsp/cdsp / For Android P /vendor/dsp/ adsp/cdsp / matches with timestamp of fastrpc_shell_ 0/3 file on ADSP/CDSP image located at adsp_proc/cdsp_proc /build/dynamic_modules/670.cdsp.prod/ . \
		If timestamp doesn t match then flash ADSP/CDSP build again properly. \
		PD Creation failure \
		.pre \
		[fastrpc_loader.c 577] 00 CDSP Error ffffffff 0 loading process failed for /frpc/c03f9430 calculator \
		[fastrpc_loader.c 814] 00 CDSP spawn for calculator failed \
		Generally PD is created during the first remote call made to DSP If you see above errors from DSP check for the below steps \
		* PD creation can fail if there is no permission to access fastrpc_shell_ 0/3 file located on target at /dsp/ adsp/cdsp / For Android P /vendor/dsp/ adsp/cdsp / \
		* PD creation can also fail because of file read failures on HLOS. \
		Check for the avc denial errors in kernel logs. \
		for ex Below avc denial errors are for /dsp folder. \
		dmesg avc denied open for pid 10222 comm XXXXXXXXX path /dsp/fastrpc_shell_0 \
		dev sdd7 ino 26 scontext u r xxxxxxxx s0 tcontext u object_r unlabeled s0 tclass file permissive 1 \
		SEPF_SECMOBILE_7.0_0002 \
		If above errors are found check whether Selinux policy is defined properly for your process. \
		For example For cameraserver process to be able to access a particular directory following entry should be there in cameraserver.te file located at HLOS_Build /device/qcom/sepolicy/vendor/common/cameraserver.te \
		r_dir_file cameraserver adsprpcd_file allow cameraserver to access /dsp \
		* PD creation can fail if the fastrpc_shell does not match the flashed DSP image If you see errors as below in QXDM or mini dm \
		.pre \
		[sigverify.c 552] 00 CDSP failed to finalize verify segment 31 f1 27 vs pHash C01FE271 \
		[map_object.c 405] 00 CDSP Streaming Hash Finalize error \
		[map_object.c 410] 00 CDSP Error pared thread failed segnum 0 \
		[map_object.c 805] 00 CDSP Segment [0] failed streamed SigVerify for fastrpc_shell_3 \
		[fastrpc_loader.c 577] 00 CDSP Error ffffffff 0 loading process failed for /frpc/c0415ca0 calculator \
		[stdout 1] 00 CDSP SPAWN FAILED process failed to load \
		Check whether the timestamp of fastrpc_shell_ 0/3 file located on target at /dsp/ adsp/cdsp / For Android P /vendor/dsp/ adsp/cdsp / matches with timestamp of fastrpc_shell_ 0/3 file on ADSP/CDSP image located at adsp_proc/cdsp_proc /build/dynamic_modules/ 670 .cdsp.prod/ . \
		If timestamp doesn t match then flash ADSP/CDSP build again properly. \
		Error 39 27 in hex \
		.pre \
		Error 27 remote handle invoke failed domain 3 handle 3 sc 4020200 pra 0x72b7cc13f8 \
		AEE_ENOSUCH 39 0x27 \
		Above error means an exception occurred in user process on DSP domain 3 CDSP and user process got killed. \
		Further FastRPC calls will return the same error code 39 Clients are expected to handle this error code and restart the session. \
		* If you are using SM8150 or any later device then please refer [Crash Details] Debugging_Exceptions.html document for getting the crash details. \
		* If you are using a device prior to SM8150 then the only way to debug user exceptions through SDK is using remote debugger on DSP Please refer [Remote Debugging] Debugging_Target.html document for details. \
		This error may also be seen if you are using a shared object that is built with invalid architecture. \
		Please check below for Hexagon version details for your target. \
		.pre \
		Target Hexagon Version \
		MSM8996 V60 \
		MSM8998 V62 \
		SDM660 V62 aDSP V60 cDSP \
		SDM670 V65 \
		SDM845 V65 \
		SM7150 V65 \
		SM6150 V66 \
		SM8150 V66 \
		QCS405 V66 \
		Error 80000406 \
		.pre \
		Error 80000406 remote handle open domain failed. domain 2 name adspmsgd_adsp dlerror cannot open xxxxx _skel.so \
		AEE_EUNABLETOLOAD \
		This error is seen when the process failed to load the shared object on DSP. \
		* Check that shared object files are present on target in the directories defined by ADSP_LIBRARY_PATH environment variable which the user is free to re define The default search paths are \
		ADSP_LIBRARY_PATH /system/lib/rfsa/adsp /system/vendor/lib/rfsa/adsp /dsp \
		* This error can also be seen if the process doesn t have permissions to access the directory in which shared object files are present. \
		Check for the avc denial errors in kernel logs. \
		for ex Below avc denial errors are for /dsp folder. \
		dmesg avc denied open for pid 10222 comm XXXXXXXXX path /dsp/fastrpc_shell_0 \
		dev sdd7 ino 26 scontext u r xxxxxxxx s0 tcontext u object_r unlabeled s0 tclass file permissive 1 \
		SEPF_SECMOBILE_7.0_0002 \
		If above errors are found check whether Selinux policy is defined properly for your process. \
		For example For cameraserver process to be able to access a particular directory following entry should be there in cameraserver.te file located at HLOS_Build /device/qcom/sepolicy/vendor/common/cameraserver.te \
		r_dir_file cameraserver adsprpcd_file allow cameraserver to access /dsp \
		* Check mini DM logs for any dlopen errors. \
		Error 80000402 \
		.pre \
		Error 80000402 remote handle invoke failed domain 3 handle b89040f0 sc 3020200 pra 0x85205698 \
		AEE_ENOMEMORY 0x80000402 \
		This error indicates that there is not enough memory in FastRPC Heap to allocate memory for stack allocation and thread creation in the userPD on DSP. \
		If you see above errors then please contact FastRPC Support Team/Customer Engineering CE Team. \
		Error 8000040e \
		.pre \
		CDSP Error 8000040e open_mod_table_handle_invoke failed for handle 7d203f50 sc 8010000 0714 mod_table.c \
		AEE_EBADPARM 0x8000040e \
		This error happens when wrong parameters are passed to the Skel function. \
		This can also happen due to the mismatch between Stub and Skel files. \
		* Check that proper Stub and Skel files are pushed to the target and if any duplicate copies exist in directories defined by ADSP_LIBRARY_PATH environment variable which the user is free to re define The default search paths are \
		ADSP_LIBRARY_PATH /system/lib/rfsa/adsp /system/vendor/lib/rfsa/adsp /dsp \
		Undefined PLT symbol \
		.pre \
		dlopen error file ///libsysmondomain_skel.so?sysmondomain_skel_handle_invoke&_modver 1.0&_dom sdsp undefined symbol PLT \
		This error comes from DSP when a symbol is used in shared object but not exposed in FastRPC shell. \
		This error can also be seen if the symbol belongs to shared object but its definition is missing. \
		Fopen failure \
		.pre \
		Error 45 fopen failed for xxxxx _skel.so No such file or directory \
		If you see Fopen failure messages like above in logcat then follow the below steps \
		* Check that the file xxxxx _skel.so is present on target in the directories defined by ADSP_LIBRARY_PATH environment variable which the user is free to re define The default search paths are \
		ADSP_LIBRARY_PATH /system/lib/rfsa/adsp /system/vendor/lib/rfsa/adsp /dsp \
		* Check whether Selinux policy is defined properly for your process. \
		For example For cameraserver process to be able to access a particular directory following entry should be there in cameraserver.te file located at HLOS_Build /device/qcom/sepolicy/vendor/common/cameraserver.te \
		r_dir_file cameraserver adsprpcd_file allow cameraserver to access /dsp \
		Checking DSP State \
		To check whether DSP is up and running use any one of the two ways mentioned below \
		1 Check whether DSP is brought out of reset If DSP is up then below messages will get logged in kernel serial port logs \
		[ 23.314302] subsys pil tz 62400000.qcom lpass adsp loading from 0x0000000093e00000 to 0x0000000095c00000 \
		[ 23.751586] subsys pil tz 62400000.qcom lpass adsp Brought out of reset \
		[ 23.794788] subsys pil tz 62400000.qcom lpass adsp Power/Clock ready interrupt received \
		1 You can also check for state of DSP with the help of below commands \
		Find the proper subsystem node for ADSP adb shell cat /sys/bus/msm_subsys/devices/subsys 1/2/3/4 /name should show adsp/cdsp . \
		Then run adb shell cat /sys/bus/msm_subsys/devices/subsys 1/2/3/4 /state to find whether it is ONLINE .	",
	"id":33
}
idx.add(doc)
urls[33]='Introduction%20to%20FastRPC%20Debugging.html'
titles[33]="FastRPC Debugging"

var doc = {
	"title": "﻿Using Eclipse to Run/Debug v65 application on Hexagon simulator",
	"body": " \
		Overview \
		This chapter describes how to use the IDE to run/debug v65 executable on the simulator. \
		Here benchmark_v65 is taken as an example. \
		Please use the following steps Steps to debug v66 application are also same as below it is as simple as replacing v65 with v66 everywhere it appears in the instructions. \
		Step 1 – Import Hexagon SDK example project to workspace \
		To import the example into your Eclipse workspace right click in Project Explorer and select \
		Import C/C++ Existing Code as Makefile Project . \
		.lua \
		return E.left E.img src images/import_makefile_project.png \
		In the dialog box specify the following project properties \
		**Project name** – benchmark_v65 \
		**Project location** – Hexagon SDK root dir /examples/compute/benchmark_v65 \
		**Toolchain** – select Hexagon LLVM Tool chain \
		Click on the Finish button to finish importing the project. \
		.lua \
		return E.left E.img src images/import_benchmark_v65.png \
		Step 2 – Build project \
		To build the imported project \
		Right click on the project select properties and then C/C++ Build . \
		Under Builder settings enter the build command as **make V hexagon_Debug_dynamic_toolv82_v65 VERBOSE 1** or enter your target appropriate build flavor . \
		Note In above build command toolv82 represents 8.2 toolset For SDK 3.4.2 default toolset is 8.3.02 so you need to use toolv83 instead of toolv82. \
		While debugging Debug build flavors are recommended when possible over Release/ReleaseG to avoid possible confusions caused by the compiler optimizer. \
		.lua \
		return E.left E.img src images/benchmark_v65_build_settings.png \
		Under Behaviour tab set Build textbox to **tree** and Clean textbox to **tree_clean** \
		.lua \
		return E.left E.img src images/build_behaviour.png \
		Build the project by right clicking on the project and select Build Project \
		.lua \
		return E.left E.img src images/target_debug_build_project.png \
		Step 3 – Run project \
		To run the project right click on the project in Project Explorer and choose Run As Run Configuration . \
		This command displays the Run Configurations dialog box which enables you to configure the simulator program arguments and runtime environment. \
		For simulator target is runelf.pbn It is a qurt image that loades user elf benchmark_q and calls main So please fill C/C++ Application field with the path of runelf.pbn \
		.lua \
		return E.left E.img src images/benchmark_run_as.png \
		The dialog box display tabs for configuring the simulator program arguments and runtime environment. \
		Note that the left hand pane in the dialog box includes a newly created runtime configuration \
		named benchmark which appears under the item Hexagon C/C++ Application . \
		To specify the simulator arguments click on the Simulator tab in the dialog box For this example please give following options in miscellaneous flag section. \
		.pre \
		simulated_returnval usefs hexagon_Debug_dynamic_toolv83_v65 l2tcm_base 0xd800 rtos hexagon_Debug_dynamic_toolv83_v65/osam.cfg \
		.lua \
		return E.left E.img src images/benchmark_sim_args.png \
		To specify the program arguments click on the Arguments tab in the dialog box and provide arguments as follows \
		.pre \
		D /Qualcomm/Hexagon_SDK/3.4.1/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv82_v65/run_main_on_hexagon_sim \
		hexagon_Debug_dynamic_toolv82_v65/benchmark_q.so f epsilon w 256 h 64 \
		Starting from 3.4.1 SDK simulator command line has been changed and it includes **run_main_on_hexagon_sim ** in the beginning. \
		.lua \
		return E.left E.img src images/benchmark_program_args.png \
		To execute the program click on the Run button at the bottom of the dialog box. \
		For Run configuration the goal is the have the final execution line same as we do it manually as run make in shell. \
		The dialog box closes and the following output which includes the benchmark_q output is displayed in the console of the main IDE window. \
		.lua \
		return E.left E.img src images/benchmark_run_output.png \
		Step 4 – Define LLDB_HEXAGON_BOOTER_PATH \
		Before start debugging benchmark_v65 project LLDB_HEXAGON_BOOTER_PATH env variable needs to be defined. \
		To define it right click on the project select properties C/C++ Build Environment tab and then \
		click on Add button and fill name as LLDB_HEXAGON_BOOTER_PATH and value as Hexagon SDK root dir /libs/common/qurt/computev65/sdksim_bin/runelf.pbn . \
		.lua \
		return E.left E.img src images/benchmark_v65_environment.png \
		When lldb gets down to the simulator launch it will check for this environment variable If it exists it will treat this environment variable as the main target runelf.pbn \
		and pick the originial target benchmark_q as first argument to main target runelf.pbn . \
		Step 5 – Debug project \
		To configure the debug environment right click on the project in Project Explorer and choose Debug As Debug configuration . \
		This command displays the Debug Configurations dialog box Using the tabs in this dialog box you can configure the debugger program arguments and runtime environment. \
		.lua \
		return E.left E.img src images/benchmark_debug_configs.png \
		Change C/C++ Application to run_main_on_hexagon_sim Please note that this value is runelf.pbn in Run configuration. \
		runelf.pbn will be picked up from LLDB_HEXAGON_BOOTER_PATH env variable. \
		you will see a error message Multiple launchers available select one to continue on top of the debug wizard Please click on Select one . \
		A prompt will appear asking you to Select Preferred Launcher This dialog won t appear if Run was performed previously \
		.lua \
		return E.left E.img src images/select_preffered_launcher.png \
		Click on Use configuration specific settings and then select Standard Create LLDB Debug Process Launcher \
		Arguments under Target tab are same as Simulator tab arguments in Run configuration. \
		.pre \
		Note You can pass arguments in either of the following ways \
		1 hexagon_Debug_dynamic_toolv82_v65/benchmark_q.so f epsilon w 256 h 64 Make sure there is no space between hyphen and the variant name \
		2 hexagon_Debug_dynamic_toolv82_v65/benchmark_q.so f epsilon w 256 h 64 If you are using four hyphen space is not mandatory \
		Please remove run_main_on_hexagon_sim from Program arguments as run_main_on_hexagon_sim is specified as C/C++ application in Main tab \
		.lua \
		return E.left E.img src images/benchmark_debug_program_args.png \
		set breakpoint at test_main_start as follows \
		.lua \
		return E.left E.img src images/benchmark_set_breakpoint.png \
		Breakpoint can be set at main also but it will hit main of run_main_on_hexagon_sim first and main of your simulator test next. \
		To avoid this it is recommended to set breakpoint at test_main_start so that lldb can directly break in simulator test. \
		Click and Apply and Debug You should be prompted now to open the Debug perspective and click Yes. \
		It should launch the executable and break at main as shown below. \
		.lua \
		return E.left E.img src images/benchmark_debug_view.png \
		The debug perspective enables you to perform debugging operations such as stepping disassembly setting breakpoints viewing/modifying variables and viewing registers. \
		For example clicking on the Registers tab of the debug perspective displays the contents of the Hexagon processor registers. \
		If any debug related information is not displayed you can display it by choosing Show View from the Window menu.	",
	"id":34
}
idx.add(doc)
urls[34]='benchmark_v65_simulator_debug.html'
titles[34]="﻿Using Eclipse to Run/Debug v65 application on Hexagon simulator"

var doc = {
	"title": "calculator_c++14 walk-through",
	"body": " \
		Overview \
		Calculator_c++14 is an example for using c++14 in shared objects. \
		Refer [calculator_c++] calculator_c++.html for standard c++. \
		This walk through is a step by step guide to building loading \
		and executing the calculator_c++14 example on Android It assumes you have \
		an Android device working with adb See [[Prerequisites]] for more \
		information. \
		The following steps except [[Prerequisites]] are captured in the scripts \
		For Windows \
		Hexagon SDK Dir /examples/common/calculator_c++14/calculator_c++14_walkthrough.py \
		For Linux \
		Hexagon SDK Dir /examples/common/calculator_c++14/calculator_c++14_walkthrough.py \
		calculator_c++ example creates an android application which remotely invokes \
		C++ functions on DSP using fastrpc. \
		calculator_plus method arguments \
		For example \
		calculator_plus sum 10 \
		calculator_plus uppercase_count aDSP \
		Prerequisites \
		This walk through assumes you have an Android device that supports \
		both FastRPC and Dynamic Loading. \
		The device should be loaded with DSP image \
		If you are using an existing DSP image confirm and setup FastRPC on Android \
		by following these [instructions] APIs_FastRPC.html Setup . \
		Building \
		Before building ensure the Hexagon SDK s dependencies are properly setup The \
		installer should have done this for you See [Setup Instructions] readme.html If you encounter issues please see \
		[Dependencies] Dependencies_Common.html . \
		Rules to build libraries are specified in hexagon.min and android.min files. \
		Libraries building for hexagon are \
		libcalculator_plus_skel.so skel file of calculator_c++14 \
		calculator_q Simulator test application \
		Application building for Android is \
		calculator_plus application to run tests on hexagon from android shell \
		Use CXX_FLAGS to enable C++14 support. \
		CXX_FLAGS + std c++14 \
		Link libc++ library with skel shared object \
		For Dynamic Linking \
		libcalculator_plus_skel_DLLS + $ TARGET_DIR /pic/libc++ \
		libcalculator_plus_skel_DLLS + $ TARGET_DIR /pic/libc++abi \
		For Static Linking \
		libcalculator_plus_skel_LIBS + $ TARGET_DIR /pic/libc++ \
		libcalculator_plus_skel_LIBS + $ TARGET_DIR /pic/libc++abi \
		When building the calculator_c++ example both the stub and skel must be \
		compiled and linked This can be done by compiling both for the variant desired \
		on the DSP as well as the application processor For example to create a \
		stub/skel pair for Android and Hexagon the following commands must be \
		executed \
		First change directory to the calculator_c++ example \
		cd Hexagon SDK Dir /examples/common/calculator_c++14 \
		Next build the Android and Hexagon modules Use CDSP_FLAG 1 for Android module to off load to CDSP based targets Eg SDM660 \
		make tree V android_Debug_aarch64 [CSDP_FLAG 1] \
		make tree V hexagon_Debug_dynamic_toolv82_v65 VERBOSE 0 \
		For more information on build syntax see [Make.d] Environments_Build System.html \
		Simulator testing \
		make script automatically runs simulator testing at the end of \
		successful compilation. \
		make tree V hexagon_Debug_dynamic_toolv82_v65 VERBOSE 0 \
		Files will be copied to ship directory only if simulator testing pass. \
		On target testing \
		To execute the calculator_plus test on Android perform the steps mentioned here. \
		These steps are mentioned in calculator_c++14_walkthrough.py script for easy run. \
		Use adb as root and remount system read/write \
		adb root \
		adb wait for device \
		adb remount \
		The HLOS side calculator_plus test executable and supporting calculator_c++ stub \
		library must be pushed onto the device as follows \
		adb push android_Debug_aarch64/ship/calculator_plus /vendor/bin \
		adb shell chmod 777 /data/calculator_plus \
		adb push ANDROID_ROOT_DIR/sources/cxx stl/gnu libstdc++/4.9/libs/arm64 v8a/libgnustl_shared.so /vendor/lib/ \
		The Hexagon Shared Object must be pushed on to the device s file system as \
		follows \
		adb push hexagon_Debug_dynamic_toolv82_v65/ship/libcalculator_plus_skel.so /vendor/lib/rfsa/adsp/ \
		adb push hexagon_Debug_dynamic_toolv82_v65/libc++.so.1 /vendor/lib/rfsa/adsp/ \
		adb push hexagon_Debug_dynamic_toolv82_v65/libc++abi.so.1 /vendor/lib/rfsa/adsp/ \
		Generate a device specific test signature based on the device s serial number. \
		This only has to be done once The same test signature will enable loading \
		of any module and therefore should be used for your own projects as well. \
		Follow these steps [Signing] Tools_Signing.html Walk through \
		Launch a new CLI shell to view the DSP s diagnostic messages via logcat NOTE This step is applicable for only aDSP Message logging is not supported on other DSPs for now \
		For Windows \
		start cmd.exe /c adb logcat s adsprpc \
		For Linux \
		start adb logcat s adsprpc \
		Execute the example as follows \
		adb shell \
		/vendor/bin/calculator_plus sum 10 \
		/vendor/bin/calculator_plus uppercase_count aDSP \
		All tests returns 0 on success Refer DSP logs for output of these tests. \
		common queries \
		How to specify C++14 flag to compiler? \
		CXX_FLAGS + std c++14 \
		How to dynamically link PIC versions of libc++ library? \
		library_name _DLLS + libc++ \
		library_name _DLLS + libc++abi \
		What to look on test fails? \
		Check test signature generated for loading unsigned shared objects \
		Refer DSP logs for \
		Failed to load shared object due to missing dependent libraries \
		Test signature verification failed \
		Failed to load shared object due to unresolved symbols found in library \
		Actually test fails with error messages	",
	"id":35
}
idx.add(doc)
urls[35]='calculator_c%2B%2B14.html'
titles[35]="calculator_c++14 walk-through"

var doc = {
	"title": "Quick start",
	"body": " \
		Overview \
		Qualcomm s Hexagon& 8482 SDK enables you to run your code on the Hexagon DSPs This is achieved by Computation Offload \
		For a complete overview of the achitecture and development tools available \
		to the programmer please refer to the [Hexagon DSP Programmer s Guide] images/80 VB419 108_Hexagon_DSP_User_Guide.pdf \
		There are two models enabled by the Hexagon SDK \
		[Computational offload] Applications_Compute offload.html \
		Define your own API implement that API for the Hexagon DSP and call it \
		directly from the application processor This is accomplished using a \
		Remote Procedure Call mechanism called [FastRPC] APIs_FastRPC.html \
		and [dynamic loading] APIs_Dynamic Loading.html \
		There are a optimized libraries job processing frameworks etc in the \
		SDK to help enable computational offload take a look on the sidebar \
		under Applications . \
		[Audio] Audio/Applications.html /[Voice] Voice/Applications.html customization supported in the Windows version of the SDK. \
		Implement your own encoder decoder or audio processing module and insert \
		it into a growing number of hooks in the audio/voice pipeline. \
		The SDK is setup to be used as a self contained development environment that \
		allows developers to develop and create both the Hexagon DSP modules as \
		well as the android native applications that utilize them All the tools you \
		will need were installed inside the Hexagon SDK directory. \
		Feature Matrix \
		Hexagon SDK supports simulation as well as multiple hardware platforms Not all \
		features are support on all platforms To determine if a particular feature or \
		example is supportd on a particular target please refer to the SDK Feature Matrix \
		[SDK Feature Matrix] feature_matrix.html \
		Prerequisites \
		Hexagon SDK supports the execution environments on [simulator] Platforms_Simulator.html and on [target] Platforms_Target.html . \
		The basic requirement to use any of these execution environments is \
		Microsoft Windows 7 Windows 8 and Windows 10. \
		PC Ubuntu 14.x or later \
		64 bit versions are required. \
		For working on Qualcomm Mobile Development Platforms targets please click [here] Platforms_Target.html \
		SDK s directory structure \
		SDK \
		+ build \
		+ docs \
		+ examples \
		+ incs \
		+ libs \
		+ scripts \
		+ test \
		+ tools \
		build Contains the build utilities make.d build infrastructure cdep etc \
		docs Contains the Hexagon SDK documents See [Index] index.html to start. \
		examples Contains examples that can be used as a starting point for more advanced \
		audio dynamic and FastRPC modules. \
		incs Collection of common header files used by the examples or libraries \
		libs Contains libraries and utilities used by the examples or as stand along \
		utilities runable on the applications processor \
		scripts Contains utility scripts See [Scripts] Tools_Scripts.html \
		test Contains test infrastructure to test Hexagon DSP modules on the simulator \
		tools Collection of tools required to build the examples Hexagon tools Android NDK GOW etc Hexagon IDE Signing tools debug tools and other utils \
		Setup \
		The installer should have downloaded and installed all the Hexagon SDK s \
		dependencies If you encounter dependency issues please refer to \
		[Dependencies] Dependencies_Common.html \
		For setting up the SDK environment refer [Setup Instructions] readme.html \
		If you encounter issues please see [Dependencies] Dependencies_Common.html . \
		First project \
		Command line Follow the [Calculator example android walkthrough] calculator_android.html \
		to build and test your first project. \
		Hexagon IDE Follow the \
		[Eclipse IDE first project walk through] eclipse_first_project.html \
		More information \
		For more information explore the navigation bar on the left.	",
	"id":36
}
idx.add(doc)
urls[36]='index.html'
titles[36]="Quick start"

var doc = {
	"title": "DSP DCVS v2 HAP interface",
	"body": " \
		Overview \
		Based on user configuration DCVS module in DSP ADSP/CDSP can adjust the core and bus clock frequencies based on core \
		and bus usage metrics captured by SysMon The existing DCVS interface via HAP_power_set type HAP_power_set_DCVS \
		only allows users to vote for DCVS participation with 2 different options DSP DCVS v2 algorithm exposes an \
		enhanced set of DCVS options for diversified clients and a simplified voltage corner based voting scheme On \
		supported targets 8998 and latest these new DCVS options and voting scheme are exposed to clients via \
		HAP_power_set type HAP_power_set_DCVS_v2 This document captures information on these new DCVS features and \
		ways to use them. \
		HAP API Support \
		The HAP_power_set API is enhanced to support the new mode registrations with DSP DCVS logic. \
		Following table illustrates the new type of request and the new dcvs_v2 request structure \
		associated with it. \
		.ccode \
		typedef struct \
		HAP_Power_request_type type \
		union \
		HAP_power_mips_bw_payload mips_bw \
		HAP_power_hvx_payload hvx \
		HAP_power_app_type_payload apptype \
		HAP_power_linelock_payload linelock \
		HAP_power_dcvs_payload dcvs \
		HAP_power_dcvs_v2_payload dcvs_v2 \
		HAP_power_linelock_nothrottle_payload linelock_nothrottle \
		HAP_power_request_t \
		. \
		typedef enum \
		HAP_power_set_mips_bw 1 \
		HAP_power_set_HVX \
		HAP_power_set_apptype \
		HAP_power_set_linelock \
		HAP_power_set_DCVS \
		HAP_power_set_linelock_nothrottle \
		HAP_power_set_DCVS_v2 \
		HAP_Power_request_type \
		. \
		typedef struct \
		boolean dcvs_enable \
		enum \
		HAP_DCVS_V2_ADJUST_UP_DOWN 0x1 \
		HAP_DCVS_V2_ADJUST_ONLY_UP 0x2 \
		HAP_DCVS_V2_POWER_SAVER_MODE 0x4 \
		HAP_DCVS_V2_POWER_SAVER_AGGRESSIVE_MODE 0x8 \
		HAP_DCVS_V2_PERFORMANCE_MODE 0x10 \
		HAP_DCVS_V2_DUTY_CYCLE_MODE 0x20 \
		dcvs_option \
		boolean set_latency \
		uint32 latency \
		boolean set_dcvs_params \
		HAP_dcvs_params_t dcvs_params \
		HAP_power_dcvs_v2_payload \
		+ + + \
		API **HAP_power_set** void/* **context** HAP_power_request_t/* **request** \
		+ + + \
		context Ignored \
		+ + + + + \
		request **type** HAP_power_set_DCVS_v2 This new request type allows user \
		to request via the new dcvs_v2 \
		request structure \
		+ + + + \
		**dcvs_v2** **dcvs_enable** DCVS participation flag \
		+ + + \
		**dcvs_option** These options instruct DCVS algorithm \
		to use a pre defined set of \
		thresholds and operation logic based \
		on the selected option \
		+ + + \
		**set_latency** Latency vote validity flag \
		+ + + \
		**latency** Sleep latency vote in micro seconds \
		Valid when the set_latency flag is \
		set to TRUE \
		+ + + \
		**set_dcvs_params** DCVS params validity flag \
		+ + + \
		**dcvs_params** DCVS params structure with \
		flexibility to set upper and lower \
		DCVS thresholds and also vote for \
		core and bus clocks using a voltage \
		corner \
		+ + + + + \
		DCVS Enable \
		dcvs_enable parameter of dcvs_v2 structure enables user to vote for DCVS participation. \
		+ + + \
		Value Description \
		+ + + \
		TRUE Enable DSP DCVS if not already enabled Using dcvs_option based \
		on the application demand user can choose a particular option to \
		guide DSP DCVS logic \
		+ + + \
		FALSE Don t enable DSP DCVS Valid only when the client requesting is the \
		only one actively voting for clocks or is one among the clients \
		voting for this same option \
		+ + + \
		When a DCVS participating client is active DCVS logic would be enabled but the aggregated clients vote \
		requesting for DCVS disable will be considered as a FLOOR request in DCVS logic i.e DCVS would t lower \
		the clocks below the aggregated value. \
		DCVS Options \
		dcvs_option parameter of dcvs_v2 structure enables user to request for a particular DCVS mode \
		when dcvs_enable option is set to **TRUE** Following table captures the gist of the available \
		DCVS modes. \
		+ + + \
		Value Description \
		+ + + \
		*HAP_DCVS_V2_ADJUST_UP_DOWN* *Legacy option* For clients voting via HAP_power_set_mips_bw request type \
		This mode allows DCVS to both increase and decrease core/bus clock speeds \
		based on need \
		DCVS selects thresholds corresponding to a balanced mode legacy of operation \
		with respect to power and performance \
		min_corner and max_corner votes via dcvs_params are used as lower and \
		upper limit guidelines in DCVS \
		**NOTE ** If client votes via target_corner under dcvs_params of this \
		structure both HAP_DCVS_V2_ADJUST_ONLY_UP and HAP_DCVS_V2_ADJUST_UP_DOWN \
		modes are identical min_corner and max_corner votes are used as \
		lower and upper limit guidelines in DCVS while using balanced mode legacy \
		thresholds \
		+ + + \
		*HAP_DCVS_V2_ADJUST_ONLY_UP* *Legacy option* For clients voting via HAP_power_set_mips_bw request type \
		This mode restricts DCVS from lowering the clock below the values requested \
		via HAP_power_set_mips_bw request DCVS can only increase the clock above \
		the requested levels \
		DCVS selects thresholds corresponding to a balanced mode legacy of operation \
		with respect to power and performance \
		max_corner vote via dcvs_params is used as upper limit guideline in DCVS \
		**NOTE ** If client votes via target_corner under dcvs_params of this \
		structure both HAP_DCVS_V2_ADJUST_ONLY_UP and HAP_DCVS_V2_ADJUST_UP_DOWN \
		modes are identical min_corner and max_corner votes are used as \
		lower and upper limit guidelines in DCVS while using balanced mode legacy \
		thresholds \
		+ + + \
		*HAP_DCVS_V2_POWER_SAVER_MODE* *New option* \
		Default for all clients participating in DCVS \
		DCVS can both increase and decrease the core/bus clock speeds while \
		min_corner and max_corner votes are used as lower and upper limit \
		guidelines \
		DCVS selects thresholds corresponding to power saving model This mode is \
		meant for applications where saving power is of higher priority than achieving \
		fastest performance Performance may be slower in this mode than in \
		HAP_DCVS_V2_PERFORMANCE_MODE or the legacy modes i.e \
		HAP_DCVS_V2_ADJUST_ONLY_UP HAP_DCVS_V2_ADJUST_UP_DOWN \
		+ + + \
		*HAP_DCVS_V2_POWER_SAVER_AGGRESSIVE_MODE* *New option* \
		DCVS can both increase and decrease the core/bus clock speeds while \
		min_corner and max_corner votes are used as lower and upper limit \
		guidelines \
		DCVS selects thresholds corresponding to a power saving model Further the \
		DCVS monitoring durations in lowering the clocks is decreased for a faster \
		ramp down and hence greater power saving compared to the power saver mode \
		This mode is meant for applications where saving power is of higher priority \
		than achieving fastest performance Performance may be slower in this mode \
		than in HAP_DCVS_V2_PERFORMANCE_MODE HAP_DCVS_V2_POWER_SAVER_MODE or the \
		legacy modes i.e HAP_DCVS_V2_ADJUST_ONLY_UP HAP_DCVS_V2_ADJUST_UP_DOWN \
		+ + + \
		*HAP_DCVS_V2_PERFORMANCE_MODE* *New option* \
		DCVS can both increase and decrease the core/bus clock speeds while \
		min_corner and max_corner votes are used as lower and upper limit \
		guidelines \
		DCVS selects a set of aggressive thresholds in terms of performance DCVS can \
		quickly bump up the clocks in this mode assisting higher performance at the \
		cost of power \
		+ + + \
		*HAP_DCVS_V2_DUTY_CYCLE_MODE* Currently not supported Defaulted to HAP_DCVS_V2_POWER_SAVER_MODE \
		+ + + \
		In cases where multiple clients have registered different DCVS options following table depicts the DCVS policy aggregation logic. \
		+ + + + + + \
		PERFORMANCE Yes / No POWER SAVER Yes / No POWER SAVER AGGRESSIVE Yes / No BALANCED UP ONLY/UP AND DOWN clients Yes / No Final DCVS thresholds \
		+ + + + + + \
		Y Y / N Y / N Y / N PERFORMANCE \
		+ + + + + + \
		N Y Y / N Y / N POWER SAVER \
		+ + + + + + \
		N N Y Y POWER SAVER \
		+ + + + + + \
		Sleep latency \
		set_latency and latency parameters of structure dcvs_v2 can be used to request for a sleep latency in micro seconds. \
		+ + + + \
		set_latency *FALSE* No sleep latency request from the client \
		+ + + \
		*TRUE* Client request for a sleep latency is valid and desired latency is provided in latency field \
		+ + + + \
		latency Sleep latency request in micro seconds \
		+ + + \
		**NOTE** HAP_power_set provides 2 possible ways for voting for sleep latency \
		1 via HAP_power_set_mips_bw request type \
		.ccode \
		/* For sleep latency */ \
		mips_bw.set_latency TRUE \
		mips_bw.latency Sleep latency in micro seconds \
		2 via HAP_power_set_DCVS_v2 request type \
		.ccode \
		/* For sleep latency */ \
		dcvs_v2.set_latency TRUE \
		dcvs_v2.latency Sleep latency in micro seconds \
		Clients should use only 1 of the above methods to vote for latency i.e either via mips_bw or via dcvs_v2 but \
		not both Voting via dcvs_v2 does **NOT** cancel any previous vote done via mips_bw and vice versa. \
		DCVS params \
		set_dcvs_params and dcvs_params parameters of dcvs_v2 can be used to update DCVS thresholds and target corner vote This structure is valid irrespective \
		of chosen dcvs_enable and dcvs_option values Client can request for a target_corner even when the dcvs_enable option is set to **FALSE**. \
		When set_dcvs_params is **TRUE** target_corner min_corner and max_corner parameters of dcvs_params can take one of the \
		following values \
		.ccode \
		/** \
		* Voltage corners for HAP DCVS V2 interface \
		*/ \
		typedef enum \
		HAP_DCVS_VCORNER_DISABLE \
		HAP_DCVS_VCORNER_SVS2 \
		HAP_DCVS_VCORNER_SVS \
		HAP_DCVS_VCORNER_SVSPLUS \
		HAP_DCVS_VCORNER_NOM \
		HAP_DCVS_VCORNER_NOMPLUS \
		HAP_DCVS_VCORNER_TURBO \
		HAP_DCVS_VCORNER_TURBO_PLUS \
		HAP_DCVS_VCORNER_MAX 255 \
		HAP_dcvs_voltage_corner_t \
		+ + + \
		HAP_dcvs_voltage_corner_t Description \
		+ + + \
		*HAP_DCVS_VCORNER_DISABLE* No specific corner request No Vote \
		+ + + \
		*HAP_DCVS_VCORNER_SVS2* SVS2 / LOW SVS corner \
		Note On targets that don t support this voltage corner this option \
		will be interpreted as HAP_DCVS_VCORNER_SVS \
		+ + + \
		*HAP_DCVS_VCORNER_SVS* SVS corner \
		+ + + \
		*HAP_DCVS_VCORNER_SVSPLUS* SVS Plus corner \
		Note On targets that don t support this voltage corner this option \
		will be interpreted as HAP_DCVS_VCORNER_SVS \
		+ + + \
		*HAP_DCVS_VCORNER_NOM* NOMINAL corner \
		+ + + \
		*HAP_DCVS_VCORNER_NOMPLUS* NOMINAL Plus corner \
		Note On targets that don t support this voltage corner this option \
		will be interpreted as HAP_DCVS_VCORNER_NOM \
		+ + + \
		*HAP_DCVS_VCORNER_TURBO* TURBO corner \
		+ + + \
		*HAP_DCVS_VCORNER_TURBO_PLUS* TURBO Plus corner \
		Note Valid only on SM8150 maps to TURBO frequency for SM6150 QCS405 \
		**Returns error on earlier targets** SDM845 SDM710 and prior ones \
		+ + + \
		*HAP_DCVS_VCORNER_TURBO_MAX* MAX possible corner defined for maximum performance \
		Note Supported only on SM8150 SM6150 QCS405 and later chipsets \
		**Returns error on earlier targets** SDM845 SDM710 and prior ones \
		+ + + \
		+ + + + \
		set_dcvs_params FALSE DCVS parameters are not updated Client doesn t have any request for a voltage corner and the min and max voltage corner limits for DCVS \
		+ + + \
		TRUE DCVS parameters are valid and should be considered by DCVS \
		+ + + + \
		dcvs_params **target_corner** Type HAP_dcvs_voltage_corner_t \
		Alternative to HAP_power_set_mips_bw MIPS and Bandwidth request \
		HAP_power_set provides 2 possible ways for voting for sleep latency and core/bus clocks \
		1 via HAP_power_set_mips_bw request type \
		.ccode \
		/* For core clock */ \
		mips_bw.set_mips TRUE \
		mips_bw.mipsPerThread MIPS per thread request \
		mips_bw.mipsTotal Total MIPS request \
		/* For bus clock */ \
		mips_bw.set_bus_bw TRUE \
		mips_bw.bwBytePerSec bandwidth request in bytes per second Instantaneous \
		mips_bw.busbwUsagePercentage Usage percentage Average \
		/* For sleep latency */ \
		mips_bw.set_latency TRUE \
		mips_bw.latency Sleep latency in micro seconds \
		2 via HAP_power_set_DCVS_v2 request type \
		.ccode \
		/* For core and bus clock */ \
		dcvs_v2.set_dcvs_params TRUE \
		dcvs_v2.dcvs_params.target_corner Desired vote in terms of voltage corner for core bus clocks \
		/* For sleep latency */ \
		dcvs_v2.set_latency TRUE \
		dcvs_v2.latency Sleep latency in micro seconds \
		Client can request core and bus clock to run at at a particular voltage corner instead of providing MIPS and Bandwidth bytes per second \
		requests DCVS will convert the requested voltage corner value to appropriate core clock and bus clock votes and forwards the request to the \
		power manager on client s behalf \
		Clients should use only 1 of the above methods to vote i.e either via mips_bw or via dcvs_v2 but not both Voting via dcvs_v2 \
		does **NOT** cancel any previous vote done via mips_bw and vice versa If one would like to switch between these 2 methods cancel \
		any previous vote done via the other method before requesting \
		When target_corner HAP_DCVS_VCORNER_DISABLE No vote DSP DCVS doesn t request for any core or bus clocks at the time of API call \
		and it s client s responsibility to vote for core and bus clocks using HAP_power_set_mips_bw type request type \
		If enabled HAP_DCVS_VCORNER_DISABLE DSP DCVS logic will pick the lowest available frequency plan for both core and bus clocks at the given \
		voltage corner and requests for these clock frequencies synchronously in the API context on client s behalf When the HAP_power_set API returns \
		with success core and bus clock frequencies would be set by DSP DCVS on a valid target_corner request \
		+ + + \
		**min_corner** Type HAP_dcvs_voltage_corner_t \
		If disabled min_corner HAP_DCVS_VCORNER_DISABLE the lower threshold/minimum value that DCVS can correct the clock will remain unchanged \
		If enabled HAP_DCVS_VCORNER_DISABLE DSP DCVS picks the lowest core clock frequency at the given voltage corner and uses it as the lower \
		threshold/minimum value that DCVS can correct the clock to irrespective of the dcvs_option selected \
		Client can vote for a min_corner irrespective of a target_corner i.e client can have target_corner HAP_DCVS_VCORNER_DISABLE no vote \
		but can set a minimum corner threshold for DCVS \
		min_corner should always be less than or equal to target_corner and max_corner unless they are disabled HAP_DCVS_VCORNER_DISABLE \
		For clients requesting dcvs_enable as **FALSE** and using target_corner min_corner should be equal to target_corner \
		min_corner vote in DSP DCVS logic is considered for core clock decisions alone and not for the bus clock decisions \
		+ + + \
		**max_corner** Type HAP_dcvs_voltage_corner_t \
		If disabled max_corner HAP_DCVS_VCORNER_DISABLE the upper threshold/maximum value that DCVS can correct the clock will remain unchanged \
		Typically that would be HAP_DCVS_VCORNER_TURBO in this case \
		If enabled HAP_DCVS_VCORNER_DISABLE DSP DCVS picks the highest core and bus clock frequencies at the given voltage corner and uses it as \
		the upper threshold/maximum value that DCVS can correct the clocks to irrespective of the dcvs_option selected \
		DSP DCVS logic overrides the max_corner vote from a client to TURBO in presence of a concurrency Concurrency is defined as a scenario \
		where 2 or more FastRPC dynamic loaded clients are active or active Audio/Voice sessions with MPPS load greater than a pre defined threshold \
		Client can vote for a max_corner irrespective of a target_corner vote i.e client can have target_corner HAP_DCVS_VCORNER_DISABLE no vote \
		but can set a maximum corner threshold for DCVS using this param \
		max_corner should always be greater than or equal to target_corner and min_corner votes or should be disabled HAP_DCVS_VCORNER_DISABLE . \
		+ + + \
		**param1** Type HAP_dcvs_voltage_corner_t \
		NOTE Set this option to HAP_DCVS_VCORNER_DISABLE unless required \
		This parameter allows user to set CPU L3 clock frequency to the requested corner Valid only on CDSP subsystem in targets with CPU L3 cache and \
		IO coherency enabled SDM845 SDM710 SM8150 . ignored elsewhere \
		On CDSP based on the requested target_corner CPU L3 clock vote from CDSP is set to a balanced level with minimal power impact to start with \
		and DCVS if enabled increases the vote based on need to attain higher performance This option is useful to peg CPU L3 clock at a higher level \
		at the cost of higher power than that of the default balanced vote and that of the DCVS algorithm votes \
		**This option is for advanced users and should be configured to default HAP_DCVS_VCORNER_DISABLE unless there is a \
		need to explicitly set CPU L3 clock frequency based on performance and power analysis/characterization** \
		+ + + \
		**param2** Reserved \
		+ + + \
		**param3** Reserved \
		+ + + + \
		**DCVS vote aggregation logic in case of concurrency** \
		Following logic explains the aggregation logic for min and target corner votes when there are multiple requesting clients \
		DCVS min_corner vote MAX min_corner vote client 1 client 2 . \
		DCVS target_corner vote MAX target_corner vote client 1 client 2 . \
		The following scenarios are treated as a concurrency in DCVS vote aggregation logic where DCVS max corner vote is set to TURBO by DCVS \
		More than 1 active HAP client with or without active Audio/Voice clients. \
		One active HAP client and active Audio/Voice clients with MPPS load greater than a pre defined threshold. \
		DCVS max_corner vote HAP_DCVS_VCORNER_TURBO \
		Note that DCVS overrides client s MAX corner vote to TURBO to accommodate any concurrency requirement DCVS MAX vote of TURBO doesn t \
		necessarily mean that DCVS will push the vote to TURBO MAX corner vote just sets the upper threshold for DCVS vote logic DCVS will \
		only bump up the clocks on need basis based on selected DCVS option. \
		Illustrations \
		**NOTE ** For working example refer SDK_DIR /examples/common/benchmark application See benchmark_setClocks in src_dsp/benchmark_imp.c \
		1 Requirement Enable DCVS in PERFORMANCE mode set sleep latency to 1000 micro seconds vote NOM in Target with SVS as Min and TURBO as Max. \
		.ccode \
		//Vote \
		/* Populate request structure */ \
		int retVal \
		HAP_power_request_t request \
		memset &request 0 sizeof HAP_power_request_t //Important to clear the structure if only selected fields are updated. \
		request.type HAP_power_set_DCVS_v2 \
		request.dcvs_v2.dcvs_enable TRUE \
		request.dcvs_v2.dcvs_option HAP_DCVS_V2_PERFORMANCE_MODE \
		request.dcvs_v2.set_latency TRUE \
		request.dcvs_v2.latency 1000 \
		request.dcvs_v2.set_dcvs_params TRUE \
		request.dcvs_v2.dcvs_params.min_corner HAP_DCVS_VCORNER_SVS \
		request.dcvs_v2.dcvs_params.max_corner HAP_DCVS_VCORNER_TURBO \
		request.dcvs_v2.dcvs_params.target_corner HAP_DCVS_VCORNER_NOM \
		/* Call HAP_power_set API with the updated request structure */ \
		retVal HAP_power_set NULL &request \
		. \
		/* \
		* Processing block \
		*/ \
		. \
		//To remove the vote keeping DCVS enabled. \
		memset &request 0 sizeof HAP_power_request_t //Remove all votes. \
		request.type HAP_power_set_DCVS_v2 \
		request.dcvs_v2.dcvs_enable TRUE \
		request.dcvs_v2.dcvs_option HAP_DCVS_V2_PERFORMANCE_MODE //Enable DCVS \
		retVal HAP_power_set NULL &request \
		2 Requirement Disable DCVS do NOT vote for any corners/latency. \
		.ccode \
		//Vote \
		/* Populate request structure */ \
		int retVal \
		HAP_power_request_t request \
		memset &request 0 sizeof HAP_power_request_t //Important to clear the structure if only selected fields are updated. \
		request.type HAP_power_set_DCVS_v2 \
		request.dcvs_v2.dcvs_enable FALSE \
		/* Call HAP_power_set API with the updated request structure */ \
		retVal HAP_power_set NULL &request \
		3 Requirement Enable DCVS in Power saver mode Do NOT vote for any target corner/latency but set MIN and MAX thresholds to DCVS \
		to SVS and TURBO respectively Clock voting will be done via HAP_power_set_mips_bw request. \
		.ccode \
		//Vote \
		/* Populate request structure with dcvs_v2 request*/ \
		int retVal \
		HAP_power_request_t request \
		memset &request 0 sizeof HAP_power_request_t //Important to clear the structure if only selected fields are updated. \
		request.type HAP_power_set_DCVS_v2 \
		request.dcvs_v2.dcvs_enable TRUE \
		request.dcvs_v2.dcvs_option HAP_DCVS_V2_POWER_SAVER_MODE \
		request.dcvs_v2.set_dcvs_params TRUE \
		request.dcvs_v2.dcvs_params.min_corner HAP_DCVS_VCORNER_SVS \
		request.dcvs_v2.dcvs_params.max_corner HAP_DCVS_VCORNER_TURBO \
		request.dcvs_v2.dcvs_params.target_corner HAP_DCVS_VCORNER_DISABLE //no vote \
		/* Call HAP_power_set API with the updated request structure */ \
		retVal HAP_power_set NULL &request \
		/* Populate request structure with mips_bw request */ \
		HAP_power_request_t request \
		memset &request 0 sizeof HAP_power_request_t \
		request.type HAP_power_set_mips_bw \
		request.mips_bw.set_mips TRUE \
		request.mips_bw.mipsPerThread 150 \
		request.mips_bw.mipsTotal 600 \
		request.mips_bw.set_bus_bw TRUE \
		request.mips_bw.bwBytesPerSec 10*1000*1000 \
		request.mips_bw.busbwUsagePercentage 50 \
		request.mips_bw.set_latency TRUE \
		request.mips_bw.latency 1000 \
		/* Call HAP_power_set API with the updated request structure */ \
		retVal HAP_power_set NULL &request // Core and bus clocks will be set by this request. \
		. \
		/* \
		* Processing block \
		*/ \
		. \
		//To remove the dcvs_v2 vote keeping DCVS enabled. \
		memset &request 0 sizeof HAP_power_request_t //Remove all votes. \
		request.type HAP_power_set_DCVS_v2 \
		request.dcvs_v2.dcvs_enable TRUE \
		request.dcvs_v2.dcvs_option HAP_DCVS_V2_POWER_SAVER_MODE //Enable DCVS \
		retVal HAP_power_set NULL &request \
		//To remove the mips_bw vote \
		memset &request 0 sizeof HAP_power_request_t //Remove all votes \
		request.type HAP_power_set_mips_bw \
		request.mips_bw.set_mips TRUE \
		request.mips_bw.set_bus_bw TRUE \
		request.mips_bw.set_latency TRUE \
		request.mips_bw.latency 65535 \
		retVal HAP_power_set NULL &request	",
	"id":37
}
idx.add(doc)
urls[37]='Hap_power_set_dcvs_2.html'
titles[37]="DSP DCVS v2 HAP interface"

var doc = {
	"title": "Calculator walk-through on Android",
	"body": " \
		Overview \
		This walk through is a step by step guide to building loading \
		and executing the calculator example on Android It assumes you have \
		an Android device working with adb See [[Prerequisites]] for more \
		information. \
		The following steps except [[Prerequisites]] are captured in the scripts \
		For Windows \
		Hexagon SDK Dir /examples/common/calculator/calculator_walkthrough.py \
		For Linux \
		Hexagon SDK Dir /examples/common/calculator/calculator_walkthrough.py \
		Prerequisites \
		This walk through assumes you have an Android device that supports \
		both FastRPC and Dynamic Loading. \
		The device should be loaded with DSP image \
		If you are using an existing DSP image confirm and setup FastRPC on Android \
		by following these [instructions] APIs_FastRPC.html Setup . \
		General walkthrough script command line arguments \
		The following arguments are provided for the script \
		* T Mandatory argument It specifies the target you are using to test the example The target have to be connected to the machine you are using and adb should be functional. \
		Options are \
		8996 \
		8998 \
		sdm660 \
		sdm845 \
		Depending on the target intended the script will choose the appropriate variant to build the example for before loading the binaries on to the target. \
		* L Optional argument If your device is a LE device you can use this argument Note that only some examples support this argument If it is not accepted the error message will indicate this. \
		* V Optional argument If you want to overload the variant picked by the script based on the T option above use this argument. \
		Building \
		Before building ensure the Hexagon SDK s dependencies are properly setup The \
		installer should have done this for you If you encounter issues please see \
		[Dependencies] Dependencies_Common.html . \
		For Windows \
		Before using the command line to interact with the Hexagon SDK refer the [Setup Instructions] readme.html \
		For detailed information on the calculator example s internal structure and architecture \
		see [calculator] Examples_Common.html calculator . \
		When building the calculator example both the stub and skeleton must be \
		compiled and linked This can be done by compiling both for the variant desired \
		on the DSP as well as the application processor For example to create a \
		stub/skel pair for Android and Hexagon the following commands must be \
		executed \
		First change directory to the calculator example \
		cd Hexagon SDK Dir /examples/common/calculator \
		Next build the Android and Hexagon modules use CDSP_FLAG 1 for the targets that support CDSP Eg SDM660 \
		make tree V android_Debug CDSP_FLAG 1 \
		make tree V hexagon_Debug_dynamic_toolv82_v65 \
		For Linux \
		Before using the command line to interact with the Hexagon SDK source refer the [Setup Instructions] readme.html \
		For detailed information on the calculator example s internal structure and architecture \
		see [calculator] Examples_Common.html calculator . \
		When building the calculator example both the stub and skeleton must be \
		compiled and linked This can be done by compiling both for the variant desired \
		on the DSP as well as the application processor For example to create a \
		stub/skel pair for Android and Hexagon the following commands must be \
		executed \
		First change directory to the calculator example \
		cd Hexagon SDK Dir /examples/common/calculator \
		Next build the Android and Hexagon modules use CDSP_FLAG 1 for the targets that support CDSP Eg SDM660 \
		make tree V android_Debug CDSP_FLAG 1 \
		make tree V hexagon_Debug_dynamic_toolv82_v65 \
		For more information on build syntax see [Make.d] Environments_Build System.html \
		On target testing \
		To execute the calculator test on Android perform the following steps \
		Use adb as root and remount system read/write \
		adb root \
		adb wait for device \
		adb remount \
		The HLOS side calculator test executable and supporting calculator stub \
		library must be pushed onto the device as follows \
		adb shell mkdir p /vendor/bin/ \
		adb push android_Debug/calculator /vendor/bin/ \
		adb shell chmod 777 /vendor/bin/calculator \
		adb push android_Debug/ship/libcalculator.so /vendor/lib/ \
		The Hexagon Shared Object must be pushed on to the device s file system as \
		follows \
		adb shell mkdir /vendor/lib/rfsa \
		adb shell mkdir /vendor/lib/rfsa/adsp \
		adb push hexagon_Debug_dynamic_toolv82_v65/ship/libcalculator_skel.so /vendor/lib/rfsa/adsp/ \
		For more information on the remote file system see [Remote file system] remote_file_system.html \
		Generate a device specific test signature based on the device s serial number. \
		This only has to be done once The same test signature will enable loading \
		of any module and therefore should be used for your own projects as well. \
		Follow these steps [Signing] Tools_Signing.html Walk through \
		Launch a new CLI shell to view the DSP s diagnostic messages via logcat NOTE This step is applicable for only aDSP Message logging is not supported on other DSPs for now \
		For Windows \
		start cmd.exe /c adb logcat s adsprpc \
		For Linux \
		First Start a new shell and then type \
		.adb logcat s adsprpc \
		Execute the example as follows \
		adb shell \
		cd /vendor/bin \
		./calculator 1 1000 run on CPU \
		./calculator 0 1000 run on DSP \
		0/1 whether to run on the DSP 0 or CPU 1 \
		1000 the number of values to operate on. \
		Analyze the output You should see something like the following The first \
		block runs the calculator example on the application processor no DSP \
		involvement and the second block offloads the work to the DSP In both \
		blocks you should see success printed at the bottom. \
		Run Calculator Example Locally on Android \
		. \
		starting calculator test \
		allocate 4000 bytes from ION heap \
		creating sequence of numbers from 0 to 999 \
		compute sum locally \
		sum 499500 \
		success \
		. \
		Run Calculator Example on DSP \
		. \
		starting calculator test \
		allocate 4000 bytes from ION heap \
		creating sequence of numbers from 0 to 999 \
		compute sum on the DSP \
		sum 499500 \
		success \
		Moving ahead \
		Calculator Example \
		[More information on how to create your own project based on the calculator example] WorkingWithExamples.html \
		[More information on the internals of the calculator example] Examples_Common.html calculator \
		Or browse the left sidebar for more topics.	",
	"id":38
}
idx.add(doc)
urls[38]='calculator_android.html'
titles[38]="Calculator walk-through on Android"

var doc = {
	"title": "Profiling library",
	"body": " \
		The Hexagon SDK provides a library which enables users to collect runtime performance data on specific parts of the Hexagon program being simulated The data is collected by inserting profiling library function calls directly into the program source code. \
		The library generates the following runtime profiling information \
		Cycle counts \
		Heap usage total and peak \
		Memory leaks if any \
		Power usage \
		The generated profiling information can be viewed in the IDE using the [quick profile viewer] eclipse_utilities.html Quick profile viewer . \
		The profiling library is accessed by including the library header file test_profile.h . \
		NOTE The profiling library can be used for module to module comparisons only. \
		NOTE The performance overhead for using the library is approximately 140 cycles. \
		Profiling functions \
		The profiling library supports the following operations \
		[[ add_session_attributes ]] – Add session attribute to profiling session. \
		[[ init_profiling ]] – Initialize profiling library must be called before any other profiling library function . \
		[[ start_profiling ]] and [[ stop_profiling ]] – Start and stop collecting profiling information in the specified profiling session. \
		[[ get_profiling_cycles ]] – Return the number of cycles used during the specified profiling session. \
		[[ reset_profiling ]] – Reset to zero the collected performance data for the specified profiling session. \
		[[ print_profile_result ]] – Print all profiling information collected during the specified profiling session. \
		[[ deinit_profiling ]] – Shut down profiling library must be called after all other profiling library functions . \
		The following example shows how the profiling functions are used \
		.ccode \
		include test_profile.h \
		. \
		main \
		init_profiling \
		. \
		start_profiling \
		profiled user code \
		stop_profiling \
		print_profile_result \
		. \
		deinit_profiling \
		The profiling library has the following properties \
		Multiple profiling sessions can be active at any given time in a program Individual sessions are distinguished by their assigned session ID value. \
		The collection of profiling information can be limited to certain parts of a program by selectively using start_profiling and stop_profiling This prevents the generation of unmanageable amounts of profiling information. \
		Profiling information is collected cumulatively across multiple calls to start_profiling and stop_profiling This enables the profiling library functions to appear in loop code and still collect useful profiling information. \
		add_session_attributes \
		**Function** \
		Add session attribute to profiling session. \
		**Prototype** \
		.ccode \
		void add_session_attributes int session_id char /*name char /*value \
		**Parameters** \
		+ + + + \
		Name Type Description \
		+ + + + \
		session_id In Profiling session ID \
		+ + + + \
		name In Attribute name \
		+ + + + \
		value In Attribute value \
		+ + + + \
		**Description** \
		Session attributes are used to add user defined profiling information to the standard profiling information that gets displayed in the [quick profile viewer] eclipse_utilities.html Quick profile viewer . \
		For example if the runtime profiling information includes a profiling session named Process then the following function call \
		.ccode \
		add_session_attributes SESSION_PROCESS Num Buffers 100 \
		/ causes the quick profile viewer to display an extra user defined entry named Num Buffers in the runtime profiling information for the Process session \
		.lua \
		return E.left E.img src images/utilities_proflib_attribute.png \
		NOTE Session attributes are saved in the file profile.xml which provides the data for the [quick profile viewer] eclipse_utilities.html Quick profile viewer . \
		NOTE Any attributes added to a session automatically get included in the profiling data file generated by [ print_profile_result ] print_profile_result . \
		deinit_profiling \
		**Function** \
		Shut down profiling library. \
		**Prototype** \
		.ccode \
		void deinit_profiling \
		**Parameters** \
		none \
		**Description** \
		Deallocate all data structures used by the profile library. \
		NOTE This function must be the last profiling library function called in the program. \
		NOTE This function writes the current profiling information including any defined session attributes to the file profile.xml which provides the data for the [quick profile viewer] eclipse_utilities.html Quick profile viewer . \
		get_profiling_cycles \
		**Function** \
		Return the number of cycles executed in a profiling session. \
		**Prototype** \
		.ccode \
		int get_profiling_cycles int session_id \
		**Parameters** \
		+ + + + \
		Name Type Description \
		+ + + + \
		session_id In Profiling session ID \
		+ + + + \
		return value Out Current cycle count for session \
		+ + + + \
		**Description** \
		Return the number of cycles executed in the specified profiling session. \
		init_profiling \
		**Function** \
		Initialize profiling library. \
		**Prototype** \
		.ccode \
		void init_profiling \
		**Parameters** \
		none \
		**Description** \
		Initialize the data structures in the profiling library to prepare for subsequent profiling sessions. \
		NOTE This function must be the first profiling library function called in the program. \
		print_profile_result \
		**Function** \
		Print the collected information for a profiling session. \
		**Prototype** \
		.ccode \
		void print_profile_result int session_id \
		**Parameters** \
		+ + + + \
		Name Type Description \
		+ + + + \
		session_id In Profiling session ID \
		+ + + + \
		**Description** \
		Print all profiling information that has been collected for the specified profiling session. \
		NOTE Printing is directed to the standard output and to file profile.xml which provides the data for the [quick profile viewer] eclipse_utilities.html Quick profile viewer \
		reset_profiling \
		. \
		**Function** \
		Reset collected information for a profiling session. \
		**Prototype** \
		.ccode \
		void reset_profiling int session_id \
		**Parameters** \
		+ + + + \
		Name Type Description \
		+ + + + \
		session_id In Profiling session ID \
		+ + + + \
		**Description** \
		Reset to zero all profiling information that has been collected for the specified profiling session. \
		start_profiling \
		. \
		**Function** \
		Start or resume profiling in the specified profiling session. \
		**Prototype** \
		.ccode \
		void start_profiling int session_id \
		**Parameters** \
		+ + + + \
		Name Type Description \
		+ + + + \
		session_id In Profiling session ID \
		+ + + + \
		**Description** \
		Start collecting profiling information in the specified profiling session. \
		If the specified session ID has not been used before in the program then start a new profiling session with the performance data set to its initial values. \
		If the specified session ID has been used in the program then resume collecting performance data for that profiling session. \
		stop_profiling \
		**Function** \
		Stop profiling in the specified profiling session. \
		**Prototype** \
		.ccode \
		void stop_profiling int session_id int print_result \
		**Parameters** \
		+ + + + \
		Name Type Description \
		+ + + + \
		session_id In Profiling session ID \
		+ + + + \
		print_result In Print profiling information 0 No 1 Yes \
		+ + + + \
		**Description** \
		Stop collecting profiling information in the specified profiling session. \
		The print_result parameter determines whether or not the current profiling information is [printed] print_profile_result when the profiling is stopped. \
		NOTE This function does not affect the profiling information that has been collected so far for the specified session – any subsequent start on the session ID will cause profiling to resume with the current profiling values.	",
	"id":39
}
idx.add(doc)
urls[39]='profiling_library.html'
titles[39]="Profiling library"

var doc = {
	"title": "﻿Utilities",
	"body": " \
		Overview \
		The Hexagon IDE includes several utilities which are specifically designed to support Hexagon program development \
		**Profiling library** – Provides a set of library functions for collecting runtime profiling information on specific parts of a simulated Hexagon program. \
		**Mini diagnostic monitor** – Displays execution information generated by the target The real time information of the target is displayed and includes diagnostic messages along with information on tasks and system performance. \
		**Flash binary** – Flashes executable files onto the target system. \
		**Quick profile viewer** – Displays profiling information on a project including both static information and the runtime information collected by the profiling library. \
		**Device viewer** – Lists the target devices currently connected to the host system. \
		**RTOS viewer** – Displays information on the Hexagon RTOS including signals interrupt maps page tables and RTOS debug variables. \
		All of these utilities are fully integrated into the IDE and display their information in the IDE main window. \
		NOTE Many of these utilities are based on the corresponding stand alone tools provided with the Hexagon software development tools Except for minor IDE related differences they operate in the same way as the stand alone tools. \
		Profiling library \
		The Hexagon SDK provides a library which enables users to collect runtime performance data on specific parts of the Hexagon program being simulated The data is collected by inserting profiling library function calls directly into the program source code. \
		The library generates the following runtime profiling information \
		Cycle counts \
		Heap usage total and peak \
		Memory leaks if any \
		Power usage \
		More details are present [here] profiling_library.html \
		Audio profiling \
		The Hexagon SDK provides the [profiling library] Profiling library to support the profiling of audio modules. \
		To simplify audio profiling the profiling library supports several macros that are specific to audio profiling – these are used in the support library test_appi audio unit test infrastructure The macros are defined in the header file appi_profile.h . \
		Each command executed by the audio unit test infrastructure is profiled by default The audio modules are profiled during different command executions such as setParam getParam Process etc. and the reports are printed to the standard output at every stage. \
		The following audio specific profiling macros are defined in the profiling library \
		+ + \
		Profiling Macros \
		+ + \
		START_PROCESS_PROFILE \
		+ + \
		STOP_PROCESS_PROFILE \
		+ + \
		START_INIT_PROFILE \
		+ + \
		STOP_INIT_PROFILE \
		+ + \
		START_GETPARAM_PROFILE \
		+ + \
		STOP_GETPARAM_PROFILE \
		+ + \
		START_SETPARAM_PROFILE \
		+ + \
		STOP_SETPARAM_PROFILE \
		+ + \
		RESET_PROFILE_RESULT session_id \
		+ + \
		PRINT_PROFILE_RESULT session_id \
		+ + \
		GET_PROFILE_CYCLES session_id \
		+ + \
		ADD_SESSION_ATTRIBUTES session_id name value \
		+ + \
		The macro ADD_SESSION_ATTRIBUTES is used to add session specific information during audio profiling Information such as NumBuffers and ParamID adds value to the result during process commands or getParam / setParam so this type of information can be added to the audio profiling sessions as session attributes. \
		The following default session IDs are used for audio profiling \
		+ + + \
		Session Name Session ID \
		+ + + \
		SESSION_INIT 1 \
		+ + + \
		SESSION_SETPARAM 2 \
		+ + + \
		SESSION_GETPARAM 3 \
		+ + + \
		SESSION_PROCESS 4 \
		+ + + \
		Mini diagnostic monitor \
		The mini diagnostic monitor known as *Mini DM* displays execution information that is generated by an ADSP image as it executes. \
		The monitor can work with images executing on either the Hexagon simulator or the target development system with the latter requiring a USB cable to transfer the execution information . \
		The monitor operates as a pane within the IDE main window with dedicated views for displaying each type of execution information \
		Log messages for various execution events \
		Task information CPU% stack usage etc. \
		System performance MIPS thread cache bus etc. \
		The monitor displays its information in two views the Mini DM view displays the log messages while the QuRT Monitor view displays both the task and system performance information These views appear as tabs in the IDE main window. \
		.lua \
		return E.left E.img src images/utilities_monitor_views.png \
		NOTE The monitor must first be [configured] Monitor configuration before it is used. \
		Mini DM view \
		The Mini DM view displays log messages as they are generated by the ADSP image. \
		To open the view choose Show View Other Hexagon Mini DM from the Window menu. \
		.lua \
		return E.left E.img src images/utilities_monitor_mini_dm_view.png \
		No start or stop controls are provided to control the generation of log messages – as soon as the Mini DM view is opened the messages start appearing in it as they are generated. \
		To clear all the messages use the Clear command which appears in the upper right hand corner of the Mini DM view. \
		To restart the underlying Mini DM utility use the Restart command which appears in the upper right hand corner of the Mini DM view. \
		NOTE If the ADSP is not processing audio data the processor will go to sleep no messages will be generated and thus no new messages will appear in the Mini DM view. \
		NOTE The underlying Mini DM utility is typically restarted in order to change the serial port that is used communicate with the target platform. \
		The Mini DM view allows you to filter the generated log messages so that only the messages containing a specific keyword will appear in the view. \
		.lua \
		return E.left E.img src images/utilities_monitor_mini_dm_view_filter.png \
		To limit the displayed log messages to only those containing a specific keyword enter the keyword into the search field at the top of the view in this case the keyword is AudioStream . \
		Each log message contains the following information \
		Sub system ID \
		Message level mask \
		Message string \
		Line number in source file \
		Source file name \
		NOTE The Mini DM view can store only a fixed number of log messages with the oldest messages being discarded once the view becomes full. \
		Log messages are generated in the ADSP source code using a set of predefined macros named MSG* . \
		** MSG xx_ss_id xx_ss_mask xx_fmt ** \
		Message containing literal string with no printf style arguments allowed. \
		xx_ss_id – Sub system ID assigned to message \
		xx_ss_mask – Message level mask \
		xx_fmt – Message string \
		** MSG_N xx_ss_id xx_ss_mask xx_fmt xx_arg1 . ** \
		Message containing one or more printf arguments. \
		N – Number of printf style arguments in message string 1 2 . \
		** MSG_SPRINTF_N xx_ss_id xx_ss_mask xx_fmt xx_arg1 ** \
		Message containing one or more sprintf arguments. \
		N – Number of sprintf style arguments in message string 1 2 . \
		NOTE sprintf is called in the caller s context which is costly but allows the expansion of data types such as string and float. \
		QuRT Monitor view \
		The QuRT Monitor view displays both task and system performance information as it is generated by the ADSP image. \
		To open the view choose Show View Other Hexagon QuRT Monitor from the Window menu. \
		The QuRT Monitor view has two subviews \
		TaskProfile – Task information \
		PerfMeter – System performance information \
		The subviews are selectable by a drop down list in the upper right hand corner of the QuRT Monitor view. \
		**TaskProfile subview** \
		The TaskProfile subview displays information on all threads that are currently executing in the ADSP image. \
		.lua \
		return E.left E.img src images/utilities_monitor_qurt_view_task.png \
		Controls are provided to start or stop the generation of task information or to clear the current display These controls appear in the upper right hand corner of the QuRT Monitor view. \
		NOTE To sort the thread information displayed in a given column of the TaskProfile subview click on the corresponding column label. \
		**PerfMeter subview** \
		The PerfMeter subview displays various metrics on the system performance of the ADSP image. \
		.lua \
		return E.left E.img src images/utilities_monitor_qurt_view_perf.png \
		Controls are provided to start or stop the generation of system performance information or to clear the current display These controls appear in the upper right hand corner of the QuRT Monitor view. \
		NOTE The PerfMeter subview can be [configured] QuRT Monitor configuration to display only a subset of the listed performance metrics. \
		Monitor configuration \
		To configure the mini diagnostic monitor choose Preferences Hexagon \
		Mini DM from the Window menu The following dialog box appears \
		.lua \
		return E.left E.img src images/utilities_monitor_mini_dm_config_dialog.png \
		In the Mini DM Path field specify the location of the executable file for the Mini DM utility This field is auto filled if the IDE was launched from the Hexagon SDK. \
		In the Architecture field select the processor version of the target Hexagon processor The default value is V5. \
		In the COM Port field specify the serial port that the monitor will use to communicate with the hardware target platform If this field is left blank the monitor will instead communicate with the simulator that is running on the host development system. \
		In the Sampling period field specify the sampling period that the monitor will use to collect task and system performance information The sampling period varies inversely with the accuracy of the collected information. \
		In the PerfMon log count field specify the number of data points i.e. *logs* that must be collected to display the system performance information Value 0 for PerfMon log count generates logs till **TaskProfile subview** is stopped and no logs are generated in case of PerfMeter subview . \
		Click on the OK button to save the specified configuration. \
		Hardware configuration \
		When configuring the monitor to work with a hardware target platform some additional configuration is necessary \
		The Qualcomm USB drivers must be installed on the host development system \
		The host development system must be connected to the target platform with a USB cable \
		To identify the hardware port name to be entered in the [ COM Port field] Monitor configuration select Control Panel Device manager Ports from the Windows desktop. \
		.lua \
		return E.left E.img src images/utilities_monitor_mini_dm_config_port.png \
		NOTE For more information on installing the Qualcomm USB drivers see the Hexagon IDE release notes. \
		QuRT Monitor configuration \
		The PerfMeter subview of the [QuRT Monitor view] QuRT Monitor view can be configured to display only a subset of the default performance metrics. \
		To configure the display of performance metrics choose Preferences Hexagon Mini DM Performance Monitor from the Window menu The following dialog box appears \
		.lua \
		return E.left E.img src images/utilities_monitor_qurt_config_dialog.png \
		To select or deselect a performance metric click on the checkbox next to the corresponding metric name The Restore Defaults button reselects all the listed metrics. \
		Click on the Apply button to save the changes then click on OK to close the dialog box. \
		Flash binary \
		The flash binary utility is used to flash executable files onto the LA target. \
		To flash one or more files click on the Flash Image icon on the toolbar \
		.lua \
		return E.left E.img src images/utilities_flash_icon.png \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/utilities_flash_dialog.png \
		Specify the parameters for the flash operation \
		**Target** – Device that the files will be flashed onto The drop down list displays the serial numbers of all device connected to the host development system. \
		**Files to be flashed** – List of files to be flashed. \
		Files can be added to the list from either the workspace using the Workspace button or the file system using the File system button. \
		The ADSP image files can be added to the list using the Load ADSP image button Note that the ADSP project must be selected in Project Explorer. \
		Files can be deleted from the list using the Delete button. \
		**Target location** – The location on the device where the files must be copied The default location is /firmware/image . \
		**Restart the target** – Select this checkbox if the device must be restarted after the files are flashed to it. \
		To flash the selected files onto the specified device click on the Finish button. \
		Quick profile viewer \
		The quick profile viewer is used to display profiling information on a project including both static profiling information and the runtime profiling information collected by the [profiling library] Profiling library . \
		To view the profiling information for a unit test project in the IDE you must first import the corresponding projects into the IDE \
		Import the profiling library project as a Common library project \
		Import the corresponding unit test project as an Executable project \
		To open the quick profile viewer choose Show View Other Quick Profile from the Window menu. \
		NOTE Selecting a project in Project Explorer triggers the Quick Profile view to display the profiling information. \
		The following types of profiling information are displayed in the Quick Profile view \
		+ + + \
		Profiling Information Description \
		+ + + \
		Static Library project size \
		+ + + \
		Library stack size \
		+ + + \
		Runtime Cycle counts in certain use cases \
		+ + + \
		Total heap usage \
		+ + + \
		Peak heap usage \
		+ + + \
		Memory leaks if any \
		+ + + \
		Power usage \
		+ + \
		NOTE Runtime profiling is possible for a library project only when it has been integrated with a unit test project and successfully tested for a use case A successful unit test is necessary because the unit test uses a profile library which is responsible for collecting all the required statistics. \
		Library projects \
		When a library project appi_fir is selected in Project Explorer the Quick Profile view displays the static profiling information. \
		.lua \
		return E.left E.img src images/utilities_quickprof_static_view.png \
		Unit test projects \
		When a unit test project test_appi_fir is selected after a successful unit testing the Quick Profile view changes to display the runtime profiling information during different stages of unit testing. \
		.lua \
		return E.left E.img src images/utilities_quickprof_runtime_view.png \
		NOTE The power numbers are valid only for comparison – they cannot be assumed to indicate the exact power consumed by the library. \
		Device viewer \
		The target device viewer is used to determine what devices are currently connected to the host development system The Hexagon simulator is always shown as a connected device. \
		To open the target device viewer choose Show View Other Hexagon \
		Device List from the Window menu. \
		.lua \
		return E.left E.img src images/utilities_device_view.png \
		Selecting the Force device database refresh checkbox causes the IDE to detect any devices that are subsequently connected even if errors occur with the devices that are already connected. \
		NOTE The Device List view currently supports only Android devices. \
		RTOS viewer \
		The RTOS viewer displays the following information on the Hexagon RTOS \
		**Signals** – All signals used in the project \
		**Interrupt map** – All interrupt mappings available for the project \
		**Page table** – All page table mappings made during a debug session \
		**RTOS variables** – RTOS variables typically used for debugging \
		Each of these information types is displayed in a separate view. \
		The interrupt map and page table displays include some extra icons in the upper right hand corner of their views. \
		If the M icon Manual appears it indicates that these views will not be refreshed after debug events such as breakpoint hit step in or step out. \
		.lua \
		return E.left E.img src images/utilities_rtos_manual_icon.png \
		If the A icon Automatic appears it indicates that these views *will* be refreshed automatically after such debug events. \
		.lua \
		return E.left E.img src images/utilities_rtos_auto_icon.png \
		The Refresh icon is used to refresh the view when it is in manual mode. \
		.lua \
		return E.left E.img src images/utilities_rtos_refresh_icon.png \
		NOTE Clicking on the M icon changes it to A and vice versa. \
		NOTE The manual refresh option is used to reduce the load on the debugger. \
		Signals \
		To open the RTOS signals viewer choose Show View Other Hexagon Signals from the Window menu. \
		.lua \
		return E.left E.img src images/utilities_rtos_signals_view.png \
		Interrupt map \
		To open the RTOS interrupt map viewer choose Show View Other Hexagon Interrupt Map from the Window menu. \
		.lua \
		return E.left E.img src images/utilities_rtos_interrupt_view.png \
		Page table \
		To open the RTOS page table viewer choose Show View Other Hexagon Page Table from the Window menu. \
		.lua \
		return E.left E.img src images/utilities_rtos_page_view.png \
		RTOS variables \
		To open the RTOS variables viewer choose Show View Other Hexagon RTOS Variables from the Window menu. \
		.lua \
		return E.left E.img src images/utilities_rtos_variables_view.png	",
	"id":40
}
idx.add(doc)
urls[40]='eclipse_utilities.html'
titles[40]="﻿Utilities"

var doc = {
	"title": "﻿Debug benchmark_v65 on Hexagon simulator from command line",
	"body": " \
		Overview \
		This chapter describes how to debug benchmark_v65 on simulator from command line. \
		Please use the following steps Steps to debug v66 application are also same as below it is as simple as replacing v65 with v66 everywhere it appears in the instructions. \
		Step 1 – Build project \
		See [Setup Instructions] readme.html to setup the SDK environment and follow below steps to build benchmark_v65 \
		cd Hexagon_SDK_ROOT /examples/common/benchmark_v65 \
		make tree V hexagon_Debug_dynamic_toolv82_v65 VERBOSE 1 \
		Above make command builds benchmark_v65 and run it on simulator Please see Hexagon_SDK_ROOT /examples/common/benchmark_v65/hexagon_Debug_dynamic_toolv82_v65/pmu_stats.txt for the command line used to invoke the simulator. \
		.pre \
		D /Qualcomm/Hexagon_SDK/3.4.1/tools/HEXAGON_Tools/8.2.07/Tools/bin/hexagon sim mv65 simulated_returnval usefs hexagon_Debug_dynamic_toolv82_v65 \
		pmu_statsfile hexagon_Debug_dynamic_toolv82_v65/pmu_stats.txt dsp_clock 1000 ahb lowaddr 0xc0000000 ahb highaddr 0xc0ffffff cosim_file hexagon_Debug_dynamic_toolv82_v65/q6ss.cfg \
		l2tcm_base 0xd800 rtos hexagon_Debug_dynamic_toolv82_v65/osam.cfg D /Qualcomm/Hexagon_SDK/3.4.1/libs/common/qurt/computev65/sdksim_bin/runelf.pbn \
		D /Qualcomm/Hexagon_SDK/3.4.1/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv82_v65/run_main_on_hexagon_sim hexagon_Debug_dynamic_toolv82_v65/benchmark_q.so f epsilon w 256 h 64 \
		Step 3 – Define LLDB_HEXAGON_BOOTER_PATH \
		Before start debugging benchmark_v65 project LLDB_HEXAGON_BOOTER_PATH env variable needs to be defined Define environment variable LLDB_HEXAGON_BOOTER_PATH with the path to the booter executable. \
		.pre \
		set LLDB_HEXAGON_BOOTER_PATH Hexagon SDK root dir /libs/common/qurt/computev65/sdksim_bin/runelf.pbn \
		When lldb gets down to the simulator launch it will check for this environment variable If it exists it will treat this environment variable as the main target runelf.pbn \
		and pick the original target benchmark_q as first argument to main target runelf.pbn . \
		Step 4 – Debug project \
		Launch hexagon lldb with the binary to debug along with the arguments required. \
		.pre \
		D /Qualcomm/Hexagon_SDK/3.4.1/tools/HEXAGON_Tools/8.2.07/Tools/bin/hexagon lldb.exe \
		D /Qualcomm/Hexagon_SDK/3.4.1/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv82_v65/run_main_on_hexagon_sim mv65 simulated_returnval usefs \
		hexagon_Debug_dynamic_toolv82_v65 pmu_statsfile hexagon_Debug_dynamic_toolv82_v65/pmu_stats.txt cosim_file hexagon_Debug_dynamic_toolv82_v65/q6ss.cfg l2tcm_base 0xd800 rtos \
		hexagon_Debug_dynamic_toolv82_v65/osam.cfg hexagon_Debug_dynamic_toolv82_v65/benchmark_q.so f epsilon w 256 h 64 \
		lldb output should look like below after running above command \
		.pre \
		Hexagon utilities pagetable tlb pv loaded \
		lldb target create D /Qualcomm/Hexagon_SDK/3.4.1/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv82_v65/run_main_on_hexagon_sim \
		Current executable set to D /Qualcomm/Hexagon_SDK/3.4.1/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv82_v65/run_main_on_hexagon_sim hexagon . \
		lldb settings set target.run args mv65 simulated_returnval usefs hexagon_Debug_dynamic_toolv82_v65 pmu_statsfile hexagon_Debug_dynamic_toolv82_v65/pmu_stats.txt cosim_file hexagon_Debug_dynamic_toolv82_v65/q6ss.cfg l2tcm_base 0xd800 rtos hexagon_Debug_dynamic_toolv82_v65/osam.cfg hexagon_Debug_dynamic_toolv82_v65/benchmark_q.so f epsilon w 256 h 64 \
		In the above command simulator arguments are \
		.pre \
		mv65 simulated_returnval usefs hexagon_Debug_dynamic_toolv82_v65 pmu_statsfile hexagon_Debug_dynamic_toolv82_v65/pmu_stats.txt cosim_file hexagon_Debug_dynamic_toolv82_v65/q6ss.cfg l2tcm_base 0xd800 rtos hexagon_Debug_dynamic_toolv82_v65/osam.cfg \
		Program arguments are \
		benchmark_q.so f epsilon w 256 h 64 \
		after osam.cfg in lldb launching command is used to seperate simulator arguments from program arguments . \
		Once lldb is launched you can set breakpoints using b . \
		.pre \
		b test_main_start \
		Breakpoint can be set at main also but it will hit main of run_main_on_hexagon_sim first and main of your simulator test next. \
		To avoid this it is recommended to set breakpoint at test_main_start so that lldb can directly break in simulator test. \
		Use r to run the program. \
		r \
		It should launch the executable and break at test_main_start of benchmark_q.so as shown below. \
		.pre \
		lldb r \
		Process 1 launched D /Qualcomm/Hexagon_SDK/3.4.1/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv82_v65/run_main_on_hexagon_sim hexagon \
		1 location added to breakpoint 1 \
		Process 1 stopped \
		* thread 15 name ribbon stop reason breakpoint 1.1 \
		frame 0 0xffeccb48 benchmark_q.so test_main_start argc 6 argv 0x230dc338 at benchmark.c 175 \
		172 \
		173 int test_main_start int argc char* argv[] \
		174 \
		175 int WIDTH 1920 \
		176 int HEIGHT 1080 \
		177 int RPCLOOPS 1 \
		178 int DSPLOOPS 1 \
		lldb \
		From here on you can step continue look at the thread information register \
		information print variable values and continue debugging. \
		Some useful commands command description \
		breakpoint list list of breakpoints \
		registers read list the registers \
		thread list list the threads in the system at that instance of time \
		where shows the current line number and which file you are in \
		bt show trace of where you are currently Prints stack backtrace \
		frame v print values of local variables \
		fr v variable name print value stored in variable \
		fr v f x variable name print variable in hex \
		finish go to the end of the program \
		quit exit LLDB debugger	",
	"id":41
}
idx.add(doc)
urls[41]='benchmark_v65_cmdline_debug.html'
titles[41]="﻿Debug benchmark_v65 on Hexagon simulator from command line"

var doc = {
	"title": "Hexagon Tools 8.3",
	"body": " \
		Introduction \
		The Hexagon SDK includes the complete Hexagon tools package compiler linker \
		profiler etc . User guide for the different tools available in the SDK is available in the [Hexagon Programming Tools] images/80 VB419 142_Hexagon_Programming_SW_Dev_Tools.pdf . \
		Please refer to [Hexagon Tools Overview] images/Hexagon_Document_Bundle.pdf page 2 \
		Programmers References \
		[Hexagon V66] images/Hexagon_Document_Bundle.pdf page 8 \
		[For Linux users go to Page 8 of docs/images/Hexagon_Document_Bundle document] \
		User Guides \
		[Hexagon QuRT User Guide] images/80 VB419 178_QuRT_User_Guide.pdf \
		[Hexagon LLVM C/C++ Compiler] images/Hexagon_Document_Bundle.pdf page 5318 \
		[Hexagon C Library] images/Hexagon_Document_Bundle.pdf page 5451 \
		[Hexagon C++ Library] images/Hexagon_Document_Bundle.pdf page 5809 \
		[Hexagon Utilities] images/Hexagon_Document_Bundle.pdf page 6628 \
		[Hexagon Simulator] images/Hexagon_Document_Bundle.pdf page 6779 \
		[Hexagon LLDB Debugger] images/Hexagon_Document_Bundle.pdf page 6969 \
		[Hexagon Profiler] images/Hexagon_Document_Bundle.pdf page 7073 \
		[Hexagon gprof Profiler] images/Hexagon_Document_Bundle.pdf page 7097 \
		[Hexagon Code Coverage Profiler] images/Hexagon_Document_Bundle.pdf page 7114 \
		[Hexagon Resource Analyzer] images/Hexagon_Document_Bundle.pdf page 7129 \
		[Hexagon Stand alone Application] images/Hexagon_Document_Bundle.pdf page 7180 \
		[Hexagon exception handling] images/Hexagon_Document_Bundle.pdf page 7221 \
		Shared Object Format \
		[Hexagon Application Binary Interface Specification] images/Hexagon_Document_Bundle.pdf page 7201	",
	"id":42
}
idx.add(doc)
urls[42]='Tools_Hexagon%20Tools%208.3.html'
titles[42]="Hexagon Tools 8.3"

var doc = {
	"title": "Calculator offloaded",
	"body": " \
		Overview \
		If a task needs to be oflloaded to a DSP the user has the option to choose the DSP he wants the task to be executed in. \
		There are two mechanisms that is supported in our chipsets to do this. \
		* Legacy method Link the application containing the stub definition with the respective libXdsprpc.so \
		* Use Domains Open remote session providing the DSP name you choose at run time. \
		We recommend all users to use Domains as explained in the second example above to offload their tasks. \
		calculator_multi_legacy \
		Example calculator_multi_legacy illustrates the first of these mechanisms. \
		Recollect the following picture from the [FastRPC architecture] APIs_FastRPC.html \
		The below diagram depicts invocation of a single method where the client and \
		object reside on different processors. \
		method method \
		ADSPRPC ADSPRPC \
		Client Stub Driver Framework Skel Object \
		. . . . . \
		Applications Processor DSP Processor \
		The DSP Processor referred in the above picture is the ADSP However if the chipset has other DSP s you can offload the task to the user has the option to do so. \
		For a list of available DSP s in each chipset please refer to the [Feature Matrix] feature_matrix.html \
		Extending the above picture slightly to include another DSP say the CDSP if available . \
		method method \
		ADSPRPC ADSPRPC \
		Client Stub Driver Framework Skel Object \
		. . . . . \
		^ \
		Applications Processor ADSP Processor \
		method \
		. CDSPRPC \
		Framework Skel Object \
		. . . \
		CDSP Processor \
		As illustrated above the ADSPRPC driver residing in the application processor will offload the task to ADSP or CDSP depending on which libXdsprpc.so is linked to the stub library. \
		First you need to define the respective interface functions defined in the idl file Refer to the calculator_multi_legacy.idl in the inc folder. \
		Note how the interface class calculator is inherited for the DSP specific interface with interface name calculator prefixed with the respective DSP name i.e adsp_calculator cdsp_calculator etc. \
		As a result IDL compiler will now generate the stub and skel files for each of these interfaces separately. \
		Now refer to the android.min file in the example and study how the libadspcalculator and libcdspcalculator are getting linked to libadsprpc.so and libcdsprpc.so respectively. \
		The respective stub library is then linked to the final exe calculator_multi_legacy . \
		Calculator_multi_domains \
		In this example the application s interface is inherited from remote_handle64 This will allow the application to use the Open/Close functions of this interface to open remote sessions to the DSP the user can choose at run time The Open function takes a uri parameter as input where the user can specify the target DSP domain he wants the remote session to be connected to For details on the exact values to be provided to this interface you can refer to the the function calculator_test in file calculator_test.c The Open function returns a handle to the remote session created which can then be used to call into ther other interface functions defined in the IDL. \
		Internally the RPC driver running in the apps processor will know which domain to execute the skel function in based on the remote handle If the earlier Open function call fails the user has the option to open the session to a different DSP domain Please refer to section 4.2.2 of the [Programmer s guide for Hexagon] images/80 VB419 108_Hexagon_DSP_User_Guide.pdf for our recommendations for the domain usage. \
		The calculator_multi_domains example illustrates this by taking the domain value as a run time input Based on this value the example opens a remote session with the respective DSP and offloads the functions sum and max . \
		Building and Testing \
		Both the examples have walkthrough script that helps the user build and execute the example on the target The walkthrough script follows the same general structure explained in [calculator_walkthrough] calculator_android.html .	",
	"id":43
}
idx.add(doc)
urls[43]='calculator_multi.html'
titles[43]="Calculator offloaded"

var doc = {
	"title": "FastRPC",
	"body": " \
		Overview \
		The FastRPC framework allows for clients to transparently make \
		remote method invocations between applications and DSP processors. \
		This guide will go over FastRPC architecture using it on HLOS \
		and how to use the ION memory allocator for creating contiguous \
		buffers to use with FastRPC. \
		FastRPC architecture \
		The below diagram depicts invocation of a single method where the client and \
		object reside on different processors. \
		method method \
		ADSPRPC ADSPRPC \
		Client Stub Driver Framework Skel Object \
		. . . . . \
		Applications Processor DSP Processor \
		+ + + \
		**Client** User mode process that initiates the remote invocation \
		+ + + \
		**Stub** Auto generated code linked in with the user \
		that takes care of marshaling parameters \
		+ + + \
		**ADSPRPC** ADSPRPC kernel driver that receives the remote \
		**Driver** invocation queues them up and then waits for the \
		response after signaling the remote side \
		+ + + \
		**ADSPRPC** ADSPRPC framework dequeues the messages from the queue \
		**Framework** and dispatches them for processing \
		+ + + \
		**Skel** Auto generated code that takes care of unmarshaling \
		parameters \
		+ + + \
		**Object** Method implementation \
		+ + + \
		See the [FastRPC FAQ] FAQ_FastRPC.html for more information \
		Design Motivation \
		FastRPC was designed to facilitate remote procedure calls between \
		DSP and APPS the application processor . \
		* DSP and APPS share DRAM but not l2/l1 caches \
		* DSP has a small limited number of physical mappings it can efficiently support \
		To support any high performance compute applications memory has to \
		be mapped directly from the application processor to the DSP. \
		Because DSP cannot support a large number of dis contiguous physical \
		pages ION a contiguous memory allocator for android is required. \
		By separating buffers into in and rout the driver can overlap \
		cache synchronization between DSP and APPS cutting RPC latencies \
		by 50% inrout is not required because it is equivalent to passing \
		the same buffer as in and rout. \
		The protocol is synchronous for these reasons \
		* It s trivial for users to create a thread to add asynchronous behavior from userspace. \
		* It would add additional complexity for the kernel to manage state between DSP and APPS in an asynchronous call. \
		* It would not get memory to the DSP any faster performance is dominated by the cache synchronization operations. \
		Android \
		Software components \
		Here s the list of different software components that are required for the \
		integration of FastRPC \
		Applications Processor \
		+ + + \
		/system/vendor/lib/libadsprpc.so Shared object library that needs to be linked \
		or with the user space vendor application invoking \
		/vendor/lib/libadsprpc.so the remote procedure call \
		This library interfaces with the kernel driver \
		to initiate the remote invocation to aDSP \
		+ + + \
		/system/vendor/lib/libcdsprpc.so Shared object library that needs to be linked \
		or with the user space vendor application invoking \
		/vendor/lib/libcdsprpc.so the remote procedure call \
		This library interfaces with the kernel driver \
		to initiate the remote invocation to cDSP \
		+ + + \
		/system/lib/libadsprpc_system.so Shared object library that needs to be linked \
		with the user space system application invoking \
		the remote procedure call \
		This library interfaces with the kernel driver \
		to initiate the remote invocation to aDSP \
		This is applicable only for Android P system \
		applications \
		+ + + \
		/system/lib/libcdsprpc_system.so Shared object library that needs to be linked \
		with the user space system application invoking \
		the remote procedure call \
		This library interfaces with the kernel driver \
		to initiate the remote invocation to cDSP \
		This is applicable only for Android P system \
		applications \
		+ + + \
		DSP processor \
		+ + + \
		adsp_proc/platform/fastrpc s ADSPRPC framework library that gets \
		md/build/platform_libs/qdsp6 linked with the ADSP image It acts as the \
		/AAAAAAAA/fastrpc smd.lib transport accepting remove invocations \
		originating from applications processor \
		+ + + \
		cdsp_proc/platform/fastrpc s ADSPRPC framework library that gets \
		md/build/platform_libs/qdsp6 linked with the CDSP image It acts as the \
		/AAAAAAAA/fastrpc smd.lib transport accepting remove invocations \
		originating from applications processor \
		+ + + \
		Setup \
		Follow these steps to setup the FastRPC driver. \
		Note when making FastRPC calls the [Remote file system] \
		remote_file_system.html Dynamic loading within a FastRPC invocation \
		is also handled by the FastRPC driver so no additional setup is \
		required. \
		Check if the adsprpc driver is running \
		adb shell ls /dev/adsprpc smd \
		If file does not exist start the driver as follows \
		adb root \
		adb wait for device \
		adb shell insmod /system/lib/modules/adsprpc.ko \
		If module is not found and /dev/adsprpc smd is not present this device doesn t support FastRPC. \
		Re check if the adsprpc driver is running \
		adb shell ls /dev/adsprpc smd \
		FastRPC driver is now setup. \
		Optionally check that adsprpcd is running This deamon could be \
		located in /system/bin or /system/vendor/bin or some other \
		vendor defined location If running and logcat s /system/bin/ adsprpcd \
		doesn t show any errors FastRPC is enabled and operational If not running \
		start the deamon and check locat s /system/bin/ adsprpcd for errors. \
		On some older releases if this deamon is not running calls into DSP will \
		block until the daemon starts. \
		Related tools and documentation \
		+ + + \
		QAIC IDL Compiler Compiler used to generate stubs and skels \
		from the IDL interface \
		+ + + \
		[QAIC users guide] Remote procedure call methods are described \
		qaic_users_guide.html and in a language called IDL which is based on \
		[IDL reference] the OMG IDL specification The documents \
		qaic_idl_reference.html describe the syntax and semantics of IDL and \
		compiler usage \
		+ + + \
		Standard IDL Interfaces Standard interfaces included from inside the \
		and Headers IDL and headers included from the generated \
		stub and skel sources \
		+ + + \
		Sample Application Demonstrates how to define interface \
		[Calculator] generate stubs and skels link and test \
		Examples_Compute offload.html calculator the application \
		+ + + \
		Android NDK Compiler and tools required to build Android \
		applications \
		+ + + \
		Using the ION allocator \
		The DSP hardware is not well suited for handling dis contiguous memory \
		which is commonly the kind of memory users get from a simple malloc \
		call Android provides a contiguous memory allocator called ION. \
		For more in depth documentation of ION see \
		[http //lwn.net/Articles/480055] http //lwn.net/Articles/480055 . \
		Different versions of Android provide slightly incompatible \
		implementations of ion This guide describes some of the differences \
		between versions of ion APIs. \
		ICS and later Android versions \
		ICS implementation contain incompatible structures for the ion_alloc ioctl \
		when compared to later Android versions like JB/KK/L. \
		ICS \
		. \
		.ccode \
		struct ion_allocation_data \
		size_t len \
		size_t align \
		unsigned int flags \
		struct ion_handle *handle \
		Callers should set the flags variable to specify the heap id \
		.ccode \
		alloc.flags 0x1 HEAP_ID \
		JB/KK/L \
		. \
		.ccode \
		struct ion_allocation_data \
		size_t len \
		size_t align \
		unsigned int heap_mask \
		unsigned int flags \
		struct ion_handle *handle \
		Callers should set the heap_mask variable to specify the heap id \
		.ccode \
		alloc.heap_mask 0x1 HEAP_ID \
		Heap IDS \
		ION segregates memory into separate heaps that users can use to \
		allocate contiguous chunks Heaps are configured at build time for \
		Android and are limited by capacity To find out what heaps are \
		present on the device see the device s dtsi file. \
		For example the adsp heap for 8998 is defined in \
		kernel/arch/arm/boot/dts/msm8998.dtsi \
		adsp_mem adsp_region \
		compatible shared dma pool \
		alloc ranges 0 0x00000000 0 0xffffffff \
		reusable \
		alignment 0 0x400000 \
		size 0 0x800000 \
		It is registered with ion as heap id 22 in \
		kernel/arch/arm/boot/dts/msm8998 ion.dtsi \
		qcom ion heap@22 /* ADSP HEAP */ \
		reg 22 \
		memory region &adsp_mem \
		qcom ion heap type DMA \
		These may change from one Android build to another and from one \
		use case to another Implementers should take care to make the \
		heap id they use configurable externally from the application Or \
		use one appropriate for their use case. \
		RPCMem \
		This library is sample code on using Android s ION memory allocator. \
		Users should consult rpcmem.h and ion documentation in the Android \
		build for more information. \
		Example \
		. \
		.ccode \
		int main \
		void* buf 0 \
		int heapid RPCMEM_HEAP_ID_SYSTEM \
		//call this once at the start of your program \
		//Note rpcmem_init is not thread safe \
		rpcmem_init \
		// Refer rpcmem.h for recommendation on heap id \
		// For remote subsystems with SMMU ADSP and CDSP heapid RPCMEM_HEAP_ID_SYSTEM \
		// For remote subsystesm without SMMU SLPI mDSP heapid RPCMEM_HEAP_ID_CONTIG \
		buf rpcmem_alloc heapid RPCMEM_DEFAULT_FLAGS 4096 \
		assert buf \
		memset buf 0xff 4096 \
		rpcmem_free buf \
		//call this once at the end \
		rpcmem_deinit \
		return 0 \
		Note RPCMEM_DEFAULT_HEAP is depricated and no longer supported. \
		Using persistent threads on the DSP \
		An important thing to consider is that a module loaded on the DSP is shared between all the processes that use it So a HLOS specific context is required to track resources that are tied to the HLOS process requesting them. \
		Creating a thread with HAP_pls.h \
		.ccode \
		struct thread \
		qurt_thread_t tid \
		qurt_sem_t sem \
		boolean running \
		void* stack \
		static int thread_start void* data \
		struct thread* th struct thread* data \
		while th running \
		qurt_sem_down &th sem \
		return 0 \
		static void thread_dtor void* data \
		struct thread* th struct thread* data \
		if th tid \
		int err \
		th running 0 \
		qurt_sem_up &th sem \
		qurt_thread_join th tid &err \
		if th stack \
		free th stack \
		qurt_sem_destroy &th sem \
		static int thread_ctor void* ctx void* data \
		//this constructor may be called twice but only one instance will survive \
		qurt_thread_attr_t attr \
		struct thread* th struct thread* data \
		int size 1024*8 \
		if 0 th stack malloc size \
		goto error \
		qurt_sem_init_val &th sem 0 \
		qurt_thread_attr_set_stack_size &attr size \
		qurt_thread_attr_set_stack_addr &attr unsigned long long * th stack \
		qurt_thread_attr_set_name &attr my thread \
		th running 1 \
		if 0 ! qurt_thread_create &th tid &attr void* thread_start th \
		goto error \
		return 0 \
		error \
		thread_dtor th \
		return 1 \
		//the first time this function is called the thread will be constructed \
		//all subsequent calls will return the same thread instance or non zero failure \
		//this function should only be called from a FastRPC provided thread. \
		static int thread_instance struct thread* th \
		return HAP_pls_add_lookup uint32 thread_ctor //type some unique address \
		0 //key for different type instances \
		sizeof struct thread //size of our structure \
		thread_ctor //structure ctor \
		0 //additional user context for ctor \
		thread_dtor //destructor \
		&th //result \
		. \
		* HAP_pls_add_lookup only works when called from a FastRPC thread the thread you are on when you idl function is called If this function is called from any other thread the behavior is undefined. \
		Registering Destructors for HLOS exit \
		See [[Using persistent threads on the DSP]] and HAP_pls The same API \
		can be used to attach destructor to cleanup any resources allocated on \
		the DSP on behalf of the HLOS process. \
		FastRPC Domains \
		A domain is a remote environment for loading and executing code Each HLOS process can have concurrent PDs sessions running on different DSPs One HLOS process can have only one PD running on any given DSP. \
		Modules loaded by HLOS process get loaded into the corresponding PD on a specific DSP The below diagram gives a overview of the functionality of domains Here M corresponds to modules loaded on the PD If the users wants \
		to off load computation to multiple DSPs without the need to re link the binaries to different versions of the fastRPC library domains can be used. \
		Note Domains feature is supported from 8998 onwards \
		For more information about usage of domains please refer to \
		[Guide to compute offload in Hexagon] images/80 VB419 108_Hexagon_DSP_User_Guide.pdf \
		[QAIC IDL reference.] qaic_idl_reference.html Domains \
		HLOS DSP \
		+ \
		M1 M2 PD aDSP \
		+ \
		+ \
		M1 PD cDSP \
		+ \
		HLOS \
		Process \
		+ \
		M1 M2 PD SLPI \
		+ \
		+ \
		M1 PD mDSP \
		+ \
		FastRPC Debug Tips FAQ and more \
		[FastRPC FAQ] FAQ_FastRPC.html \
		[FastRPC errors and debugging tips] Introduction to FastRPC Debugging.html	",
	"id":44
}
idx.add(doc)
urls[44]='APIs_FastRPC.html'
titles[44]="FastRPC"

var doc = {
	"title": "DSP Clock & Resource Management",
	"body": " \
		[DSP Power and Performance Management] DSP Power & Perf.html \
		[Memory Management] Memory Management.html \
		[HVX Resource Manager HVX RM for SDM660] HVX Resource Manager.html \
		[CDSP L2 Cache Locking HAP Interface] L2 Cache Locking.html \
		[VTCM Manager] VTCM Manager.html \
		[DSP Concurrency] DSP Concurrency.html	",
	"id":45
}
idx.add(doc)
urls[45]='APIs_DSP%20Clk%20%26%20Rsrc%20Mgmt.html'
titles[45]="DSP Clock & Resource Management"

var doc = {
	"title": "﻿Android Native Projects",
	"body": " \
		Overview \
		Android NDK is a software development kit used to create native code applications for the Android operating system Programs are written in the C or C++ language and compiled to ARM native code. \
		This chapter describes how applications based on the NDK can be built run and debugged as projects in the Hexagon IDE The projects are run directly on the Android device which is connected to the host development system. \
		NOTE Developing NDK applications in the IDE eliminates the need to run the NDK tools from the command line interface. \
		Creating NDK projects \
		To create an NDK project start the Hexagon IDE The IDE main window appears \
		.lua \
		return E.left E.img src images/ndk_proj_default_eclipse_window.png \
		Choose New Project from the File menu. \
		A dialog box appears prompting you to select a wizard. \
		Expand the C/C++ folder and select C project or C++ project . \
		.lua \
		return E.left E.img src images/ndk_proj_new_proj_wizard_dialog.png \
		Click on the Next button to continue. \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/ndk_proj_new_proj_name_dialog.png \
		In the Project name field enter the project name factorial in this case . \
		NOTE Project names cannot contain spaces – if they do the IDE will have problems building and executing the project. \
		In the Location field specify the project location You can use the checkbox to restore the original default location. \
		In the Project type field expand the Executable folder and select the project type Android NDK EXE . \
		In the Toolchains field select Android NDK Tool Chain as the toolchain. \
		Click on the Next button. \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/ndk_proj_new_proj_author_dialog.png \
		In the Author field enter the name of the project author. \
		NOTE This name is optional – it will appear in the source file that is auto generated for the project. \
		In the Source Directory field specify the directory name in the project where the program source files are stored. \
		In the Android NDK Tools Root field specify the root directory of the Android NDK tools For example \
		.ccode \
		C /Qualcomm/Hexagon_SDK/1.1.0/tools/android ndk r8e \
		Click on the Finish button. \
		The IDE main window now displays the newly created NDK project. \
		NOTE This creates a 32bit NDK application. \
		Modifying project source file \
		When an NDK project is created a project source file named project_name.c is automatically generated at the specified location This file should be modified to contain the source code for the NDK project. \
		To modify the project source file expand the project name in Project Explorer and double click on the source file name. \
		The selected source file opens in the Eclipse text editor. \
		.lua \
		return E.left E.img src images/ndk_proj_edit_window.png \
		Building NDK projects \
		After the project source file is modified to contain the [application source code] Modifying project source file the project can be built. \
		To build an NDK project right click on the project in Project Explorer and choose Build Project . \
		.lua \
		return E.left E.img src images/ndk_proj_build_menu.png \
		NOTE To build all project configurations right click on the project in Project Explorer and choose Build Configuration Build All . \
		Running NDK projects \
		To run an NDK project right click on the project in Project Explorer and choose \
		Run As Android NDK Application . \
		.lua \
		return E.left E.img src images/ndk_proj_run_as_menu.png \
		Running the program produces the following output in the console. \
		.lua \
		return E.left E.img src images/ndk_proj_run_as_console.png	",
	"id":46
}
idx.add(doc)
urls[46]='eclipse_ndk_projects.html'
titles[46]="﻿Android Native Projects"

var doc = {
	"title": "﻿Unit test framework",
	"body": " \
		Overview \
		The Hexagon IDE provides executable frameworks for testing libraries developed with the Elite \
		APPI/CAPI project templates. \
		This chapter covers the following topics \
		Creating unit test projects \
		Integrating APPI/CAPI libraries into unit test projects \
		Running single tests \
		Running batch tests \
		Creating unit test projects \
		To create a unit test project right click on Project Explorer and choose New Hexagon Project . \
		In the resulting wizard select Audio PP Testing Project in the Executable class of projects. \
		Provide the necessary information and then click on the Finish button. \
		.lua \
		return E.left E.img src images/unit_test_proj_create_dialog.png \
		After you click Finish the IDE loads the main unit test file source along with other \
		project template files The loaded template files include the following key functionality \
		Support for parsing program arguments \
		Support for opening and reading files I/O and config files into allocated buffers \
		Support for running the unit test application \
		Support for parsing config file content based on keywords \
		Support for specifying media format settings for post processing features \
		Follows APPI/CAPI compliant command and data flow \
		You can add test specific code after integrating the audio PP library. \
		Integrating APPI/CAPI libraries into unit test projects \
		In order to invoke the APPI/CAPI library APIs unit tests based on executable projects require \
		integration of the APPI/CAPI compliant libraries This integration enables the libraries to be linked \
		to the unit test executable The IDE manages the linker options to ensure proper linking of the \
		libraries to the unit test executable. \
		To integrate libraries into a unit test project right click on the project and select \
		Integrate Library Integrate Hexagon Library The following dialog box appears \
		.lua \
		return E.left E.img src images/unit_test_integrate_library_dialog.png \
		You can add libraries to the unit test project remove them or change the build configuration \
		of libraries in the project. \
		To simplify the process of library integration across projects you can also import or export \
		sets of configured libraries. \
		NOTE For details on these operations see the following sections. \
		When you finish integrating the libraries click on the Finish button. \
		The following dialog box appears letting you know the libraries have been integrated \
		.lua \
		return E.left E.img src images/unit_test_integrate_library_confirm_dialog.png \
		The IDE ensures that the linker options in the unit test project will reflect the libraries \
		that were integrated into the project. \
		It also ensures that the APPI/CAPI header file paths are included into the compiler include \
		options of the unit test project. \
		NOTE When building and cleaning the unit test project make sure that the linked library is built Otherwise this operation will generate an error. \
		Integrating a APPI/CAPI dynamic library does not require any changes to the build system However you must \
		modify the following items \
		The function project_name .cpp dll_test in the unit test project which requires the proper dynamic library file location relative path to the unit test project \
		The APPI Init function name \
		The APPI getsize function name \
		Also you must set the __V_DYNAMIC__ flag to 1 in “ Project properties C/C++ \
		Build setting preprocessor symbols ” to enable dynamic library testing. \
		NOTE Build configurations are saved in the project settings file as persistent data and can \
		be restored from this file. \
		NOTE The function names that must be modified are marked in the code as “TODO” items These items can \
		be highlighted in the IDE editor using the icons that appear in the editor sidebars. \
		Adding libraries \
		To add one or more libraries to a unit test project click on the Add button in the \
		Integrate Hexagon& Library dialog box The following dialog box appears \
		.lua \
		return E.left E.img src images/unit_test_integrate_library_add_dialog_1.png \
		To select the libraries to add click on the Browse button and the following dialog box appears \
		.lua \
		return E.left E.img src images/unit_test_integrate_library_add_dialog_2.png \
		This dialog box lists all the libraries that can be added to the project. \
		The libraries listed are determined by the [project type] Creating unit test projects \
		For APPI projects only APPI libraries are listed. \
		For CAPI projects only CAPI libraries are listed. \
		To select one or more of the listed libraries for adding click on the checkbox next to each library name. \
		The Select All button selects all the listed libraries while Deselect All deselects all of them. \
		Click on the OK button to specify the selected libraries for adding. \
		The Integrate Library dialog box reappears with the libraries you selected now listed in \
		the Project name field \
		.lua \
		return E.left E.img src images/unit_test_integrate_library_add_dialog_3.png \
		Specify the configuration settings for the selected libraries \
		**Build configuration** – Build configuration Debug or Release of the libraries being integrated. \
		Click on the OK button to add the selected libraries to the unit test project. \
		The Integrate Hexagon Library dialog box reappears with the libraries you selected now \
		listed in the Project name table \
		.lua \
		return E.left E.img src images/unit_test_integrate_library_add_dialog_4.png \
		Removing libraries \
		To remove one or more libraries from a unit test project select the libraries in the \
		Integrate Hexagon Library dialog box and click on the Remove button. \
		Configuring libraries \
		To change the build configuration of one or more libraries in a unit test project select the \
		libraries in the Integrate Hexagon Library dialog box and click on the Edit button. \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/unit_test_integrate_library_config_dialog.png \
		Specify the configuration settings for the selected libraries \
		**Build configuration** – Build configuration Debug or Release of the libraries being integrated. \
		Click on the OK button to update the configuration of the selected libraries. \
		Importing and exporting libraries \
		To simplify the process of library integration across projects you can export the current set of \
		configured libraries in a project The result is exported as a CSV file which can then be used \
		to import the entire set of configured libraries into another unit test project. \
		NOTE The CSV file contains the library configuration not the libraries themselves. \
		To export the libraries assigned to a project click on the Export button in the Integrate \
		Hexagon Library dialog box This saves the current set of added libraries \
		and their build configurations to a CSV file with the specified name. \
		To import a set of libraries into a project click on the Import button in the \
		Integrate Hexagon Library dialog box This adds to the current project the set of libraries \
		that is defined in the specified CSV file. \
		Unit tests \
		Once an APPI/CAPI library has been integrated into a [unit test framework] Integrating APPI/CAPI libraries into \
		unit test projects the resulting executable can be run on the Hexagon Simulator to test the library functionality. \
		To run a unit test perform the following steps \
		1 Build the unit test project by right clicking on the project and selecting Build . \
		2 In Project Explorer right click on the project folder and select the specific executable file. \
		3 Choose Run As Run Configurations . \
		4 Navigate to the Simulator tab in the Run Configurations dialog box and specify the necessary simulator settings For more information on the simulator options see the [Hexagon Simulator User Guide] Tools_Hexagon Tools 8.3.html . \
		5 Navigate to the Arguments tab and provide the necessary program arguments including the input file output file and config file These arguments should be specified as shown in the following screen image. \
		6 Click on the Apply button to apply the new settings. \
		7 Click on the Run button to run the single test. \
		.lua \
		return E.left E.img src images/unit_test_run_configs_dialog.png \
		NOTE The input output and config files should be specified using paths that are relative to the project. \
		For example if the input file is located in full_proj_path/vectors/in/testinput.raw then the input \
		file name should be specified in the Arguments tab as vectors/in/testinput.raw . \
		Batch tests \
		The IDE can automatically run multiple [unit tests] Unit tests in batch mode and generate a report \
		summarizing the status success or failure of each unit test that was run. \
		Test cases \
		The test cases to be used in a batch test are specified in a test case file. \
		Text case files are XML compliant files identified by the suffix .qhut Qualcomm Hexagon Unit Test They \
		specify the test case information for each unit test that is performed in a batch test. \
		.xmlcode \
		Testcases \
		Testcase Name FIR_TEST2 \
		InputFile vectors_json/in/music_pei.pcm /InputFile \
		OutputFile vectors_json/out/fir_test_02.pcm /OutputFile \
		ConfigFile cfg/hpf.cfg /ConfigFile \
		Reference vectors_json/ref/music_pei_ref.pcm /Reference \
		RunStatus True /RunStatus \
		/Testcase \
		Testcase Name FIR_TEST3 \
		InputFile vectors_json/in/music_pei.pcm /InputFile \
		OutputFile vectors_json/out/fir_test_02.pcm /OutputFile \
		ConfigFile cfg/hpf.cfg /ConfigFile \
		Reference vectors_json/ref/music_pei_ref1.pcm /Reference \
		RunStatus True /RunStatus \
		/Testcase \
		Testcase Name FIR_TEST4 \
		InputFile vectors_json/in/music_pei.pcm /InputFile \
		OutputFile vectors_json/out/fir_test_02.pcm /OutputFile \
		ConfigFile cfg/hpf.cfg /ConfigFile \
		Reference vectors_json/ref/music_pei_ref.pcm /Reference \
		RunStatus False /RunStatus \
		/Testcase \
		Testcase Name FIR_TEST5 \
		InputFile vectors_json/in/music_pei.pcm /InputFile \
		OutputFile vectors_json/out/fir_test_02.pcm /OutputFile \
		ConfigFile cfg/hpf.cfg /ConfigFile \
		Reference/ \
		RunStatus True /RunStatus \
		/Testcase \
		/Testcases \
		The following properties are required in the test case information for a given unit test \
		**Name** – Unique test name \
		**Input File** – Input file to be processed by the test case \
		**Config File** – Configuration file containing test parameters \
		**Output File** – Output file to be generated by the test case \
		The following properties are *optional* in the test case information for a given unit test \
		**Reference File** – The contents of this file will be compared with the contents of the output file to determine the status success or failure of running a unit test. \
		**Run Status** – Activation setting for a test case This property is assigned a Boolean value indicating whether a test case should be activated true or deactivated false Deactivated tests are not run as part of the batch test. \
		Editing test cases \
		Users can create or update a test case file in one of two ways \
		Using the form editor provided with the Hexagon IDE \
		Using a standard XML editor or text editor note that the IDE provides both \
		To create a new test case file right click on the project in Project Explorer and choose New File . \
		Name the new file with the .qhut suffix. \
		Once the new file is created an empty form appears. \
		.lua \
		return E.left E.img src images/unit_test_test_cases_1.png \
		To add a new test case click on the Add icon \
		.lua \
		return E.left E.img src images/unit_test_case_add_icon.png \
		Fill in the required field values for the test case properties The test case name must be unique in the test list. \
		The Test Cases pane displays the current list of test cases defined in the file. \
		When a test is selected the corresponding details are shown. \
		.lua \
		return E.left E.img src images/unit_test_test_cases_2.png \
		To remove a test case select it and click on the Remove icon \
		.lua \
		return E.left E.img src images/unit_test_case_remove_icon.png \
		To toggle the test case run status Run Status is set to true/false click on the Toggle Status icon \
		.lua \
		return E.left E.img src images/unit_test_enable_disable_icon.png \
		NOTE When an active test case is disabled the selected test case name is set to non bold/italic \
		font to indicate that the test case is disabled for running. \
		Batch test requirements \
		Running a batch test requires the following \
		Executable unit test project with a built executable binary \
		Test case file containing multiple test cases \
		Input and output vector files reference files configuration files \
		NOTE The binary file and test case file need to be accessible in the current path. \
		Running a batch test \
		To run all the tests in the test case file click on the Run All icon \
		.lua \
		return E.left E.img src images/unit_test_run_all_icon.png \
		The IDE then runs each of the unit test cases specified in the [test case file] Test cases using \
		the associated support files to drive the test \
		**Input file** – File providing input stream for post processing \
		**Output file** – File receiving output stream for post processing \
		**Configuration file** – File providing configuration parameters for initializing the unit test \
		**Reference file** – The contents of this file are compared with the contents of the output file to determine the status result success or failure of running the unit test \
		A unit test case will run only if one of the following conditions is true \
		The test case does not contain the RunStatus property. \
		The test case contains the RunStatus property and the property is set to the value true. \
		To run a single test case click on the Run Selected icon \
		.lua \
		return E.left E.img src images/unit_test_run_selected_icon.png \
		NOTE You can use this to run more than one test case in the list. \
		Interpreting batch test results \
		The unit test editor displays the execution status success or failure of each unit test in \
		a batch test by color coding the test case data as it appears in the editor window. \
		.lua \
		return E.left E.img src images/unit_test_test_cases_3.png \
		If a test is shown with a green checkmark icon this indicates that the test succeeded because the contents of the test’s generated output file are identical to the contents of the test’s specified reference file . \
		.lua \
		return E.left E.img src images/unit_test_run_pass_icon.png \
		If a test is shown with a red X icon this indicates that the test failed because the contents of the test’s generated output file are not identical to the contents of the test’s specified reference file . \
		.lua \
		return E.left E.img src images/unit_test_run_fail_icon.png \
		If a test is shown with a small red x icon in gray this indicates that the test status is unknown because no reference file was specified for the test in the JSON file . \
		.lua \
		return E.left E.img src images/unit_test_run_noref_icon.png \
		If a test is shown with a blue H icon it indicates that the test case was not executed because the RunStatus property was set to false. \
		.lua \
		return E.left E.img src images/unit_test_run_disabled_icon.png \
		The console output for each of the unit tests can be viewed by clicking on the terminal icon Console that appears on the right hand side of the IDE Console view and then selecting the appropriate test instance. \
		.lua \
		return E.left E.img src images/unit_test_console_icon.png \
		The results are persistent even across sessions too until the tests are either run again or cleared \
		by clicking on the broom icon Clear Results \
		.lua \
		return E.left E.img src images/unit_test_run_clear_results_icon.png	",
	"id":47
}
idx.add(doc)
urls[47]='Testing_Eclipse%20Unit%20Tests.html'
titles[47]="﻿Unit test framework"

var doc = {
	"title": "Dynamic loading FAQ",
	"body": " \
		Why is dynamic loading failing \
		Hexagon Shared object not in the proper location see \
		[Remote file system] remote_file_system.html \
		Path passed to dlopen was incorrect The path is relative to the remote \
		file system root on the HLOS. \
		Format of the dynamic shared object files \
		The dynamic shared object files are ELFs that adhere to the specification \
		described in the document [Hexagon Application Binary Interface Specification] \
		Tools_Hexagon Tools 8.3.html \
		which is an addendum to the System V Application Binary Interface as described by \
		[http //www.sco.com/developers/gabi/latest/contents.html] http //www.sco.com/developers/gabi/latest/contents.html \
		Do dynamic shared objects support C++ \
		No at this time dynamic shared objects do not support code written in C++. \
		Remote file system \
		See [Remote file system] remote_file_system.html for more information. \
		Assembly code data access in shared objects \
		Shared Objects are compiled as position independent This is done \
		automatically for higher level languages like C/C++ But for assembly the \
		programmer must do this manually More information is available in the \
		document [Hexagon Application Binary Interface Specification] \
		Tools_Hexagon Tools 8.3.html \
		relocation R_HEX_32_6_X in section / .text/ cannot be handled in a shared object recompile with / fpic/ \
		When writing assembly for dynamic shared objects data access must be position \
		independent see [[Assembly code data access in shared objects]] \
		How to debug dynamic modules in Trace32? \
		* Put a breakpoint in dlopen right after the dlopen call returns its result in R0. \
		* Run the script //haagen/dsp_qdsptools_cvsw sd/mrohera/qurt_ml_4/examples/dl_qurt_dbg/dyn_mod.cmm for module’s symbols to be loaded. \
		do dyn_mod.cmm \
		Note This script retrieves the path information to the DSO automatically \
		from the target runtime environment and assumes that the DSO to be loaded \
		into T32 is available on the local file system at the same location For \
		example if on target the dynamic linker loads the DSO from \
		“./path/mydso.so” this script will execute command \
		d.load.elf “./path/mydso.so” vaddr /nocode /noclear \
		Why do I see the message cannot open /librpcversion_skel.so \
		This message will post whenever an RPC calls is serviced by a static service \
		one built into the static DSP image RPC first attempts to locate the \
		handler of the call dynamically hence looking for librpcversion_skel.so if \
		not found the call is handled by the built in static service. \
		The error message will vary depending on what static service is being called. \
		For example rpcversion is used to get the serial number so you should expect \
		to see this message when creating a test sig. \
		Why do I see the message HAP_debug_v2 weak ref not found return _rtld_sym_zero@_rtld_objmain \
		This message appears when a shared object that is built against FARF headers \
		that are shipped in the newer versions of the Hexagon SDK 1.2 is loaded on \
		older DSP images The newer DSP images include an optimization in the \
		FARF mechanism that removes one copy operation This optimization depends on \
		the presence of the function HAP_debugt_v2 in the ADSP image If this function \
		is not found exported by the DSP image FARF falls back to the older \
		implementation.	",
	"id":48
}
idx.add(doc)
urls[48]='FAQ_Dynamic%20Loading.html'
titles[48]="Dynamic loading FAQ"

var doc = {
	"title": "Target support",
	"body": " \
		Overview \
		The Hexagon SDK focuses on the Mobile Development Platforms and Dragonboard \
		Development Kit as the platform for developers to develop and test their \
		solutions. \
		This SDK supports the development boards based on Qualcomm s SM6150 SM8150 QCS405 SDM845 SDM660 8996 and 8998 chipsets. \
		Getting started with the MDPs/Dragonboards \
		This section describes how to install relevant drivers on the targets It is assumed that you have procured your Dragonboard or any other Mobile Developement Board. \
		Installing USB drivers \
		For Windows \
		Qualcommm USB drivers are available in the Hexagon SDK at SDK_ROOT /tools/usb USB drivers can be installed by running Setup.exe in SDK_ROOT /tools/usb directory For more \
		details on USB drivers please click [here] Debugging_Connect to Device.html \
		For Linux \
		There are no USB drivers provided from Qualcomm to work with devices on Linux Please use use the default Linux USB drivers on Ubuntu to connect the devices. \
		Working with Android devices \
		Android adb and fast boot tools are required to work on the devices connected to the PC. \
		There are documentation available from Android developer website that describes \
		about usage of ADB Android Debug Bridge and configuring Android devices. \
		Using hardware devices http //developer.android.com/tools/device.html \
		ADB Android Debug Bridge http //developer.android.com/tools/help/adb.html	",
	"id":49
}
idx.add(doc)
urls[49]='Platforms_Target.html'
titles[49]="Target support"

var doc = {
	"title": "Dynamic Loading",
	"body": " \
		The Hexagon SDK provides the tools and services to create and execute custom \
		code on the DSP via dynamic shared objects. \
		Dynamic shared objects allows for the customization of the DSP image at \
		run time without the need to rebuild the DSP image It also allows for \
		DSP code to be added or removed based on run time needs. \
		Dynamic shared objects are analogous to Linux .so and Windows .dll files They \
		are implemented as ELF files and exist as files in the HLOS file system which \
		are loaded by the DSP via an inter processor communication mechanism Once \
		loaded all symbols publicly exported by the shared object can be referenced or \
		called. \
		The creation of shared objects is supported by the Hexagon Tools version 5.0.9 \
		and newer. \
		The document [Hexagon Application Binary Interface Specification] \
		Tools_Hexagon Tools 8.3.html \
		provides more information about the structure and limitations of dynamic shared \
		objects. \
		For more information on dynamic loading see \
		[Dynamic loading FAQ] FAQ_Dynamic Loading.html for more information on writing code \
		for dynamic shared objects. \
		[Remote file system] remote_file_system.html \
		[Signing] Tools_Signing.html \
		[Calculator example] Examples_Common.html calculator	",
	"id":50
}
idx.add(doc)
urls[50]='APIs_Dynamic%20Loading.html'
titles[50]="Dynamic Loading"

var doc = {
	"title": "Memory Management",
	"body": " \
		Overview \
		This document describes the various memory types that are available to the developers \
		of HAP modules their usage and the impact of memory choices on the functionality \
		and performance. \
		Hardware Overview \
		System Memory \
		The Hexagon DSP processor is one of the several processing units available on the \
		SoC package For example the high level operating system such as Android runs \
		on the Application Processor The various processors typically have access to \
		the same hardware memory unit e.g DDR3 However the memory is logically divided \
		so that various processing units have exclusive/shared access to various portions of \
		the physical DDR This is described in the diagram below \
		+ + + + + + \
		Shared \
		DDR HLOS Memory DSP \
		Memory Memory \
		+ + + + ++ + ++ + \
		+ + ++ ++ \
		Memory Protection Units \
		+ + ++ \
		+ + \
		Application Hexagon \
		Processor Processor \
		Therefore although the same physical memory device is used by all the SoC \
		processing units the logical separation of memory between various processing \
		units is enforced by memory protection units These units either allow or prevent \
		access to various memory areas depending on which processing unit initiates \
		the access request. \
		Memory Translation in Hexagon DSP \
		The above view of the memory represents the *PHYSICAL ADDRESS PA LAYOUT* of system memory In \
		order to manage the physical chunk of memory assigned to the Hexagon DSP processor \
		the Hexagon core contains an internal Memory Management Unit MMU This allows \
		the RTOS to provide a *VIRTUAL ADDRESS VA LAYOUT* of memory to running applications The translation \
		of virtual addresses to physical addresses is performed by the MMU with the help \
		of Page Tables maintained by the RTOS Recently used Page Table entries are cached \
		inside the MMU using *Translation Look ahead Buffers TLBs *. \
		This scheme is described below. \
		+ + \
		DDR DSP Memory \
		Physical on DDR \
		+ ++ + \
		Physical Address on Address Bus \
		+ ++ + \
		M M U \
		+ + \
		TLB \
		+ + + + \
		Virtual Address to \
		Hexagon apps \
		H E X A G O N D S P \
		The Qualcomm QURT RTOS provides MMU with the translation information on how \
		to convert the Virtual Addresses into Physical Addresses This is done by \
		populating VA PA translation entries in the MMU TLB buffers table The number of \
		TLB entries is limited and TLB table cannot represent the entire memory available \
		to the Hexagon DSP processor. \
		Hence when a read/write request is issued on a VA the MMU intercepts the request and \
		looks for VA PA mapping in the TLB table If no entry matching the VA is found \
		in the TLB table then a TLB miss exception is raised which is handled by the \
		QURT RTOS The RTOS then looks to see if the requested VA is available in the \
		page tables that the RTOS manages If found it adds the VA PA mapping in one of \
		the TLB buffers if all the TLC buffers are occupied an eviction scheme is used \
		to remove an existing TLB entry to make room for new one After filling the \
		TLB entry the Program Counter is reset to the Load/Store request instruction. \
		However if the mapping is not found then the exception is bubbled up possibly \
		resulting in rest of Hexagon DSP processor. \
		The scheme is described in the flow diagram below \
		+ + + + + + + + \
		MMU TLB RTOS Application \
		+ + + + + + + + \
		Load/Store to a \
		+ + + \
		VA \
		Lookup \
		+ \
		VA in TLB \
		+ + + + \
		If TLB found \
		use the VA PA \
		+ + + + \
		No TLB entry \
		+ + \
		raise TLB \
		miss excep \
		+ + \
		Search page \
		tables for \
		mapping \
		+ + \
		Add mapping \
		+ \
		to TLB \
		Restore PC to \
		+ \
		Application \
		code \
		Re issue Load/Store \
		+ + + \
		instruction \
		TLB Pressure \
		As the number of TLB entries is limited in the TLB table the TLB table can quickly \
		fill up From then on each new addition into the TLB table has to be proceeded \
		by the eviction of an existing TLB entry This is referred to as *TLB Pressure*. \
		To reduce the TLB pressure the Hexagon MMU accommodates various sizes of TLB entries e.g. \
		4k 16k 64k 256k 1MB 4MB 16MB Therefore to optimize data usage for large \
		buffers it is essential that these large buffers use minimum number of TLB entries. \
		This can be achieved by allocating large physically contiguous chunks of buffers \
		to map corresponding large virtual address range instead of mapping several physically \
		discontinguous chunks to represent a virtually contiguous range . \
		Allocating Physically Contiguous Buffers \
		Memory Carveout \
		As described in the section [[TLB Pressure]] it is essential for applications \
		offloading large data buffers to the DSP to allocate physically contiguous buffers \
		so that least number of TLB entries are used to represent these buffers. \
		On the HLOS this can be achieved by allocating compute buffers using a contiguous \
		memory allocator such as ION A [discussion of ION is available here] APIs_FastRPC.html Using%20the%20ION%20allocator . \
		The SDK also provides a [mechanism called RPCMem] APIs_FastRPC.html RPCMem \
		that allows user to allocate SMMU or CMA memory by simply passing the heap id and flags. \
		This section describes various implementations of the system memory and how buffers \
		are transferred between HLOS and Hexagon DSP. \
		Typically a portion of the HLOS memory is carved out for usage by Hexagon DSP The \
		Hexagon DSP processor is given READ/WRITE access to this subset of the HLOS memory. \
		+ + + + \
		DDR HLOS + DSP \
		Memory DSP Heap Memory \
		carveout \
		+ + + +++ + + + \
		+ + ++ ++ \
		Memory Protection Units \
		+ + ++ \
		+ + \
		Application Hexagon \
		Processor Processor \
		Buffers allocated from DSP Heap memory carveout can be mapped into the DSP MMU \
		so that the Hexagon DSP applications can also read/write to these buffers Allocations \
		in this area are made using ION/RPCMem APIs. \
		Note This approach is not recommended for ADSP/CDSP usecases as SMMU is available to \
		provide us physically contiguous memory Explained in detail below. \
		SMMU \
		One of the limitations of [[Memory Carveout]] is that it imposes the need to allocate \
		physically contiguous buffers on the HLOS memory Therefore HLOS has to set aside \
		a portion of it s precious memory to be used exclusively by DSP This is inefficient \
		as the memory is not fully utilized To avoid this some Snapdragon devices \
		contain an SMMU in between the Hexagon Processor and the System Memory The SMMU \
		provides another translation layer and can be used to scatter gather physically \
		discontiguous chunks of DDR memory but present a *physically contiguous view* \
		to the Hexagon DSP processor. \
		+ + + + + \
		o o o \
		DDR HLOS o o o DSP \
		Memory IOMMU o Memory \
		HEAP o \
		+ + + + + \
		WW \
		^ +++ \
		Physical addresses discontiguous blocks \
		++++ + \
		SMMU \
		+ ++ + \
		Intermediate address contiguous block \
		++ \
		Hexagon \
		Processor \
		With SMMU the allocations on the HLOS are made on an IOMMU heap and the physical \
		pages can be discontiguous chunks After allocating the pages the HLOS IOMMU \
		driver is used to map the pages into the SMMU in front of the Hexagon DSP such \
		that the MMU inside the Hexagon Processor views them as a single physically \
		contiguous chunk This reduces TLB pressure and optimizes code performance.	",
	"id":51
}
idx.add(doc)
urls[51]='Memory%20Management.html'
titles[51]="Memory Management"

var doc = {
	"title": "Hexagon integrated development environment",
	"body": " \
		Overview \
		The Hexagon& 8482 processor includes a complete set of software development tools. \
		The tools can be used in either of the following environments \
		The command line interface CLI of the host development system \
		The Hexagon integrated development environment IDE \
		This document explains how to use the tools in the Hexagon IDE. \
		Topics \
		[Introduction] Environments_Hexagon IDE.html presents an overview of the Hexagon IDE. \
		[Starting Eclipse for Hexagon] eclipse_starting_eclipse.html describes how to start the IDE. \
		[Developing your first project] eclipse_first_project.html presents a tutorial on how to develop a simple application using Eclipse. \
		[Importing SDK Example] To know how to import a project into workspace please refer to import section in [Target Debugging] eclipse_target_debug.html . \
		[Target Debugging] eclipse_target_debug.html describes how to use the IDE to debug an application for target. \
		To use Eclipse debugger for your application on the Hexagon Simulator refer to [Using Eclipse to debug on Hexagon simulator] Debugging_Simulator.html . \
		[Working with projects] eclipse_projects.html serves as a reference on how to create build run and debug projects in the IDE. \
		[Compute off load application] eclipse_compute_offload_application.html describes how to use FastRPC applications in the IDE. \
		[Utilities] eclipse_utilities.html describes various utilities provided as part of the IDE. \
		[Editors] eclipse_editors.html describes various editors provided as part of the IDE. \
		[Android Native Projects] eclipse_ndk_projects.html describes how to develop Android NDK projects in the IDE. \
		[Keyboard shortcuts] eclipse_shortcuts.html lists the keyboard shortcuts defined for the IDE commands. \
		IDE features \
		The Hexagon IDE is based on Eclipse& 8482 an industry standard platform for software development The Eclipse platform consists of the following components \
		An integrated development environment IDE which unites a set of software development tools editor compiler build manager debugger in a common user interface. \
		An extensible plug in system which enables Eclipse to support software development in a number of programming languages including C and C++. \
		Eclipse includes a standard development toolkit for C and C++ which is named CDT The Hexagon IDE is implemented as a variant of Eclipse CDT and supports all CDT features \
		Powerful C/C++ editor \
		Code browsing indexing call hierarchy etc. \
		Hexagon specific features \
		The Hexagon IDE includes a number of features designed specifically to support software development for the Hexagon processor \
		Audio post processing and audio codec libraries using the APPI/CAPI project templates \
		Unit test framework for testing libraries \
		Profiler and resource analyzer for Hexagon programs \
		Editors for IDL APIs and Hexagon assembly language \
		Running and debugging compute off load applications \
		Interface for USB based debugging on target platform \
		Unit test frameworks are executable frameworks for testing libraries developed using the APPI/CAPI templates. \
		NOTE When Hexagon projects are run in the IDE they execute on the Hexagon simulator Debugging is supported in the IDE using Hexagon GDB. \
		System requirements \
		Windows 64 bit \
		Linux Ubuntu 10 \
		Documents \
		This document assumes basic knowledge of Eclipse For an overview of Eclipse concepts see the following publications \
		[Eclipse CDT Documentation] http //www.eclipse.org/cdt/documentation.php \
		Burnette E. Eclipse IDE Pocket Guide O Reilly Media 2005 \
		Feedback \
		If you have any comments or suggestions on how to improve the Hexagon IDE or this document please see the [Contact] Support_Contact.html page.	",
	"id":52
}
idx.add(doc)
urls[52]='Environments_Hexagon%20IDE.html'
titles[52]="Hexagon integrated development environment"

var doc = {
	"title": "",
	"body": " \
		When user process crashes on DSP fastrpc exception handler collects the required information from QURT and flush the messages to logcat This allows the user to understand the reason for the crash It contains information like process name thread name and last known PC location along with the library name It also lists the offset and size of all the dynamically loaded objects for user reference. \
		Below are the list of details provided in the logcat logs during the crash \
		1 User process name \
		2 Thread name \
		3 Name of the shared object and the symbol offset derived from PC during crash \
		4 Kind of exception and details \
		5 Last known PC \
		6 Call trace \
		Given below is an example of the logcat for reference \
		.pre \
		adsprpc ADSP Process on aDSP CRASHED!!!!!!! \
		adsprpc ADSP Crash Details are furnished below \
		adsprpc ADSP process /frpc/f067e6a0 calculator crashed in thread /frpc/f067e6a0 due to TLBMISS RW occurrence in ./libcalculator_skel.so \
		adsprpc ADSP Crashed Shared Object ./libcalculator_skel.so load address 0xe648c000 \
		adsprpc ADSP fastrpc_shell_0 load address DE500000 and size D2208 \
		adsprpc ADSP Fault PC 0xE648C8D0 \
		adsprpc ADSP LR 0xE648C8B4 \
		adsprpc ADSP SP 0xAE0B3DC0 \
		adsprpc ADSP Bad va 0x0 \
		adsprpc ADSP FP 0xAE0B3DE8 \
		adsprpc ADSP SSR 0x21970770 \
		adsprpc ADSP Call trace \
		adsprpc ADSP [ e648c8b4 ] calculator_sum+0xB4 ./libcalculator_skel.so \
		adsprpc ADSP [ e648c7ac ] calculator_skel_invoke+0x23C ./libcalculator_skel.so \
		adsprpc ADSP [ e648c5c0 ] calculator_skel_invoke+0x50 ./libcalculator_skel.so \
		adsprpc ADSP [ de5721a0 ] mod_table_invoke+0x2A4 fastrpc_shell_0 \
		adsprpc ADSP [ de5950b4 ] fastrpc_invoke_dispatch+0x14D4 fastrpc_shell_0 \
		adsprpc ADSP [ de56cab4 ] adsp_current_process_getASID+0x26C fastrpc_shell_0 \
		adsprpc ADSP [ de56e36c ] _pl_fastrpc_uprocess+0x730 fastrpc_shell_0 \
		adsprpc ADSP End of Crash Report \
		Note This feature is supported only on SM8150 and later devices. \
		Please use below steps to find out crash location in source code from crash signature. \
		Crash signature gives Fault PC address and load address of crashed elf. \
		Crashed Shared Object ./libcalculator_skel.so load address 0xE42F0000 \
		Fault PC 0xE42F08B0 \
		Find the offset by calculating difference between Fault PC and load address of your crashed shared object. \
		0xE42F08B0 0xE42F0000 0x8B0 \
		Run hexagon addr2line using this offset and crashed shared object as below to \
		get line number in source file where it crashed. \
		Hexagon_SDK tools/HEXAGON_Tools/8.2.04/Tools/bin/hexagon addr2line.exe \
		e libcalculator_skel.so 0x8B0 \
		hexagon addr2line.exe output should look like below \
		D /Qualcomm/Hexagon_SDK/3.4.0/examples/common/calculator/src/calculator_imp.c 24 4 \
		This means source code located at line number 24 in calculator_imp.c caused this PD crash. \
		Also you can run hexagon llvm objdump.exe to find out the disassembly of crashing packet. \
		Hexagon_SDK tools/HEXAGON_Tools/8.2.04/Tools/bin/hexagon llvm objdump.exe \
		disassemble source libcalculator_skel.so \
		Above command gives disassembly of all instructions in libcalculator_skel.so with source interleaved. \
		In this example the offset of FaultPC is 0x8B0 you can search for instructions at this offset in hexagon llvm objdump.exe \
		output you should see something like below. \
		*res *p \
		8ac 62 ff 9e 97 979eff62 r2 memw r30+ 20 \
		8b0 02 c0 82 91 9182c002 r2 memw r2+ 0 \
		8b4 00 c0 42 84 8442c000 r1 0 sxtw r2 \
		8b8 a2 ff 9e 97 979effa2 r2 memw r30+ 12 \
		8bc 00 c0 c2 a1 a1c2c000 memd r2+ 0 r1 0 \
		The instruction at 8b0 is causing PD exception in this example This way you can use hexagon addr2line.exe or hexagon llvm objdump.exe to find out the source location of PD crash.	",
	"id":53
}
idx.add(doc)
urls[53]='Debugging_Exceptions.html'
titles[53]=""

var doc = {
	"title": "CDSP L2 Cache Locking HAP Interface",
	"body": " \
		Supported Chipsets \
		CDSP SDM845 SDM670 SM8150 SM6150 QCS605 \
		Overview \
		Cache locking driver on CDSP provides a way to user to lock the cache for required memory size Once processing is done on locked memory then user can put the request to unlock the \
		same. \
		Previous approach for cache locking HAP_power_set_linelock and HAP_power_set_linelock_nothrottle by HAP_power_set API is deprecated now due to below limitations \
		1 There was no way to track the total locked cache which can be useful information in debugging. \
		2 No limit on cache size to be locked which can result in complete cache locked and hence might affect the other running applications. \
		3 As client used to allocate the memory and pass the memory address for locking so in case of multiple lock requests there is possibility of cache lines overlap which can result in lock failure even though there is cache available for locking. \
		But this new cache locking manager effectively handles the multiple cache lock requests by allocating the memory on client behalf and avoids the possibility of cache lines overlap \
		to utilize the available cache for locking in best way Framework also limits maximum cache that can be locked to guarantee the performance of guestOS and FastRPC threads. \
		Framework also provides query APIs to get the maximum available cache size for locking and total locked cache at that moment It helps applications to make the cache lock requests \
		accordingly and also to monitor the total locked cache at any point of time. \
		Also there is separate cache lock unlock APIs where user can pass address of memory to be locked along with size information These APIs are mainly useful in applications where user is particular about the address to lock for example in code/library locking case. \
		Following sections explains APIs in detail and how to use them. \
		API s \
		HAP_cache_lock \
		Allocates memory and locks cache for given memory size in Bytes and returns locked virtual address. \
		+ + + \
		API void/* **HAP_cache_lock** unsigned int **size** unsigned long long/* **paddr_ptr** \
		+ + + \
		size Memory size in Bytes to be locked For SDM845 SDM670 maximum size limit is 384KB \
		+ + + \
		paddr_ptr To get the locked 64bit physical address If physical address is not needed then can pass NULL \
		+ + + \
		Return Returns locked virtual address In case of failure returns 0 \
		+ + + \
		HAP_cache_unlock \
		Unlocks cache and deallocates memory based on given virtual address. \
		+ + + \
		API int **HAP_cache_unlock** void/* **vaddr_ptr** \
		+ + + \
		vaddr_ptr Virtual address of memory block to unlock \
		+ + + \
		Return Returns success 0 else failure non zero value \
		+ + + \
		HAP_query_avail_cachelock \
		Query API to get the size of max contiguous memory block available for cache locking. \
		+ + + \
		API int **HAP_query_avail_cachelock** void \
		+ + + \
		Return In case of failure returns 1 else available size in Bytes \
		+ + + \
		HAP_query_total_cachelock \
		Query API to get the total locked cache size. \
		+ + + \
		API int **HAP_query_total_cachelock** void \
		+ + + \
		Return In case of failure returns 1 else total locked cache size in Bytes \
		+ + + \
		HAP_cache_lock_addr \
		Locks cache for given virtual address and memory size in Bytes Address and size should be aligned to 32 bytes and size should not be more than 64KB. \
		At any point of time only one such request will be honored and other lock requests using this API will fail until the existing one requests for unlock. \
		This API expects address argument from user to lock so it should be used when user is particular about address to lock like in code/library locking case. \
		If not particular about the address then preferred API is HAP_cache_lock as it avoids scattered cache locks in order to use available cache in optimized way. \
		+ + + \
		API int **HAP_cache_lock_addr** void/* **vaddr_ptr** unsigned int **size** \
		+ + + \
		vaddr_ptr Virtual address of memory block to lock should be 32 byte aligned \
		+ + + \
		size Memory size in Bytes to be locked should be 32 byte aligned and not more than 64KB \
		+ + + \
		Return Returns success 0 else failure non zero value \
		+ + + \
		HAP_cache_unlock_addr \
		Unlocks cache for given virtual address This API should be used along with HAP_cache_lock_addr API. \
		+ + + \
		API int **HAP_cache_unlock_addr** void/* **vaddr_ptr** \
		+ + + \
		vaddr_ptr Virtual address of memory block to unlock \
		+ + + \
		Return Returns success 0 else failure non zero value \
		+ + + \
		Usage \
		Following examples illustrates usage of cache locking APIs \
		Example 1 User requests cache lock for 64KB 32KB and after processing unlocks the same in end. \
		.ccode \
		/* Query to get the max contiguous memory block available for cache locking */ \
		int avail_size HAP_query_avail_cachelock \
		/* If avail_size 64KB then request for 64KB lock */ \
		unsigned long long paddr \
		void* vaddr_ptr HAP_cache_lock 64*1024 &paddr //Returns locked virtual address and corresponding 64bit physical address. \
		/* Query again to get the max contiguous memory block available for cache locking */ \
		avail_size HAP_query_avail_cachelock \
		/* If avail_size 32KB then request for 32KB lock */ \
		void* vaddr_ptr_1 HAP_cache_lock 32*1024 NULL //Returns locked virtual address. \
		/* Query to get the total locked cache size */ \
		int locked_size HAP_query_total_cachelock //If there is no lock requests from other clients then locked_size value will be 96KB here. \
		. \
		/* \
		* Processing block \
		*/ \
		. \
		/* Unlock request for locked 64KB memory */ \
		int result HAP_cache_unlock vaddr_ptr //Returns 0 if unlock successful. \
		/* Unlock request for locked 32KB memory */ \
		result HAP_cache_unlock vaddr_ptr_1 //Returns 0 if unlock successful. \
		Example 2 User provides the address of 10KB memory to be locked After processing requests for unlock. \
		.ccode \
		/* Lock request buffer_addr points to virtual address of 10KB memory to be locked */ \
		int result HAP_cache_lock_addr buffer_addr 10*1024 //Returns 0 if lock successful. \
		. \
		/* \
		* Processing block \
		*/ \
		. \
		/* Unlock request */ \
		result HAP_cache_unlock_addr buffer_addr //Returns 0 if unlock successful.	",
	"id":54
}
idx.add(doc)
urls[54]='L2%20Cache%20Locking.html'
titles[54]="CDSP L2 Cache Locking HAP Interface"

var doc = {
	"title": "﻿Using Eclipse plugin for debugging",
	"body": " \
		Overview \
		This chapter describes how to use the IDE to debug a shared object. \
		It describes the following topics \
		Debugging shared objects on target \
		Prerequisites for debugging on target \
		Before you start debugging on the target using the IDE please go over the [requirements] Debugging_Target.html Software requirements for Software and Hardware needed for debugging. \
		The page also has a section on [verifying if your target is enabled for target debugging] Debugging_Target.html Verification of software requirements . \
		Import Build and Debug SDK example from Eclipse \
		This section presents an example which shows how to debug a library project that is called by an application project \
		The shared library implements a compute engine which runs on the Hexagon processor. \
		The application is an Android NDK calculator application which off loads specific computations onto the compute engine. \
		The application communicates with the compute engine using FastRPC. \
		The compute engine will be debugged from the IDE while running on the target platform. \
		The following diagram shows an overview of the calculator example \
		.lua \
		return E.left E.img src images/target_debug_shared_compute_offload_fig_1.png \
		Here is the project flow for the calculator example \
		.lua \
		return E.left E.img src images/target_debug_shared_compute_offload_fig_2.png \
		Please use the following steps to debug calculator example on the target. \
		Step 1 – Import Hexagon SDK example project to workspace \
		To import the example into your Eclipse workspace right click in Project Explorer and select \
		Import C/C++ Existing Code as Makefile Project . \
		.lua \
		return E.left E.img src images/import_makefile_project.png \
		In the dialog box specify the following project properties \
		**Project name** – Name of your project \
		**Project location** – Root directory of the Hexagon library project \
		**Toolchain** – select Hexagon LLVM Tool chain \
		Click on the Finish button to finish importing the project. \
		.lua \
		return E.left E.img src images/import_existing_code.png \
		Step 2 – Build project \
		To build the imported project right click on the project select properties and then C/C++ Build. \
		Under Builder settings enter the build command as **make V hexagon_Debug_dynamic_toolv82_v65 VERBOSE 1** \
		or enter your target appropriate build flavor e.g for SM8150 build variant is **hexagon_Debug_dynamic_toolv82_v66**. \
		While debugging Debug build flavors are recommended when possible over Release/ReleaseG to avoid possible confusions caused by the compiler optimizer. \
		.lua \
		return E.left E.img src images/build_settings.png \
		Under Behaviour tab set Build textbox to **tree** and Clean textbox to **tree_clean** \
		.lua \
		return E.left E.img src images/build_behaviour.png \
		Build the project by right clicking on the project and select Build Project \
		.lua \
		return E.left E.img src images/target_debug_build_project.png \
		Step 3 – Push required binaries to target \
		Build Andriod executable command line using the following commands \
		cd C /Qualcomm/Hexagon_SDK/3.4.1 \
		run setup_sdk_env.cmd see [Setup Instructions] readme.html \
		cd examples/common/calculator \
		make tree V android_Debug \
		Please follow the below steps to push binaries to target \
		cd Hexagon SDK Dir /examples/common/calculator \
		adb root \
		adb wait for device \
		adb remount \
		adb push android_Debug/ship/calculator /vendor/bin \
		adb shell chmod 777 /vendor/bin/calculator \
		adb push android_Debug/ship/libcalculator.so /vendor/lib/ \
		adb shell mkdir p /vendor/lib/rfsa/adsp/ \
		adb push Hexagon build variant that you build in step3 \
		e.g hexagon_Debug_dynamic_toolv82_v65 /ship/libcalculator_skel.so /vendor/lib/rfsa/adsp/ \
		Generate a device specific test signature based on the device s serial number. \
		This only has to be done once The same test signature will enable loading \
		of any module and therefore should be used for your own projects as well. \
		Run following script to push testsignature to target \
		python Hexagon SDK Dir /scripts/testsig.py \
		Step 4 – Attach to User PD process \
		Please follow the below steps \
		**Set Breakpoint in the shared object** \
		The imported Hexagon library project must be configured so it automatically attaches to the target process when you first start debugging it. \
		To do this you need to set breakpoints in the required files in the shared library project where you want the debug session to break. \
		Before launching the debug session IDE fails to set the breakpoint at a given line number in source file. \
		However you can set breakpoint at particular function in the debug configuration wizard before launching debug session. \
		Later when this initial breakpoint is reached you will be able to set additional source line breakpoints. \
		To set a breakpoint at particular function click on \
		Run Debug Configurations C/C++ Double click on **Hexagon C/C++ Attach to Remote Application** \
		goto Debugger tab and set the function name in the textbox associated with Stop on startup at label. \
		.lua \
		return E.left E.img src images/target_debug_set_functionname_to_break.png \
		Click on Main Tab to disable auto build as shown in below \
		.lua \
		return E.left E.img src images/remote_debugger_disable_auto_build.png \
		Click on Apply and Close. \
		**Setup debug configuration** \
		Right click on the project in Project Explorer and choose Debug As Hexagon C/C++ Attach to Application . \
		.lua \
		return E.left E.img src images/target_debug_shared_attach_menu.png \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/target_debug_shared_configs_hex_dialog_cdsp.png \
		In the Executable field specify the binary file to debug Use File System to navigate to a different file system. \
		In this example fastrpc_shell_3 is specified as binary Shared object on DSP cannot be debugged standalone fastrpc_shell_3 elf is the base image for USER PD and that makes call to shared object. \
		fastrpc_shell_3 is not present in SDK Users have to pull it from device using the following command. \
		adb pull /dsp/cdsp/fastrpc_shell_3 . \
		To debug shared object on ADSP you need to specify fastrpc_shell_0 This file will be present in /dsp/adsp. \
		If fastrpc_shell_0 is not present in /dsp/adsp folder please check /dsp folder. \
		In the Shared libraries search path field specify the directory of shared library to be debugged during the debug session Use File System or Workspace to search for shared libraries. \
		In the Target drop down list choose the ID of the target device to debug on After you choose the target in Target field default subsystem CDSP for targets having CDSP subsystem and ADSP for \
		targets that dont have CDSP subsystem will be selected in Subsystem field and fastrpc processes will be listed in the Process name field If there are no fastrpc processes running on your \
		target you will see the Process name field empty. \
		If you want to debug your shared object on ADSP you need to select ADSP in the Subsystem field the following dialog box opens and then you need to wait for the device to reboot This dialog box will \
		automatically close after your device is online. \
		.lua \
		return E.left E.img src images/target_debug_popup.png \
		So after your device is online you will see ADSP in the Subsystem field and if there are any fastrpc processes running they will be listed \
		in Process name field otherwise you will find it empty. \
		.lua \
		return E.left E.img src images/target_debug_shared_configs_hex_dialog.png \
		In case your target has only ADSP subsystem present then you can directly debug on ADSP without rebooting the device and also in Subsystem field you can only select ADSP . \
		NOTE \
		If no target ID is displayed except the simulator this indicates the target device is not connected properly – try disconnecting the device and then reconnecting it again. \
		If you get the error as shown below \
		.lua \
		return E.left E.img src images/debug_error_search_subsys_list.png \
		Then make sure your device does not get disconnected especially after reboot when processes are being fetched. \
		The field Process name needs to be set to the application that you will be running on the target The application will show up in this drop down list only if it is running on the device. \
		Before you proceed and hit the Debug button make sure the next two steps are completed. \
		**Run android application** \
		Before you can proceed with debugging the Hexagon library project you will first need to run the calculator application so it can make a call to the Hexagon library project Run calculator from command line as follows \
		adb shell \
		msm8998 / /vendor/bin/calculator 0 1000 \
		Now calculator will be waiting for the debugger to connect. \
		Note stdout is getting buffered with adb versions 1.0.36 and above If you are using adb 1.0.36 and above please run your application from the adb shell as above. \
		**Select user pd process** \
		Click on the Refresh icon \
		.lua \
		return E.left E.img src images/target_debug_shared_refresh_icon.png \
		Calculator process will be shown in the process drop down list now and select calculator process. \
		.lua \
		return E.left E.img src images/remote_debugger_select_calculator.png \
		Click on the Debug button to start the shared library debug session. \
		This starts the Hexagon library project and causes it to automatically connect to the target and then prompt you to switch to the Debug perspective. \
		Step 5 – Debug Application \
		Your breakpoint will be hit now and you should see something like below. \
		.lua \
		return E.left E.img src images/calc_target_debug.png \
		At this point you can debug your code by stepping into or stepping over When the debug session is completed the calculator output can be viewed in the CDT console. \
		NOTE To make debug sessions faster and more interactive you can optionally limit the number of stack frames per thread To do this select \
		Window Preferences Run/Debug View Performance Limit number of stack frames . \
		Please refer to known issues mentioned [here] Debugging_Target.html Known issues \
		This completes the tutorial for debug shared objects during target debugging [Compute off load application] eclipse_compute_offload_application.html serves as a reference for using fastRPC to implement shared objects.	",
	"id":55
}
idx.add(doc)
urls[55]='eclipse_target_debug.html'
titles[55]="﻿Using Eclipse plugin for debugging"

var doc = {
	"title": "General Setup Instructions:",
	"body": " \
		Setup environment for Windows Candidate \
		To setup sdk environment for windows candidate you are required to execute the below command from your Hexagon SDK s root directory. \
		setup_sdk_env.cmd \
		This script will set environment variables pointing to the tools and utilities required by the Hexagon SDK If some of the tools are missing or the environment is already setup the script will generate some warnings. \
		Setup environment for Linux Candidate \
		To setup sdk environment for Linux candidate before executing the below command from your Hexagon SDK s root directory you have to switch to bash shell To switch from any unknown shell to bash shell in Linux you just have to type bash and then press enter in the terminal This is required because the setup script works in the bash environment. \
		source setup_sdk_env.source \
		or \
		setup_sdk_env.source \
		This script will set environment variables pointing to the tools and utilities required by the Hexagon SDK If some of the tools are missing or the environment is already setup the script will generate some warnings. \
		Note The system path and tool changes are made locally only for the current shell or terminal and there is no effect on the global variables.	",
	"id":56
}
idx.add(doc)
urls[56]='readme.html'
titles[56]="General Setup Instructions:"

var doc = {
	"title": "﻿Starting Hexagon IDE",
	"body": " \
		Overview \
		This chapter explains how to start the Hexagon IDE on your host development system. \
		It covers the following topics \
		Starting from the Hexagon SDK \
		Starting from the CLI command line interface shell \
		Creating a project workspace \
		Setting IDE preferences \
		Starting the IDE \
		To start the IDE from a CLI shell run the file Launch Hexagon IDE.lnk from the SDK root directory. \
		NOTE When using the Hexagon IDE without the SDK make sure you set the tools location in the path. \
		The first time you start the IDE a dialog box appears asking where to create your project workspace. \
		.lua \
		return E.left E.img src images/starting_workspace_dialog.png \
		The workspace is where the source code and related files and settings for all your projects will be stored. \
		Specify the location where the workspace should be created. \
		Click on the OK button to create the workspace at the specified location. \
		NOTE Be sure to store your workspace outside the IDE install directory – this will make life easier when you need to \
		upgrade to a newer Eclipse version. \
		NOTE Workspace names cannot contain spaces – if they do the IDE will have problems building and executing projects. \
		After you launch the IDE a welcome screen appears. \
		.lua \
		return E.left E.img src images/starting_welcome_screen.png \
		This screen provides a brief description of the IDE along with quick links to the help systems for the IDE Hexagon SDK \
		Eclipse CDT and Eclipse IDE. \
		NOTE The Hexagon IDE and Hexagon SDK help files are obtained from the Hexagon SDK. \
		Close the welcome screen by clicking on the X control that appears next to the Welcome tab in the upper left hand corner of the window. \
		After you close the welcome screen the main IDE window is now visible. \
		.lua \
		return E.left E.img src images/starting_main_ide_window.png \
		Note that the main IDE window defaults to the Hexagon perspective as indicated in the upper right corner or the window . \
		[Developing Your First Project] eclipse_first_project.html describes how to create your first Hexagon project in the IDE. \
		Setting IDE preferences \
		The IDE has several data settings which control how it works – these settings are called *preferences* and they must be properly set before you can begin using the IDE. \
		NOTE If the IDE was launched from the Hexagon SDK the preferences are set automatically so you can skip this section. \
		To access the IDE preferences choose Preferences Hexagon from the IDE’s Window menu. \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/starting_prefs_dialog.png \
		In the Hexagon SDK path field specify the pathname of the root directory of the Hexagon SDK. \
		In the Hexagon processor version drop down list choose the Hexagon processor version that you are developing software for The default value is V65. \
		The Hexagon tools path field is preset to the pathname of the Hexagon development tools as defined in the PATH environment variable . \
		Click on the Apply button to save the changes then click on OK to close the dialog box.	",
	"id":57
}
idx.add(doc)
urls[57]='eclipse_starting_eclipse.html'
titles[57]="﻿Starting Hexagon IDE"

var doc = {
	"title": "Remote Debugger User Guide",
	"body": " \
		Overview \
		The goal of this debug feature is to provide a reliable responsive \
		accurate and secure debug capability to developers interested in \
		debugging a subsystem processor image without the use of a hardware \
		debugger. \
		The Debug Agent along with the Remote Debug Driver implements a shared \
		memory based transport mechanism that allows for a debugger ex LLDB \
		running on a host PC to communicate with a remote stub running on \
		peripheral subsystems such as the aDSP cDSP etc. \
		The diagram below depicts end to end the components involved to \
		support remote debugging \
		HOST PC Device \
		Debug \
		Debugger Agent Remote \
		App + Debug \
		Stub \
		Remote + \
		Debug \
		Driver + \
		Remote \
		Application Shared + Debug \
		Processor Memory Stub \
		Android \
		Peripheral Subsystems \
		aDSP cDSP . \
		Debugger Debugger application LLDB running on the host PC that communicates \
		with the remote stub. \
		Debug Agent Software that runs on the Android platform that provides \
		connectivity from the device to the host PC. \
		Remote Debug Driver A character based driver that the Debug Agent uses to \
		transport the payload received from the host to the debug stub running on \
		the subsystem processor over shared memory and vice versa. \
		Shared Memory Shared memory from the SMEM pool that is accessible from the \
		Applications Processor AP and the subsystem processors. \
		Remote Debug Stub Privileged code that runs in the kernels of the subsystem \
		processors that receives debug commands from the debugger running on the host \
		and acts on these commands These commands include reading and writing to \
		registers and memory belonging to the subsystem s address space setting \
		breakpoints single stepping etc. \
		Overall flow \
		Here is the overall flow \
		When the Debug Agent application starts up it opens up a shared memory \
		based transport channel to the DSP that will be debugged aDSP cDSP etc . \
		The Debug Agent application communicates with the DSP to discover the running \
		processes and exposes a port for each one. \
		LLDB on the host machine connects to the port associated with the DSP process \
		that the user wishes to debug \
		LLDB then communicates via this port to debug the process on the DSP This \
		includes setting breakpoints reading registers querying threads etc . \
		When the process hits a breakpoint it will be halted and control turned over \
		the LLDB LLDB then provides the user the ability to single step \
		continue etc . \
		Verification of software requirements \
		A verification script is provided in the SDK to check if the debugger is \
		setup correctly Please go to [Verification Script] \
		debugger_verification_script_user_guide.html to see how to use the script \
		and verify the software on the device is functioning correctly. \
		Software requirements \
		[Ability to communicate with the device] Debugging_Connect to Device.html \
		hexagon lldb.exe from hexagon tools This can be found under HEXAGON_SDK_ROOT /tools/HEXAGON_Tools \
		Debug agent user mode Android app It is present on the target at \
		/system/bin/ location If your target did not include the remote debug agent \
		the scripts will push it for you from the \
		SDK HEXAGON_SDK_ROOT /tools/debug/remote_debug_agent/android . \
		Linux Android build that has the driver rdbg.ko To check whether this \
		are part of the image that has been flashed connect the device to the \
		host machine using a USB cable and do the following in a windows command prompt \
		adb root \
		adb shell \
		ls /system/lib/modules \
		if rdbg.ko is not present in /system/lib/modules please check /vendor/lib/modules \
		ls /vendor/lib/modules \
		rdbg.ko should be present in either /system/lib/modules or /vendor/lib/modules. \
		If rdbg.ko is not present then remote debugger is not supported. \
		Please use a build that has rdbg.ko. \
		Supported targets \
		8998 \
		sdm660 CDSP \
		sdm670 CDSP \
		sdm845 ADSP and CDSP \
		SM8150 ADSP and CDSP \
		Known issues \
		**Important please read ** \
		Debugging User PD Exceptions are only supported on SDM845 and newer devices. \
		This means on older devices the user process will exit and the debug session \
		will end To try and avoid this you can set a breakpoint before the place in \
		your code where you think the exception is occurring On SDM845 a breakpoint \
		will be placed in the fastrpc user process exception handler On SM8150 the \
		breakpoint will be placed at the point of exception your code . \
		Device needs to be rebooted between debug sessions After completing a debug \
		session LLDB will not be able to re connect and any attempt to do so will result \
		in unpredictable behavior. \
		If you try and force exit that application you are debugging Ctl c you \
		will likely crash the device and at least will have unpredictable behavior. \
		If you need to start over or run a program you don t which to debug \
		you will have to reboot the device. \
		Stdout is getting buffered with adb versions 1.0.36 and newer when an \
		application like calculator has started and is waiting for debugger to \
		connect This may be fixed in a future adb release but for now users can try \
		any one of the following work around. \
		Use **setbuf stdout NULL ** in the main of application to disable buffering on stdout \
		Run the application from the shell \
		adb shell \
		/ ./data/calculator 0 1000 \
		Debugging procedure \
		There are two ways to do on target debugging \
		[Command line] debugger_cmdline_guide.html \
		[Eclipse IDE] eclipse_target_debug.html \
		References \
		[Hexagon LLDB Debugger] file images/Hexagon_Document_Bundle.pdf page 6000 \
		[Hexagon exception handling] file images/Hexagon_Document_Bundle.pdf page 141 \
		[LLDB commands] https //lldb.llvm.org/lldb gdb.html	",
	"id":58
}
idx.add(doc)
urls[58]='Debugging_Target.html'
titles[58]="Remote Debugger User Guide"

var doc = {
	"title": "Performance Tests on Android",
	"body": " \
		Overview \
		The rpcperf application can be used to measure the overhead associated \
		with FastRPC with various buffer sizes It assumes you have \
		an Android device working with adb See [[Prerequisites]] for more \
		information. \
		Prerequisites \
		Before the rpcperf application can be run below are a few items to ensure \
		that the conditions are ideal for measuring performance. \
		Make sure the Linux kernel boot image is being built with perf defconfig \
		as the default one enables few debugging config items that would impact \
		performance \
		Building \
		Before building ensure the Hexagon SDK s dependencies are properly setup [Setup Instructions] readme.html The \
		installer should have done this for you If you encounter issues please see \
		[Dependencies] Dependencies_Common.html . \
		When building the rpcperf example both the stub and skeleton must be \
		compiled and linked This can be done by compiling both for the variant desired \
		on the DSP as well as the application processor For example to create a \
		stub/skel pair for Android and Hexagon the following commands must be \
		executed \
		First change directory to the rpcperf example \
		cd Hexagon SDK Dir /examples/common/rpcperf \
		Next build the Android and Hexagon modules \
		make tree V android_Debug \
		make tree V hexagon_Debug_dynamic_toolv82_v65 \
		For more information on build syntax see [Make.d] Environments_Build System.html \
		On target testing \
		To execute the rpcperf application on Android perform the following steps \
		Use adb as root and remount system read/write \
		adb root \
		adb wait for device \
		adb remount \
		Generate a device specific test signature based on the device s serial number. \
		This only has to be done once The same test signature will enable loading \
		of any module and therefore should be used for your own projects as well. \
		Follow these steps [Signing] Tools_Signing.html Walk through \
		The rpcperf executable can be run as below and the script takes care of pushing \
		the binaries and voting for the clocks \
		python rpcperf.py a android ht toolv82_v65 s Debug i c \
		or \
		python rpcperf.py a ubuntu ht toolv82_v65 s Debug i c \
		s pushes the binaries built onto the device \
		i allocates the memory using ION APIs \
		c boosts up the application processor clocks \
		Analyze the output You should see something like the following being printed as \
		the summay that details the time taken in micro seconds to run the test per \
		iteration \
		Test Name Time Per Iteration usecs \
		. \
		[noop 0K] 92 usecs \
		[inbuf 32K] 145 usecs \
		[routbuf 32K] 143 usecs \
		[inbuf 64K] 130 usecs \
		[routbuf 64K] 146 usecs \
		[inbuf 128K] 132 usecs \
		[routbuf 128K] 154 usecs \
		[inbuf 1M] 221 usecs \
		[routbuf 1M] 231 usecs \
		[inbuf 4M] 277 usecs \
		[routbuf 4M] 286 usecs \
		[inbuf 8M] 331 usecs \
		[routbuf 8M] 337 usecs \
		[inbuf 16M] 430 usecs \
		[routbuf 16M] 492 usecs \
		Performance Tests \
		Below is the brief description of the tests that rpcperf application executes \
		noop Makes a FastRPC invocation with no input and output buffers \
		inbuf Makes a FastRPC invocation with one input buffer of varying buffer sizes \
		ranging from 32K to 16M \
		outbuf Makes a FastRPC invocation with one output buffer of varying buffer sizes \
		ranging from 32K to 16M \
		Performance Considerations \
		When running performance tests the below items need to be taken into consideration \
		which are taken care of inside rpcperf application and the script The caches between \
		the Applications and DSP subsystems are not coherent and hence majority of overhead is \
		attributed to time spent in flushing / invalidating the caches and this overhead \
		increases linearly with buffer size increase. \
		Ensure that these are taken into account when performing your own performance tests. \
		Time is measured with clocks / bus voted to max on Apps below is the script \
		that can be used for this note that these commands may sometimes vary based \
		on target \
		adb shell echo 1 /sys/devices/system/cpu/cpu0/online \
		adb shell echo 1 /sys/devices/system/cpu/cpu1/online \
		adb shell echo 1 /sys/devices/system/cpu/cpu2/online \
		adb shell echo 1 /sys/devices/system/cpu/cpu3/online \
		adb shell echo performance /sys/devices/system/cpu/cpu0/cpufreq/scaling_governor \
		adb shell echo performance /sys/devices/system/cpu/cpu1/cpufreq/scaling_governor \
		adb shell echo performance /sys/devices/system/cpu/cpu2/cpufreq/scaling_governor \
		adb shell echo performance /sys/devices/system/cpu/cpu3/cpufreq/scaling_governor \
		adb shell echo performance /sys/class/devfreq/soc qcom m4m/governor \
		adb shell echo performance /sys/class/devfreq/soc qcom cpubw/governor \
		adb shell echo Y /sys/module/lpm_levels/parameters/sleep_disabled \
		Make sure the clocks on DSP is boosted using HAP_power APIs appropriately \
		Measure the average value of round trip over a few iterations rather than just \
		one or two iterations \
		Ensure that the image buffers being passed are allocated using ION memory and \
		registered with FastRPC using remote_register_buf APIs remote_register_buf is \
		implicitly invoked if rpcmem library is used for ION allocations else this needs \
		to be called explicitly to avoid copy over the buffers When registering buffers \
		the stub shared objects would have to be loaded as otherwise the remote_register_buf \
		symbol would not get resolved at runtime causing the buffer to not get registered. \
		There may be variability between runs and this could be attributed due to few reasons \
		workload on the system or some entity in the system may be entering / exiting low power modes. \
		Note You can refer to FastRPC QoS documentation [here] FastRPC_QoS.html .	",
	"id":59
}
idx.add(doc)
urls[59]='Common_Rpcperf.html'
titles[59]="Performance Tests on Android"

var doc = {
	"title": "Compute offload",
	"body": " \
		Computational work can be offloaded to the any of the DSPs Compute off load functionality is available for application DSP compute DSP modem DSP Sensors Low Power Island SLPI . \
		Compute DSP is available on SDM660 SLPI is available on MSM8996 and MSM8998. \
		The mDSP is available on platforms that don t \
		support modem functionality like dragonboards APQs in these cases the mDSP is \
		sitting mostly idle and an advantage of the mDSP is it sits on a higher bandwidth \
		bus and memorywise closer to the applications processor However The mDSP is not available on all APQ products eg MSM 8084 . \
		The mDSP also does not have access to the native I/O interfaces that are available on the aDSP/cDSP \
		along with the audio speech and sensor datapaths So if you algorithm is dependent on these peripherals or datapaths the aDSP/cDSP would be a preferable target processor \
		To the Android application the off load takes the form of a C header and a \
		library that gets linked in or loaded dynamically The application then calls \
		the off loaded API directly and the work is done by the DSP. \
		This is accomplished using [FastRPC] APIs_FastRPC.html and [Dynamic loading] \
		APIs_Dynamic Loading.html . \
		In general the developer follows these steps \
		Define an API in [IDL] qaic_idl_reference.html that will perform their \
		computation \
		Compile IDL into a header and Android library \
		Call the API directly from their application \
		Results are returned just like a normal function call and it appears to the \
		application as if the work was performed locally. \
		For more information see \
		[FastRPC] APIs_FastRPC.html \
		[Dynamic loading] APIs_Dynamic Loading.html \
		[IDL compiler] Tools_IDL Compiler.html \
		[Compute offload examples] Examples_Common.html calculator_multi_legacy and calculator_multi_domains examples \
		[Hexagon DSP Programmers Guide] images/80 VB419 108_Hexagon_DSP_User_Guide.pdf	",
	"id":60
}
idx.add(doc)
urls[60]='Applications_Compute%20offload.html'
titles[60]="Compute offload"

var doc = {
	"title": "SDK Scripts",
	"body": " \
		Overview \
		The Hexagon SDK contains a collection of helper scripts outlined below. \
		You can find the collection in \
		SDK /scripts \
		Note all scripts require that the environment setup script \
		To read about how to setup the environment refer [Setup Instructions] readme.html \
		clone_project.py \
		Use this script to clone an existing command line example The resulting \
		cloned project is renamed and a global search and replace is performed to \
		convert names symbols etc to the new project name. \
		At this time it is restricted to creating new projects the reside next to the \
		project that was cloned. \
		Usage \
		clone_project.py path of project to clone name of new project \
		Example \
		scripts/clone_project.py examples/common/calculator my_project For Windows \
		scripts/clone_project.py examples/common/calculator my_project For Linux \
		Note \
		Remember to do a clean build when you are working with a cloned directory. \
		push_adsp.py \
		Use this script to push DSP image and dependencies adspso.bin to target. \
		Usage \
		python push_adsp.py t target i location of adsp_proc dir \
		testsig.py \
		Use this script to create and push a test signature to the device For more \
		information see [Signing] Tools_Signing.html \
		Usage \
		adb root \
		adb disable verity \
		adb reboot \
		python testsig.py \
		Please pass LE as argument to the script to generate testsig for Ubuntu Targets as follows \
		python testsig.py LE \
		Note You only need to push the test signature once on to a device. \
		Please note that in the steps above we have done disable verity before pushing the testsig on the device. \
		calculator_walkthrough.py \
		Use this script to perform all the steps outlined in the \
		[Calculator walk through using command line on Android] calculator_android.html \
		Usage \
		python calculator_walkthrough.py \
		com_finder.py \
		Use this script to find all Qualcomm USB connected devices. \
		The script prints a listing of all the active USB ports \
		Usage \
		python com_finder.py [ v] [ i] \
		Example \
		scripts/com_finder.py \
		Qualcomm HS USB Com ports found \
		COM157 \
		so_sym_verify.py \
		Use this script to check whether all the symbols of a shared object are defined or not in a DSP image. \
		If no DSP image is specified symbols are verified against the DSP on target. \
		Usage \
		python so_sym_verify.py d DSP Image location f Shared Object locaton [ v] [ i] \
		optional arguments \
		h help show this help message and exit \
		v prints verbose information \
		i enable debugging info \
		Dependencies \
		adb \
		HEXAGON_Tools/8.x.x/Tools/bin/hexagon nm.exe \
		Examples \
		so_sym_verify.py d images/ image version /adsp_proc/build/ms/M8974AAAAAAAAQ1234.elf \
		f examples/common/calculator/hexagon_Debug_dynamic_toolv82_v65/libcalculator_skel.so \
		All symbols are defined in image \
		so_sym_verify.py d images/ image version /adsp_proc/build/ms/M8974AAAAAAAAQ1234.elf \
		f examples/common/downscaleBy2/hexagon_Debug_dynamic_toolv82_v65/libdownscaleBy2_skel.so \
		Symbols NOT defined in image \
		HAP_perf_get_time_us \
		install_dependencies.py \
		Use this script to install SDK dependencies such as andriod ndk eclipse gow devcon. \
		Usage \
		python install_dependencies.py [ E ] [ MA] [ FA] [ G] [ D] \
		python install_dependencies.py installs all the components Android Eclipse gow and devcon \
		python install_dependencies.py E installs only Eclipse \
		Options \
		h help show this help message and exit \
		MA Install Minimal Android NDK \
		FA Install Full Android NDK \
		E Install Eclipse \
		G Install Gow \
		D Install devcon \
		donotInstall Just download and dont install \
		7zExe EXE_LOCATION Specify 7z exe location	",
	"id":61
}
idx.add(doc)
urls[61]='Tools_Scripts.html'
titles[61]="SDK Scripts"

var doc = {
	"title": "Remote Debugger: Verification Script User Guide",
	"body": " \
		Overview and Purpose \
		The debugger has a few components that need to be present and working correctly \
		in order to LLDB debugging to work Since you may not know the details of the \
		device you are working on the sdk provides a debugger verification script that \
		will attempt to verify that all the peices are present and functioning correctly. \
		The debugger verification script contains several error handlers designed to \
		check for several of the most common issues that will prevent the debug agent \
		from initializing properly These error handlers work to both mitigate these \
		issues by fixing them i.e obtaining the remote_debug_agent from the SDK and \
		pushing it to the device and/or by providing an informative error message to \
		the user. \
		Where to find the script files \
		The debugger verification script is accessible from the scripts directory in the \
		Hexagon SDK \
		For Windows \
		HEXAGON_SDK_ROOT /scripts \
		For Linux \
		HEXAGON_SDK_ROOT /scripts \
		How to run the script \
		Below is the basic procedure for running the debugger verification script. \
		Connect the target device to the host PC using the specified USB cable \
		Open a CLI shell \
		Type adb devices \
		Look to make sure the following message is displayed in the CLI shell \
		List of devices attached \
		abcdef device adcdef is replaced with unique device ID \
		Change directory to the Hexagon_SDK root \
		Run setup_sdk_env.cmd from the Hexagon_SDK root location \
		Look to make sure the following message is displayed in the CLI shell \
		Setting up the Hexagon SDK environment locally \
		Done \
		Change directory to HEXAGON_SDK_ROOT /scripts in Windows or to HEXAGON_SDK_ROOT /scripts in Linux \
		Run python verify_debugger.py ADSP to verify debugger on ADSP. \
		Run python verify_debugger.py CDSP to verify debugger on CDSP. \
		Displayed message if the script verifies that end to end communication is successful \
		between host PC and target device \
		/*/*/* REMOTE DEBUGGER STATUS remote software debugger is working properly /*/*/* \
		Displayed message if the script is unsuccessful at establishing end to end communication \
		between host PC and target device \
		/*/*/* REMOTE DEBUGGER STATUS remote software debugger is NOT initialized / NOT working properly /*/*/* \
		Displayed message if the script encounters an error prior to initializing debug agent \
		/*Error message is specific to particular error No remote debugger status is displayed./* \
		List of Errors \
		**Pre Verification Errors These errors occur before the debug agent is initialized.** \
		**Error** SDK environment has not been set up. \
		**Display message** SDK Environment not set up please run setup_sdk_env.cmd from SDK s root directory \
		**Cause** the SDK environment must be setup in order to ensure the script will function properly For example this sets up the HEXAGON_SDK_ROOT variable which is a necessary component in the script s verification capability. \
		**Solution** change directory within the CLI shell you are using to the Hexagon_SDK root Type setup_sdk_env.cmd and wait for the return message that says Done . \
		**Error** rdbg.ko driver file is missing on target device. \
		**Display message** ERROR rdbg.ko driver file does not exist Expected file location on device \
		/system/lib/modules/rdbg.ko or /vendor/lib/modules/rdbg.ko \
		**Cause** rdbg.ko driver file is not present on the device This file is necessary to facilitate communication between the host PC and target device. \
		**Solution** Please move to different build that has rdbg.ko . \
		**Error** insmod command failed for rdbg.ko module. \
		**Display message** ERROR rdbg.ko module could not be installed/instantiated properly Expected file location on device /system/lib/modules/rdbg.ko or /vendor/lib/modules/rdbg.ko. \
		**Cause** rdbg.ko file may be missing device may not to be rooted adb root command rdbg.ko file may have incorrect permissions. \
		**Solution** reconnect the device Ensure adb is recognizing the device properly adb devices command Ensure you are acting as root adb root and mounted properly on device adb remount . \
		**Error** unable to change permissions for remote_debug_agent file on target device. \
		**Display message** ERROR unable to chmod remote_debug_agent \
		**Cause** target device may not be rooted adb root command may need to be remounted adb remount command . \
		Possible improper connection between host PC and target device. \
		**Solution** disconnect the target device from the host PC and then reconnect Type \
		adb devices into the CLI shell and ensure host PC is recognizing the device. \
		Ensure you are acting as root adb root and mounted properly on device adb remount . \
		**Verification Errors These errors occur after the debug agent has been initialized.** \
		**Error** no XML file generated by debug agent software. \
		**Display message** No XML file exists on the local host for parsing \
		**Cause** debug monitor was not fully initialized and therefore did not generate an XML file on the host \
		with a list of running processes and their attributes. \
		**Solution** check http //localhost 5555/pslist.xml to see if a pslist.xml file has been generated. \
		It may be corrupt or inaccessible to the host PC for security/permissions reasons Most likely cause is \
		that the debug agent was instantiated but did not initialize properly Ensure Linux Android and aDSP \
		build are compatible and are using an appropriate rdbg.ko file. \
		**Error** process x has less than the set number of attributes assigned for each process. \
		**Display message** Process [process_ ] has less than [number_of_set_attributes] attributes \
		**Cause** the process was not assigned the correct number of attributes. \
		**Solution** check to make sure that the correct .elf files are present and being used for each \
		corresponding process. \
		**Error** process x is missing a specific attribute Attribute options at the time of writing this document are \
		pid arch processor command debug_port. \
		**Display message** process x has no [specific_process_attribute] attribute \
		**Cause** the running process was not assigned all of the correct attributes. \
		**Solution** check to make sure that the correct .elf files are present and being used for each \
		corresponding process. \
		**Error** the debug port value assigned to process x is out of acceptable range Acceptable range is \
		greater than 1 and less than 99999. \
		**Display message** Debug port value out of acceptable range 1 or 99999 \
		**Cause** debug port was assigned a value that is not acceptable Value will prevent debug monitor from properly \
		attaching to the running process and will restrict or prevent debug capabilities. \
		**Solution** check to make sure that the correct .elf files are present and being used for each \
		corresponding process Check debug value to see what value if any it was assigned Use this as context \
		to help determine what value was assigned and what caused this error. \
		**Error** the debug port value is not an integer data type. \
		**Display message** Debug port value not an integer data type \
		**Cause** debug port was assigned a value that is not acceptable Value will prevent debug monitor from properly \
		attaching to the running process and will restrict or prevent debug capabilities. \
		**Solution** check to make sure that the correct .elf files are present and being used for each \
		corresponding process Check debug value to see what value if any it was assigned Use this as context \
		to help determine what value was assigned and what caused this error. \
		**Error** no running processes exist on the device. \
		**Display message** No running processes exist If you see DM_FAILED 1 then possible causes are \
		aDSP build does not contain debug software OR LA and aDSP build are not compatible \
		**Cause** debug agent did not initialize properly aDSP build does not contain debug software OR \
		LA and aDSP build are not compatible. \
		**Solution** reflash Linux Android LA and aDSP build and make sure they are compatible. \
		Push rdbg.ko to target device again and make sure it is compatible with LA and aDSP builds. \
		Make sure remote_debug_agent is present on target device Check permissions for remote_debug_agent 755 . \
		Ensure you are acting as root adb root and mounted properly on device adb remount . \
		Next Steps \
		The debugger verification script will provide as detailed and informative error handling information as possible. \
		Use the output messages provided by the script to help debug and fix any issues that arise when attempting to \
		initialize the debug agent software and verify end to end communication between the host and the target device. \
		Continue to do this until the debug agent software initializes properly You will know the debug agent has \
		initialized properly when the resulting output of the script provides the following display message \
		/*/*/* REMOTE DEBUGGER STATUS remote software debugger is working properly /*/*/* \
		Once functioning correctly proceed to the [target debugging instructions] Debugging_Target.html	",
	"id":62
}
idx.add(doc)
urls[62]='debugger_verification_script_user_guide.html'
titles[62]="Remote Debugger: Verification Script User Guide"

var doc = {
	"title": "QAIC IDL Reference",
	"body": " \
		Introduction \
		Interfaces for the aDSP platform are described in language \
		called IDL described here IDL allows interface authors to expose only *what* \
		their object does and not *where* it resides or what programming language it \
		is implemented in Specifically it allows developers expose a consistant interface \
		to components without exposing that the implementation resides on the dsp instead of \
		the application processor This document describes the syntax and semantics of IDL. \
		Relationship to OMG IDL \
		The IDL defined here is based on the \
		[OMG IDL specification] http //www.omg.org/cgi bin/doc?formal/08 01 04.pdf \
		but differs in a few respects \
		* All interface methods must have an IDL return a type equivalient to long. \
		The value returned must be 0 if the method is successful or \
		an error code on failure Standard error codes are defined in AEEStdErr.idl. \
		See [[Return Values]] for details. \
		* Interfaces may not directly inherit from more than one base interface . \
		* The rout parameter modes are used instead of out See [[Bounded output parameters]] for details. \
		* The inrout parameter mode is used instead of inout The parameter mode inrout supports all the basic data types \
		including string and wstring and structures containing these data types inrout also supports sequences but not \
		structures containing sequences dmahandle is also not supported. \
		Bounded output parameters \
		OMG IDL supports three parameter attributes or modes which specify the direction \
		the data flows in caller to server out server to caller and inout both \
		directions In OMG IDL the semantics of out and inout is such that the size of \
		a variable length parameter cannot be known to or bounded by the caller at run \
		time However standard practice is for all buffers to be bounded by the caller. \
		The IDL compiler supports output semantics through the IDL keyword rout \
		which is the bounded analog of out The r in each keyword refers to \
		the UNIX read system call where the caller provides a buffer and specifies \
		at run time the maximum amount of data to be read into the buffer. \
		For fixed size types there is no difference between the traditional out and \
		the new rout as the size is statically known and therefore need not be specified \
		by the caller However for variable size types such as sequences and strings rout \
		and implies an upper bound that is passed as an in parameter from client \
		to server For example read could be defined in IDL as follows \
		.idlcode \
		typedef sequence octet SeqOctet \
		long read rout SeqOctet buffer \
		In IDL only a single rout parameter is needed as it implies the caller \
		providing to the server the maximum number of octets to return See \
		[[rout parameter of a method]] for details on how this parameter would be mapped \
		to the remote bindings. \
		Note that the traditional OMG IDL out and inout parameter modes are not \
		currently supported by the compiler Support for out and inout may be \
		added in the future. \
		NULL Argument Semantics \
		These are the current rules for when NULL can be passed for arguments \
		in parameters \
		* Sequence pointers may be NULL when the associated length is 0. \
		rout parameters \
		* Sequence string and wstring pointers may be NULL when the associated length is 0. \
		Return Values \
		* must be equivalent type to long such as AEEResult from AEEStdDef.idl \
		* value 0 indicates success \
		* a non zero code indicates a failure Any data in rout parameters is not propagated back. \
		Wire Format Limitations \
		in parameters \
		* maximum of 255 in buffers For example \
		.idlcode \
		typedef sequence octet buf \
		interface foo \
		long bar in sequence buf bufs \
		maps to C as \
		.ccode \
		struct __seq_unsigned_char \
		unsigned char* data \
		int dataLen \
		typedef struct __seq_unsigned_char __seq_unsigned_char \
		typedef __seq_unsigned_char buf \
		int foo_bar buf* bufs int bufsLen \
		will fail for bufsLen 254 One input buffer is used to store the \
		the length of the buffers This limitation can be further restricted \
		by the rpc implementation. \
		rout parameters \
		* maximum of 255 rout buffers \
		in handles \
		* maximum of 15 in dmahandle handles \
		rout handles \
		* maximum of 15 rout dmahandle handles \
		Remote Handles \
		As of version 1.0.35.x the idl compiler supports interfaces derived from \
		remote_handle64 which allow the user to maintain a context handle for \
		the opened module. \
		.idlcode \
		include remote.idl // Needed for remote_handle64 interface \
		interface calculator remote_handle64 \
		// Compute a*b where a and b are both complex \
		long fmult in float a in float b rout float result \
		This is a special interface that tells the compiler to do the following \
		* add a remote_handle64 argument as the first argument of every function in the interface \
		* add an interface _open method \
		* add an interface _close method \
		* add a define interface _URI as a base URI that can be used to open interface instances \
		For example \
		.ccode \
		/** \
		* Opens the handle in the specified domain If this is the first \
		* handle this creates the session Typically this means opening \
		* the device aka open /dev/adsprpc smd then calling ioctl \
		* device APIs to create a process on the DSP to execute our code in \
		* then asking that process to dlopen the .so and dlsym the skel function. \
		* \
		* @param uri interface _URI &_dom aDSP \
		* interface _URI is a QAIC generated uri or \
		* file /// sofilename ? interface _skel_handle_invoke&_modver 1.0 \
		* If the _dom parameter is not present _dom DEFAULT is assumed \
		* but not forwarded. \
		* Reserved uri keys \
		* [0] first unamed argument is the skel invoke function \
		* _dom execution domain name _dom mDSP/aDSP/DEFAULT \
		* _modver module version _modver 1.0 \
		* _* any other key name starting with an _ is reserved \
		* Unknown uri keys/values are forwarded as is. \
		* @param h resulting handle \
		* @retval 0 on success \
		*/ \
		int calculator_open const char *uri remote_handle64 *h \
		/** \
		* Closes a handle If this is the last handle to close the session \
		* is closed as well releasing all the allocated resources. \
		* @param h the handle to close \
		* @retval 0 on success should always succeed \
		*/ \
		int calculator_close remote_handle64 h \
		long calculator_fmult remote_handle64 h const float a const float b float *result \
		ifndef calculator_URI \
		define calculator_URI file ///libcalculator_skel.so?calculator_skel_handle_invoke&_modver 1.0 \
		endif \
		Users can then open multiple instaces of the handle via \
		.ccode \
		remote_handle64 h1 1 h2 1 \
		//open in the default compute domain \
		assert 0 calculator_open calculator_URI &h1 \
		//upon success the value of h can be anything except 1 \
		assert h1 ! 1 \
		//open the same module on a specific domain \
		//REMOTE_DOM_MDSP and additional supported domains are defined in remote.h \
		assert 0 calculator_open calculator_URI REMOTE_DOM_MDSP &h2 \
		//upon success the value of h2 can be anything except 1 \
		assert h2 ! 1 \
		//h1 and h2 are not equal to each other \
		assert h1 ! h2 \
		//values for h1 and h2 are generated by the transport layer \
		Implementors of DSP modules can return any value for the remote handle \
		.ccode \
		int calculator_open const char *uri remote_handle64 *h \
		//this value will NOT be returned to the caller \
		*h remote_handle64 0xdeadc0de \
		//but this value will be passed to close when the handle is closed \
		//so its save store a pointer in the handle \
		//*h remote_handle64 malloc 100 \
		return 0 \
		int calculator_close remote_handle64 h \
		//The value returned by open will be presented to the module on close \
		assert h remote_handle64 0xdead0cde \
		return 0 \
		Implementors should not expect that value to be returned to the user from \
		the DSP A unique value to track module instances will be generated by \
		the transport layer and presented to the user. \
		Domains \
		Interfaces deriving from remote_handle64 will allow the user explicit \
		control over the module lifetime A compute domain will be open as long \
		as there is at least 1 handle reference to it. \
		.ccode \
		remote_handle64 h1 1 h2 1 \
		float c1 c2 result \
		//open h1 if h1 is the first handle for the default domain it will instantiate the domain \
		assert 0 calculator_open calculator_URI &h1 \
		//open h2 the domain is still open \
		assert 0 calculator_open calculator_URI &h2 \
		//close h1 since we also opened h2 the domain is still open \
		assert 0 calculator_close h1 \
		//calls using h1 will fail \
		assert 0 ! calculator_fmult h1 &c1 &c2 &result \
		//calls using h2 will pass \
		assert 0 calculator_fmult h1 &c1 &c2 &result \
		//close h2 this is the last handle to the domain \
		//it will shutdown the domain on the dsp side and free all its resources \
		void calculator_close h2 \
		Domain restart \
		Since users have explicit control over the handle lifetimes they can now detect errors and re open the handle. \
		.ccode \
		assert 0 calculator_open calculator_URI &h1 \
		if 0 ! calculator_fmult h1 &c1 &c2 &result \
		//got an error maybe the DSP is restarted \
		void calculator_close h1 \
		h1 1 \
		assert 0 calculator_open calculator_URI &h1 \
		//try fmult again \
		assert 0 calculator_fmult h1 &c1 &c2 &result \
		Typically once a domain is killed methods should return AEE_ENOSUCH defined in AEEStdErr.h . \
		Domain Routing \
		Users can explicitly specify the domain on which they need to execute their code The session on particular domain is opened by appending static string &_dom domain name to the autogenerated interface URI. \
		.ccode \
		remote_handle mdsp adsp \
		assert !calculator_open calculator_URI &_dom mdsp &mdsp \
		assert !calculator_open calculator_URI &_dom adsp &adsp \
		assert !calculator_sum mdsp buf bufLen &val \
		assert !calculator_sum adsp buf bufLen &val \
		//if this is the last handle using aDSP in this process the remote PD on aDSP is killed \
		assert !calculator_close adsp \
		//if this is the last handle using mDSP in this process the remote PD on mDSP is killed \
		assert !calculator_close mdsp \
		Here we handle aDSP and mDSP domains by providing a libadsprpc.so and libmdsprpc.so which developers link against when they build their stubs Similarly for other domains like cDSP sDSP etc. \
		Sample IDL \
		A sample IDL file is shown below to illustrate the use of common IDL constructs. \
		.idlcode \
		include AEEStdDef.idl // Needed for AEEResult \
		interface calculator \
		// This structure is specific to this interface so we scope it within the \
		// interface to avoid pollution of the global namespace. \
		struct Complex \
		float real // Real part \
		float imag // Imaginary part \
		// A Vector consisting of 0 or more Numbers. \
		typedef sequence Complex Vector \
		// Compute a*b where a and b are both complex \
		AEEResult Mult in Complex a in Complex b rout Complex result \
		// Add a and b. \
		AEEResult Add in Complex a in Complex b rout Complex result \
		// Compute the sum of all elements in a vector \
		AEEResult Sum in Vector vec rout Complex result \
		// Compute the product of all elements in a vector \
		AEEResult Product in Vector vec rout Complex result \
		Mapping for the C programming language \
		This section details the mapping of IDL constructs to remoteable shared objects \
		via the C programming language. \
		Basic built in types \
		The following table lists the mapping of IDL basic types to C . \
		+ + + \
		IDL Type C Type \
		+ + + \
		octet uint8 unsigned char \
		+ + + \
		char int8 char \
		+ + + \
		wchar _wchar_t \
		+ + + \
		short int16 short int \
		+ + + \
		long int32 int \
		+ + + \
		long long int64 long long int64 \
		+ + + \
		unsigned short \
		uint16 unsigned short int \
		+ + + \
		unsigned long \
		uint32 unsigned int \
		+ + + \
		unsigned long long \
		uint64 unsigned long long uint64 \
		+ + + \
		int8_t int8_t \
		+ + + \
		uint8_t uint8_t \
		+ + + \
		int16_t int16_t \
		+ + + \
		uint16_t uint16_t \
		+ + + \
		int32_t int32_t \
		+ + + \
		uint32_t uint32_t \
		+ + + \
		int64_t int64_t \
		+ + + \
		uint64_t uint64_t \
		+ + + \
		float float \
		+ + + \
		double double \
		+ + + \
		boolean boolean \
		+ + + \
		dmahandle unsigned long long uint64 \
		unsigned int unsigned int \
		+ + + \
		Due to compiler differences in how 64 bit integers are handled long long \
		and unsigned long long are mapped to _int64_t and unsigned _int64_t \
		respectively where _int64_t is defined to be either long long \
		or __int64 depending on the compiler. \
		Definitions for _wchar_t uint64 and int64 can be found in AEEStdDef.h \
		The dmahandle type takes in 3 parameters handle to the buffer offset into \
		the buffer and size of the buffer. \
		in parameter of a method \
		Basic types are passed by value as in parameters of a method. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface Basic AEEResult Basic_BasicIn unsigned char arg1 \
		AEEResult BasicIn in octet arg1 char arg2 \
		in char arg2 _wchar_t arg3 \
		in wchar arg3 short arg4 \
		in short arg4 int arg5 \
		in long arg5 int64 arg6 \
		in long long arg6 unsigned short arg7 \
		in unsigned short arg7 unsigned int arg8 \
		in unsigned long arg8 uint64 arg9 \
		in unsigned long long arg9 float arg10 \
		in float arg10 double arg11 \
		in double arg11 boolean arg12 \
		in boolean arg12 uint8_t arg13 \
		in uint8_t arg13 int16_t arg14 \
		in int16_t arg14 uint32_t arg15 \
		in uint32_t arg15 int64_t arg16 \
		in int64_t arg16 \
		+ + + \
		rout parameter of a method \
		Basic types are passed by reference as a pointer in the C language when used as \
		rout parameters of a method. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface Basic \
		AEEResult BasicROut rout octet arg1 AEEResult Basic_BasicROut unsigned char* arg1 \
		rout char arg2 char* arg2 \
		rout wchar arg3 _wchar_t* arg3 \
		rout short arg4 short* arg4 \
		rout long arg5 int* arg5 \
		rout long long arg6 int64* arg6 \
		rout unsigned short arg7 unsigned short* arg7 \
		rout unsigned long arg8 unsigned int* arg8 \
		rout unsigned long long arg9 uint64* arg9 \
		rout float arg10 float* arg10 \
		rout double arg11 double* arg11 \
		rout boolean arg12 boolean* arg12 \
		rout uint8_t arg13 uint8_t* arg13 \
		rout int16_t arg14 int16_t* arg14 \
		rout uint32_t arg15 uint32_t* arg15 \
		rout int64_t arg16 int64_t* arg16 \
		+ + + \
		inrout parameter of a method \
		Basic types are passed by reference as a pointer in the C language when used as \
		inrout parameters of a method. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface Basic \
		AEEResult BasicInROut inrout octet arg1 AEEResult Basic_BasicInROut unsigned char* arg1 \
		inrout char arg2 char* arg2 \
		inrout wchar arg3 _wchar_t* arg3 \
		inrout short arg4 short int* arg4 \
		inrout long arg5 int* arg5 \
		inrout long long arg6 int64* arg6 \
		inrout unsigned short arg7 unsigned short int* arg7 \
		inrout unsigned long arg8 unsigned int* arg8 \
		inrout unsigned long long arg9 uint64* arg9 \
		inrout float arg10 float* arg10 \
		inrout double arg11 double* arg11 \
		inrout boolean arg12 boolean* arg12 \
		inrout uint8_t arg13 uint8_t* arg13 \
		inrout int16_t arg14 int16_t* arg14 \
		inrout uint32_t arg15 uint32_t* arg15 \
		inrout int64_t arg16 int64_t* arg16 \
		+ + + \
		Member of a structure \
		. \
		Basic types appear as values when used as members of a structure. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		struct BasicStruct typedef struct BasicStruct BasicStruct \
		octet mem1 struct BasicStruct \
		char mem2 unsigned char mem1 \
		wchar mem3 char mem2 \
		short mem4 _wchar_t mem3 \
		long mem5 short mem4 \
		long long mem6 int mem5 \
		unsigned short mem7 int64 mem6 \
		unsigned long mem8 unsigned short mem7 \
		unsigned long long mem9 unsigned int mem8 \
		float mem10 uint64 mem9 \
		double mem11 float mem10 \
		boolean mem12 double mem11 \
		uint8_t mem13 boolean mem12 \
		int16_t mem14 uint8_t mem13 \
		uint32_t mem15 int16_t mem14 \
		int64_t mem16 uint32_t mem15 \
		int64_t mem16 \
		+ + + \
		Constant declarations \
		Constant declarations in IDL are mapped to defines in C with \
		expressions evaluated. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		const short MAX_TRIES 5 + 10 4 define MAX_TRIES 11 \
		+ + + \
		Identifiers \
		As with C++ it is recommended that C and C++ keywords not be used as \
		identifiers in IDL However if a keyword is used as an identifier it will be \
		prefixed with _cxx_ in the generated output. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		const short break 3 define _cxx_break 3 \
		+ + + \
		Module \
		Due to the lack of a namespace like construct in C IDL modules are \
		mapped by prepending each enclosed identifier with the module name with \
		an underscore separating the name of the module and the original identifier. \
		Modules can nest but interface methods structure members and \
		union members do not change since their names are local to that \
		interface struct or union. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		module foo typedef int foo_bar_int32 \
		module bar \
		typedef long int32 \
		+ + + \
		Interface \
		Types and functions declared within an interface must be scoped \
		within that interface any such types are prepended with the name of \
		the enclosing interface and an underscore as is done with modules If \
		the interface is itself within a module then any types within the \
		interface will be prepended with the fully qualified name of the \
		interface that is the names of all enclosing modules separated by \
		underscores along with the name of the interface Any types defined \
		within an interface will be extracted and defined before the \
		corresponding structure in the mapping. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface IFoo typedef struct IFoo_inner \
		struct inner /* */ \
		IFoo_inner \
		/* */ \
		int IFoo_process short int a \
		long process in short a \
		+ + + \
		Methods \
		Each method of an interface is mapped as a function See the [[Interface]] description. \
		in parameter \
		Memory for the argument is allocated by the caller These arguments are mapped as \
		const unless the type is an interface Otherwise the user of the interface \
		will be unable to invoke any of its methods since they are not const functions. \
		All user defined types struct union are passed as pointers to the defined type. \
		Note that no in pointer may be NULL . \
		An in parameter example is shown below. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		struct point typedef struct point \
		short x short int x \
		float y float y \
		point \
		interface ITest int IFoo_process short int id \
		const char* name \
		const point* origin \
		interface IFoo \
		long process in short id \
		in string name \
		in point origin \
		+ + + \
		rout parameter \
		Memory for the argument is allocated by the caller All parameters are passed as \
		pointers to the defined type For basic built in types [[Basic built in types]] \
		Note that sequence string and wstring parameters expand to two parameters \
		in C a pointer and a size For details of the mapping of strings and wstrings \
		see [[Basic built in types]]. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface IFoo int IFoo_process short int* id \
		char* name \
		long process rout short id int nameLen \
		rout string name point* origin \
		rout point origin \
		+ + + \
		inrout parameter \
		This is very similar to rout parameter and an example of an inrout is shown below. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface IFoo int IFoo_process short int* id \
		char* name \
		long process inrout short id int nameLen \
		inrout string name point* origin \
		inrout point origin \
		+ + + \
		Structure \
		IDL structures are mapped to C structures with a typedef to allow the \
		name of the structure to be used as a type Note that types declared within \
		a structure will have the name of the enclosing structure prepended to their \
		names as is done with definitions within modules and interfaces. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		struct extended_point typedef struct extended_point \
		short x short int x \
		float y float y \
		extended_point \
		+ + + \
		Enum \
		IDL enumerated types are mapped to C enumerated types with a typedef to allow \
		the name of the enum to be used as a type A placeholder enumerator is added to \
		each enum to ensure binary compatibility across compilers. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		enum color typedef enum color \
		RED RED \
		ORANGE ORANGE \
		YELLOW YELLOW \
		GREEN GREEN \
		BLUE BLUE \
		_32BIT_PLACEHOLDER_color 0x7fffffff \
		color \
		+ + + \
		The starting value for an enum is always 0. \
		Union \
		Unions are not supported at this time. \
		Array \
		IDL arrays are mapped to C arrays. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		struct foo typedef struct foo \
		long sum[2] int sum[2] \
		foo \
		+ + + \
		Sequence \
		For each sequence type sequence T a corresponding structure __seq_T \
		is generated with two members \
		.ccode \
		T* data \
		int dataLen \
		The dataLen member specifies the number of elements in the array data Note \
		that sequence lengths are always in terms of the number of elements in the sequence \
		not the number of bytes required to store the sequence. \
		Consider the following mapping example for a sequence of long integers. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef sequence long seqlong struct __seq_int \
		int* data \
		int dataLen \
		typedef __seq_int seqlong \
		+ + + \
		This structure is used when constructing sequences of sequence types. \
		in parameter of a method \
		When a sequence T is specified as an in parameter of a method of an \
		interface the mapping generates two arguments assuming the name of \
		the declarator is dcl \
		.ccode \
		const T* dcl int dclLen \
		The second argument specifies the total number of elements of the array \
		dcl The dcl pointer must be valid unless dclLen is 0 in which case \
		the pointer may be NULL The memory for the array is allocated by the \
		caller If the type is an interface the const is omitted. \
		Otherwise the user of the interface will be unable to invoke any of \
		its methods since they are not const functions. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef sequence long seqlong // see seqlong above \
		int IFoo_process \
		interface IFoo const int* sums \
		int sumsLen \
		long process in seqlong sums \
		+ + + \
		rout parameter of a method \
		When a sequence T is specified as an rout parameter of a method of an \
		interface the mapping generates two arguments assuming the name of the declarator \
		is dcl \
		.ccode \
		T* dcl int dclLen \
		The second argument dclLen specifies the total number of elements that the array \
		dcl can hold that is the number of elements worth of memory the caller has \
		allocated The dcl parameter must be valid unless dclLen is 0 in which case \
		dcl may be NULL Note that all memory namely the dcl array is allocated \
		by the caller An example of an rout sequence parameter is as follows. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef sequence long seqlong // see seqlong above \
		int IFoo_process \
		interface IFoo int* sums \
		int sumsLen \
		long process rout seqlong sums \
		+ + + \
		inrout parameter of a method \
		This is very similar to rout parameter and an example of an inrout sequence is shown below. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef sequence long seqlong // see seqlong above \
		int IFoo_process \
		interface IFoo int* sums \
		int sumsLen \
		long process inrout seqlong sums \
		+ + + \
		Member of a structure \
		. \
		When a sequence is declared as a member of a structure the declarator \
		assuming the name as dcl is mapped as two members of the C \
		struct \
		.ccode \
		T* dcl \
		int dclLen \
		The dclLen member specifies the number of elements of the array dcl . \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef sequence long seqlong // see seqlong above \
		typedef struct Atm Atm \
		struct Atm struct Atm \
		seqlong sums int* sums \
		int sumsLen \
		+ + + \
		Within another sequence or an array \
		When a sequence is used within another sequence or as \
		part of an array the structure generated for the sequence is used In \
		unions the structure type itself is used but within other sequences a \
		pointer to the structure type is used inrout does not support these complex structures. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef sequence long seqlong struct __seq_int \
		typedef sequence seqlong long2d int* data \
		int dataLen \
		struct s \
		seqlong five_sequences[5] \
		typedef __seq_int seqlong \
		struct __seq_seqlong \
		seqlong* data \
		int dataLen \
		typedef __seq_seqlong long2d \
		typedef struct s s \
		struct s \
		seqlong five_sequences[5] \
		+ + + \
		string and wstring \
		The IDL string type is mapped as char* and wstring as _wchar_t* \
		where _wchar_t is typedef ed to unsigned short When used anywhere other \
		than an in parameter the pointer is accompanied by a size which allows \
		the caller to specify the number of characters char for string _wchar_t \
		for wstring allocated for the string or wstring This is the length of the \
		buffer in characters not the length of the string since strings are \
		null terminated in C the length of the string is computable. \
		All length associated with a string or wstring include the null terminator. \
		Note In this section characters should be interpreted as meaning one byte \
		chars for string types and a two byte _wchar_ts for wstring types The \
		term character is not used here in the lexical sense when storing \
		text character set and encoding considerations are left to the application \
		and it is therefore possible for a lexical character to require more than \
		one IDL character non zero byte to represent it. \
		in parameter of a method \
		string is mapped as const char* and wstring as const _wchar_t* . \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface IFoo \
		long process in string name int IFoo_process const char* name \
		+ + + \
		.idlcode .ccode \
		interface IFoo \
		long process in wstring name int IFoo_process const _wchar_t* name \
		+ + + \
		rout parameter of a method \
		The caller must provide a valid buffer dcl which can hold up to dclLen \
		characters including the null terminator However when dclLen is 0 dcl may \
		be NULL On successful return the returned string dcl will always be null \
		terminated at the dclLen 1 character. \
		An example of an rout string is shown below. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface IFoo int IFoo_process char* name \
		int nameLen \
		long process rout string name \
		+ + + \
		inrout parameter of a method \
		This is very similar to rout parameter and an example of an inrout string is shown below. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		interface IFoo int IFoo_process char* name \
		int nameLen \
		long process inrout string name \
		+ + + \
		Note For both types the length parameters refer to the length of the buffer \
		in characters one byte chars for strings and two byte _wchar_ts for wstrings \
		not the length of the string The lengths are inclusive of a null terminator. \
		Member of a structure \
		. \
		Within a structure a string is mapped as though it were a sequence char and \
		a wstring as though it were a sequence wchar However as with strings and \
		wstrings the buffers are always required to be null terminated The mapping for \
		sequences within structures is detailed in [[Sequence]] part of which is duplicated \
		here for clarity. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef struct Atm Atm \
		struct Atm struct Atm \
		string ssn char* ssn \
		int ssnLen \
		+ + + \
		The second field ssnLen specifies the total size of the buffer ssn in \
		characters. \
		Within a sequence \
		When a string or wstring is used within a union or a sequence it is mapped as a \
		_cstring_t or _wstring_t Both of these types are structures containing a pointer \
		to a buffer and a buffer length This structure is the same as the structure that \
		would be generated for a sequence char in the case of string or sequence wchar \
		in the case of wstring See [[Sequence]] for details on the structure generated \
		for each sequence. \
		The semantics of the dataLen field are the same as those for a string when it \
		used as the member of a structure see [[Member of a structure]] for details. \
		+ + + \
		IDL C \
		+ + + \
		.idlcode .ccode \
		typedef sequence string seqstring // Note this struct is only defined \
		// once at the top of each file \
		struct _cstring_t \
		char* data \
		int dataLen \
		struct __seq_string \
		_cstring_t* data \
		int dataLen \
		typedef __seq_string seqstring \
		+ + + \
		NULL and empty strings \
		Strings in IDL interfaces are never NULL pointers Strings in IDL are never \
		absent or omitted by being NULL because they can t be They either have a \
		value or they are the empty string. \
		An empty string is a valid pointer to a buffer with a single byte of \
		value 0 is an empty string	",
	"id":63
}
idx.add(doc)
urls[63]='qaic_idl_reference.html'
titles[63]="QAIC IDL Reference"

var doc = {
	"title": "﻿Working with projects",
	"body": " \
		Overview \
		This chapter describes how to work with projects in the Hexagon IDE It focuses on the Hexagon specific differences \
		from standard Eclipse. \
		It covers the following topics \
		Hexagon C/C++ perspective \
		Creating projects \
		Building projects \
		Running projects \
		Debugging projects \
		Debugging remote applications \
		Projects with IDL files \
		Switching project toolchains \
		Hexagon C/C++ perspective \
		The Hexagon IDE includes a perspective specifically designed for working with Hexagon C/C++ projects. \
		The Hexagon C/C++ perspective is nearly identical in use to the standard Eclipse C/C++ perspective The one difference \
		is that the four toolbar commands normally used to create new projects/folders/files/classes are replaced with \
		Hexagon specific equivalents whose icons are all marked by the letter H . \
		.lua \
		return E.left E.img src images/proj_hex_perspective_window.png \
		These toolbar commands perform the Hexagon specific versions of the corresponding standard C/C++ toolbar commands. \
		NOTE Perspectives exist independently of projects in the IDE The current perspective can be changed using the \
		perspective control which appears in the upper righthand corner of the IDE main window. \
		NOTE In the current release of the Hexagon IDE some of the Hexagon specific toolbar commands are functionally \
		identical to the corresponding C/C++ commands In future releases this may change. \
		Creating projects \
		To create a new Hexagon C/C++ project switch to the [[Hexagon C/C++ perspective]] \
		and use any of the following methods \
		Choose New Hexagon Project from the File menu. \
		Right click in Project Explorer and choose New Hexagon Project . \
		Click on the Create new Hexagon C/C++ Project toolbar icon \
		.lua \
		return E.left E.img src images/proj_hex_new_proj_icon.png \
		NOTE Project names cannot contain spaces. \
		Project types \
		When you create a new project in the Hexagon IDE the dialog box lists the project types that are supported \
		Executable \
		Static library \
		Shared library \
		Common library \
		.lua \
		return E.left E.img src images/proj_new_hex_proj_name_dialog.png \
		Executable projects \
		Executable projects are used to create projects that generate executable files using the Eclipse managed build system. \
		NOTE Executable projects include the unit test templates described in [Unit Tests] Testing_Eclipse Unit Tests.html . \
		Library projects \
		Library projects are used to create static or shared library projects using the Eclipse managed build system. \
		Static library projects generate .lib files \
		Shared library projects generate .so files \
		Common library projects generate .lib or .so files \
		The file type generated by a common library project is determined by the build configuration that you specify for the project. \
		The possible configurations in this case are Static Debug Static Release Shared Debug and Shared Dynamic . \
		Static common libraries generate .lib files while shared common libraries generate .so files. \
		For each of the library project types the Hexagon IDE provides template projects named Audio PP Project and \
		Audio Codec Project for developing the following kinds of Hexagon libraries \
		Audio post processing \
		Audio codec \
		NOTE Common libraries replace the need for separate static and shared library types The latter can still be used if \
		you want to create only static or shared libraries – they are supported in the IDE for backward compatibility. \
		Building projects \
		To build a project you can use either of the two following methods \
		In Project Explorer right click on the project and choose Build Project . \
		Alternatively choose Build Project from the Project menu. \
		A log recording the build status is displayed in the Console view at the bottom of the main IDE window. \
		Running projects \
		To run a project you can use either of the two following methods \
		In Project Explorer right click on the project and choose Run As Hexagon C/C++ Application . \
		Alternatively select the project in Project Explorer then click on the Run toolbar icon \
		.lua \
		return E.left E.img src images/proj_run_as_icon.png \
		Select Hexagon C/C++ application and click on the OK button. \
		.lua \
		return E.left E.img src images/proj_run_as_dialog.png \
		NOTE The selection step in this method is required only once after that clicking on the Run icon \
		automatically selects the most recent project. \
		Run configuration \
		Run configuration can be performed using either of the two following methods \
		In Project Explorer right click on the project and choose Run As Run Configuration . \
		Alternatively select the project in Project Explorer then click on the arrow to the right of the Run toolbar icon and select Run Configuration . \
		Both of these display the Run Configurations dialog box Using the tabs in this dialog box you can configure the \
		Hexagon simulator program arguments and runtime environment. \
		To specify the program arguments select the Arguments tab and enter the program arguments separated by spaces. \
		To configure the Hexagon simulator for the program select the Simulator tab and enter the appropriate values. \
		.lua \
		return E.left E.img src images/proj_run_configs_dialog_sim.png \
		The following table lists the simulator tab fields The remaining run configuration tabs e.g. Common Main control standard Eclipse settings. \
		Simulator tab fields \
		+ + + \
		Field Description \
		+ + + \
		Simulator Name of simulator executable that is invoked when a \
		Hexagon project is run \
		+ + + \
		CPU architecture Hexagon processor version to simulate \
		+ + + \
		DSP clock Simulated processor clock speed in MHz \
		+ + + \
		Memory fill Initial value of all bytes in simulated processor memory \
		+ + + \
		Timing Checkbox controlling the specification of a bus penalty \
		+ + + \
		Bus penalty Delay time for processor bus access in cycles \
		+ + + \
		Stack start Base address of processor stack thread 0 \
		+ + + \
		Cosim file File name of co simulator to register with simulator \
		+ + + \
		Input file File name of standard input for target application \
		+ + + \
		Output file File name of standard output for target application \
		+ + + \
		Error file File name of standard error stream for target application \
		+ + + \
		Miscellaneous Command options for any simulator options which cannot be \
		flags specified in the other tab fields \
		+ + + \
		NOTE For more information on the simulator see the [Hexagon Simulator User Guide] Tools_Hexagon Tools 8.3.html . \
		Debugging projects \
		To debug an executable generated by a project you can perform either of the two following methods \
		In Project Explorer right click on the project and choose Debug As Hexagon C/C++ Application . \
		Alternatively select the project in Project Explorer then click on the Debug toolbar icon select Hexagon C/C++ Application and click on the OK button \
		.lua \
		return E.left E.img src images/proj_debug_icon.png \
		The debug perspective enables you to perform standard debugging operations such as stepping viewing disassembly \
		setting breakpoints viewing/modifying variables and viewing registers. \
		Debug configuration \
		Debug configuration can be performed using either of the two following methods \
		In Project Explorer right click on the project and choose Debug As Debug configuration . \
		Alternatively select the project in Project Explorer then click on the arrow to the right of the Debug toolbar icon and select Debug Configuration \
		.lua \
		return E.left E.img src images/proj_debug_icon.png \
		Both of these display the Debug Configurations dialog box Using the tabs in this dialog box you can configure \
		the Hexagon debugger program arguments and runtime environment. \
		To specify the debugger for the Hexagon program select the Debugger tab and enter the appropriate values. \
		The following table lists the debugger tab fields The remaining debug configuration tabs control either standard Eclipse settings or settings defined \
		as part of [[Run configuration]]. \
		Debugger tab fields \
		+ + + \
		Field Description \
		+ + + \
		Stop on Name of application function to stop on at debug startup \
		startup at \
		+ + + \
		Stop at Crash handler for dsp \
		Coredump \
		+ + + \
		Debugger Name of debugger executable that is invoked when a Hexagon \
		project is debugged \
		+ + + \
		Debugger Name of file used to automate debug session text file \
		command file containing lines which are GDB commands \
		+ + + \
		Shared List of directories containing the shared libraries that \
		Libraries are loaded dynamically \
		+ + + \
		Symbol Symbol file the is used by the debugger \
		Files \
		+ + + \
		NOTE The run configuration Simulator tab and the debug configuration Target tab control the same \
		runtime environment settings. \
		Debugging remote applications \
		The Hexagon IDE debugger GDB can be attached to a running instance of a remote simulation A remote simulation is a \
		simulator instance which was not launched by the IDE and which can be running either on the same machine as the IDE or on a different machine. \
		To debug the application running on a remote simulation you can perform either of the following methods \
		In Project Explorer right click on the project and choose Debug As Hexagon Attach to Application . \
		Alternatively select the project in Project Explorer then click on the Debug toolbar icon select Hexagon Attach to Application and click on the OK button \
		.lua \
		return E.left E.img src images/proj_debug_icon.png \
		Both of these display the following dialog box \
		.lua \
		return E.left E.img src images/proj_remote_debug_dialog.png \
		In the Executable field specify the binary file to debug Use Search project to search for binary files or File System to navigate to a different file system. \
		Specify the machine and port number where the remote simulation is waiting. \
		Click on the Debug button to start the remote debug session. \
		Another dialog box appears asking you to verify switching to a [normal debug session] Debugging projects . \
		NOTE The default machine and port number can be set by going to the debugger tab in the debug configuration \
		for Hexagon C/C++ Attach to Remote Application . \
		Projects with IDL files \
		The Hexagon IDE supports library projects that use Interface Definition Language IDL to define their component interfaces. \
		This section describes how to create and build a Hexagon library project which uses IDL It assumes you already have \
		an IDL file defined for the project. \
		NOTE IDL is used in FastRPC applications For more information see [FastRPC] APIs_FastRPC.html . \
		Creating IDL projects \
		To create a library project which uses IDL first create or import a Hexagon C/C++ library project \
		[in the standard way] Creating projects . \
		Add the IDL file to the library project. \
		When the file is added a dialog box appears asking whether you want to add an IDL builder to the project. \
		.lua \
		return E.left E.img src images/proj_idl_builder_dialog.png \
		Click on the Yes button to add the IDL builder. \
		Doing this automatically enables IDL support in the project. \
		NOTE IDL support can be explicitly enabled or disabled in a project by right clicking on the project and \
		selecting Hexagon Enable IDL support/Disable IDL support . \
		Building IDL projects \
		To build a library project that uses IDL simply build the project [in the standard way] Building projects . \
		Because the project has IDL support enabled the Hexagon IDE automatically invokes the IDL builder which in \
		turn invokes the qaic compiler to generate the IDL stub and skel files. \
		When the IDL builder is complete the Hexagon IDE invokes the standard C/C++ builder to build the project The standard \
		builder uses the generated skel files to build the library. \
		NOTE Stub files are for the application processor while skel files are for the \
		Hexagon processor Thus the generated stub files are automatically excluded from the build. \
		Configuring IDL compiler \
		Once a project is created its [IDL compiler settings] Creating IDL projects can be configured by right clicking \
		on the project in Project Explorer and choosing Properties Hexagon IDL Settings . \
		The following dialog box appears \
		.lua \
		return E.left E.img src images/proj_idl_properties_dialog.png \
		NOTE IDL compiler settings can be limited to a single IDL file by right clicking on the IDL file in \
		Project Explorer and choosing Properties Hexagon IDL Settings . \
		NOTE The IDL Settings menu is available in Project Explorer only if a project has IDL support enabled. \
		Switching project toolchains \
		The Hexagon IDE supports software development using the following toolchains \
		Hexagon GNU toolchain \
		Hexagon LLVM toolchain \
		The toolchain is normally chosen when a project is first created However you can also update an existing project so it uses a different toolchain. \
		To change the toolchain in a project first select the project in Project Explorer in this case the project name is factorial . \
		.lua \
		return E.left E.img src images/proj_hex_proj_factorial_window.png \
		Choose Properties from the File menu The following dialog box appears \
		.lua \
		return E.left E.img src images/proj_hex_proj_properties_dialog_1.png \
		To change the toolchain for this project expand the Hexagon folder The dialog box changes to the following \
		.lua \
		return E.left E.img src images/proj_hex_proj_properties_dialog_2.png \
		In the Current toolchain drop down list choose the new toolchain. \
		Click on the Apply button to save the changes then click on OK to close the dialog box.	",
	"id":64
}
idx.add(doc)
urls[64]='eclipse_projects.html'
titles[64]="﻿Working with projects"

var doc = {
	"title": "﻿Project templates",
	"body": " \
		Overview \
		The Hexagon IDE provides project templates for some standard library types in the Elite application \
		framework including the following \
		Audio Post Processor Interface APPI \
		Common Audio Processor Interface CAPI \
		Voice interface \
		By providing empty implementations of all the functions for a particular library \
		the templates enable you to quickly get started with application development on Elite without having \
		to spend time managing details of the library interface. \
		The following project templates are supported \
		Audio post processing audio PP \
		Audio encoder/decoder \
		Voice \
		Unit test for audio post processing \
		You can also create custom templates for commonly used code modules. \
		Audio post processing interface template \
		The project template for an APPI library provides an empty implementation of the functions comprising \
		an APPI interface This interface provides APIs for integrating audio processing libraries into the Elite framework. \
		The file and folder name structure for an APPI template follow the conventions defined for developing \
		and integrating audio post processing features into the Elite framework. \
		When you create a new project specifying the Audio PP Project template will populate the newly created \
		project with APPI compliant code as shown in the following screen image The project shown here is named equalizer . \
		.lua \
		return E.left E.img src images/templates_equalizer.png \
		The files in folder equalizerAPPI which include the source file appi_equalizer.c and \
		header file appi_equalizer.h contain the prototype definitions and empty implementations for the \
		functions constituting the APPI interface init reinit process etc. \
		NOTE For more information on the APPI interface see *Hexagon Multimedia Custom Audio Processing* 80 N7220 1 . \
		Audio encoder/decoder interface template \
		The project template for a a CAPI library provides an empty implementation of the functions \
		comprising a CAPI interface This interface provides APIs for integrating audio codecs into the Elite framework. \
		The file and folder name structure for a CAPI template follow the conventions defined for \
		developing and integrating an audio codec into the Elite framework. \
		When you create a new project specifying the Audio Codec Project template will populate \
		the newly created project with CAPI compliant code as shown in the following screen image. \
		The project shown here is named mp3 and the decoder was specified in the project creation wizard. \
		.lua \
		return E.left E.img src images/templates_mp3.png \
		The files in folder Cmp3DecoderLib which include source file Cmp3DecoderLib.cpp and \
		header file Cmp3DecoderLib.h contain the prototype definitions and empty implementations for the functions \
		comprising the CAPI interface init reinit process GetParam etc. \
		NOTE For more information on the CAPI interface see *Hexagon Multimedia Elite Audio Postprocessor API Reference Guide* 80 N3226 1 . \
		Voice interface template \
		The project template for a a CAPI library provides an empty implementation of the functions comprising a voice interface. \
		When you create a new project specifying the Audio Codec Project template will populate the newly created project with voice project compliant code as shown in the following screen image The project shown here is named voice . \
		.lua \
		return E.left E.img src images/templates_voice.png \
		The files in folder inc and src which include source file voice_modules.c and header file voice.h contain the prototype definitions and empty implementations for the functions comprising the CAPI interface init reinit process GetParam etc. \
		Unit test template \
		The project template for a unit test provides an empty implementation for the APPI/CAPI compliant testing of \
		audio features. \
		The audio PP/Codec unit test template is automatically provided when a new library project is \
		created in the IDE [Creating projects] eclipse_projects.html Creating projects . \
		The following screen image shows the audio PP unit test template when an executable project is created. \
		The project shown here is named pputest . \
		.lua \
		return E.left E.img src images/templates_pputest.png \
		In this example the file pputest.cpp project_name.cpp in general implements the main function \
		that contains the infrastructure for parsing the program arguments for unit testing The files \
		appi_test.cpp and test_utils.cpp originate from the Hexagon SDK and are linked to pputest.cpp to \
		create the executable file. \
		NOTE For more information on unit test frameworks see [Unit Test Framework] Testing_Unit Tests.html . \
		Custom templates \
		Custom project templates can be created in the Hexagon IDE. \
		For example if a development team decides that a specific module of code will be \
		commonly used across all team projects or that a certain directory structure \
		must be used in all the projects then a custom template can be created and kept \
		in an area accessible to all team members The team members can load the template into the Eclipse IDE and \
		then create projects using the template. \
		Custom templates are specified as [well formed XML files] Template file format The template file \
		name must be identical to the directory name that the template file is stored in For example \
		the custom templates template1.xml and template2.xml must be stored in locations template1/template1.xml \
		and template2/template2.xml . \
		Both template1 and template2 can be stored in an arbitrary template directory and the template can be \
		added in the SDK preference page. \
		The directory where the custom templates reside can be specified by \
		selecting Windows Preferences Hexagon SDK and then adding the directories to the \
		Templates and examples field. \
		.lua \
		return E.left E.img src images/templates_custom.png \
		After a custom template has been added you can select it when [creating a new project] eclipse_projects.html Creating projects . \
		.lua \
		return E.left E.img src images/templates_custom_select.png \
		Template file format \
		A template file is a well formed XML file It consists of a single element named template which contains the \
		following sub elements \
		pages \
		buildsettings \
		postbuildstep \
		projectproperty \
		files \
		open \
		The template properties are specified as attributes and sub elements of these elements. \
		Template file elements \
		+ + + + \
		Element Attributes Sub Elements \
		+ + + + \
		template name pages \
		type buildsettings \
		category projectproperty \
		icon files \
		projecttype open \
		description \
		+ + + + \
		pages page \
		+ + + + \
		page description property \
		+ + + + \
		property id val \
		value \
		type \
		+ + + + \
		val value \
		+ + + + \
		buildsettings option \
		+ + + + \
		option id val \
		type \
		+ + + + \
		val value \
		+ + + + \
		postbuildstep step \
		+ + + + \
		step command \
		+ + + + \
		projectproperty property \
		+ + + + \
		property id \
		value \
		type \
		+ + + + \
		files file \
		+ + + + \
		file type \
		src \
		dest \
		replaceable \
		+ + + + \
		open location \
		+ + + + \
		Template elements \
		+ + + \
		Name Description \
		+ + + \
		template Template properties \
		+ + + \
		template name Name of template project or example project \
		+ + + \
		template type Indicates whether template file is template project or \
		example project Possible values \
		template \
		example \
		+ + + \
		template category Category in which template should appear in the tree \
		The template name is shown under the category in the \
		project template tree in the wizard e.g. Elite/Audio \
		+ + + \
		template icon File name of icon image to be displayed in project \
		wizard \
		+ + + \
		template projecttype Project type Possible values \
		executable exe Executable \
		dll shared so Shared library \
		lib static Static library \
		+ + + \
		template description Description of project \
		+ + + \
		pages Create New Project wizard pages \
		+ + + \
		buildsettings Template build settings \
		+ + + \
		projectproperty Project properties \
		+ + + \
		files Files to be copied or linked \
		+ + + \
		open File to open on project creation \
		+ + + \
		Pages elements \
		The pages elements are used to specify the pages i.e. dialog boxes that appear in the [ New Project \
		wizard] eclipse_projects.html Creating projects and how they are set when a new project is created. \
		+ + + \
		Name Description \
		+ + + \
		pages Create New Project wizard pages \
		+ + + \
		page Create New Project wizard page \
		+ + + \
		page description Text label on wizard page \
		+ + + \
		property Input field on wizard page \
		+ + + \
		property id Input field label \
		+ + + \
		property value Input field default value input type only \
		+ + + \
		property type Input field type Possible values \
		input Text input field \
		select Drop down select field \
		+ + + \
		val Select field item select type only \
		+ + + \
		val value Select field item label \
		+ + + \
		Buildsettings elements \
		The buildsettings elements are used to specify include paths and preprocessor definitions. \
		+ + + \
		Name Description \
		+ + + \
		buildsettings Build settings properties \
		+ + + \
		option Build options in the build settings \
		+ + + \
		option id Option name \
		+ + + \
		option type Indicate whether or not option is required \
		true Option required \
		false Option not required \
		+ + + \
		val Set of values for option \
		+ + + \
		val value Option value \
		+ + + \
		Postbuildstep elements \
		The postbuildstep elements specify commands that must be invoked after a build. \
		+ + + \
		Name Description \
		+ + + \
		postbuildstep Post build step properties \
		+ + + \
		step Step \
		+ + + \
		step command Step command name \
		+ + + \
		Projectproperty elements \
		+ + + \
		Name Description \
		+ + + \
		projectproperty Project properties \
		+ + + \
		property Project property \
		+ + + \
		property id Property name \
		+ + + \
		property value Property value \
		+ + + \
		property type Indicate whether or not option is required \
		replaceable Replace property if already set \
		Append Append property to existing property \
		Prepend Prepend property to existing property \
		+ + + \
		Files elements \
		+ + + \
		Name Description \
		+ + + \
		files File properties \
		+ + + \
		file File to be copied or linked \
		+ + + \
		file replaceable Operation to perform on file Possible values \
		copy \
		link \
		+ + + \
		file src Location where file should be copied from or linked \
		relative to template location \
		+ + + \
		file dest Location inside project where file should be copied \
		to or linked \
		+ + + \
		file replaceable Indicate whether or not file is replaceable \
		true File replaceable \
		false File not replaceable \
		+ + + \
		Open elements \
		The open elements are used to specify the files that must be opened when a project is created with the template. \
		+ + + \
		Name Description \
		+ + + \
		open Open properties \
		+ + + \
		open location Location of file inside project relative to project \
		file \
		+ + + \
		Example template file \
		The following code example shows a template file description The individual elements are \
		described in the following sections. \
		.xmlcode \
		template name PP Unit Test type template category Elite/Audio icon icon/mp3.jpeg \
		projecttype exe description This project helps user in unit testing \
		stand alone static PP module The Unit testing framework provides profiled data \
		for the APPI module \
		pages \
		page description General project specific information \
		property id Author value type input / \
		property id Source directory value src type input / \
		property id Include directory value inc type input / \
		/page \
		/pages \
		buildsettings \
		option id .*compiler/.option/.include.paths type true \
		val value &quot $ HEXAGON_SDK_ROOT /inc&quot / \
		val value &quot $ HEXAGON_SDK_ROOT /test/test_appi/ \
		src&quot / \
		/option \
		option id .*link/.option/.libs type true \
		val value qdsp / \
		/option \
		option id .*compiler/.option/.preprocessor/.def type true \
		val value __qdsp6__ / \
		val value _DEBUG / \
		/option \
		option id .*compiler/.option/.preprocessor/.def/.symbols type true \
		val value __qdsp6__ / \
		val value _DEBUG / \
		/option \
		/buildsettings \
		projectproperty \
		property id HexagonProjectType value PPTest type replaceable / \
		/projectproperty \
		files \
		file type copy src src/Basename.cpp \
		dest $ Source directory /$ projectName .cpp replaceable true / \
		file type copy src src/Basename.h \
		dest $ Include directory /$ projectName .h replaceable true / \
		file type copy src src/Basename_Integration.h \
		dest $ Include directory /$ projectName _Integration.h replaceable true / \
		file type link src HEXAGON_SDK_ROOT/test/test_appi/src/appi_test.cpp \
		dest $ Source directory /appi_test.cpp replaceable true / \
		file type link src HEXAGON_SDK_ROOT/test/test_util/src/test_utils.cpp \
		dest $ Source directory /test_utils.cpp replaceable true / \
		/files \
		open location $ Source directory /$ projectName .cpp / \
		/template	",
	"id":65
}
idx.add(doc)
urls[65]='eclipse_templates.html'
titles[65]="﻿Project templates"

var doc = {
	"title": "sysMonApp",
	"body": " \
		Overview \
		sysMonApp is an Android executable which interacts with Q6 s on ADSP/CDSP/SLPI subsystems via FastRPC \
		and provides various users functionalities like profiling Q6 work load get the clock info set/remove the \
		core and bus clocks get SW thread info get the SW thread level profile stats amongst other supported \
		functionalities This document captures steps to setup sysMonApp and provides information on above mentioned \
		various functionalities supported by sysMonApp and their usage. \
		Setup \
		**sysMonApp for LA and LE Variant Location ** \
		sysMonApp is part of the DSP build located at \
		on ADSP ADSP_BUILD /adsp_proc/performance/sysmonapp/sysMonApp \
		ADSP_BUILD /adsp_proc/performance/sysmonapp/sysMonAppLE \
		on CDSP CDSP_BUILD /cdsp_proc/performance/sysmonapp/sysMonApp \
		CDSP_BUILD /cdsp_proc/performance/sysmonapp/sysMonAppLE \
		on SDSP SDSP_BUILD /sdsp_proc/performance/sysmonapp/sysMonApp \
		SDSP_BUILD /sdsp_proc/performance/sysmonapp/sysMonAppLE \
		The presence of these DSP subsystems is dependent on target One can take any of the sysMonApp from above \
		location and that will support all the functionalities across DSP subsystems ADSP/CDSP/SDSP . \
		Alternate Location Use only if the DSP build is not available supported on SM8150 SM6150 QCS405 QCS605 and future chipsets \
		From SDK Hexagon SDK versio /tools/utils/sysmon/sysMonApp \
		**Steps to setup sysMonApp ** \
		For LA variant \
		Push sysMonApp LA variant from DSP build/SDK to target as below. \
		From DSP build \
		adb push ADSP/CDSP/SDSP _BUILD / adsp/cdsp/sdsp _proc/performance/sysmonapp/sysMonApp /data/ \
		From SDK \
		adb push Hexagon SDK version /tools/utils/sysmon/sysMonApp /data \
		For LE variant \
		Push sysMonApp LE variant from DSP build/SDK to target as below. \
		From DSP build \
		adb push ADSP/CDSP/SDSP _BUILD / adsp/cdsp/sdsp _proc/performance/sysmonapp/sysMonAppLE /data/sysMonApp \
		From SDK \
		adb push Hexagon SDK version /tools/utils/sysmon/sysMonAppLE /data/sysMonApp \
		Change permissions of the sysMonApp executable \
		adb shell chmod 777 /data/sysMonApp \
		**Prerequisites ** \
		Fastrpc daemon adsprpcd should be running on Android Path of the daemon on target \
		adb shell \
		/system/bin/adsprpcd \
		One can check the running of daemon by using the below cmd \
		adb shell ps grep adsprpcd \
		.lua \
		return E.left E.img src images/adsprpcddeamonrunning.png \
		Output of ps shows the fastrpc daemon adsprpcd running. \
		**Executing sysMonApp ** \
		sysMonApp can be executed from the adb shell cmd shown below. \
		adb shell /data/sysMonApp service arguments related to the service \
		When sysMonApp is executed without service name help page will be dispalyed as shown below for illustration purpose only actual help page may differ based on updates \
		.lua \
		return E.left E.img src images/sysMonAppHelppage.png \
		sysMonApp Services \
		**Profiler service** \
		This service can be used to profile services running on ADSP to gather information like the \
		clocks voted for resource usage load distribution across available hardware threads load on processor \
		bus bandwidth metrics and various other profiling metrics useful in measuring performance debugging \
		performance related issues and in identifying possible optimizations. \
		**Executing profiler service ** \
		To see profiler help page execute below command \
		adb shell /data/sysMonApp profiler help \
		Cmd to execute profiler service \
		adb shell \
		/data/sysMonApp profiler arguments \
		profiler service argument list \
		+ + + + + \
		** Arguments ** **Property** **Value** **Description** \
		+ + + + + \
		/ / samplingPeriod Optional Integer Sampling Period in milli seconds This is the time \
		Defaults 0 for / / defaultSetEnable 1 value 1 interval at which values of 8 PMU events will be \
		1 for / / defaultSetEnable 0 collected \
		+ + + + + \
		/ / defaultSetEnable Optional 0 User mode logging \
		Default Chipset dependent \
		+ + + \
		1 Default mode logging \
		+ + + + + \
		/ / dcvsOption Optional 0 Disable the DCVS for the profiling duration \
		Default 1 for / / defaultSetEnable 1 + + + \
		0 for / / defaultSetEnable 0 1 Enable the DCVS for the profiling duration \
		+ + + + + \
		/ / profileFastrpcTimeline Optional 0 Disable the option of collecting the time spent by \
		Default 0 fastrpc interface \
		+ + + \
		1 Enable the option of collecting the time spent by \
		fastrpc interface \
		+ + + + + \
		/ / stidArray Optional Comma User provided list comma separated of STID values \
		Default disabled \
		Note Valid only from SDM845/SDM670 separated Profiling using this option is explained in detail \
		STID values over subsequent sections \
		+ + + + + \
		/ / q6 Optional adsp Execute the service in ADSP processor \
		Default adsp + + + \
		cdsp Execute the service in CDSP processor \
		+ + + \
		sdsp Execute the service in SDSP processor \
		+ + + + + \
		**Default Mode / / defaultSetEnable 1 ** \
		In default mode fixed set of 8 PMU events for example MPPS AXI Read and Write bandwidth HVX MPPS etc. will be monitored at sampling period configured by Q6 sysMon \
		service The 8 PMU events chosen in this mode are chipset and subsystem ADSP/CDSP/SDSP specific In this mode user cannot override the PMU events DCVS will be enabled in \
		this mode by default In this mode by default the samplingPeriod is taken 0 i.e the sampling interval \
		may toggle between 1ms and 50ms dictated by Q6 sysMon service From SDM660/SDM845 user can overwrite the sampling period if \
		required **/ / samplingPeriod in milli seconds ** by disabling DCVS **/ / dcvsOption 0** . \
		**User Mode / / defaultSetEnable 0 ** \
		In user mode 4 PMU events are fixed by Q6 sysMon service Predefined array of PMU events provided by Q6 \
		sysmon service take the place of other 4PMU events These PMU evets in array are divided into sets of 4 \
		PMU events each and monitored in round robin fashion After collecting 50 samples of data another set of \
		4 PMU events will be taken from predefined array This continues in round robin fashion till the user \
		stops the profiling In this mode the default SamplingPeriod is 1ms and DCVS option is disabled. \
		Example profiler service commands \
		Running the sysMonApp profiler service in user mode. \
		adb shell /data/sysMonApp profiler defaultSetEnable 0 \
		.lua \
		return E.left E.img src images/profileruseroption.png \
		Running the sysMonApp profiler with default mode type. \
		adb shell /data/sysMonApp profiler defaultSetEnable 1 \
		.lua \
		return E.left E.img src images/profilerdefoption.png \
		Running sysMonApp profiler capturing the samples at sampling interval of 10ms on CDSP processor with user mode and capture \
		the fastrpc timeline packets. \
		adb shell /data/sysMonApp profiler defaultSetEnable 0 samplingPeriod 10 q6 cdsp profileFastrpcTimeline 1 \
		**STID based profiling** \
		From SDM845/SDM670 certain PMU events can be filtered per software thread based on SW Thread ID field of STID register. \
		STID has a 8 bit software thread identifier programmed by QuRT on user request STID can be used to filter PMU events captured by profiler service. \
		By default the filtering based on STID is disabled and user can enable the same by using **/ / stidArray** option in user mode. \
		Not all PMU events are maskable under STID in **User Mode** sysMonApp profiler service selects a set of PMU events maskable under STID. \
		By default for all software threads the software thread identifier of STID will be 0 which cannot be used as a filter for PMU event counters. \
		QuRT has an API exposed to be able to register a thread for STID allocation in the process of thread creation Following code snippet shows the changes needed to enable STID generation for a software thread \
		.ccode \
		qurt_thread_attr_t attr \
		qurt_thread_attr_init &attr \
		qurt_thread_attr_set_name &attr p_ThreadName \
		qurt_thread_attr_set_stack_addr &attr p_StackBase \
		qurt_thread_attr_set_stack_size &attr stackSize \
		//Code change start \
		/* Add the following line to enable STID allocation to the software thread being created. \
		* A non zero software thread identifier in STID register is needed to enable PMU \
		* filtering for the same */ \
		qurt_thread_attr_enable_stid &attr 1 //QuRT assigns an available STID to the thread during qurt_thread_create \
		//Code change end \
		result qurt_thread_create &tid &attr void* entry NULL \
		STID cannot be assigned to an already created thread The above code change is needed to make use of STID filtering on PMU events. \
		As we have only ~255 8 bit thread identifier in STID register and a value of 0 is non maskable usable STIDs for filtering not all threads should be assigned a STID. \
		The following command displays a list of software threads and their STIDs created in the selected subsystem \
		adb shell /data/sysMonApp tinfo q6 adsp/cdsp/sdsp \
		.lua \
		return E.left E.img src images/profilerStidTinfo.png \
		A value of 0 under STID column for a particular software thread means STID filtering of PMU events cannot be done for that software thread refer code changes required for allocating a STID via QuRT APIs above . \
		The profiler functionality under sysMonApp has the following option under user mode defaultSetEnable ! 1 for users to enable STID based filtering on select PMU events \
		Example command \
		adb shell /data/sysMonApp profiler defaultSetEnable 0 stidArray 1 2 3 4 q6 adsp \
		In above example we are starting the profiler service on ADSP in user mode The profiler automatically selects a PMU event set maskable with STID Note that STID filtering is supported only in **User mode** profiling. \
		As explained in previous sections 4 user PMU events are selected per sample in this mode while the other 4 are the defaults set by sysMon and remain constant STID filtering will only be applied to the 4 user PMU events while the defaults set by sysMon won t be filtered STID mask will be 0 . \
		In a profiling sample captured over provided sampling period only one STID value is applied as a filter to the 4 user PMU events In this example STID values of 1 2 3 and 4 will be iterated over profiling samples one at a time. \
		Note \
		1 Due to time division multiplexing iterating over provided STIDs over profiling samples selecting multiple STIDs as filters may not provide a complete picture for a given STID missing time slots where other STID is configured In cases where a continuous time domain filtering is needed per STID only one STID is to be given by user. \
		2 The **/ / stidArray** list has a limit of 8 STIDs. \
		3 STID filtering cannot be enabled in **/ / defaultSetEnable 1** mode. \
		**Stats collection and post processing** \
		sysMonApp profiler stores raw profiling data at /sdcard/sysmon.bin or /data/sysmon.bin location on device Once the user \
		is done profiling **STOP** button pressed the file can be pulled from the device and post processed \
		using sysmon parser on a host machine Windows . \
		Command to pull the profiler output file from device using ADB \
		adb pull /sdcard/sysmon.bin destination directory / filename.bin \
		Usage of the post processing script ADSP/CDSP/SDSP _BUILD / adsp/cdsp/sdsp _proc/performance/sysmonapp/tools \
		SysmonParser.exe Input file name .bin Output file name ModeType Windows \
		+ + + + + \
		**Parameter** **Property** **Value** **Description** \
		+ + + + + \
		Input file name Required Path to the profiler output bin file \
		including the file name with extension \
		extracted from the target \
		+ + + + + \
		Output file name Required Desired output file path including the \
		filename without extension \
		+ + + + + \
		ModeType Required default If DCVS option is checked \
		+ + + \
		user If DCVS option is un checked \
		+ + + + + \
		**Example commands ** \
		SysmonParser sysmon.bin SysmonProfStat default \
		SysmonParser.exe sysmon.bin SysmonProfStat user \
		SysmonParser c /temp/sysmon.bin c /temp/SysmonProfStat user \
		**Post processing script output file ** \
		User can go through the section Post processing script output file in the below link provided. \
		Use [Hexagon Profiler Version 1] sysMon_DSP_Profiler.html Click [here] sysMon_DSP_Profiler.html to know more on this. \
		This will explain how to collect the profiler bin file and postprocess the same. \
		If there are dynamic modules in testcase executed and the argument to profiler service **/ / profileFastrpcTimeline** is enabled. \
		After post processing the collected bin file Time spent in fastrpc interface for each dynamic module is shown in \
		Summary Sheet . \
		From post processed data one can know how MPPS AXI rd/wr BW are getting effected when fastrpc communication is executing at that sample. \
		One can know how many PDs are getting executed and how often there is fastrpc communication APPS Q6 for each PD. \
		If STID filtering is enabled for the profiling post processor intelligently categorizes PMUs and their post processed data under selected STIDs The parser also tries to resolves the thread name by using the thread info data captured at the beginning of the profiler instance when STID filtering is enabled. \
		Note Un resolved STIDs No thread name displayed in the post processed output is not assigned to a software thread by the time profiler is started and its user s responsibility to map to appropriate thread if the thread is spawned dynamically after profiler start . \
		STID should be uniquely mapped to a software thread any duplication will result in the warning messages as below when the parser is run and the thread name is displayed as Duplicate thread in post processed data. \
		.lua \
		return E.left E.img src images/profilerStidDuplicate.png \
		Following are some post processed output snapshots which capture the STID centric data \
		.lua \
		return E.left E.img src images/profilerStidSummarySheet.png \
		Above snapshot captures Summary sheet from post processed output showcasing STID wise summary of metrics captured by the profiler Resolved thread name is displayed in respective summary headings in **STID_ STID number ThreadName ** format \
		.lua \
		return E.left E.img src images/profilerStidPPSheet.png \
		The above sheet captures PostProcessed data showcasing **STID_ STID number Post processed PMU data ** for PMU events with STID filter enabled This sheet categorizes post processed metrics captured under respective STID filtered threads Summary sheet can be referred to get the ThreadName for a given STID number . \
		.lua \
		return E.left E.img src images/profilerStidRawSheet.png \
		The above snippet shows RawData sheet with additional STID filtering information in columns K and T STID0 is applicable to PMU events and values under PMU instances 0 3 and STID1 for PMU instances 4 7. \
		**Getstate service** \
		This service is used to know the current Q6 clock voting information and heap statistics of each static Protection Domain. \
		Following clock info is queried from Q6 at that instance \
		Q6 Core Clock \
		SNOC Clock vote from Q6 This is Q6 AXI clock vote. \
		BIMC Clock vote from Q6. \
		Following heap stats info of each PD is queried from Q6 at that instance \
		PD Name Total Heap in KB Total heap memory declared. \
		Available Heap in KB Total free heap available in PD at that instance. \
		Max.Free Bin in KB Max heap bin size in PD at that instance. \
		**Executing getstate service ** \
		Gestate service can be execute using below cmd \
		adb shell /data/sysMonApp getstate \
		.lua \
		return E.left E.img src images/getstate.png \
		getstate service argument list \
		+ + + + + \
		** Arguments ** **Property** **Value** **Description** \
		+ + + + + \
		/ / q6 Optional ADSP Execute the service in ADSP processor \
		default ADSP + + + \
		CDSP Execute the service in CDSP processor \
		+ + + \
		SDSP Execute the service in SDSP processor \
		+ + + + + \
		**Example getstate service commands ** \
		Running the sysMonApp getstate service on CDSP processor. \
		adb shell /data/sysMonApp getstate q6 cdsp \
		.lua \
		return E.left E.img src images/getstateCDSP.png \
		**DCVS service** \
		This service is used to enable or disable the Dynamic Clock Voltage Scaling DCVS feature executing in Q6. \
		**Executing DCVS service ** \
		adb shell /data/sysMonApp dcvs enable \
		.lua \
		return E.left E.img src images/dcvsenable.png \
		dcvs service argument list \
		+ + + + + \
		** Arguments ** **Property** **Value** **Description** \
		+ + + + + \
		enable Mandatory None This enables the DCVS feature in Q6 processor \
		+ + + + + \
		disable Mandatory None This disables the DCVS feature in Q6 processor \
		+ + + + + \
		/ / q6 Optional ADSP Execute the service in ADSP processor \
		Default ADSP + + + \
		CDSP Execute the service in CDSP processor \
		+ + + \
		SDSP Execute the service in SDSP processor \
		+ + + + + \
		**Example DCVS service commands ** \
		Command to enable DCVS service on CDSP processor \
		adb shell /data/sysMonApp dcvs enable q6 cdsp \
		.lua \
		return E.left E.img src images/dcvsenablecdsp.png \
		Command to disable DCVS service on ADSP processor which is the default selection. \
		adb shell /data/sysMonApp dcvs disable \
		.lua \
		return E.left E.img src images/dcvsdisable.png \
		**Clocks service** \
		This service is used to set the Q6 core clock and bus clocks of desired Q6 processor Using this service \
		one can remove the votes that were voted using this and restores the clocks that were running initially. \
		One can vote for the below clocks \
		Q6 core clock This is the clock at with Q6 processor runs at. \
		Bus Clock This is clock at which axi runs at Q6 AXI . \
		AHB Clock This is clock internal to Q6 which is interface between Q6 and LPM runs at. \
		HCP Bus Clock This clock is at which HCP HW runs at Only for CDSP processor. \
		DMA Bus Clock This clock is at which DMA HW runs at Only for CDSP processor. \
		Using this service user can set desired sleep latency Based on the requested latency sleep solver choses \
		appropriate low power modes satisfying the latency requirement. \
		clocks service help page \
		.lua \
		return E.left E.img src images/clockshelp.png \
		**Executing clocks service set command ** \
		adb shell /data/sysMonApp clocks set [ coreClock MHz ] [ busClock MHz ] [ ahbClock MHz ] [ sleepLatency uSeconds ] \
		.lua \
		return E.left E.img src images/clocksset.png \
		Once the clocks are set one can execute the getstate service to see if the requested clocks are set. \
		clocks service argument list for set \
		+ + + + \
		** Arguments ** **Value** **Description** \
		+ + + + \
		/ / coreClock MHz Desired floor Q6 core clock in MHz This will \
		ensure that Q6 core processor would run at minimum \
		of given core frequency \
		+ + + + \
		/ / busClock MHz Desired floor Q6 AXI clock in MHz This will \
		ensure that bus clock for Q6 would be given at \
		minimum of given bus frequency when Q6 is active \
		+ + + + \
		/ / ahbClock MHz Desired floor Q6 LPM clock in MHz This will \
		ensure that Q6 AHB clock for Q6 would run at \
		minimum of given bus frequency \
		+ + + + \
		/ / hcpBusClock MHz Desired clock used to vote HCP DDR BW \
		Applicable for CDSP processor \
		+ + + + \
		/ / dmaBusClock MHz Desired clock used to vote DMA DDR BW \
		Applicable for CDSP processor \
		+ + + + \
		/ / sleepLatency uSec Desired SleepLatency vote Use to choose sleep \
		LPM mode based on entry and exit latencies \
		+ + + + \
		/ / q6 ADSP Default Execute the service in ADSP processor \
		+ + + \
		CDSP Execute the service in CDSP processor \
		+ + + \
		SDSP Execute the service in SDSP processor \
		+ + + + \
		**Executing clocks service remove command ** \
		adb shell /data/sysMonApp clocks remove \
		.lua \
		return E.left E.img src images/clocksremove.png \
		Once the clocks are removed one can execute the getstate service to see if the clocks are restored to initial values. \
		clocks service argument list for remove \
		+ + + + \
		** Arguments ** **Value** **Description** \
		+ + + + \
		/ / q6 ADSP Default Execute the service in ADSP processor \
		+ + + \
		CDSP Execute the service in CDSP processor \
		+ + + \
		SDSP Execute the service in SDSP processor \
		+ + + + \
		**Example clocks service commands ** \
		Set the Q6 core clock for ADSP processor. \
		adb shell /data/sysMonApp clocks set coreClock 400 ahbClock 100 \
		.lua \
		return E.left E.img src images/ClocksCCAdsp.png \
		Set the bus clock for CDSP processor. \
		adb shell /data/sysMonApp clocks set coreClock 500 busClock 100 q6 cdsp \
		.lua \
		return E.left E.img src images/ClocksBCCdsp.png \
		Remove the clocks that are set using this service for CDSP processor. \
		adb shell /data/sysMonApp clocks remove q6 cdsp \
		.lua \
		return E.left E.img src images/ClocksRemovecdsp.png \
		Disable the PowerCollapse using **/ / sleepLatency** argument on ADSP processor This mode is one of Sleep solver modes. \
		adb shell /data/sysMonApp clocks sleepLatency 10 \
		.lua \
		return E.left E.img src images/sleepLatencydsp.png \
		**tinfo service** \
		This service is used to know the SW threads created along with priority across all PDs Also used to know \
		the stack size declared and Max stack size used at that instance across PDs. \
		**Executing tinfo service command ** \
		Cmd that displays all the SW threads created their priority across all PDs. \
		adb shell /data/sysMonApp tinfo \
		tinfo service argument list for set \
		+ + + + \
		** Arguments ** **Value** **Description** \
		+ + + + \
		/ / getstack audio Displays the SW threads created priority \
		Stack size declared and Max stack used of \
		each SW thread for the requested PD \
		+ + + \
		sensors Displays the SW threads created priority \
		Stack size declared and Max stack used of \
		each SW thread for the requested PD \
		+ + + \
		user Displays the SW threads created priority \
		Stack size declared and Max stack used of \
		each SW thread for the dynamic PD if any \
		+ + + \
		all Displays the SW threads created priority \
		Stack size declared and Max stack used of \
		each SW thread for all PDs \
		+ + + + \
		/ / q6 ADSP Default Execute the service in ADSP processor \
		+ + + \
		CDSP Execute the service in CDSP processor \
		+ + + \
		SDSP Execute the service in SDSP processor \
		+ + + + \
		**Example tinfo service commands ** \
		tinfo service command that shows the Audio PD required threads data. \
		adb shell /data/sysMonApp tinfo getstack audio q6 ADSP \
		.lua \
		return E.left E.img src images/tinfogsaudio.png \
		tinfo service command that shows the Dynamic PD required threads data. \
		adb shell /data/sysMonApp tinfo getstack user q6 cdsp \
		.lua \
		return E.left E.img src images/tinfogsuser.png \
		**Software Thread Profiler service** \
		Software Thread Profiler STP is software thread level profiling feature which measures total cycles spent by a given \
		software thread and its timelines of UserPDs This feature helps to understand each software thread performance. \
		This feature also measures packets executed by each software thread This will help to get CPP of each thread and focus on \
		optimizations. \
		.User can execute both existing sysmon profiler and TLP in one go to correlate between overall statistics and thread wise data. \
		.User can profile desired threads by providing the SW thread name. \
		.Can profile across Q6 processors ADSP/SDSP/CDSP \
		.Configurable sampling period as low as 1milli second. \
		.Captures only active SW thread statistics \
		**Executing STP service command ** \
		Executes the STP with default values Make sure testcase is running at background. \
		adb shell \
		/data/sysMonApp tlp \
		STP service argument list \
		+ + + + \
		** Arguments ** **Value** **Description** \
		+ + + + \
		/ / samplingPeriod Optional Sampling Period in milli seconds This is the time \
		Default 50 interval at which SW thread profile stats will be \
		collected \
		+ + + + \
		/ / profile 0 Execute only STP \
		Default \
		+ + + \
		1 Execute the sysmon profiler in parallel \
		+ + + + \
		/ / tname Optional User can provide desired SW thread names \
		case sensitive which will provide the profiling \
		info of those threads alone The thread names \
		should be separated by Comma Name should exactly \
		match with the SW thread name created \
		+ + + + \
		/ / q6 ADSP Default Execute the service in ADSP processor \
		+ + + \
		CDSP Execute the service in CDSP processor \
		+ + + \
		SDSP Execute the service in SDSP processor \
		+ + + + \
		**Command to pull the output files from device using ADB ** \
		If profiled without profiler option \
		adb pull /sdcard/sysmontlp_sdsp.bin or sysmontlp_adsp.bin or sysmontlp_cdsp.bin \
		.Output file name is appended with selected qdsp6 \
		If profiled with profiler option profile 1 \
		adb pull /sdcard/sysmontlp_adsp.bin or sysmontlp_sdsp.bin or sysmontlp_cdsp.bin \
		adb pull /sdcard/sysmon.bin default name for adsp or sysmon_sdsp.bin or sysmon_cdsp.bin \
		.Output file name is appended with selected qdsp6. \
		**Post processing the bins collected ** \
		If profiled without profiler option \
		SysmonParser.exe tlp sysmontlp_sdsp.bin \
		.It generate sysmontlp_sdsp.xls sheet \
		If profiled with profiler option profile 1 \
		SysmonParser.exe sysmon_sdsp.bin output file user tlp sysmontlp_sdsp.bin \
		.It generate output file .xls sheet That has the profiler data and STP data. \
		**Results ** \
		Summary sheet \
		.lua \
		return E.left E.img src images/tlp_Summary.png \
		Post processed sheet \
		.lua \
		return E.left E.img src images/tlpPostProcessed.png \
		**ETM Trace and dll output service** \
		This service is used to enable the ETM to trace the Text and Data memory Also provides the info about the dynamic/dll modules \
		loaded. \
		**dll/dynamic modules Output ** \
		This service provides the info of the dynamic modules loaded Below is the information dispalyed for each dynamic module \
		.ELF_NAME Name of the dyanamic module loaded. \
		.LOAD_ADDRESS Physical Address where the dyanmci module is loaded. \
		.LOAD_TIMESTAMP TimeStamp when the dynamic modules is loaded. \
		.UNLOAD_TIMESTAMP TimeStamp when the dynamic module is unloaded. \
		**Executing dll/dynamic modules output command ** \
		adb shell \
		/data/sysMonApp etmTrace command dll \
		**etm Output ** \
		This service is used to enable the ETM and trace the text and data memory Using this user can trace text memory PC data memory \
		and both There are two modes cycle accurate and cycle coarse modes which can be selected while tracing the text and data memory. \
		Cycle accurate mode is selected if user wants to know the number of Q6 cycles consumed for each packet Cycle coarse mode is selected \
		if user is more interested to know the code flow Below are the various combinations that user can select if the the command is etm. \
		**Executing etm output command ** \
		adb shell \
		/data/sysMonApp etmTrace command etm \
		etm service argument list \
		+ + + + \
		** Arguments ** **Value** **Description** \
		+ + + + \
		/ / etmType Optional Trace Text memory and Data Memory \
		Default \
		pc_mem \
		+ + + \
		pc Trace only Text Memory \
		+ + + \
		mem Trace only Data Memory \
		+ + + \
		pc_mem Trace Text memory and Data Memory \
		+ + + \
		cc_pc Trace only Text Memory with Cycle Coarse Mode \
		+ + + \
		cc_mem Trace only Data Memory with Cycle Coarse Mode \
		+ + + \
		cc_pc_mem Trace Text and Data memory with Cycle Coarse Mode \
		+ + + \
		ca_pc Trace only Text Memory with Cycle Accurate Mode \
		+ + + \
		ca_mem Trace only Data Memory with Cycle Accurate Mode \
		+ + + \
		ca_pc_mem Trace Text and Data memory with Cycle Accurate \
		Mode \
		+ + + + \
		adb shell \
		/data/sysMonApp etmTrace command etm etmType pc \
		/data/sysMonApp etmTrace command etm etmType ca_pc_mem \
		**NPU Profiler service** \
		This service can be used to profile services running on NPU to gather information like the \
		clocks voted for DDR read and write BW NPU Activity Stats like NPU active time Measured and \
		max inferences per second number of layesr and bus bandwidth metrics These profiling metrics \
		useful in measuring performance debugging performance related issues and in identifying possible \
		optimizations. \
		Cmd to execute profiler service \
		adb shell \
		/data/sysMonApp profiler q6 npu \
		npu profiler service argument list \
		+ + + + \
		** Arguments ** **Value** **Description** \
		+ + + + \
		/ / cdsp 1 Profiles the CDSP also in parallel If the user \
		executes testcase in CDSP and NPU one can profile \
		CDSP in parallel with NPU providing this option \
		+ + + + \
		**npu Profiler output files ** \
		sysMonApp npu profiler stores raw profiling data .bin files at /sdcard/ or /data/ \
		sysmon_npu.bin file is generated when NPU alone is profiled. \
		sysmon_cdsp_npu.bin file is generated when NPU and CDSP are profiled. \
		**Parsing bin files ** \
		NPU profiler bin files can be parsed using the parser This parser is placed at SDK_Version / \
		tools/utils/sysmon/parser_win_v2/HTMLParser Windows variant and SDK_Version /tools/utils/ \
		sysmon/parser_linux_v2/HTMLParser Linux variant The profiler report is generated in an HTML file. \
		sysmon_parser.exe input_file This will generatw the HTML file and postprocessed csv file \
		in a folder with data and time as name of the folder. \
		sysmon_parser.exe input_file outdir folder_name This will generatw the HTML file \
		and postprocessed csv file in folder \
		provider by user. \
		**Results ** \
		Summary sheet \
		.lua \
		return E.left E.img src images/NpuSummary.png \
		Graphical Representation \
		.lua \
		return E.left E.img src images/NPUGraph.png	",
	"id":66
}
idx.add(doc)
urls[66]='sysMonApp.html'
titles[66]="sysMonApp"

var doc = {
	"title": "Hexagon Trace Analyzer Tool",
	"body": " \
		Supported targets \
		SM8150 SM7150 SM6150 \
		Overview \
		Hexagon Trace Analyzer is a Software trace analysis tool It processes Hexagon ETM Embedded Trace Macrocell traces generated by the software running on the Compute DSP and derives the flow of each thread of the processor It is a valuable tool for giving insights into code execution and allows in depth analysis and optimization. \
		Hexagon Trace Analyzer requires ETM traces to be collected from the CDSP These traces are then parsed for the binaries that are loaded and post processed in order to present data in a meaningful manner The outputs of Hexagon Trace Analyzer include various .csv files that give per function per instruction and per section statistics It also generates flamegraphs which provide a graphical view of the execution tree. \
		Hexagon Trace Analyzer can be found in the SDK at the following location *SDK Root* /tools/debug/hexagon trace analyzer \
		**Note that this is an initial Alpha release of the tool.** \
		Prerequisites \
		Following are the prerequisites for using Hexagon Trace Analyzer \
		Hexagon Trace Analyzer executable found in Hexagon SDK at the path given above \
		Linux \
		Python 2.7 \
		sysMonApp from the SDK release in order to enable ETM tracing and getting the DLL load addresses which are required for parsing the data sysMonApp can be found here *SDK Root* tools/utils/sysmon/sysMonApp \
		adb drivers \
		Docker Running Hexagon Trace Analyzer does not strictly need Docker but Docker allows you to set up a consistent virtualized linux environment An example Dockerfile and configuration are included This includes the other tools required flamegraphs & catapult . \
		FlameGraph https //github.com/brendangregg/FlameGraph and Catapult https //github.com/catapult project/catapult are required for some visualization To get these without docker need to install the tools under the directory containing hexagon trace analyzer \
		.ccode \
		cd $ HEXAGON_SDK_ROOT /tools/debug/hexagon trace analyzer \
		Flamegraph \
		RUN wget https //github.com/brendangregg/FlameGraph/archive/master.zip \
		unzip master.zip \
		rm master.zip \
		mv FlameGraph master FlameGraph \
		Catapult \
		RUN wget https //github.com/catapult project/catapult/archive/master.zip \
		unzip master.zip x *.json *tracing/test_data/* \
		rm master.zip \
		mv catapult master catapult \
		Collecting ETM Logs \
		1 Push sysMonApp to device & obtain Root on device \
		pushd $ HEXAGON_SDK_ROOT /tools/utils/sysmon / \
		adb root / \
		adb push sysMonApp /data/sysMonApp / \
		adb shell chmod 777 /data/sysMonApp / \
		adb wait for device root \
		2 Echo internal values for disabling trace logs and STM and reset trace sinks \
		adb shell / echo 0 /sys/kernel/debug/tracing/events/enable/ / \
		adb shell / echo 0 /sys/bus/coresight/devices/coresight stm/enable_source/ / \
		adb shell / echo 1 /sys/bus/coresight/reset_source_sink/ / \
		adb shell / echo 1 /sys/bus/coresight/devices/coresight tmc etr/enable_sink/ \
		3 Enable CDSP ETM and Funnels \
		adb shell / echo 1 /sys/bus/coresight/devices/coresight turing etm0/enable_source/ \
		4 Enable SysMon to grab the dll lists \
		adb shell setprop vendor.fastrpc.process.attrs 1 \
		5 Enable trace collection i.e begin filling the trace buffer \
		adb shell /data/sysMonApp etmTrace / / command etm / / q6 CDSP / / etmType ca_pc \
		6 Run the use case you want to profile on target / \
		For example run the benchmark_v65 walkthrough script assuming the target is an SM8150 device / \
		$ HEXAGON_SDK_ROOT /examples/common/benchmark_v65/benchmark_v65_walkthrough.py T sm8150 / \
		For subsequent iterations you may want to simply run one of the examples on target For example / \
		adb shell /vendor/bin/benchmark o /data/local/benchmark.csv f fft P 0 L 10 l 10 s \
		7 Wait several seconds allowing the use case to run then pull trace from device / \
		adb shell / cat /dev/coresight tmc etr /data/trace.bin/ / \
		adb pull /data/trace.bin / \
		8 Collect DLL values / \
		adb shell /data/sysMonApp etmTrace / / command dll / / q6 CDSP / \
		This command will display the load offsets for each elf your use case depends on For example you should see output lines as follows / \
		data.ELF_NAME libbenchmark_skel.so / \
		data.LOAD_ADDRESS 0xe040c000 / \
		data.ELF_IDENTIFIER 0x00014000 / \
		data.LOAD_TIMESTAMP 0x1ea6b0def4 / \
		data.UNLOAD_TIMESTAMP 0x1ea726162d \
		9 Copy all relevant ELF or .so files listed by sysmon from the device or the build to trace location / \
		In the case of the benchmark_v65 example the only .so you will need are the .so for the benchmark project located under $ HEXAGON_SDK_ROOT /examples/common/benchmark_v65/hexagon_ReleaseG_dynamic_toolv83_v66/ship/libbenchmark_skel.so and fastrpc_shell_3 which can be retrieved from your device as follows \
		cd $ HEXAGON_SDK_ROOT /tools/debug/hexagon trace analyzer / \
		adb pull /vendor/dsp/cdsp/fastrpc_shell_3 \
		**Note ** The instructions listed in sections 1 5 are one time setup instructions However they need to be rerun every time the device is rebooted Therefore you may find it convenient to create a shell script to execute all these instructions at any time. \
		Configuring Hexagon Trace Analyzer \
		Once the logs are collected the appropriate configuration has to be specified to Hexagon Trace Analyzer using config.py config.py contains data regarding elf dlls load addresses and Q6 silicon target information You can get the DLLs elfs loaded on the system & their load offsets using sysMonApp as described above A sample config.py file is provided in the Hexagon Trace Analyzer folder *SDK Root* /tools/debug/hexagon trace analyzer/config.py \
		You can copy config.py from the Hexagon Trace Analyzer folder and modify according to use case important changes below \
		Include absolute path to each copied elf in the elflist in double quotes separated by commas \
		Include load address of each elf given by sysmon in elfoffset list separated by commas \
		**Sample config.py** \
		+ + \
		LLVM_TOOLS_PATH / $ HEXAGON_SDK_ROOT /tools/HEXAGON_Tools/8.3.02/Tools/bin// / \
		elfList [ / \
		/ / / /examples/common/benchmark_v65/hexagon_ReleaseG_dynamic_toolv83_v66/ship/libbenchmark_skel.so/ / \
		/ ./fastrpc_shell_3/ ] / \
		elfOffsets [ / \
		0xe040c000 / \
		0xe6f00000] / \
		0x08100000 / \
		0xe0407000] / \
		+ + \
		Parsing trace files using Hexagon Trace Analyzer \
		**To run Hexagon Trace Analyzer under Docker use**/ \
		docker build t hexagon_trace_analyzer_env / \
		docker run v /pkg/qct/software/hexagon /app/hexagon v $WORKSPACE/results /app/results hexagon_trace_analyzer_env /bin/bash c ./hexagon_trace_analyzer_env ./config.py ./results ./trace.bin \
		**To run Hexagon Trace Analyzer standalone without using docker use the following command.**/ \
		./hexagon trace analyzer ./config.py ./results ./trace.bin \
		If you run the Trace Analyzer standalone make sure first that you installed the catapult and flamegraph dependencies as shown above. \
		**Note ** The Trace Analyzer tool may take a few minutes to run until completion. \
		Hexagon Trace Analyzer Output \
		The output of Hexagon Trace Analyzer is placed into the results folder. \
		**Flamegraphs** \
		The Flamegraph output .svg files can be opened in any browser The global cycles flamegraph shows a visulation of each task and the functions called in the task the width of each bar is proportional to the number of cycles spent in that task/function and its children. \
		More information can be found here http //www.brendangregg.com/flamegraphs.html \
		**Note ** The current version of the Trace Analyzer interprets local assembly labels not preceded with .L as function entry points If you want to use the Trace Analyzer for code written in assembly we recommend preceding all your local labels with .L so that the catpult and flamegraph outputs do not show these labels. \
		.lua \
		return E.left E.img src images/flamegraph_global_cycles.png \
		**Catapult Output** \
		The catapult subdirectory holds the catpult charts These charts can be opened in a Chrome brower from the link chrome //tracing/ / \
		Catapult charts show the call trees across the hardware threads over time \
		.lua \
		return E.left E.img src images/catapult.png \
		**Excel Spreadsheets** \
		Detailed analysis of the number of cycles spent in each function and the packets in a function can be found in the perFunctionStats.xlsx and perPacketStats.xlsx files. \
		*Per Function Statistics* \
		.lua \
		return E.left E.img src images/perFunctionStats.png \
		*Per Packet Staistics* \
		.lua \
		return E.left E.img src images/perPacketStats.png	",
	"id":67
}
idx.add(doc)
urls[67]='hexagon_trace_analyzer_doc.html'
titles[67]="Hexagon Trace Analyzer Tool"

var doc = {
	"title": "Compute on HVX -  Examples",
	"body": " \
		Overview \
		This SDK contains several example image processing applications to demonstrate various aspects \
		of using the Hexagon DSP for computer vision The examples can serve more broadly for any \
		purpose of offloading compute applications to the Hexagon DSP The below table shows the suggested \
		tools and build flavors for supported processor versions. \
		Recommended processor/tools combinations \
		+ + + + + \
		Hexagon Version Example Targets Recommended Build Flavor Extensions appended to \
		Tools Version hexagon_Release_ or hexagon_Debug_ \
		for building simulation executables \
		and hexagon_Release_dynamic_ or \
		hexagon_Debug_dynamic_ for building \
		shared libraries for target HW \
		+ + + + + \
		V60 MSM8996 8.3.x toolv83_v60 \
		+ + + + + \
		V62 MSM8998 8.3.x toolv83_v62 \
		+ + + + + \
		V60 cDSP SDM660 8.3.x toolv83_v60 \
		+ + + + + \
		V65 cDSP SDM845 SDM670/710 8.3.x toolv83_v65 \
		+ + + + + \
		V66 cDSP SM8150 8.3.x toolv83_v66 \
		+ + + + + \
		List of Examples \
		Following is a list of optimized HVX examples that may be useful in computer vision applications and \
		other technologies \
		benchmark_v65 in $ HEXAGON_SDK_ROOT /examples/common Start here for SDM845 and later targets does not support earlier targets \
		Demonstrates multiple computational kernels for HVX \
		with command line options for configuring clocks image size etc. \
		Also demonstrates best practices for SDM845 cDSP applications described in the \
		[HVX overview] HVX/ArchitectureOverview.html See the benchmark_v65 example s readme.txt for more \
		information and instructions See also the benchmark_walkthrough.py and run_benchmark.cmd scripts for building \
		and running commands To debug benchmark_v65 example on hexagon simulator from commmand line please refer to [Debug benchmark_v65 on command line ] benchmark_v65_cmdline_debug.html . \
		To Debug benchmark_v65 example on simulator using eclipse please see [benchmark_v65 simulator debug] benchmark_v65_simulator_debug.html . \
		benchmark in $ HEXAGON_SDK_ROOT /examples/common Start here for SDM835 a.k.a MSM8998 \
		and SDM660 does not support SDM820/821 \
		Demonstrates multiple computational kernels for HVX \
		with command line options for configuring clocks image size etc. \
		Also demonstrates best practices for SDM835/SDM660 cDSP applications described in the \
		[HVX overview] HVX/ArchitectureOverview.html See the benchmark example s readme.txt for more \
		information and instructions See also the benchmark_walkthrough.py and run_benchmark.cmd scripts for building \
		and running commands. \
		[downscaleBy2] FastCV/Image Downscale.html Start here for MSM8996 \
		comprehensive example with full walkthrough This example is not being updated for best practices \
		beyond MSM8996 the benchmark examples above are the best starting points for newer targets . \
		[cornerApp] FastCV/cornerApp.html Walks through how to use DSP optimized \
		FastCV libraries. \
		bilateral_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/bilateral folder Intended for power benchmarking \
		this example filter offers command line options for image resolution frame rate and \
		desired clock votes Builds & runs following similar instructions as [downscaleBy2] \
		FastCV/Image Downscale.html This workload has been incorporated into benchmark for SDM660 and later targets . \
		epsilon_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/epsilon folder Intended for power benchmarking \
		this example filter offers command line options for image resolution frame rate and \
		desired clock votes Builds & runs following similar instructions as [downscaleBy2] \
		FastCV/Image Downscale.html This workload has been incorporated into benchmark for SDM660 and later targets . \
		conv3x3a16_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/conv3x3a16 folder This example filter offers command line options \
		for image resolution frame rate and desired clock votes Builds & runs following similar \
		instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		This workload has been incorporated into benchmark for SDM660 and later targets . \
		conv3x3a32_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/conv3x3a32 folder This example filter offers command line options \
		for image resolution frame rate and desired clock votes Builds & runs following similar \
		instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		dilate3x3_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/dilate3x3 folder This example filter offers command line options \
		for image resolution frame rate and desired clock votes Builds & runs following similar \
		instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		This workload has been incorporated into benchmark for SDM660 and later targets . \
		median3x3_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/median folder This example filter offers command line options \
		for image resolution frame rate and desired clock votes Builds & runs following similar \
		instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		sobel3x3_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/sobel folder This example filter offers command line options \
		for image resolution frame rate and desired clock votes Builds & runs following similar \
		instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		This workload has been incorporated into benchmark for SDM660 and later targets . \
		sigma3x3_v60 Only supported on targets with HVX Multi threaded version of existing example \
		in Hexagon Tools/8.3.x/Examples/HVX/sigma3x3 folder This example filter offers command line options \
		for image resolution frame rate and desired clock votes Builds & runs following similar \
		instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		[gaussian7x7] FastCV/Image Gaussian7x7.html Only supported on targets with HVX Builds & runs following \
		similar instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		This workload has been incorporated into benchmark for SDM660 and later targets . \
		dilate5x5_v60 Only supported on targets with HVX This example demonstrates a 5x5 image processing kernel \
		optimized for HVX Builds & runs following similar instructions as [downscaleBy2] FastCV/Image Downscale.html . \
		This workload has been incorporated into benchmark for SDM660 and later targets . \
		fast9 Only supported on targets with HVX This example demonstrates a corner detection algorithm \
		optimized for HVX It includes File IO Build and run with the included fast9_walkthrough.py file. \
		This workload has been incorporated into benchmark for SDM660 and later targets . \
		histogram Only supported on targets with HVX This example demonstrates a histogram algorithm \
		optimized for HVX It includes File IO Build and run with the included histogram_walkthrough.py file. \
		qmath_sample Only supported on targets with HVX This example demonstrates usage of the [qmath library] images/80 VB419 105_Qualcomm_Math_Library.pdf . \
		Qprintf_example Demonstrates the usage of the new [qprintf library] images/80 VB419 109_qprintf_Library.pdf . \
		qfxp_sample Demonstrates the usage of the new [fixed point conversion utility library] images/80 VB419 69_Qualcomm_Fixed_Point_Library.pdf Besides the library details there is a training guid available in the [Fixed point library training guide] images/80 VB419 107_qfxp_Library_Training.pdf \
		ubwc samples Please refer to [UBWC overview] ubwcdma/ubwcdma.html and [UBWC examples] ubwcdma/ubwcdma_examples.html for more details. \
		dma_blend \
		dma_memcpy \
		dma_sum_hvx \
		nn_graph_examples/tutorials Tutorials on using the Hexagon NN library to build and execute various simple graphs. \
		Note compute_examples_walkthrough.py at $ HEXAGON_SDK_ROOT /examples can be used to run above examples \
		Usage python compute_examples_walkthrough.py E ExampleName T Target \
		e.g python compute_examples_walkthrough.py E cornerApp T sdm845	",
	"id":68
}
idx.add(doc)
urls[68]='Examples_ComputeHVX.html'
titles[68]="Compute on HVX -  Examples"

var doc = {
	"title": "Contact",
	"body": " \
		For Hexagon SDK questions or feedback please visit the Hexagon DSP developer \
		network \
		http //developer.qualcomm.com/hexagon forum \
		To register for updates and errata \
		https //developer.qualcomm.com/hexagon updates	",
	"id":69
}
idx.add(doc)
urls[69]='Support_Contact.html'
titles[69]="Contact"

var doc = {
	"title": "HLOS support",
	"body": " \
		This version of Hexagon SDK supports Android and certain versions of Linux distributions Yocto and Linaro . \
		Android is supported by variants starting with Android eg Android_Debug and Linux is supported by variants starting with Ubuntu eg Ubuntu_Debug The binaries executables and libs are provided for \
		both HLOSes. \
		Please note that the cross compilation tools for Linux are not provided with the Hexagon SDK You need to download these separately and install them under SDK_ROOT /tools/linaro If you do this then you will be \
		able to build Ubuntu variants for the examples The examples are tested with gcc linaro 4.9. \
		Steps to build 64 bit ubuntu binaries on Windows \
		Please download gcc linaro 4.9 2014.11 i686 mingw32_aarch64 linux gnu from http //releases.linaro.org/archive/14.11/components/toolchain/binaries/aarch64 linux gnu \
		Extract the tar file and copy folder gcc linaro 4.9 2014.11 i686 mingw32_aarch64 linux gnu to Hexagon_SDK_ROOT /tools/ folder. \
		Rename gcc linaro 4.9 2014.11 i686 mingw32_aarch64 linux gnu folder to linaro64 and try building with make tree V UbuntuARM_Debug_aarch64. \
		Steps to build 32 bit ubuntu binaries on Windows \
		Please download gcc linaro 4.9 2014.11 i686 mingw32_arm linux gnueabihf.tar.xz from https //releases.linaro.org/archive/14.11/components/toolchain/binaries/arm linux gnueabihf/ \
		Extract the tar file and copy folder gcc linaro 4.9 2014.11 i686 mingw32_arm linux gnueabihf to Hexagon_SDK_ROOT /tools/ folder. \
		Rename gcc linaro 4.9 2014.11 i686 mingw32_arm linux gnueabihf folder to linaro and try building with make tree V UbuntuARM_Debug. \
		Steps to build 64 bit ubuntu binaries on Linux \
		Please download gcc linaro 4.9 2014.11 x86_64_aarch64 linux gnu.tar.xz from http //releases.linaro.org/archive/14.11/components/toolchain/binaries/aarch64 linux gnu \
		Extract the tar file and copy folder gcc linaro 4.9 2014.11 x86_64_aarch64 linux gnu to Hexagon_SDK_ROOT /tools/ folder. \
		Rename gcc linaro 4.9 2014.11 x86_64_aarch64 linux gnu folder to linaro64 and try building with make tree V UbuntuARM_Debug_aarch64. \
		Steps to build 32 bit ubuntu binaries on Linux \
		Please download gcc linaro 4.9 2014.11 x86_64_arm linux gnueabi.tar.xz from http //releases.linaro.org/archive/14.11/components/toolchain/binaries/arm linux gnueabi \
		Extract the tar file and copy folder gcc linaro 4.9 2014.11 x86_64_arm linux gnueabi to Hexagon_SDK_ROOT /tools/ folder. \
		Rename gcc linaro 4.9 2014.11 x86_64_arm linux gnueabi folder to linaro and try building with make tree V UbuntuARM_Debug. \
		Debugging errors \
		If you get a below error while building \
		.lua \
		return E.left E.img src images/linaro_dll_missing.png \
		Download libwinpthread 1.dll from http //www.dll4free.com/libwinpthread 1.dll.html and add the local path of this dll into your SYSTEM PATH and try again.	",
	"id":70
}
idx.add(doc)
urls[70]='Platforms_HLOS.html'
titles[70]="HLOS support"

var doc = {
	"title": "Eclipse IDE FAQ",
	"body": " \
		While specifying the plug in archive location during installation why does the error duplicate repository appear? \
		In the Install Software dialog box navigate to Available Software Sites and remove the \
		previously specified repositories which point to the same archive location Then re perform \
		the steps for installing the plug in archive. \
		Why can t Eclipse detect plug in dependencies while installing plug ins from the archive? \
		There are three possible reasons for this \
		The system does not have a working internet connection to contact the relevant software sites. \
		The Eclipse Indigo repository checkbox is not selected in Available Software Sites for installation If this is the case select the checkbox for this repository and retry the installation. \
		The Contact all update sites during install to find required software checkbox is not selected If this is the case select the checkbox and retry the installation. \
		After installing the Hexagon Eclipse plug ins why does Hexagon Project not appear as an option under the File New menu command? \
		Choose Open Perspective from the Window command and select Hexagon C/C++ Perspective then try the \
		command File New again to see if the Hexagon project option now appears. \
		The File menu will now contain the Hexagon Project option. \
		Why do errors appear in the C/C++ editor even though the code looks OK? \
		There are three possible reasons for this \
		The text strings for the project name workspace name or SDK root may contain space characters Remove any spaces that appear in these strings and try again. \
		Indexing of the project may not have occurred properly To fix this right click on the project and choose Index Rebuild . \
		The Hexagon specific compiler intrinsics e.g. __builtin_Q6A2_swiz are not recognized by the C/C++ editor and thus flagged with errors Such errors will not appear in future releases of the Hexagon IDE please ignore them for now. \
		Why does the build log state No such file or directory even though the file is available and accessible to a newly created template project? \
		A possible reason for this error could be the presence of space characters in the text strings specifying \
		the project path or Hexagon SDK Root location Remove any spaces that appear in these strings and try again. \
		Why does the menu item Build Project appear grayed out when I right click on a project? \
		This is a problem with Eclipse To enable the menu item press the F5 key to refresh the project. \
		Why do I get build errors in a project after integrating a library? \
		This can happen if the pathname of the integrated library is incorrect \
		Check if you integrated the library using the same configuration it was built with For example if a library is built using the Release configuration you cannot integrate the library using the Debug configuration. \
		Check the linker settings for the executable project to see if the library that was integrated is actually present. \
		Why do I get an error while launching the Hexagon GDB debugger? \
		If the system path does not include the location of the Hexagon tools you may experience problems launching hexagon gdb from the IDE. \
		If this happens restart the IDE using the command All Programs Hexagon SDK Launch IDE then try launching hexagon gdb again. \
		While debugging or running a project why aren t certain views visible Console Registers Memory Disassembly ? \
		Choose Show View from the Window menu and select the required view If the view you want is not listed select \
		Other and then choose it from there. \
		When right clicking on an Elite project or Unit Test Executable project why is the menu option Integrate Library not visible? \
		This happens when any invalid projects exist in the workspace Projects can sometimes enter an \
		invalid state after an unsuccessful project deletion or when any of the project files get corrupted To \
		overcome this issue open the workspace in the file explorer because invalid projects may not appear in \
		Project Explorer and then remove any invalid projects from the workspace. \
		When using the Integrate Library wizard why are some projects not listed even though they are in the workspace? \
		The Integrate Library feature can only integrate static libraries into an Elite project or unit test \
		executable project Thus only static library projects are visible in the wizard. \
		When trying to start the debugger why do I get the error IDE taking too long to connect ? \
		This happens when the application cannot attach to the debugger because the debug port is already being used. \
		This can be resolved by changing the port number Make sure that the ports in the application code match what is specified in the IDE configuration. \
		Why does the debugger not break immediately after the required Debugger line in a script? \
		Switch to the Debug perspective and then try starting the debug session again. \
		Why does an Elite application stop with the error Unhandled error attempt to concatenate a nil value ? \
		An Elite application may stop after generating the following error output \
		.ccode \
		Unhandled error llua_vminit.lua 12 attempt to concatenate a nil value \
		stack traceback \
		llua_vminit.lua 12 in main chunk \
		tail call ? \
		[C] in function xpcall \
		[string _preamble ] 9 in main chunk \
		[C] ? \
		If this occurs set the environment variable HEXAGON_SDK_ROOT by running the command file setup_sdk_env.cmd . \
		Why does Hexagon tools fails to execute or launch in IDE? \
		If the System PATH variable is not proper then hexagon tools fails to execute or launch. \
		Eg. If PATH variable has two or more semi colons as a de limiter to the paths. \
		Why launching run/debug RTOS project fails? \
		If the project was created with default tools path and the environmental variable PATH has both 7./* and 5./* tools path then while launching QuRT will pick dll which it finds first maybe 7./* and hence it may fail. \
		How to refresh debug view s ex Registers view Disassembly view if it is not refreshing automatically? \
		Refresh button for the debug views can be enabled as follows Window menu Customize Perspective Command Groups Availability tab Select Debug Update Modes check box Click on OK button \
		A new refresh icon will appear in all the debug views ex Registers view Disassembly view Memory view etc and this button can be used to refresh the view. \
		Note You will have to restart eclipse for the change to take place. \
		Why does running Android NDK project say Error Program arm linux androideabi gcc not found in PATH? \
		The android tools root might not be present at the path specified during the creation of project One of the reason for this can be updating the Hexagon SDK. \
		Right click on the project Properties \
		A new window Properties for project_name opens select C/C++ Build Environment \
		Under the table Environment variables to set Select ANDRIOD_TOOLS_ROOT Click Edit and verify if the above path exists \
		If the path does not exist provide the new android ndk path which is present at HEXAGON_SDK_ROOT /tools/android ndk version \
		Build happened successfully but why is the executable not seen under the project in project explorer? \
		A possible reason for this is that the newly generated executable was not read properly by the project Try refreshing the project by Right click on Project Click Refresh. \
		Why does importing a Hexagon project fail with the error Invalid Project Description ? \
		The project files might be corrupted and hence this error might occur Another reason could be that the workspace location Ex C /Users/Dummy/calculator might be same as the project location Ex C /Users/Dummy/calculator the workspace location and project location must be different. \
		Audio \
		Unable to launch Generic view no data for this module with selected indices \
		While doing real time calibration of an audio module which is a part of COPP \
		topology if an error is encountered as shown in the attachment it s because \
		of a spurious topology created in COPP chain This is an extra topology created \
		along with normal topology which can be used for real time audio calibration. \
		To do RTAC of custom module in the topology RTC view go to audio use case \
		running and click on the drop down tab to select the second topology when the \
		audio playback session is in progress After that RTC of custom module should \
		be possible.	",
	"id":71
}
idx.add(doc)
urls[71]='FAQ_Hexagon%20IDE.html'
titles[71]="Eclipse IDE FAQ"

var doc = {
	"title": "Signing",
	"body": " \
		Introduction \
		Starting in the SM8150 family **signature free dynamic module offload** is \
		enabled on cDSP This allows signature free dynamic shared objects to be offloaded \
		to cDSP in a low rights process Unsigned PD Please see [Unsigned PD] \
		Unsigned PD for further details For use cases that require resources or \
		privileges unavailable in the Unsigned PD or for compatibility with legacy \
		targets please see the information on the code signing utilities and processes below. \
		Signing is a mechanism of adding cryptographic signature into aDSP [dynamic \
		modules] APIs_Dynamic%20Loading.html that can later be verified by the \
		loader Dynamic modules can be signed for debug devices using [TestSigs] TestSigs \
		or for production devices using [Production Sigs] Production Signing . \
		**elfsigner** is command line utility used to generate digital signatures for \
		aDSP dynamic shared objects and to generate test signatures TestSigs for \
		facilitating development Dynamic shared objects are required to be digitally \
		signed and then authenticated at runtime before they are allowed to be loaded \
		and executed. \
		**elfsigner** comes configured with a test private key and root certificate \
		which provides for generating signatures for dynamic modules that will be run \
		on a device configured with the same test root certificate For devices that are \
		not configured as test devices like commercial production devices follow \
		the instructions in [Production Signing] Production Signing . \
		Unsigned PD \
		Starting in the SM8150 family clients can request to offload signature free dynamic shared \
		objects to cDSP The signature free dynamic shared object will be able to run inside the \
		Unsigned PD on the cDSP. \
		Unsigned PD is a sandboxed low rights process that allows the signature free modules to \
		run on the cDSP In the event of a compromise access to full system functionality and data \
		is prevented by the sandbox Unsigned PDs are designed to support general compute applications \
		and have limited access to underlying drivers Please see the services available in the \
		Unsigned PD and the limitations below The available / unavailable services in the Unsigned PD \
		may change in the future based on continuing security reviews. \
		Unsigned PD available services \
		Thread creation and thread services \
		Timer creation and timer services \
		HVX contexts \
		Clock frequency controls \
		VTCM \
		Cache operations \
		Map HLOS memory allocated by corresponding HLOS application \
		Unsigned PD limitations \
		Access to limited drivers \
		i.e UBWC/DMA and Camera Streamer are not available to Unsigned PDs \
		Thread priorities limited to pre defined range \
		Request signature free offload \
		To request signature free dynamic module offload clients will have to make the request as follows \
		pragma weak remote_session_control \
		if remote_session_control \
		struct remote_rpc_control_unsigned_module data \
		data.enable 1 \
		data.domain CDSP_DOMAIN_ID \
		remote_session_control DSPRPC_CONTROL_UNSIGNED_MODULE void* &data sizeof data \
		This request should be made before calling any other FastRPC function. \
		A success from the remote_session_control function allows the clients to offload the dynamic shared object to cDSP without signing. \
		TestSigs \
		A TestSig is a special type of dynamic shared object that when properly \
		installed on a device enables that device for development use by overriding \
		the authentication requirement of other dynamic shared objects This \
		eliminates the need for signing individual shared objects allowing for faster \
		development cycles. \
		The TestSig is a shared object named testsig XXXXXXXX.so which contains a \
		serial number corresponding to the specific device which it will be installed on. \
		It must be signed by **elfsigner** with a command line option that passes the \
		device serial number to the TestSig. \
		Installing a TestSig is easier using the script [testsig.py] Tools_Scripts.html \
		provided with the SDK Also note that this installation needs to be done only once \
		on the device. \
		Using elfsigner \
		Dependencies \
		The elfsigner utility is implemented as a set of Python scripts and as such \
		requires that Python version 2.7 or above is installed on the host computer Additional \
		dependencies include \
		Windows 7 32 bit or 64 bit or higher For Windows Users \
		OpenSSL 1.0.1g for Linux or later version For Linux Users \
		The tool uses the system temporary folder as scratch space to create intermediate \
		output Make sure that the tool has permission to write to the location %temp% This \
		is an environment variable in windows and to /tmp location in Linux. \
		Before calling ELFSigner ensure the SDK s dependencies are properly setup. \
		The installer should have done this for you If you encounter issues please see \
		[Dependencies] Dependencies_Common.html . \
		Calling ELFSigner requires that the local environment be setup To do this first [setup] readme.html the sdk environment. \
		Command line usage \
		ELFSigner is located at \
		/tools/elfsigner/elfsigner.py \
		There are two basic command line forms for invoking **elfsigner** \
		python elfsigner.py t SERIALNUM o [OUTPUTDIR] \
		. \
		SERIALNUM is a 32 bit device serial number in hex form 0xabcd0123 \
		In this form a TestSig is generated and written to the OUTPUTDIR directory No \
		files are specified on the command line The output filename is generated by \
		concatenating testsig with the serial number value in hexadecimal followed \
		by the extension .so . \
		For example using t 0xaf0123 will create a file named testsig 0xaf0123.so. \
		python elfsigner.py i INFILE o [OUTDIR] \
		. \
		INFILE is the pathname of an ELF format shared object file to be signed. \
		OUTDIR specifies the output folder s pathname of the signed output file. \
		In this form **elfsigner** produces a signed ELF file from an unsigned input file. \
		A single file may be signed at each invocation In its simplest form OUTFILE \
		may be omitted in which case the signed output file is written to the current \
		directory using the same name as the input file If there is a naming conflict \
		where the input file would be overwritten by the output file then the output \
		file will be named * input_filename_base *_signed.so. \
		Options \
		. \
		For help with elfsigner options and usage please type \
		python elfsigner.py h \
		Commonly used options are \
		* ** testsig SERIALNUM or t SERIALNUM ** \
		Generate a test signature tied to a device with the specified serial \
		number The serial number is a 32 bit number expressed in hexadecimal \
		such as 0x10203040 \
		The device serial number can be obtained by running the tool **getserial** \
		from an adb shell See section [[Obtaining Device Serial Number]] below. \
		* ** version ** \
		Display the version number and exit. \
		* ** help or h ** \
		Display a help message and exit. \
		Usage Examples \
		python elfsigner.py help \
		Displays a help screen and exits \
		python elfsigner.py version \
		Displays the version number and exits. \
		python elfsigner.py testsig 0xabcdef01 \
		Creates a TestSig in the current directory with the name testsig 0xabcdef01.so \
		containing a serial number of 0xabcdef01. \
		python elfsigner.py i dynmod.so o signed/ \
		Signs the input file dynmod.so writes the signed output file to ./signed/dynmod.so \
		python elfsigner.py i input/dynmod.so o signed/ \
		This command signs the input file ./input/dynmod.so and writes the signed \
		output file to ./signed/dynmod.so \
		Obtaining Device Serial Number \
		Android \
		Use the command line Android application **getserial** to discover the serial number of your \
		device This utility is located in the *elfsigner* folder of the Hexagon& 8482 \
		SDK To obtain the serial number from commad line the device needs to be connected to the host PC to run adb commands. \
		Please refer the documentation [connect to device] Debugging_Connect to Device.html for details. \
		Usage of getserial is shown below. \
		Flash the **getserial** application to the device via **adb** \
		adb push local_path /getserial /data/getserial \
		Set the execute bit on the application \
		adb shell chmod 755 /data/getserial \
		Execute the application to retrieve the serial number \
		adb shell /data/getserial \
		The above command returns the serial number of the attached device \
		Serial number see below \
		. \
		Serial Num 0x13eb80 \
		. \
		Serial number see above \
		Alternatively **GetSerial** a GUI based android application can also be used to retrieve the device s serial number. \
		This application is also located in the *elfsigner* folder. \
		Connect the device to your host PC and run the following command \
		.ccode \
		Hexagon SDK Dir /tools/elfsigner adb install getserial.apk \
		1631 KB/s 2464266 bytes in 1.475s \
		pkg /data/local/tmp/getserial.apk \
		Success \
		**GetSerial** can be directly run from your device s GUI The connection to the host PC is not required while running the GUI based application. \
		Windows Phone \
		Use the Windows application **getserial.exe** to discover the serial number of your device This utility is located in the *elfsigner* folder of the Hexagon& 8482 \
		SDK This has been validated for SM8180 device Find below the steps to run getserial. \
		Find **MAC Address** of device and connect to the device Open the Tshell window in admin command prompt. \
		Get CimInstance Win32_PnPEntity where caption match USB EEM .pnpDeviceID \
		The above command will produce an output like  USB/VID_045E&PID_064D/00117F04BD6F The mac address of the device is 00117F04BD6F . \
		Connect to the device using the above mac address Enter the command open device mac address .  \
		open device 00117F04BD6F \
		Push *getserial.exe* application to the device via TShell Create a new directory or use an existing temporary directory to push getserial onto the device We are creating a new directory to push the file. \
		mkdird getserial \
		cdd getserial \
		putd HEXAGON_SDK_ROOT /tools/elfsigner/getserial/WinARM_Release_aarch64/getserial.exe . \
		Push **libcdsprpc.dll** into the device Go to the directory C /windows/system32/driverstore/filerepository/ on the device and search for adsprpc directory having the name in the format qcadsprpc target .inf_arm64_ identifier . \
		eg qcadsprpc target .inf_arm64_2c86f0ffd7cac0ee \
		Once you reach the adsprpc directory push the dll into the same location where you pushed getserial.exe . \
		copyd windows/system32/driverstore/filerepository/qcadsprpc target .inf_arm64_ identifier /libcdsprpc.dll C /getserial \
		Execute the application to retrieve the serial number \
		cmdd getserial \
		The above command returns the serial number of the attached device \
		.pre \
		Serial number see below \
		Serial Num 0x77b6ae61 \
		Serial number see above \
		Installing the TestSig on Device \
		TestSigs after being generated with the correct device serial number \
		should be loaded into the root of the remote file system or other location as \
		specified by the environment variable ADSP_LIBRARY_PATH See the \
		[Remote File System] remote_file_system.html section for more information . \
		The TestSig produced by **elfsigner** will be named testsig 0xXXXXX where \
		XXXXX is the serial number specified on the command line. \
		Signature test mode is latched This means that after reboot test signatures \
		are validated only once on the first call to load a dynamic object Therefore \
		after you copy the test signature to the device its a good idea to reboot the \
		device so it gets recognized. \
		Installation Example \
		In this example the device serial number is 0x12345 and the previously \
		generated TestSig is named testsig 0x12345.so The environment variable \
		ADSP_LIBRARY_PATH is set to ADSP_LIBRARY_PATH /data/adsp . \
		Android \
		. \
		Use **adb** to push the TestSig onto the device \
		adb push testsig 0x12345.so /data/adsp/testsig 0x12345.so \
		Windows Phone \
		. \
		Use **TShell** to push Testsig onto the device \
		putd testsig 0x12345.so C /Windows/system32/drivers/Driverdata/qualcomm/fastrpc \
		Walk through \
		On Android \
		First discover your device s serial number The below steps will print out \
		the device serial number Example 0x12345678 \
		adb push Hexagon SDK Dir /tools/elfsigner/getserial/android_Release/getserial /data/ \
		adb shell chmod 777 /data/getserial \
		adb shell /data/getserial \
		Next generate a test signature based on that serial number and push it \
		to the device The test signature is discovered on boot so a reboot is required. \
		cd Hexagon SDK Dir \
		setup SDK environment \
		python Hexagon SDK Dir /tools/elfsigner/elfsigner.py t 0x serial number \
		adb push output/testsig 0x serial number .so /system/lib/rfsa/adsp/ \
		adb reboot \
		adb wait for device \
		The above steps are captured in the following script \
		Hexagon SDK Dir /scripts/testsig.py \
		On Windows Phone \
		Use TShell to run the commands First discover your device s serial number The below steps will print out \
		the device serial number Example 0x12345678 \
		Get CimInstance Win32_PnPEntity where caption match USB EEM .pnpDeviceID \
		open device  MAC_Address \
		mkdird getserial \
		cdd getserial \
		putd HEXAGON_SDK_ROOT /tools/elfsigner/getserial/WinARM_Release_aarch64/getserial.exe . \
		copyd windows/system32/driverstore/filerepository/qcadsprpc target .inf_arm64_ identifier /libcdsprpc.dll C /getserial \
		cmdd getserial \
		Next generate a test signature based on that serial number and push it to the device. \
		cd Hexagon SDK Dir \
		setup SDK environment \
		python Hexagon SDK Dir /tools/elfsigner/elfsigner.py t 0x serial number \
		putd testsig 0x serial number .so C /Windows/system32/drivers/Driverdata/qualcomm/fastrpc \
		Reboot the phone The test signature is discovered on boot so a reboot is required. \
		Production Signing \
		Signatures generated using the elfsigner from the SDK allow SDK users to prototype \
		and test their software on debug devices such as DragonBoards However these \
		testsigs and signed .so files would not authenticate successfully on production \
		devices such as OEM phones and tablets. \
		To enable a .so to be successfully deployed on production devices across \
		a large number of OEM devices the dynamic module needs to be production signed by \
		the OEM ISVs are encouraged to work with their OEM POCs to have the modules production \
		signed for OEM devices.	",
	"id":72
}
idx.add(doc)
urls[72]='Tools_Signing.html'
titles[72]="Signing"

var doc = {
	"title": "Connecting to the Device",
	"body": " \
		To establish the connection between Device and host PC USB drivers are needed to be installed on host PC. \
		Once the connection is established adb drivers are needed to communicate with the device. \
		Installation of USB drivers and adb driver is needed for \
		Getting the logs using mini dm \
		Collection of crash dumps from Dragonboards \
		Running walk through scripts \
		The following steps will help in establishing the connection and communicating with the device from your host PC \
		USB Driver Installation \
		For Windows \
		USB drivers can be installed by running Setup.exe in tools/debug/usb directory \
		After successful installation of USB drivers Running the [com_finder.py] Tools_Scripts.html com_finder.py script gives the port number that the device is attached to as following. \
		Qualcomm HS USB Com ports found \
		COM6 \
		If the drivers are not installed successfully com_finder.py script output looks like as following \
		No comm port found for Qualcomm HS USB Device \
		Note If you get the above error after installing the USB drivers please uninstall and reinstall the drivers If the error persists i.e if you are not able to see the device attached to the comm port please post a query in [Qualcomm Developer Network forum] Support_Contact.html with all the details. \
		For Linux \
		On your Linux PC you can use lsusb command to check if the device is actually connected You may have to setup udev rules correctly to have the access to the USB device. \
		Please refer to the documentation present here http //manpages.ubuntu.com/manpages/utopic/man7/udev.7.html to know how to setup udev rules on Linux. \
		$ lsusb \
		. \
		Bus 001 Device 006 ID 05c6 90db Qualcomm Inc. \
		ADB/Fastboot Installation \
		The Android Debug Bridge adb tool is required to load run and debug programs on the device Adb is not provided as part of this SDK To find out more information and how to obtain ADB please refer to [Google s adb documentation] https //developer.android.com/studio/command line/adb \
		Once these tools are installed please make sure that they are accessible from anywhere by having them in windows PATH. \
		Checking if everything is OK \
		After the installation of adb you can check if they are working by running adb devices You should see something like this \
		adb devices \
		. \
		List of devices attached \
		68070104 device \
		You can check if you have your device setup correctly by running calculator example from SDK following the instructions from [here] calculator_android.html \
		If you are facing any issues with any of the above steps or have issues connecting to the device please post your queries in [Qualcomm Developer Network forum] Support_Contact.html .	",
	"id":73
}
idx.add(doc)
urls[73]='Debugging_Connect%20to%20Device.html'
titles[73]="Connecting to the Device"

var doc = {
	"title": "How to link libstdc++ with Android executable",
	"body": " \
		Linking libstdc++ dynamically is not supported on Android P builds with Hexagon SDK This will be fixed in next SDK release. \
		Please link libstdc++ statically in android.min of your example as follows as workaround. \
		application_name _LIBS + Hexagon_SDK_Location /tools/android ndk r14b/platforms/android 21/arch arm/usr/lib/libstdc++.a \
		e.g calculator_LIBS + C /Qualcomm/Hexagon_SDK/3.4.1/tools/android ndk r14b/platforms/android 21/arch arm/usr/lib/libstdc++.a	",
	"id":74
}
idx.add(doc)
urls[74]='libstdc%2B%2B.html'
titles[74]="How to link libstdc++ with Android executable"

var doc = {
	"title": "Qaic User's Guide",
	"body": " \
		Introduction \
		qaic Qaic s Another Idl Compiler is a command line executable used \
		to implement *remote shared objects* for the aDSP Platform A shared \
		object is called *remote* if its methods can be invoked from outside \
		the *domain* it resides in A domain may be the operating system s \
		kernel a user process a mobile device or a programming language. \
		In each case the user of a remote object does not need to know *where* \
		the object is hosted or what language the object is implemented in. \
		Instead the user calls methods on a *stub* object generated by qaic . \
		The stub marshals the input into a shared wire format and ships the \
		data off to the domain where the object is hosted The host domain \
		implements a *skel* object also generated by qaic that unmarshals \
		the data and invokes the requested method on the native object. \
		TODO new smark s msc is broke comment out for now \
		.msc \
		User Stub Wire Skel Object \
		User Stub [ label IEx_DoWork 23 ] \
		Stub Wire [ label Marshal ] \
		Wire Skel [ label Unmarshal ] \
		Skel Object [ label IEx_DoWork 23 ] \
		Object Skel [ label return 42 ] \
		Skel Wire [ label Marshal ] \
		Wire Stub [ label Unmarshal ] \
		Stub User [ label return 42 ] \
		To generate stubs and skels qaic requires the interface to an object be \
		strictly defined The syntax for defining an object interface is called IDL. \
		qaic compiles IDL files into headers stubs and skels The generated header \
		can be used to implement the native object and for users to call methods on the object. \
		The stub skel and compiled into a shared object. \
		The first part of this document discusses how to run and use the \
		compiler including details of the various command line options The second \
		part of this document covers the details of how IDL is mapped to the supported \
		implementations. \
		Using the compiler \
		Command line usage \
		The basic command line syntax of the tool is \
		qaic [options] file1.idl [file2.idl fileN.idl] \
		Each file specified on the command line will be compiled by the tool according \
		to the options specified Available options are \
		* mdll or map dll \
		Generate DLL mapping \
		* o PATH \
		Use path as the output path All generated files will be output to the \
		specified path The default is the current directory . \
		* cpp or p CPP \
		Use CPP as the C preprocessor The value CPP must name an executable \
		program and cannot contain any arguments To pass arguments to the \
		preprocessor use arg cpp pa . \
		* arg cpp ARG or pa ARG \
		Pass additional argument arg to the preprocessor To specify arguments \
		that are themselves options use the form pa ARG for \
		example pa E Specifying pa E will cause the E to \
		be interpreted as an option to qaic instead of to the preprocessor. \
		Note that for [[Comment pass through]] to work \
		properly the preprocessor must be set to not strip comments from the \
		source Typically the flag to do this is C making the appropriate \
		argument to qaic pa C . \
		* include path PATH or I PATH \
		Include path in the search path for included files May be used multiple times. \
		* indent WIDTH or i WIDTH \
		Use an indentation width of width spaces in the generated code. \
		* warn undefined or Wu \
		Issue warning for forward declared interfaces that are never defined. \
		* define SYMBOL or D SYMBOL \
		Predefine macro for the preprocessor. \
		* header only or ho \
		Only generate a header Stub and skeleton code is not generated if this option \
		is specified. \
		* remoting only or ro \
		Only generate stub and skeleton code The corresponding header is not generated \
		if this option is specified. \
		* parse only or s \
		Parse the IDL and perform semantic checking but do not generate any \
		output Note that IDL files accepted without errors by the compiler \
		with s are not guaranteed to work without errors when code \
		generation is enabled. \
		* v \
		Print the version of the compiler. \
		* h \
		Print a brief help message. \
		Usage examples \
		The examples below illustrate typical usage of the IDL compiler. \
		qaic header only foo.idl bar.idl \
		The above command compiles foo.idl to the remote header file foo.h and \
		bar.idl to the remote header file bar.h No remoting code is generated. \
		qaic foo.idl \
		The above command compiles foo.idl to a remote header file foo.h \
		along with the following remoting code \
		+ + + \
		File Name Description \
		+ + + \
		foo_stub.c C stub implementation \
		+ + + \
		foo_skel.c C skeleton implementation \
		+ + + \
		qaic I /bar I /far o out foo.idl \
		The above command compiles foo.idl It uses /bar and /far \
		as the search path for any include files It uses out as the \
		result directory and generates out/foo.h out/foo_stub.c and \
		out/foo_skel.c files. \
		Using other preprocessors \
		By default qaic uses an internal preprocessor It may be desirable to \
		use a different preprocessor instead The Microsoft C preprocessor can \
		be used by having the compiler invoke cl /E /C which is done with the \
		following command line Note that for this to work cl must be in the PATH . \
		qaic p cl pa /E pa /C file1.idl [file2.idl fileN.idl] \
		The ARM C/C++ compiler can also be used to preprocess IDL Provided \
		armcc is in the PATH this can be done with the following command line. \
		qaic p armcc pa E pa C file1.idl [file2.idl fileN.idl] \
		Note that pa E must be used instead of pa E since in the latter \
		case the E is interpreted by qaic as being an option to qaic \
		not to the preprocessor. \
		Error messages \
		Any output printed by the compiler is due to either an error or a warning. \
		Warnings include the text warning at the beginning of the message \
		and do not abort code generation Any message not preceded by warning \
		is an error which causes compilation to abort Both errors and warnings \
		include a reference to the file line and position within that line \
		starting at 0 where the error or warning occurred. \
		Additional details on select errors are given in the following subsections. \
		Identifier abc clashes with an introduced type \
		The [OMG IDL specification] http //www.omg.org/cgi bin/doc?formal/08 01 04.pdf \
		includes complex scoping rules based not only \
		on where types are defined but also on where they are used Specifically \
		the first component identifier of a qualified type name is introduced into \
		the scope where it is used preventing the use of any identifier with the \
		same name in that scope Fully qualified names which start with are \
		considered to have an empty first component and thus result in no type \
		introduction. \
		Consider the following example which illustrates the basic type introduction \
		rules For full details see the Names and Scoping section of OMG IDL \
		Syntax & Semantics. \
		.idlcode \
		struct Name \
		string first last \
		struct Address \
		string street city state country \
		module M \
		typedef long Age \
		struct Person \
		Name name // invalid IDL name clashes with Name \
		string address // OK Address not introduced in this scope \
		M Age age // OK only M not Age is introduced \
		In the Person structure above the use of the Name type introduces it into \
		the scope of Person which prevents the member from being called name The \
		second member address is fine because the Address type is not defined \
		within the scope of Person and has not been introduced The reference to \
		M Age only causes the first component M to be introduced into the \
		scope of Person thus the age member is also without error. \
		Clashes with introduced types can generally be resolved by changing the \
		qualification to avoid the type introduction For instance if in the \
		above example the type of the name member of the Person structure were \
		written Name no type introduction would occur which would avoid the \
		name clash. \
		Comment pass through \
		When qaic identifies code comments as a [[Doxygen comments]] \
		or ordinary comments Doxygen comments are passed through to generated \
		header files When documenting interface methods Doxygen comments are \
		generally preferred. \
		Doxygen comments \
		When a method is documented with the Doxygen syntax qaic will attempt \
		to translate the documentation to the target language in any output files. \
		Include directives and code generation \
		Many IDL files include other IDL files in order to make use of types and \
		interfaces declared externally For example when defining a Component \
		Services interface in IDL AEEIQI.idl needs to be included for the \
		definition of IQI from which all CS interfaces must derive However \
		one important difference between include in IDL and include \
		in C/C++ is that in IDL code is not generated for modules interfaces \
		and types included from other IDL files For example consider the \
		following IDL \
		.idlcode \
		interface foo /* definition of foo here */ \
		interface bar foo /* definition of bar here */ \
		If this IDL is compiled the output will contain the appropriate code for \
		both foo and bar However suppose the foo definition is moved to \
		foo.idl and the IDL being compiled is changed as follows \
		.idlcode \
		include foo.idl \
		interface bar foo /* definition of bar here */ \
		In this case only code for bar will be generated Although the contents \
		of foo.idl are read by the compiler no code is generated for foo \
		because it is defined in an external included IDL file Instead of \
		generating code for foo the compiler will translate the include \
		in the IDL to a include in the output with the extension changed \
		from .idl to .h . \
		Remote header generation \
		Remote headers are generated to resemble hand written C headers For each interface \
		name in IDL for each function name in IDL functions are generated in C in the \
		following format \
		.ccode \
		int interface _ function arg1 arg2 argN	",
	"id":75
}
idx.add(doc)
urls[75]='qaic_users_guide.html'
titles[75]="Qaic User's Guide"

var doc = {
	"title": "Simulator support",
	"body": " \
		The Hexagon Toolset that gets installed as part of Hexagon SDK gives complete support of simulating applications on stand alone DSP using hexagon sim. \
		The simulator in conjuction with hexagon lldb provides a way to debug the applications that are executed on the simulator. \
		For more information please go through the Hexagon tools user guide in the tools installation directory \
		default location for Windows Hexagon_SDK_DIR /tools/HEXAGON_Tools/ Version /Documents \
		default location for Linux Hexagon_SDK_DIR /tools/Hexagon_Tools/ Version /Documents \
		Overview \
		The Hexagon SDK provides a framework that enables unit testing of created modules. \
		The tests are referred to as Quality Tests qtests and are specified like any \
		other target in a project s makefile They are automatically run as part of \
		the build process to complete the build/test development process The tests \
		themselves are compiled into Hexagon binaries and run via the Hexagon simulator. \
		Currently qtests are only meant to be run on the Hexagon simulator not \
		on target. \
		Enabling Simulator test \
		Each of the provided examples contains its own qtest. \
		The makefile specifies that a qtest should be built and executed as follows \
		BUILD_QEXES + appi_passthru_q \
		. \
		appi_passthru_q_C_SRCS src/appi_passthru_test \
		appi_passthru_q_LIBS test_main test_util test_appi appi_passthru \
		In this example passthru s qtest is named appi_passthru_q its source \
		file is src/appi_passthru_test.c it links in the main util and \
		appi support libraries and appi_passthru the pp module itself. \
		Support libraries \
		The Hexagon SDK provides unit test support libraries For detailed information \
		see the header and sources files contained in the /test directory. \
		test_main \
		. \
		This library forms the root of the binary executable by exporting main . \
		Main is called by the Hexagon simulator when the executable is started. \
		test_main s main function in turn calls the symbol test_main_start . \
		This symbol must be exported by the module s specific qtest source files For \
		more information see [[Test sources]] All qtests must link in test_main. \
		test_util \
		. \
		This library provides support for the qtest environment This includes \
		features such as memory allocation debug message support [VTCM manager] \
		VTCM Manager.html [L2 cache locking manager] L2 Cache Locking.html and \
		performance measurement. \
		Test sources \
		The test source file must export a function named test_main_start This \
		function forms the root of the test execution It is called when the test is \
		started and must return zero if the test passed and non zero if it failed. \
		The signature of test_main_start is as follows \
		int test_main_start int argc char **argv \
		All examples in this Hexagon SDK contain a xxx_test.c source file Refer to those \
		files for detailed information. \
		Test execution \
		Upon successful compilation of the module the qtest is built into a \
		Hexagon simulator executable This file is then passed to the Hexagon simulator \
		for execution This process is inherent in [make.d] Environments_Build System.html and is \
		performed automatically. \
		In the event of a test failure the build will fail and display the output of \
		the failing test. \
		To enable more detailed information for the make process including the output \
		of a successful test run set VERBOSE 1 on the make line. \
		For example \
		make tree VERBOSE 1 \
		On completion of the test if buffers where processed they will be saved to an \
		output file located in the modules code data /code folder This file is an \
		audio file and can be compared against the input file also located in the \
		code /data /code folder. \
		Advanced Profiling on Simulator \
		Below is the procedure to peroform simulation with timing enabled Benchmark_v65 \
		example is used for reference Please note that advanced profiling takes longer time \
		to execute. \
		Use the option timing with the simulator command hexagon sim . \
		%HEXAGON_SDK_ROOT%/tools/HEXAGON_Tools/8.3/Tools/bin/hexagon sim timing simulated_returnval usefs hexagon_Debug_dynamic_toolv83_v65 pmu_statsfile hexagon_Debug_dynamic_toolv83_v65/pmu_stats.txt cosim_file hexagon_Debug_dynamic_toolv83_v65/q6ss.cfg l2tcm_base 0xd800 rtos hexagon_Debug_dynamic_toolv83_v65/osam.cfg %HEXAGON_SDK_ROOT%/libs/common/qurt//computev65/sdksim_bin/runelf.pbn %HEXAGON_SDK_ROOT%/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv83_v65/run_main_on_hexagon_sim benchmark_q.so f epsilon w 256 h 64 \
		To generate detailed statistics beyond the basic cycle count we should time filter around \
		the function of interest and examine the statistics files. \
		Note that the output text contains a measurement of when the function of interest is being \
		executed such as the following \
		.ccode \
		To apply timefilter to profiling results add this to simulation cmd line dsp_clock 800 timefilter_ns 163194356 163454357 \
		Copy and paste the / timefilter_ns 163194356 163454357 into the command line and re run \
		to generate the statistics with time filtering applied. \
		%HEXAGON_SDK_ROOT%/tools/HEXAGON_Tools/8.3/Tools/bin/hexagon sim mv65 timing timefilter_ns 163194356 163454357 simulated_returnval usefs hexagon_Debug_dynamic_toolv83_v65 pmu_statsfile hexagon_Debug_dynamic_toolv83_v65/pmu_stats.txt cosim_file hexagon_Debug_dynamic_toolv83_v65/q6ss.cfg l2tcm_base 0xd800 rtos hexagon_Debug_dynamic_toolv83_v65/osam.cfg %HEXAGON_SDK_ROOT%/libs/common/qurt//computev65/sdksim_bin/runelf.pbn %HEXAGON_SDK_ROOT%/libs/common/run_main_on_hexagon/ship/hexagon_Debug_dynamic_toolv83_v65/run_main_on_hexagon_sim benchmark_q.so f epsilon w256 h 64 \
		Find the resulting pmu_statsfile.txt in the working directory Descriptions of the fields \
		of pmu_statsfile.txt are found in appendix A.3 of \
		[Hexagon Simulator User Guide] Tools_Hexagon Tools 8.3.html . \
		To narrow down to the instruction level where various stalls found in pmu_statsfile.txt \
		are occurring in the code you may use the trace options documented in 3.2.5 of \
		[Hexagon Simulator User Guide] Tools_Hexagon Tools 8.3.html . \
		There are also advanced simulation profiling examples including new tools proftool and pmustats_spreadsheet \
		at Tools Location /Examples/Profiling.	",
	"id":76
}
idx.add(doc)
urls[76]='Platforms_Simulator.html'
titles[76]="Simulator support"

var doc = {
	"title": "Compute off-load application",
	"body": " \
		Overview \
		The Hexagon IDE can be used to develop build run and debug the [compute off load application] APIs_FastRPC.html projects on target. \
		The IDE requires the following two projects for developing a compute off load application \
		Android NDK project for stub and application \
		Hexagon library project for skel \
		The following diagram shows the flow of the projects used for compute off load applications in IDE. \
		Android \
		Application \
		+ + \
		Application \
		Android calls \
		Project . .+ Stub \
		Stub + \
		+ . Library \
		+ \
		Stub \
		calls \
		Skel \
		Hexagon Skel + \
		Library . . Library \
		Project \
		The Android project generates the Android appplication which invokes the stub library The stub library invokes the skel library on Hexagon using fast RPC. \
		On running the Android application project the required files are installed on target and the libraries are placed in their destination locations. \
		The IDE automatically generates the file testsig.so for the attached target The file testsig.so is also pushed on to the target. \
		For details on running the Calculator example on target see [Target Debugging] eclipse_target_debug.html .	",
	"id":77
}
idx.add(doc)
urls[77]='eclipse_compute_offload_application.html'
titles[77]="Compute off-load application"

var doc = {
	"title": "Working with an SDK Example",
	"body": " \
		Overview of a typical example in the SDK \
		The Hexagon SDK contains examples projects which are intended to serve as \
		templates and starting points for your own projects \
		There are two sets of examples in the SDK \
		/examples Documentation for these examples can be found under the Examples section in the \
		sidebar to the left. \
		/tools/HEXAGON_Tools/8.x.xx/Examples Documentation for these are found in the README file in the respective folders. \
		Contents of an example folder \
		The contents of the examples are organized into the following directories and \
		files \
		example \
		/glue autogenerated build system files that contain project specific build \
		rules dependencies and definitions These files will normally not need \
		modification but if adding new dependencies they will need to be \
		modified by hand. \
		/inc header files that the example wants to make public to other projects \
		/src source and include files local to the example \
		all.mak use to build all variants [./Environments_Build System.html Variants] of the project \
		makefile tells the build system what to build for more information refer \
		[here] ./Environments_Build System.html \
		Cloning an Example \
		All the examples in the Hexagon SDK can be cloned to create a new project. \
		Cloning consists of copying an existing example and renaming it to a new name. \
		This is a good first place to start when developing a new project. \
		To clone a project please run the script \
		Hexagon SDK Dir /tools/scripts/clone_project.py \
		Example to clone the calculator example \
		python ./tools/scripts/clone_project.py ./examples/common/calculator custom_calculator \
		Note \
		Projects that use the Hexagon SDK must remain within the Hexagon SDK tree and \
		cloned projects may only be cloned into the same directory as the original. \
		For example if cloning the calculator example the new cloned calculator example \
		will also reside in /examples/common/ . \
		Building an example in SDK \
		[Building a make.d project] Environments_Build System.html Building a make.d \
		project provides information on how to build the Hexagon SDK examples and how \
		to interpret and modify \
		the makefiles. \
		The Hexagon SDK installer should have setup all the dependencies for you If \
		you encounter issues please see [Dependencies] Dependencies_Common.html . \
		To build a shared object the build variation must end with the _dynamic option \
		For example \
		make tree V hexagon_Debug_dynamic_toolv82_v65 \
		Building Examples Outside of SDK directory \
		SDK examples can be built without any dependancy on SDK directory structure. \
		You can create your example at any location and build by just setting the SDK environment \
		Steps to build your example that is located out of SDK directory \
		cd to Example_Location \
		run SDK_INSTALL_LOCATION /setup_sdk_env script For more info read [Setup Instructions] readme.html \
		build example using make tree V variant	",
	"id":78
}
idx.add(doc)
urls[78]='WorkingWithExamples.html'
titles[78]="Working with an SDK Example"

var doc = {
	"title": "﻿InstallAnywhere",
	"body": " \
		Overview \
		To generate the installer for the Hexagon SDK InstallAnywhere is used The following sections provide details of installation/uninstallation and troubleshooting the issues during installation. \
		Installer Modes \
		InstallAnywhere installers can run in three different modes \
		Graphical user interface GUI — GUI mode renders an installer with wizard panels and dialog boxes. \
		Console — Also known as command line interface console mode installers can perform remote installations over telnet or on systems without a graphical windowing environment. \
		Silent — Silent installers do not interact with end users They are suitable for distribution when all of the settings are already known or they are provided in a response file installer.properties . \
		Be Default Installers are configured in GUI mode To trigger installer in other modes use i option with installer as following. \
		To trigger a silent installer from the command line type the following command \
		installer.exe i silent \
		To trigger a silent installer from the command line type the following command \
		installer.exe i console \
		Uninstalling the Hexagon SDK \
		InstallAnywhere doesn t use the system registry for storing the installation/uninstallation details The uninstallation of Hexagon SDK can be done by the following method \
		Run the following programs \
		Windows All Programs Hexagon SDK version Uninstall \
		Ubuntu HOME /Uninstall Hexagon_SDK version \
		If you need to update or repair an existing version of installed SDK the installer provides repair option when it is run in GUI mode. \
		Product Registry \
		The product registry is essentially a product configuration database that keeps track of features and components of products InstallAnywhere uses this registy file to determine whether an instance has already been installed or not Manage Instances dialog box opens when an end user launches the installer for a product that has already been installed \
		Product registry location \
		Windows C /Program Files/Zero G Registry/.com.zerog.registry.xml \
		UNIX based If logged in as root the global registry is located in /var. \
		If logged in as a user it is located in the user’s home directory. \
		Troubleshooting Issues with Installers \
		Installation process generates lax xxxxx out.txt stdout and lax xxxxx err.txt stderr log files in system temp directory you can use these files to troubleshoot your installation. \
		The system temp directories for Windows 7 is generally C /Users/ username /AppData/Local/Temp and for Ubuntu /tmp lax xxxxx err.txt in these directories generally has the logs while installation is progressing Once installation is complete log file gets stored at SDK_ROOT /tools/installer_logs/Qualcomm_Hexagon_SDK_ vesrion _Install_ date_time .log \
		Toolchain is missing during SDK installation \
		This is because Tools installer is not launched due to insufficient space in system temp directory Installer uses temp directory to extract jvm bundled with it and all other temporary files If system temp directory does not have enough space installer exits with a message Temp directory does not have enough space Make sure that system temp directory has enough space before triggering installation. \
		Java.lang.OutOfMemoryError GC overhead limit exceeded \
		This exception is thrown by the garbage collector in the underlying jvm when it is spending way too much time collecting garbage This error essentially means that you need to add more memory or reconfigure your garbage collection arguments You can increase the heap size by passing argument jvmxmx with installer \
		For example to set the maximum JVM heap size to 512 megabytes enter the following \
		install.exe jvmxmx 512m \
		An error occurred while trying to manage the selected instance \
		This is due to the corrupted registry file Product registry file contains product components and its locations While trying to manage selected instance installer reads the registry file and tries to find the all components in their respective paths If it fails to find these components in their respective paths installer throws this error Deleting the corrupted registry file solves this issue. \
		CreateProcess error 5 Access is denied \
		This is due to User Account Control Settings that is not allowing the process to run To fix these Access denied errors you must need to change user account control settings as following \
		Open User Account Control Settings by clicking the Start button and then clicking Control Panel In the search box type uac and then click Change User Account Control settings move the slider to the Never notify position and then click OK Now you should be able to run the exe without any error \
		java.lang.IllegalArgumentException Malformed /uxxxx encoding \
		This error can be resolved by setting PS1 environment variable to as follows \
		export PS1 \
		For Linux intallers WARNING /tmp does not have enough disk space! \
		If you are trying to install on Linux and you see the above error it means that the /tmp directory does not have enough space Clean up the directory using rm rf /tmp/* and try running the installer again. \
		Installer exit codes \
		By default an installation process returns zero 0 to the environment if it was successful and a nonzero value if it was not. \
		The following describes the possible exit codes that may be returned during an installation and their description. \
		Code Description \
		. \
		0 Success \
		1 The installation completed successfully but one or more \
		of the actions from the installation sequence caused a \
		warning or a non fatal error. \
		1 One or more of the actions from the installation sequence \
		caused a fatal error. \
		1000 The installation was canceled by the end user. \
		1001 The installation includes an invalid command line option. \
		2001 The installation failed the authorization check may indicate \
		an expired version. \
		2002 The installation failed a rules check A rule placed on the \
		installer itself failed. \
		2003 An unresolved dependency in silent mode caused the installer \
		to exit. \
		2004 The installation failed because not enough disk space was \
		detected during the execution of the Install action. \
		2005 The installation failed while trying to install on a 64 bit \
		Windows system but installation did not include support for \
		64 bit Windows systems. \
		2006 The installation failed because it was launched in a UI mode \
		that is not supported by this installer. \
		2009 Indicates that the user attempted to launch multiple instances \
		of an installer at the same time even though the installer was \
		configured to prevent multiple launches \
		5000 Modification of existing instance failed because the instance \
		has not been uninstalled properly or because the product registry \
		has been corrupted. \
		7000 The installation was rolled back due to a fatal exception. \
		8000 The upgrade was canceled because a newer version of the product \
		is already installed on the target system. \
		8001 The end user canceled the upgrade. \
		8002 The upgrade exited because the earlier version of the product \
		could not be successfully uninstalled.	",
	"id":79
}
idx.add(doc)
urls[79]='InstallAnywhere.html'
titles[79]="﻿InstallAnywhere"

var doc = {
	"title": "sysMon DSP Profiler",
	"body": " \
		Overview \
		sysMon DSP Profiler is an Android UI application for profiling ADSP work load This UI app uses FastRPC to \
		communicate with SysMon service running on ADSP for profiling activities The Android application can be \
		used to profile services running on ADSP to gather information like the clocks voted for resource usage \
		load distribution across available hardware threads load on processor bus bandwidth metrics and various \
		other profiling metrics useful in measuring performance debugging performance related issues and in \
		identifying possible optimizations This document captures steps to setup and use sysMon DSP Profiler and \
		ways to analyze the captured profiling data. \
		Supported chipsets \
		8952 8976 8937 8953 8996 8998 \
		Setup \
		Install **sysMon_DSP_Profiler.apk** file from SDK_DIR /tools/utils/sysmon/ SDK directory on the device \
		connected to the host machine by running following ADB command. \
		adb install sysMon_DSP_Profiler.apk \
		After successful installation **sysMon DSP Profiler** app can be found in the android App drawer as \
		highlighted in the below screenshot. \
		.lua \
		return E.left E.img src images/hp_app_drawer.png \
		OPTIONAL To be done if an error pops up on opening **sysMon DSP Profiler** app from the app drawer On some \
		builds /dsp/ partition is not accessible from **sysMon DSP Profiler** app which may result in such errors To \
		allow **sysMon DSP Profiler** UI app to access libsysmon_skel.so part of /dsp/ partition execute following \
		adb commands as a work around \
		adb root \
		adb remount \
		adb shell cp /dsp/libsysmon_skel.so /system/lib/rfsa/adsp/ \
		Using sysMon DSP Profiler \
		Following screenshot captures the main **sysMon DSP Profiler** application screen from where user can start stop \
		or clear ADSP profiling data. \
		.lua \
		return E.left E.img src images/hp_main_screen.png \
		sysMon DSP Profiler UI provides user flexibility to choose from 2 different modes of profiling \
		DCVS Mode option checked \
		A fixed set of performance metrics will be monitored at sampling periods controlled \
		by ADSP SysMon service either 1 or 50 milli seconds and user cannot override the same. \
		ADSP DCVS if supported and enabled logic will be active for the profiling duration and \
		can adjust ADSP core and bus clocks dynamically. \
		DCVS Mode option un checked \
		With DCVS Mode option un checked user can provide a desired sampling rate in multiples of \
		one milli second Profiler generates a packet at the end of every sampling rate window with \
		the performance metrics captured in the window ADSP DCVS if supported will be disabled \
		during profiling in this mode. \
		Once appropriate DCVS mode is selected and sampling period configured user can start profiling ADSP \
		for a desired use case by pressing **START** button. \
		Following screenshot captures sysMon DSP Profiler UI when started with DCVS Mode option unchecked and 1 milli second \
		sampling period. \
		.lua \
		return E.left E.img src images/hp_ui_dcvs_uncheck.png \
		Following screenshot captures sysMon DSP Profiler UI when started with DCVS Mode option checked. \
		.lua \
		return E.left E.img src images/hp_ui_dcvs_check.png \
		Performance metrics captured are post processed and published on UI continuously with a refresh rate \
		of one second The sysMon DSP Profiler UI publishes average and maximum values of the following performance \
		metrics on its UI \
		+ + + \
		**Metric** **Description** \
		+ + + \
		Core clock MHz ADSP core clock in MHz \
		+ + + \
		Bus clock vote MHz Bus clock vote from ADSP in MHz \
		+ + + \
		Core Utilization % Percentage of Q6 load with respect to ADSP core clock \
		Effective Q6 load / core clock * 100 \
		+ + + \
		1 Thread Active % Percentage of time ADSP core is running in single threaded mode \
		with respect to effective Q6 load \
		+ + + \
		MPPS Number of packets executed by ADSP core in millions per seconds \
		+ + + \
		pCPP Processor cycles per packet Effective Q6 load / Packets executed \
		+ + + \
		HVX Thread MPPS On HVX coprocessor supported chipsets packets executed on HVX \
		coprocessor in millions per second \
		+ + + \
		Read BW MBps Memory read bandwidth in MBytes per second \
		+ + + \
		Write BW MBps Memory write bandwidth in MBytes per second \
		+ + + \
		Total stall cycles MCps Total cycles per second the core is waiting on Instruction/Data \
		unit accesses \
		+ + + \
		Detailed analysis timeline plots and more metrics captured in user mode is also possible with sysMon DSP \
		Profiler saving the raw profiling data captured as a bin file on the device at /sdcard/sysmon.bin \
		location Once done with profiling this binary file can be extracted from the device and post processed \
		on a host machine using parser executable for detailed analysis. \
		Once started User can stop profiling by pressing **STOP** button on the UI and metrics published on UI \
		will remain visible till user presses **START** button again User can also generate a detailed post processed \
		sheet by extracting the /sdcard/sysmon.bin file from the device During profiling **CLEAR** button can be \
		used to clear the data collected till that point of time which will reset the UI statistics and \
		also restarts the raw profiling data /sdcard/sysmon.bin capture. \
		Stats collection \
		sysMon DSP Profiler stores raw profiling data at /sdcard/sysmon.bin location on device Once the user \
		is done profiling **STOP** button pressed the file can be pulled from the device and post processed \
		using sysmon parser on a host machine Windows/Linux . \
		Command to pull the profiler output file from device using ADB \
		adb pull /sdcard/sysmon.bin destination directory / filename.bin \
		Post processing \
		Post processing executable can be found at SDK_DIR /tools/utils/sysmon/parser_ linux/win / \
		SysmonParser.exe Input file name .bin Output file name ModeType Windows \
		SysmonParser Input file name .bin Output file name ModeType Linux \
		+ + + + + \
		**Parameter** **Property** **Value** **Description** \
		+ + + + + \
		Input file name Required Path to the profiler output bin file \
		including the file name with extension \
		extracted from the target \
		+ + + + + \
		Output file name Required Desired output file path including the \
		filename without extension \
		+ + + + + \
		ModeType Required default If Default mode option checked \
		+ + + \
		user If Default mode option is un checked \
		+ + + + + \
		**Example commands ** \
		SysmonParser sysmon.bin SysmonProfStat default \
		SysmonParser.exe sysmon.bin SysmonProfStat user \
		SysmonParser c /temp/sysmon.bin c /temp/SysmonProfStat user \
		Post processing script output file \
		Output of **SysmonParser** is an excel sheet saved with the name provided in Output file name argument The excel \
		sheet consists of below worksheets \
		Summary sheet \
		This work sheet will have the **AVG** **MAX** and **MIN** of all the metrics captured during profiling The overall statistics \
		are grouped under core bus L1 L2 and HVX metrics This is named as **Overall summary**. \
		Apart from publishing **Overall summary** the parser also detects ADSP core power collapse entry and exit and \
		assumes samples between power collapse exit to entry as one test case and displays the summary of each test case. \
		Under **Customized Data** user can enter the desired start and end row from **PostProcessed** sheet to generate \
		summary for the selected rows. \
		.lua \
		return E.left E.img src images/hp_sample_summary_sheet.png \
		PostProcessed sheet \
		This work sheet will have the post processed data of each PMU event at sampling period configured by user. \
		Apart from the post processed PMU events this sheet also captures NPA clock votes ADSPPM static votes DCVS votes \
		for ADSP core and bus clocks in each profiling window Also captured are heap statistics of GuestOS and UserPDs . \
		.lua \
		return E.left E.img src images/hp_sample_postprocessed_sheet.png \
		Analyzing profiling data \
		Summary sheet \
		Overall summary section and individual test sections of this sheet helps in understanding the use case performance \
		using the published metrics like MPPS pCPP AXI read and write bandwidths clock votes etc. \
		**MPPS Million packets per second ** \
		This metric captures the work done by the core for the given use case Average MPPS of real time use case is \
		constant independent of core clock Increase in MPPS for non real time use case for a given clock indicates \
		effective utilization of L1 and L2 cache. \
		**HVX Thread MPPS Million packets per second ** \
		This metric publishes the packets executed by HVX co processor in ADSP MPPS metrics captures both scalar core \
		and HVX core packets The MPPS executed on the scalar Q6 core can be calculated using \
		Q6 scalar MPPS MPPS HVX Thread MPPS \
		**Effective Q6 frequency MHz ** \
		This metric captures the actual load on the processor for the given work Ratio of effective Q6 frequency and \
		NPA core clock frequency can be used to get Q6 usage. \
		Q6 usage percentage Effective Q6 frequency / NPA core clock * 100 \
		The Q6 usage percentage approaching 100 indicates need for ADSP core to run at higher frequency to avoid any \
		glitches or frame drops MPPS and pCPP metrics together can be used to decide if the ADSP core clock vote or \
		bus clock vote has to be adjusted in this case. \
		**pCPP Processor cycles per packet ** \
		pCPP metric captures the average processor cycles taken per packet Lower the pCPP factor more is the work \
		done in ADSP for a given core clock frequency Core stalls due to bus accesses can result in a higher pCPP \
		factor Increasing the bus clock vote or prefetching data memory prior to actual usage can help in lowering \
		this factor and hence increasing the work done for a given core clock frequency. \
		**IU stall frequency MHz ** \
		IU stall frequency is derived from measured cycles that the core has stalled on instruction unit cache \
		accesses due to demand misses Higher the IU stall frequency higher can be the pCPP factor. \
		**DU stall frequency MHz ** \
		DU stall frequency is derived from measured cycles that the core has stalled on accessing L1 Data cache lines \
		due to demand misses Higher the DU stall frequency higher can be the pCPP factor DMT Dynamic Multi Threading \
		uses DU stalls of stalled thread and schedules other threads for efficient utilization of core clock DU stall \
		frequency will not fully convey stall of entire processor. \
		**AXI cached read/write bandwidth MBps ** \
		This metric publishes the AXI bus bandwidth DDR accesses generated by read/write access from the core due \
		to a cache line miss in L2 This includes both demand and prefetch misses in L2 cache. \
		**L2 fetch bandwidth MBps ** \
		Bus bandwidth generated by L2fetch instruction to prefetch data into L2 cache. \
		**Clock votes MHz ** \
		Core clock captures core clock frequency that ADSP Q6 is running at. \
		Bus clock vote captures overall ADSP vote for bus clock in MHz. \
		The final bus clock frequency done outside of ADSP will be based on votes from other subsystems \
		Application processor Modem etc. as well. \
		**Static clock votes MHz ** \
		Aggregated static votes from all clients for core and bus clocks. \
		**DCVS clock votes MHz ** \
		DCVS vote for core and bus clocks. \
		Post processed sheet \
		This sheet captures PMU metrics along with clock votes and heap statistics per profiling window Data collected \
		in each sample is extrapolated to per second data and published here This sheet is especially useful in \
		understanding the instantaneous load on ADSP and also work load distribution in a time frame. \
		Example plot of **Effective Q6 frequency** metric over time from **PostProcessed** sheet \
		.lua \
		return E.left E.img src images/hp_effec_q6_plot.png \
		Example of **Q6 load** plotted along with **core clock frequency** and **pCPP** over time \
		.lua \
		return E.left E.img src images/hp_q6load_plot.png \
		Example plot of **AXI bandwidth** over time \
		.lua \
		return E.left E.img src images/hp_axi_plot.png \
		Example plot of **MPPS** and **pCPP** over time \
		.lua \
		return E.left E.img src images/hp_mpps_cpp_plot.png \
		Illustrations \
		The following sections explain ADSP clock votings with respect to usage for a periodic use case 30fps 33 milli seconds periodic \
		which implements a bilateral filter using HVX on a 1080p 1920 x 1080 resolution image The profiling data is captured using \
		sysMon DSP Profiler Android UI app with DCVS mode option un checked DCVS will remain disabled while profiling . \
		Gathering requirements \
		In order to understand ADSP core and bus utilization the use case is run with ADSP core clock and bus clock voting \
		for maximum possible MIPS and bandwidth The following screenshot is captured using sysMon DSP Profiler for this run \
		.lua \
		return E.left E.img src images/hp_ex_gathering_req.png \
		From the above data core utilization percentage is averaged at 49% at 825.6 MHz of ADSP core clock with 390.34 MPPS. \
		The bus read and write bandwidths combined average is around 130 MBps and core pCPP is 1.05 As the use case is \
		periodic and have a deterministic load pattern the MPPS load of 390.34 is what is required for this filter \
		implementation to run at 30fps The pCPP of 1.05 may increase if the bus clock is lowered due to increased memory \
		access latency. \
		For a given bus clock calculating Ideal ADSP core clock required for this use case \
		ADSP core clock required MPPS * pCPP * 100 / Intended duty cycle percentage \
		Duty cycle percentage for this use case can be 90% i.e. the active processor time required is around 30 milli seconds \
		for every 33 milli second frame If the timeline requirement is more stringent adjust the duty cycle requirement appropriately. \
		ADSP core clock required for this use case at a given bus clock 390.34 * 1.05 * 100 / 90 455 MHz \
		Bus clock vote combined with ADSP Core clock decides the pCPP factor Higher the bus clock lower will be the DDR access \
		latency and when combined with ideal ADSP core clock required to run the use case lower will be the pCPP. \
		ADSP core clock under voting scenario \
		In this run ADSP core clock vote was 200MHz resulting in a 297.6MHz ADSP core clock frequency. \
		.lua \
		return E.left E.img src images/hp_ex_undervoting.png \
		The core utilization percentage has jumped to 97% and measured MPPS is around 277 while the required MPPS is around 390. \
		As ADSP core is unable to keep up with the demand the frame deadline of 33 milli second was not met keeping the core active \
		all the time 97% So the 297.6MHz ADSP core clock is not sufficient for the use case and needs to be tuned This matches \
		with the estimation of 455 MHz requirement for the use case. \
		ADSP Core clock Over voting scenario \
		In this run ADSP core clock vote was 600MHz resulting in a 652.8MHz ADSP core clock frequency. \
		.lua \
		return E.left E.img src images/hp_ex_overvoting.png \
		ADSP core is not fully utilized at this clock plan as expected The average core utilization is around 62% at 652.8 MHz \
		ADSP core clock Overall MPPS requirement is met 390 as we are running at a higher clock than required With this data \
		it can be confirmed that the core clock vote in this case is high and can be lowered to 455MHz as originally calculated. \
		Typically higher clock frequency will result in higher power numbers measured for a given use case If the clocks can \
		be tuned to the ideal requirement there would be significant power savings. \
		ADSP core clock Ideal vote \
		In the following run ADSP core clock vote is for 455MHz resulting in a 480MHz clock frequency. \
		.lua \
		return E.left E.img src images/hp_ex_idealvoting.png \
		In this case the MPPS requirement is met 390 MPPS at 85% core utilization The core clock vote looks ideal for this \
		use case with a head room of around 70 MHz at 480 MHz. \
		The measured bus bandwidths can be used for bus bandwidth voting and can be further tuned to achieve expected pCPP and \
		ADSP core utilization for a given core clock.	",
	"id":80
}
idx.add(doc)
urls[80]='sysMon_DSP_Profiler.html'
titles[80]="sysMon DSP Profiler"

var doc = {
	"title": "﻿Using Eclipse to debug on Hexagon simulator",
	"body": " \
		Overview \
		Starting from 3.4.1 SDK all Qurt simulator tests are run with an utility called run_main_on_hexagon. \
		Qurt simulator tests are shared objects now instead of executables e.g benchmark_q.so instead of benchmark_q . \
		Because of this simulator tests are run only for dynamic variants e.g hexagon_Debug_dynamic_toolv82_v65 unlike for static variants in older SDKs. \
		Basically run_main_on_hexagon does dlopen of simulator test obtains the address of main using dlsym on shared object handle and calls main of simulator test. \
		For more details on how run_main_on_hexagon is implemented please refer to example source code Hexagon_SDK /examples/common/run_main_on_hexagonSrc. \
		With this new simulation framework simulator tests should not link rtld test_util atomic as these libs are built into run_main_on_hexagon now. \
		Starting from 3.4.1 all SDK examples are updated to adopt this new simulation framework If you are using any old project please make sure \
		your simulator test is not linking rtld test_util atomic. \
		If you need to link qurt libs to your simulator test you can just say simulator_test_name _OSTYPE QURT as below. \
		BUILD_QEXES + qurt_test \
		qurt_test_C_SRCS + src_app/qurt_test \
		qurt_test_OSTYPE QURT \
		simulator_test_name _OSTYPE QURT will take care of linking qurt libs needed for qurt based simulator test. \
		here is a simple snipit that shows how to run both a qurt and standalone qtest in the same project. \
		qurt based quality test \
		BUILD_QEXES + qurt_test \
		qurt_test_C_SRCS + src_app/qurt_test \
		qurt_test_OSTYPE QURT \
		qurt_test_PRIMORDIAL_STACK_SIZE 0x6000 \
		qurt_test_QEXE_ARGS foobar \
		qurt_test_QEXE_SIM_OPTIONS dsp_clock 1000 ahb lowaddr 0xc0000000 ahb highaddr 0xc0ffffff \
		standalone based quality test \
		BUILD_QEXES + standalone_test \
		standalone_test_C_SRCS + src_app/standalone_test \
		standalone_test_QEXE_ARGS foobar \
		standalone_test_QEXE_SIM_OPTIONS dsp_clock 1000 ahb lowaddr 0xc0000000 ahb highaddr 0xc0ffffff \
		This chapter describes how to use the IDE to debug an application on the simulator. \
		Note Debugging v62 application on simulator is no longer supported. \
		Debug v65/v66 application \
		[Debug v65 application using eclipse] benchmark_v65_simulator_debug.html describes how to debug a v65/v66 application on hexagon simulator using Hexagon IDE. \
		[Debug v65 application on command line ] benchmark_v65_cmdline_debug.html describes how to debug a v65/v66 application on hexagon simulator on command line.	",
	"id":81
}
idx.add(doc)
urls[81]='Debugging_Simulator.html'
titles[81]="﻿Using Eclipse to debug on Hexagon simulator"

var doc = {
	"title": "Hexagon Architecture",
	"body": " \
		[Hexagon V6x Programmer s Reference Manual] images/Hexagon_Document_Bundle.pdf page 8 \
		[Hexagon V5x Programmer s Reference Manual] images/Hexagon_Document_Bundle.pdf page 2178	",
	"id":82
}
idx.add(doc)
urls[82]='hexagon_architecture.html'
titles[82]="Hexagon Architecture"

var doc = {
	"title": "SDK 3.4 Feature Matrix",
	"body": " \
		.pre \
		Hexagon SDK Feature Matrix \
		Targets \
		SDM820 SDM835 SDM660 Notes \
		Operating System \
		AP LA/LE LA LA \
		DSP QuRT QuRT QuRT \
		DSPs Supported* \
		aDSP Yes v60 Yes v62 Yes v62 \
		cDSP No No Yes V60 \
		sDSP No No No \
		mDSP Yes* v55 Yes* v62 No APQ Variant Only \
		Language \
		C++ 98 Yes* Yes Yes SDM820 requires using Hexagon Tools 7.x \
		C++ 11/14 No Yes Yes 8.x tools are needed for C++ 11/14 support \
		Debugging \
		LLDB No Yes Yes* LLDB is supported only on cDSP for SDM660 \
		logcat Yes Yes Yes \
		printf No No No Please use runtime farf on targets not supporting printf. \
		LLDB user pd exception handler No No No \
		Profiling \
		Sysmon Yes Yes Yes Android APK to profiler all DSPs Captures clock votes eight default metrics and heap statistics \
		Configurable PMU metrics No No Yes User can select more metrics to get more PMU details but not all \
		HVX arch benchmarks No No Yes Runs different HVX kernels at different clock plans and presents HVX and RPC processing time \
		SysMonApp Command Line Interface Yes Yes Yes \
		Marker based Profiling No No No User can add markers in code to get performance of specific codemetrics \
		SW thread MPPS MCPS CPP No No No via CLI Gets software thread metrics \
		Clock settings No No No via CLI Ability to set QDSP6 bus clock and sleep latency vote \
		Thread list No No No via CLI Display list of all existing PDs and threads in each PD \
		FastRPC timelines No No No via CLI Display fastrpc timelines and correlates it with sysmon data \
		Features \
		HVX aDSP aDSP cDSP \
		DCVS DCVS v1 DCVS v2 DCVS v2 \
		CAPI v2 Yes Yes Yes \
		FastRPC Domains No Yes Yes \
		CPZ No aDSP cDSP \
		VTCM APIs No No No APIs for managing VTCM \
		Cache locking API v2* No No No Updated APIs for cache locking allowing better cache management \
		Libraries \
		fastCV Yes Yes Yes \
		dspCV Yes Yes Yes \
		qmath Yes Yes Yes \
		qfxp Yes Yes Yes \
		qprintf Yes Yes Yes \
		asyncdspq No No No \
		hexagon_nn Yes Yes Yes \
		Examples \
		capi_v2_decimate Yes Yes Yes \
		capi_v2_dummy_ecns Yes Yes Yes \
		capi_v2_gain No No Yes \
		capi_v2_gain_32ch Yes* No No Supported only on Automotive builds for SDM820. \
		capi_v2_passthru Yes Yes Yes \
		capi_v2_sp Yes Yes Yes \
		capi_v2_voice_imc Yes Yes Yes \
		hvx_add_constant No No No \
		calculator Yes Yes Yes \
		calculator_c++ Yes Yes* Yes Functional only with 7.x toolset on 8996. \
		calculator_c++14 No Yes* Yes* Functional only with 8.2.x toolset on SDM835 and SDM660 \
		calculator_multi_legacy Yes Yes Yes \
		calculator_multi_domains No Yes Yes \
		calculator_c++_app Yes Yes Yes \
		farf_runtime_test Yes Yes No farf_runtime_test is not supported on APQ8096 LE builds. \
		qurt_multithread No No No \
		qurt_mutexes No No No \
		qurt_thread_t1 No No No \
		rpcperf Yes Yes Yes \
		template_so No No No \
		benchmark No Yes Yes \
		benchmark_v65 No No No \
		bilateral_v60 Yes Yes Yes \
		conv3x3a16_v60 Yes Yes Yes \
		conv3x3a32_v60 Yes Yes Yes \
		dilate3x3_v60 Yes Yes Yes \
		dilate5x5_v60 Yes Yes Yes \
		downscaleBy2 Yes Yes Yes \
		epsilon_v60 Yes Yes Yes \
		fast9 Yes Yes Yes \
		gaussian7x7 Yes Yes Yes \
		histogram Yes Yes Yes \
		median3x3_v60 Yes Yes Yes \
		qprintf_example No Yes Yes \
		qfxp_sample No Yes No \
		qmath_sample No Yes Yes \
		qmath_sample_8996 Yes No No \
		sigma3x3_v60 Yes Yes Yes \
		sobel Yes Yes Yes \
		ubwcdma No No No \
		Asynchronous Queue Test No No No \
		fcvqueuetest No No No \
		queueperf No No No \
		cornerApp Yes Yes Yes \
		run_main_on_hexagonSrc No No No \
		hexagon_nn Yes Yes Yes \
		Halide Examples \
		sg_histogram No No No \
		sg_lookup No No No \
		blur Yes Yes Yes \
		camera_pipe Yes Yes Yes \
		conv3x3a16 Yes Yes Yes \
		conv3x3a32 Yes Yes Yes \
		median Yes Yes Yes \
		sobel Yes Yes Yes \
		dilate3x3 Yes Yes Yes \
		gaussian5x5 Yes Yes Yes \
		hexagon_benchmarks Yes Yes Yes	",
	"id":83
}
idx.add(doc)
urls[83]='feature_matrix_old.html'
titles[83]="SDK 3.4 Feature Matrix"

var doc = {
	"title": "﻿Keyboard shortcuts",
	"body": " \
		Overview \
		Keyboard shortcuts are defined in the Hexagon IDE for the most commonly used commands. \
		To view a list of these shortcuts press Ctrl+Shift+L in the IDE. \
		NOTE Another shortcut list which groups the commands logically can be found at \
		http //www.cheat sheets.org/saved copy/eclipse_cdt_6_0_cheatsheet_0.1.pdf .	",
	"id":84
}
idx.add(doc)
urls[84]='eclipse_shortcuts.html'
titles[84]="﻿Keyboard shortcuts"

var doc = {
	"title": "UBWCDMA Examples",
	"body": " \
		Overview \
		The examples illustrate the use of the DMA Since the DMA supports up to 8 engines algorithms can use multiple engines concurrently A useful programming paradigm with the DMA is the use of ping/pong buffers This involves reading into one buffer while processing data already read into another Also writes are done from an output buffer while another one is being filled in with the processing results Thus multiple DMA engines are active and reads writes and algorithmic processing are simultaneous This is the approach taken by the examples Alternatively if TCM space is constrained it is also possible to read process and write sequentially. \
		Please refer to the [developer] ubwcdma.html developer_notes note of the [UBWCDMA user guide] ubwcdma.html prior to developing applications on the UBWCDMA. \
		UBWCDMA Applications \
		Memcpy App \
		The memcpy app is generic It currently supports all formats with the exception of TP10 for which support will be added in the future. \
		The memcpy makes use of a ping/pong buffer pair to enable simultaneous reads and writes A new ROI is read into one buffer while the old one is being written out from the other The file *dma_apps_memcpy_imp.c* initializes TCM buffers and then runs the memcpy session The files *dma_memcpy.h* and *dma_memcpy.c* contain the core app functionality. \
		Blend App \
		The blend app will read two frames from DDR and blend them pixel by pixel while writing the final result to a destination frame in DDR. \
		This app differs from the memcpy in 2 major respects First the ping/pong flow is more complex The app makes use of 6 TCM buffers 4 of them are ping/pong buffers for the read 2 for each source frame and 2 are ping/pong buffers for the write Thus the write no longer shares a buffer with the read as in the memcpy Interactions with the DMA are done by using 3 of the 6 buffers one for each frame The blend is done by using the other 3 buffers 2 read buffers are read from the TCM blended and written to a write buffer in TCM This happens while the source frames are read from DDR into the TCM and the destination frame written from TCM into DDR using the other 3 buffers The buffers for each frame then switch and the process is repeated. \
		Second the app is able to make use of 2 read engines to read the 2 source frames Thus it can operate with 3 engines in all 2 read and one write . \
		HVX Sum App \
		The sum app is very similar to the blend app with the exception that the blend is replaced by a summation Additionally the sum is done using the HVX to illustrate the use of the DMA and the HVX in combination. \
		Test App \
		The test app dma_apps_test.c is a wrapper than can run either the Memcpy Blend or HVX Sum app It is responsible for allocating the necessary DDR frame buffers and as well as performing a self check on the results On the hexagon simulator this wrapper is compiled in as part of the Hexagon executable On the hardware this is an Android side application that will execute the Memcpy Blend or HVX Sum apps. \
		The application itself will prefill frame buffers with pseudo random numbers which is only suitable for a linear frame In the case that UBWC is enabled the test application will run 3 applications \
		1 The Memcpy app is used to convert the linear frame to a UBWC frame \
		2 The app as requested by the user is run using the UBWC frame \
		3 The Memcpy app is used to convert the UBWC output frame to a linear frame \
		4 The self check is performed using the linear input and linear output frame \
		UBWCDMA Example Quick Start \
		Simulator \
		The app can be found in * HEXAGON_SDK_ROOT /examples/ubwcdma/* \
		Following are the steps to build and run the UBWCDMA example applications for the simulator from the HEXAGON_SDK_ROOT . \
		cd examples/ubwcdma/ \
		make tree V hexagon_Debug_dynamic_toolv83_v65 \
		Note that you may also use the below build variants as well \
		*hexagon_Debug_dynamic_toolv83_v65* \
		*hexagon_Release_dynamic_toolv83_v65* \
		*hexagon_ReleaseG_dynamic_toolv83_v65* \
		*hexagon_Debug_dynamic_toolv83_v66* \
		*hexagon_Release_dynamic_toolv83_v66* \
		*hexagon_ReleaseG_dynamic_toolv83_v66* \
		To run the application on the simulator the command can be found in the * variant build folder */sim_cmd.txt text file. \
		You will need to add additional parameters to this command that the dma_apps_test_q exectuable requires by appending as an example \
		memcpy 512 32 0 1 \
		This will run the Memcpy application with a frame size of 512x32 for NV12 with UBWC enabled \
		Please see the [Command Line Parameters] command_line_params section of this document for more information. \
		Hardware \
		Following are the steps to build and run the UBWCDMA example applications for the hardware from the HEXAGON_SDK_ROOT . \
		cd examples/ubwcdma/ \
		make tree V android_Release \
		make tree V hexagon_Debug_dynamic_toolv83_v65 \
		For the Android application you may also use build variant *android_Release_aarch64* \
		For the Hexagon application you may also use the below build variants as well \
		*hexagon_Debug_dynamic_toolv83_v65* \
		*hexagon_Release_dynamic_toolv83_v65* \
		*hexagon_ReleaseG_dynamic_toolv83_v65* \
		*hexagon_Debug_dynamic_toolv83_v66* \
		*hexagon_Release_dynamic_toolv83_v66* \
		*hexagon_ReleaseG_dynamic_toolv83_v66* \
		Please see the dma_apps_walkthrough.py script to run on hardware. \
		Please see the [Command Line Parameters] command_line_params section of this document for more information when running the *dma_apps_test* Android executable via adb. \
		[Command Line Parameters] @command_line_params \
		Command line parameters are required when running the dma apps test on the simulator or on hardware and are the same for both platforms. \
		On simulator \
		dma_apps_test_q [app] [height] [width] [fmt] [ubwc_en] \
		On hardware \
		dma_apps_test [app] [height] [width] [fmt] [ubwc_en] \
		+ + + \
		app can be one of the following memcpy blend or sum_hvx \
		+ + + \
		height frame height to use for the test \
		+ + + \
		width frame width to use for the test \
		+ + + \
		fmt 0 NV12 1 NV21 2 NV124R 3 P010 \
		+ + + \
		ubwc_en 0 disabled 1 enabled \
		+ + +	",
	"id":85
}
idx.add(doc)
urls[85]='ubwcdma/ubwcdma_examples.html'
titles[85]="UBWCDMA Examples"

var doc = {
	"title": "UBWCDMA User Manual",
	"body": " \
		[Introduction] @introduction \
		Purpose \
		The purpose of this document is to provide an overview of the operation of the UBWCDMA and a description of its driver API The intent of the UBWCDMA IP is to provide a DMA block for the Q6DSP design that is capable of accessing UBWC frames in DDR and present them to the Q6DSP as linear frames In addition UBWCDMA IP is also capable of performing Q6DSP DMA transactions for linear frames in DDR. \
		Acronyms \
		+ + + \
		Acronyms Definition \
		+ + + \
		UBWCDMA UBWC Direct Memory Access \
		+ + + \
		UBWC Universal Bandwidth Compression \
		+ + + \
		DMA Direct Memory Access \
		+ + + \
		VAPSS Video Analytics Processor Sub system \
		+ + + \
		TCM Tightly coupled memory Inside Q6DSP \
		+ + + \
		ROI Region of interest \
		+ + + \
		Bpp Bytes per pixel \
		+ + + \
		[Features] @features \
		Main Features \
		UBWCDMA IP provides DMA services to the Q6DSP module that enables it to access UBWC frames The purpose of the UBWCDMA design is to perform translation between UBWC frames stored in DDR and linear frames stored in Q6DSP local memory TCM implemented as locked L2 cache However UBWCMA is also capable of performing DMA for non UBWC linear frames as shown in the list below. \
		A DMA session provides the following services to Q6DSP \
		1 Read an ROI of a UBWC frame in DDR and store it in Q6DSP local memory in linear format In this use case Q6DSP issues a sequence of requests to read an ROI Region of Interest in a UBWC frame in DDR and stores the received ROI inside its local memory Q6DSP performs the required data processing on the ROI then moves on to the next ROI within the frame until the whole frame is processed. \
		2 Write an ROI of a linear frame stored in Q6DSP local memory into a UBWC frame in DDR In this case Q6DSP creates an ROI of a linear frame stores it in its local memory and issues a request to UBWCDMA to write the ROI into a UBWC frame in DDR This process is repeated until the whole output UBWC frame is written in DDR Typically an ROI in this case is produced by processing an input ROI obtained in case number 1 above. \
		3 Read an ROI of a linear frame in DDR and store it in Q6DSP local memory also in linear format In this case Q6DSP issues a sequence of requests to read an ROI Region of Interest in a linear frame in DDR and stores the received ROI inside its local memory also in linear format Q6DSP performs the required data processing on the ROI then moves on to the next ROI within the frame until the whole frame is processed. \
		4 Write an ROI of a linear frame stored in Q6DSP local memory into a linear frame in DDR In this case Q6DSP creates an ROI of a linear frame stores it in its local memory and issues a request to UBWCDMA to write the ROI into a linear frame in DDR This process is repeated until the whole output UBWC frame is written in DDR Typically an ROI in this case is produced by processing an input ROI obtained in case numbers 1 or 3 above. \
		5 On DDR reads of the TP10 format UBWCDMA pads each 10 bit pixel to 16 bits zero padding on 6 LSB bits before writing to Q6DSP local memory On DDR write operations of the TP10 format UBWCDMA reads the pixels from Q6DSP local memory and removes the 16 bit alignment padding before writing into DDR. \
		6 On DDR reads of the NV12 format UBWCDMA optionally pads each 8 bit pixel to 16 bits zero padding on 8 LSB bits before writing to Q6DSP local memory On DDR write operations of the NV12 format UBWCDMA reads the pixels from Q6DSP local memory and removes the 16 bit alignment padding before writing into DDR. \
		Notice that combining features 1 and 4 above provides a service that converts a UBWC frame into a linear frame Combining features 3 and 2 provides a service that converts a linear frame into a UBWC frame. \
		There can be up to 8 DMA sessions running concurrently A DSP process or thread must first issue a request to UBWCDMA driver to allocate a free DMA engine before it can start a DMA session. \
		[UBWCDMA Formats] @ubwcdma_formats \
		The UBWCMDA supports the NV12 P010 and NV124R formats in linear and UBWC modes as well as the TP10 format in UBWC mode A description of each format is provided below. \
		NV12 \
		The NV12 format is a 4 2 0 semi planar YUV format Each of the Y U and V components are stored in 1 byte Since the format is semi planar it is split into a luminance part NV12 Y and a chrominance part NV12 UV which are contiguous in memory The definition of a pixel differs in each plane in the luminance plane there is 1 byte for each Y pixel In the chrominance plane there are 2 bytes per pixel one for the U component and the other for the V component Since the format is 4 2 0 the UV components are subsampled in both the vertical and horizontal directions relative to the Y component Thus there is a 2x2 Y pixel block for each UV pixel Figure /counter fig a is an example of the NV12 format all cells represent bytes and the thicker borders indicate pixel boundaries. \
		.lua \
		return E.left E.img src images/ubwcdma_nv12.png \
		**Figure /counter fig a NV12 format** \
		The UBWCDMA separates the NV12 format into the NV12 Y and UV components Frame and ROI parameters are specified in terms of pixels and not bytes The convention used in programming the DMA is that the UV parameters are specified in terms of the corresponding frame parameters Since the UV plane is subsampled this means that an intent to transfer y UV lines should be expressed to the DMA as an intent to transfer 2/*y lines The same holds true in the x dimension This is done so that transfers are expressed relative to the frame dimensions as opposed to the individual compnents The Y component is the same size as the frame and so this automatically holds true for it This Chroma convention holds for all relevant UV parameters including frame width height and stride as well as ROI width height and stride In the UV plane each pixel consists of a U and V component packed together Thus if the DMA is programmed to transfer 64 Chroma pixels in the x dimension it will actually transfer only 32 such pixels where each pixel is a UV pair If it is programmed to transfer 64 Chroma lines it will only transfer 32 lines. \
		NV12 Padded \
		. \
		The UBWCDMA can pad the NV12 format prior to writing the result to the TCM Additionally the padding can be stripped off before writing the result back to DDR Padding is accomplished by adding 8 zero bits to LSB of each pixel in the Y plane and 8 zero bits to the LSB of each pixel component U and V in the UV plane Padding has no effect from a frame size or ROI point of view It does however change the TCM alignment constraints in linear mode Since each pixel holds double the number of bits and addresses in TCM must be pixel aligned the necessary alignment of the Y component becomes 2 bytes and that of the UV component becomes 4 bytes UBWC TCM constraints are unchanged. \
		NV12 4R \
		NV12 4R linear is identical to the NV12 linear format However NV12 4R UBWC is compressed differently from NV12 UBWC From an application point of view both NV12 and NV12 4R pixels are treated the same in TCM It is only important to program the UBWCDMA distinctively for these two formats so that their decoding and encoding are handled appropriately. \
		P010 \
		The P010 format is a padded 4 2 0 semi planar YUV format Each of the YUV components is 10 bits in this format as opposed to 8 bits in the NV12 formats Each of the 10 bits is padded to 16 bits and packed into the frame An example of this frame is shown in Figure /counter fig b the dark cells represent the zero pading bits There are 2 bytes per pixel in Y frame and 4 bytes per pixel in the UV frame. \
		.lua \
		return E.left E.img src images/ubwcdma_p010.png \
		**Figure /counter fig b P010 format** \
		TP10 \
		The TP10 format is a tightly packed 10 bit semi planar 4 2 0 YUV format In contrast to the P010 format it does not pad each Y pixel and UV pixel component with 6 bits Instead it collects 3 components and pads them with extra bits in the MSB In the Y plane it collects 3 Y pixels and pads them with 2 bits while in the UV plane it collects a UVU set or a VUV set and pads with 2 bits Every pixel consists of 4/3 bytes 4 bytes for every 3 pixels in the Y plane and 8/3 bytes in the UV plane It is helpful to imagine the format as consisting of superpixels where in the Y plane each superpixel is 4 bytes and contains 3 components 10/*3 + 2 padding bits while in the UV plane each superpixel is 8 bytes and contains 3 chroma components 3 sets of UV padded with 4 bits in all The format is shown in Figure /counter fig c where the thicker borders indicate the superpixels Critically this format can only have its frame width be a multiple of 3 to ensure an integral number of bytes Additionally the width and height must be even as in other formats This means that width must be a multiple of 6 and the height a multiple of 2. \
		.lua \
		return E.left E.img src images/ubwcdma_tp10.png \
		**Figure /counter fig c TP10 format** \
		[Limitations] @limitations \
		1 UBWC frames in DDR must have start addresses that are 4k aligned linear frames in DDR do not require this restriction. \
		2 All programmed X Y coordinates ROI heights and widths must be integer multiples of the DMA alignment requirements for the given format These alignment requirements can be obtained through DMA firmware APIs. \
		3 TCM restrictions for each format are listed below \
		NV12 Linear and Padded Linear \
		1 The start address of the Y plane in TCM must be 32 byte aligned. \
		2 The start address of the UV plane in TCM must be 32 byte aligned. \
		3 The stride of the ROI in TCM must at least be the ROI width or can be greater however must be 32 byte aligned. \
		NV12 4R Linear and Padded Linear \
		Same as the NV12 Linear requirements listed above. \
		P010 Linear \
		Same as the NV12 Linear requirements listed above. \
		TP10 Linear \
		This is not a supported format by the UBWCDMA. \
		UBWC Formats \
		1 The start address of the Y plane in TCM must be 256 byte aligned. \
		2 The start address of the UV plane in TCM must be 256 byte aligned. \
		3 The stride of the ROI in TCM must be a multiple of 256 pixels. \
		[Programming] @programming \
		User processes communicate with the DMA hardware via the UBWCDMA FW driver User processes call the driver API to request a free DMA engine In response the UBWCDMA driver determines if there is a free DMA engine allocates it to the calling user process and setups the DMA engine by writing the DMA engine s secure setup registers Each DMA engine operates on a list of commands known as descriptors which are placed in TCM This region is allocated by the user process and filled in by the driver User processes provide the driver with ROI and frame information needed to construct the descriptor list The user will then instruct the driver to begin the session The DMA engine starts fetching one descriptor at a time from the list and executing the command before fetching the next descriptor until all descriptors in the list are executed The user process can communicate with the driver API to determine when the engine has finished processing the descriptors provided to it or block until the driver is done Once the session is complete the user process can initiate another session by updating the ROI information and calling the driver API If the user process has no more sessions to run it calls the driver API again to release the allocated DMA engine so that other processes may use it The TCM region allocated for the descriptors should also be released if it will not be reused by another engine. \
		[Driver API] @driver_api \
		A link to the Driver API can be found at * HEXAGON_SDK_ROOT /incs/ubwcdma/dmaWrapper.h* The following illustrates the typical use flow of the DMA driver \
		1 The DMA register space and hardware model is initialized This is handled in a main.c file for every example This code is not portable to DMA hardware as initialization is handled there at start up Instead users should encapsulate their code into an Appmain which is called in the main.c file. \
		2 An engine is allocated using the **hDmaWrapper_AllocDma** or **hDmaWrapper_AllocDmaSpecifyWaitType** functions. \
		3 Vote for the DMA voltage based on the frequency plan using the HAP_power_Set or nDmaWrapper_PowerVoting API s *Note that nDmaWrapper_PowerVoting API is only available for SM8150 and future targets.* \
		4 The transfer is prepared by specifying frame details ROIs and DDR addresses This is done by calling the function **nDmaWrapper_Prepare** The user can specify multiple ROIs to transfer for multiple frames Each provided ROI is a separate transfer for each transaction The widths and heights provided in the ROIs must be the maximum that the user intends to use throughout the frame transfer typically widths and heights will be the same throughout except at the boundary . \
		5 Next **nDmaWrapper_Update** is called to update the ROI information for each transfer Typically the change is to the next set of image coordinates The **nDmaWrapper_Update** function must be given the same number of ROIs as **nDmaWrapper_Prepare** and may only change the ROI and TCM addresses it is not able to change the transfer type format or the frame to operate on The ROI widths and heights may only be made smaller than the ROIs given in the prepare function It is possible to skip ROIs by using a special set of parameters but an ROI must be provided to the update for every ROI provided in the prepare. \
		6 **nDmaWrapper_Move** is called to initiate a transfer. \
		7 **nDmaWrapper_Wait** is called to block until the current ROIs have all been transferred. \
		8 Steps 4 6 are repeated until all required ROIs are transferred. \
		9 **nDmaWrapper_FinishFrame** is then called to flush DMA buffers It must be called before calling **nDmaWrapper_Prepare** again If a new session with different frame information is required steps 1 7 are repeated. \
		10 **nDmaWrapper_FreeDma** is called to release all DMA engine resources. \
		.lua \
		return E.left E.img src images/ubwcdma_api_flow.png \
		**Figure /counter fig c UBWCDMA Driver API flow** \
		Application Preparation \
		. \
		One additional responsibility of the developer is to prepare the application so that the DMA driver can be used \
		1 Determine the L2$ buffer size that will be used by the DMA driver during the application lifetime \
		2 Allocate and lock the required L2$ buffer space as determined above. \
		3 *DMA Driver API flow as per Figure /counter fig c * \
		4 Unlock and deallocate the L2$ buffer \
		.lua \
		return E.left E.img src images/ubwcdma_app_preparation.png \
		**Figure /counter fig d Application preparation required to use the UBWCDMA Driver APIs** \
		DMA Voting \
		The developer should vote for the DMA according to the frequency plan as described in Figure /counter fig e The voting sequence should be called after DMA engines are allocated in the *DMA Driver API flow*. \
		.lua \
		return E.left E.img src images/ubwcdma_voting.png \
		**Figure /counter fig e Voting for the DMA based on the frequency plan** \
		For SM8150 and future targets the DMA Voting is simplified by using the nDmaWrapper_PowerVoting API as described in Figure /counter fig f . \
		.lua \
		return E.left E.img src images/ubwcdma_wrapper_voting.png \
		**Figure /counter fig f Voting for the DMA using the simplied wrapper API** \
		[Developer Notes] @developer_notes \
		The following describes factors that DMA users should be aware of \
		1 The DMA imposes some restrictions and considerations for efficient design as well as performance reasons \
		a The DMA cannot perform TCM to TCM transactions. \
		b DMA engines should only be allocated entirely for reads DDR to L2 or for writes L2 to DDR It is extremely inefficient to use a single engine to do both. \
		c Linear reads and writes of small chunks of data is inefficient and should be avoided if possible The hardware prefers reads and writes to be 256 byte aligned and the transaction size to be a multiple of 256 bytes If this is not the case an extra read or write may be necessary If the transactions are of large width then an extra read is inconsequential However reading one pixel at a time for example is detrimental to performance. \
		2 Compilation options are specified in variants More information about the variants and various possible Makefile options useful in development can be found in the *docs/Environments_Command Line.html* file provided with the SDK. \
		a The firmware is precompiled for a specific set of variants Not all variants are supported Currently this only includes certain v65/v66 static library based release and debug variants A full list of possible variants can be found in the *glue* directory shipped with each example The list of variants supported by the firmware can be found in the * HEXAGON_SDK_ROOT /libs/ubwcdma/fw* directory. \
		b In order to compile an example for one of the supported variants do \
		*make V VARIANT eg make V hexagon_Debug_dynamic_toolv83_v65 * \
		c If an invalid variant is compiled not accepted by the SDK the user will see an error of the form \
		* Variant is not a supported build variant* \
		d DMA hardware is only available for v65 and v66 based chips and onwards. \
		e Compilation of the examples will also cause a simulation to occur at the end of the compilation This will occur whenever a file is modified If the user wishes to run a simulation without compilation the simulation output can be captured Then the user should look for *hexagon sim* The line with that command is the command to run the simulation copying the line and running it will cause a simulation to be launched without the need to recompile. \
		3 The DMA examples are built on top of an operating system Specifically they are built on top of QURT This is in order to enable the software to run on Hexagon hardware The following provides some QURT related notes \
		a QURT has the ability to access the MMU and use virtual addresses All applications must use virtual addresses to access the DDR and TCM However the DMA expects physical addresses and so addresses must be converted prior to providing them to the DMA The exception is descriptor addresses which are also used by the firmware and should be virtual Thus data based addresses DDR and TCM based buffers must be physical while descriptor based addresses must be virtual Virtual to physical address conversion can be accomplished by QURT methods see the examples . \
		b The regions provided to the DMA must be contiguous both data based and descriptor based For this reason the use of malloc to set up buffers to be passed to the DMA is not permitted as malloc may allocate contiguous virtual addresses which are non contiguous in physical memory The alternative is to use QURT to map regions which are guaranteed to be contiguous see the examples The use of malloc is still permitted for user structures and for data that the DMA will not access. \
		c The user must allocate DDR regions to be used as TCM by locking regions using the CDSP L2 Cache Locking HAP Interface HAP_cache_lock and HAP_cache_unlock API s Currently in the examples the Cache Locking HAP Interface is not used when running on the simulator as it is not supported The QURT locking functions are used instead when running on the simulators please see dma_apps_sum_hvx_imp.c dma_apps_blend_imp.c and dma_apps_memcpy_imp.c In general these regions should not be too large as there is only a maximum of 512k to use for the TCM currently and other apps may also be running. \
		d QURT does not accept uninitialized pointers An uninitialized pointer may corrupt the stack and lead to program crashes that are difficult to debug The user should ensure all pointers that are declared are initialized immediately afterwards This includes pointers that are present in structures. \
		e printf may crash when used in QURT The alternative is to use the function qurt_printf However this function is not able to display floating point numbers. \
		f QURT addresses are always allocated in sizes of 4k and are aligned to 4k. \
		g QURT uses memory pools to provide users with memory regions which can be used The user indicates to QURT which pool is to be used The pool structure on the SDK and on hardware have been found to vary. \
		4 All code provided in the examples is able to run on hardware with the exception of the code guarded by the __hexagon__ macro in dma_apps_test.c On hardware the dma_apps_test.c source is used as part of the Android side application In the case of the Hexagon simulator dma_apps_test.c is compiled as part of the application on the Hexagon side and the __hexagon__ macro is enabled and used to facilitate this. \
		a When running on the simulator the __hexagon__ macro is enabled in dma_apps_test.c and illustrates the following \
		Frames in DDR to be transferred by the ubwcdma cosim must be mapped by QURT to guarantee a contigous region. \
		UBWC frames need to be 4k aligned which by is handled by QURT during allocation. \
		The DMA registers must also be mapped to QURT memory pools on the simulator This is done on a separate pool known as the DRIVER_POOL These registers are a fixed communication point between the Cosim and the firmware and their address may not change In order to achieve this a special kind of mapping which maps physical and virtual memory in a one to one mapping is used This is done by calling a DMA initialization function However in order to ensure the chosen physical address is obtained by the DMA the user must ensure that the DMA initialization functions are run first before using the DRIVER_POOL for any other process This restriction is removed in hardware as these registers are mapped elsewhere. \
		The main application flow test_main_start is run as a thread with a suitable stack size as the main thread on the simulator does not provide a sufficient stack size during application execution. \
		b When running on the hardware the __hexagon__ macro is disabled in dma_apps_test.c and illustrates the following \
		Frames in DDR to be transferred by the ubwcdma hardware are ION buffers to guaratee a contiguous region see rpcmem_android.c as included in the Hexagon SDK . \
		5 Note that buffers that have been compressed on the hexagon simulator cannot be used on target devices and vice versa For example if you dump a compressed buffer from memory to file on the hexagon simulator and use that file as an input on a target device you will encounter an error Due to the nature of hexagon simulator COSIMS we are unable to make compressed frames compatible cross platform However uncompressed buffers linear formats are compatible between the simulator and target devices. \
		6 On SDM845 targets the UBWCDMA firmware that is used is a legacy variant which does not support certain API s such as *nDmaWrapper_PowerVoting* In order to use the correct headers and firmware libraries on SDM845 targets please run the make command with the additional flag **UBWCDMA_LEGACY_DRIVER 1** This will point the make.d build system to the correct directories Please see $ HEXAGON_SDK_ROOT /libs/ubwcdma/ubwcdma.min for specific details.	",
	"id":86
}
idx.add(doc)
urls[86]='ubwcdma/ubwcdma.html'
titles[86]="UBWCDMA User Manual"

var doc = {
	"title": "QACT Lite : Testing the Audio Module on Target",
	"body": " \
		Overview \
		QACT Qualcomm Audio Calibration Tool Lite is a PC based tool that lets you \
		modify the ACDB Audio Calibration Database ACDB is a set of binary files \
		containing calibration data for all devices networks and sample rates. \
		The default set of acdb files can be found in the folder /etc on your target \
		device. \
		To enable a custom audio module on target the module must be added to a new \
		topology definition These are the steps from a high level \
		Pull out the acdb files from the target You may use the files already \
		provided with the release as well \
		Create the workspace file for the acdb files and launch acdb in QACT Lite. \
		Add information regarding the new topology and associated modules. \
		Add the appi_fir.so to AMDB using DSP Module manager functionality in QACT Lite \
		Push the modified acdb back to the target and reboot. \
		Configure the custom module parameters in real time using the DSP Calibration feature of QACT Lite. \
		Prerequisites \
		Android Device \
		QACT Lite and QPST installed on system. \
		Please [ /Support_Contact] /Support_Contact.html Qualcomm to obtain them. \
		The User Guide shipped along with QACT will take you \
		through the installation You can refer section 2 of the document \
		for more details \
		ADB drivers installed on system. \
		Setting up the workspace \
		Pull the existing acdb files from the target device Assuming C /Work/ACDB is the working directory \
		adb pull /etc/Speaker_cal.acdb C /Work/ACDB \
		adb pull /etc/Headset_cal.acdb C /Work/ACDB \
		adb pull /etc/Handset_cal.acdb C /Work/ACDB \
		adb pull /etc/Hdmi_cal.acdb C /Work/ACDB \
		adb pull /etc/Global_cal.acdb C /Work/ACDB \
		adb pull /etc/General_cal.acdb C /Work/ACDB \
		adb pull /etc/Bluetooth_cal.acdb C /Work/ACDB \
		Note The acdb files can be present in /etc/ or /etc/acdbdata/MTP folder depending on the released image you are working on. \
		Create a workspace file workspaceFile.qwsp in the same folder You can modify the existing qwsp file if you are provided with one. \
		If creating new a text file with contents as shown should suffice \
		WorkSpace_Data WSVersID Badger_3 \
		ACDBFile_Paths \
		ACDBFile_Paths path Bluetooth_cal.acdb / \
		ACDBFile_Paths path General_cal.acdb / \
		ACDBFile_Paths path Global_cal.acdb / \
		ACDBFile_Paths path Handset_cal.acdb / \
		ACDBFile_Paths path Hdmi_cal.acdb / \
		ACDBFile_Paths path Headset_cal.acdb / \
		ACDBFile_Paths path Speaker_cal.acdb / \
		/ACDBFile_Paths \
		GUI_Data \
		/GUI_Data \
		/WorkSpace_Data \
		NOTE If the file are pulled from /etc/acdbdata/MTP then they have to be renamed to MTP_/*/*/*_cal.acdb \
		WorkSpace_Data WSVersID Badger_3 \
		ACDBFile_Paths \
		ACDBFile_Paths path MTP_Bluetooth_cal.acdb / \
		ACDBFile_Paths path MTP_General_cal.acdb / \
		ACDBFile_Paths path MTP_Global_cal.acdb / \
		ACDBFile_Paths path MTP_Handset_cal.acdb / \
		ACDBFile_Paths path MTP_Hdmi_cal.acdb / \
		ACDBFile_Paths path MTP_Headset_cal.acdb / \
		ACDBFile_Paths path MTP_Speaker_cal.acdb / \
		/ACDBFile_Paths \
		GUI_Data \
		/GUI_Data \
		/WorkSpace_Data \
		Another method to extract the acdb files is by connecting to a target from QACT Lite where a new image has been flashed and saving the files from QACT. \
		This will save the acdb files and workspace file automatically. \
		Use Connect to target option in QACT Lite. \
		Launch QACT Lite Choose Open File icon as shown. \
		.lua \
		return E.left E.img src images/qact_open_file.png alt Image not found \
		Browse to the location C /Work/ACDB and choose the file workspaceFile.qwsp. \
		Now we are ready to modify the acdb for the custom requirement. \
		Modify the ACDB \
		Assume we have created an audio module named appi_fir.so We would like to have this module present in the COPP RX path while playing out audio through the speaker In order to achieve this we need to create a topology with the FIR module in it Now set this new topology to be chosen for the audio playback session through the speaker. \
		Start with adding parameter IDs for the FIR module Choose Parameter Designer from the Tools menu as shown \
		.lua \
		return E.left E.img src images/qact_choose_param_design.png alt Image not found \
		Now you can fill up the information regarding the parameters for FIR module Use the file SDK_Location examples/audio/appi_fir/inc/appi_fir.h as the reference for filling up the info here. \
		In the parameter designer window click Add as shown \
		.lua \
		return E.left E.img src images/qact_add_param_enable.png alt Image not found \
		A new window will pop up where you can provide the parameter info as shown Parameter name is an identifier The ID should match the value present in appi_fir.h \
		.lua \
		return E.left E.img src images/qact_add_param_enable_2.png alt Image not found \
		You can add the relevant data for the parameter FIR_FILTER_ENABLE . \
		refer structure fir_filter_enable_cfg_t from the file appi_fir.h . \
		Click on Add as shown. \
		Fill up the info in the popped up window. \
		Once done with adding all data click Done . \
		.lua \
		return E.left E.img src images/qact_add_enable_data.png alt Image not found \
		Again continue the same procedure for adding the parameter FIR_FILTER_PARAMS shown below . \
		.lua \
		return E.left E.img src images/qact_add_filter_params.png alt Image not found \
		Adding data related to the FIR_FILTER_PARAMS refer the structure fir_filter_cfg_params_t \
		.lua \
		return E.left E.img src images/qact_add_num_taps.png alt Image not found \
		Adding the reserved variable. \
		.lua \
		return E.left E.img src images/qact_add_reserved.png alt Image not found \
		Now we need to add the filter coefficient array as shown. \
		.lua \
		return E.left E.img src images/qact_add_filter_coeff.png alt Image not found \
		After clicking done the parameter designer window will look like this \
		.lua \
		return E.left E.img src images/qact_filter_param_done.png alt Image not found \
		Now that we have added parameters for the FIR module it s time to add the module details and map these parameters to the module. \
		Choose Module Designer from the Tools Menu. \
		In the module designer window click on Add . \
		.lua \
		return E.left E.img src images/qact_add_module.png alt Image not found \
		Provide the module name and Module ID Choose the Module Type RX TX or Both .You can provide a Module ID of your choice But make sure that the same ID is used while adding the module using DSP module manager in QACT. \
		Choose the applicable parameters for the modules as shown below. \
		.lua \
		return E.left E.img src images/qact_module_designer.png alt Image not found \
		Once done with module addition the module designer will have the FIR module listed as shown \
		.lua \
		return E.left E.img src images/qact_module_added.png alt Image not found \
		It s time to design a new topology with the newly added FIR module in it Choose Topology Designer from the Tools Menu and proceed as shown. \
		Fill the information regarding Topology Name Topology ID and Topology Type Topology ID can be any value of your choice but greater than 0x10000000 \
		Now choose the module APPI_FIR to be part of this topology. \
		.lua \
		return E.left E.img src images/qact_add_topology.png alt Image not found \
		After the design of new topology the topology designer window may look like this. \
		.lua \
		return E.left E.img src images/qact_topology_done.png alt Image not found \
		Add the newly designed topology in the Database designer Choose Database Designer from the Tools Menu. \
		Choose AUDIO_COPP_RX from the left side of the window Now click Add as shown \
		.lua \
		return E.left E.img src images/qact_database_design.png alt Image not found \
		Check box corresponding to the newly created topology CUSTOM_TOPO_WITH_FIR . \
		.lua \
		return E.left E.img src images/qact_database_choose.png alt Image not found \
		Add the module information in DSP module manager This is a new feature in QACT to allow addition of dynamic modules to AMDB Audio Module Database . \
		It allows addition of CAPIv2 CAPI as well as APPI modules to AMDB. \
		Select DSP Module Manager from the Tools menu. \
		Click on Add Module button. \
		Select the options for appi_fir module as shown in the image below. \
		.lua \
		return E.left E.img src images/dsp_module_manager.jpg alt Image not found \
		Choose the device to run the new topology. \
		In the Tools menu select Device Designer . \
		Select the appropriate device SPKR_PHONE_SPKR_STEREO SPKR_PHONE_SPKR_MONO HEADSET_SPKR_MONO HEADSET_SPKR_STEREO from the left side of the window Now on the right side for the Audio COPP Topology ID choose the topology CUSTOM_TOPO_WITH_FIR from the dropdown menu. \
		.lua \
		return E.left E.img src images/qact_device_designer.png alt Image not found \
		Time to save the modified ACDB. \
		Choose Save As from File menu. \
		A window will pop up where you can browse to the folder to save all the acdb files and workspace file For the worksapce file browse to your desired location The same location will be picked up for all other files. \
		Assuming you have saved all the files in C /WORK/ACDB/FIR_ADDED \
		.lua \
		return E.left E.img src images/qact_save_worksapce.png alt Image not found \
		Replacing the ACDB on the Target Device \
		Now that we are done with modifying the ACDB it s time to push the files to Target. \
		Assuming the saved acdb files are kept at C /WORK/ACDB/FIR_ADDED. \
		Issue the following commands in a CLI shell. \
		adb push Speaker_cal.acdb /etc/acdbdata/MTP \
		adb push Headset_cal.acdb /etc/acdbdata/MTP \
		adb push Handset_cal.acdb /etc/acdbdata/MTP \
		adb push Hdmi_cal.acdb /etc/acdbdata/MTP \
		adb push Global_cal.acdb /etc/acdbdata/MTP \
		adb push General_cal.acdb /etc/acdbdata/MTP \
		adb push Bluetooth_cal.acdb /etc/acdbdata/MTP \
		To push the acdb file that is read by DSP to add dynamic module to AMDB execute the following command \
		adb push adsp_avs_config.acdb /etc/acdbdata/ \
		Reboot the device. \
		Adding audio module to target \
		This section covers information about adding a dynamic audio module to target. \
		NOTE After loading the new ACDB with custom topology dynamic module needs to be loaded after boot up. \
		However for an audio session when a topology gets created dynamic module will not be present unless specified in acdb files \
		If the module is not added to AMDB via acdb files the topology creation exits mentioning absence of module in AMDB. \
		Once the module is added to AMDB either at bootup or when the use case is invoked topology creation will be successful and playback/record session will work as expected. \
		This can be followed by calibration of the custom dynamic module. \
		There is an automated script in SDK push_audio_module.cmd which will compile respective example and push it to target It will take care of updating the other dependencies for testing like \
		testsig generation pushing testsig to target etc. \
		This script can be found at SDK_ROOT /scripts/push_audio_module.cmd \
		Usage of this script to push appi_fir example testsig.so skel.so \
		run setup_sdk_env.cmd \
		cd scripts \
		push_audio_module.cmd appi_fir \
		Signing of device generation of testsig.so \
		Find out the serial number of device \
		Open a CLI shell and push *getserial* application \
		from HEXAGON_SDK_ROOT tools/elfsigner to target \
		adb push HEXAGON_SDK_ROOT tools/elfsigner/getserial /data \
		Connect the device and log into adb shell as root user. \
		adb root \
		adb shell \
		cd data \
		chmod 777 getserial \
		./getserial \
		This will show the serial number of device \
		If getserial application fails to run then execute the following command and then \
		try running getserial again \
		insmod /system/lib/modules/adsprpc.ko \
		Create testsig.so from elfsigner.py at HEXAGON_SDK_ROOT tools/elfsigner \
		NOTE Run setup_sdk_env.cmd present at HEXAGON_SDK_ROOT location before running elfsigner.py \
		elfsigner.py t SERIALNUM \
		This will generate testsig 0x/*/*/*/*.so. \
		Rename the so to testsig.so and copy to device under /system/lib/rfsa/adsp/ \
		Note If this directory doesn t exist create this directory in /system/lib/rfsa/adsp/ \
		folder on target and then push testsig.so on target \
		adb shell \
		mkdir /system/lib/rfsa/adsp/ \
		After this step reboot the device. \
		For more information about Elfsigner please refer \
		[Signing] /Tools_Signing.html \
		There is an automated script present in Hexagon SDK to flash testsig.so to target Run the following script \
		SDK_ROOT /tools/scripts/testsig.cmd \
		DSP Calibration in Real Time using QACT \
		QACT Lite provides a GUI based calibration for audio modules. \
		Launch QPST \
		Launch QACT and choose Connect to Phone icon. \
		If you encounter a message as shown below click Yes and browse to the ACDB location we have created in previous steps Eg C /WORK/ACDB/FIR_ADDED Choose the workspace file. \
		.lua \
		return E.left E.img src images/qact_connect_phone.png alt Image not found \
		Click on DSP Calibration as shown below Start playing audio from the native player in Android You will see the COPP topology with APPI_FIR in it. \
		.lua \
		return E.left E.img src images/qact_dsp_calibration.png alt Image not found \
		Double click on the APPI_FIR box and you will see the calibration window for the module. \
		Now you may set the various parameters for the module in real time Set the enable flag to 0x1 and provide a set of filter coefficients. \
		For eg \
		HP100 0xFFF4 0xFFE9 0xFFCE 0xFFA8 0xFF82 0xFF66 0x3F5B 0xFF66 0xFF82 0xFFA8 0xFFCE 0xFFE9 0xFFF4 \
		After configuring the values click on Set to DSP and you can feel the effect of filter in the live audio. \
		.lua \
		return E.left E.img src images/qact_fir_calibration.png alt Image not found \
		The Option Get from DSP can be used to retrieve the existing parameter values from the DSP. \
		Compiling the H2XML annotations to generate XML file s \
		Use the following command to generate the XML file from annotated header file. \
		$ ./ h2xml binary path /h2xml.exe conf config file path /config_adsp.xml i input file o output directory	",
	"id":87
}
idx.add(doc)
urls[87]='Audio/audio_target_testing_qact.html'
titles[87]="QACT Lite : Testing the Audio Module on Target"

var doc = {
	"title": "Run Time Audio Calibration",
	"body": " \
		Goal \
		Enabling run time access to audio tuning parameters of modules running in COPP/POPP path from an Android Java user applications. \
		Overview \
		Tuning of audio processing path is done by a PC application QACT/QACT_Lite It allows offline and online calibration of audio/voice path. \
		Device must be connected to PC for accessing parameters of audio modules running on ADSP. \
		The interface described in this section allows to set and get parameters of audio modules directly from Android applications running in java layer. \
		It means run time control of audio path from Android java applications It is explained in the below figure. \
		.lua \
		return E.left E.img src images/audio_cal.png alt Image not found \
		Android AudioManager [android.media.AudioManager] http //developer.android.com/reference/android/media/AudioManager.html defines setParameters and getParameters methods to access audio hardware parameters. \
		These methods are extended for run time audio calibration with new key value pairs. \
		setParameters cal_keys values . set tuning parameters \
		getParameters cal_keys values . get tuning parameters \
		Persist option allows to store the parameters in Audio Calibration Database ACDB and valid across reboot of the device. \
		Parameters set with persist option only replaces the parameters in ACDB But it doesn t allow to add new parameters with unique IDs. \
		QACT Lite must be used to add and remove parameters of a module from ACDB and then this interface can be used to overwrite them at run time. \
		NOTE Run time calibration from java applications is supported only for audio Voice path is not supported. \
		NOTE This interface is available only for chipsets MSM8x94 or later with Android L. \
		setParameters \
		Set parameters of audio modules. \
		setParameters method is defined in [android.media.AudioManager] http //developer.android.com/reference/android/media/AudioManager.html class. \
		It is extended with new keys for supporting run time audio calibration. \
		.ccode \
		setParameters key1 value1 key2 value2 . \
		Keys required for setting parameters are [cal_persist] audio_calibration_using_app.html cal_persist [cal_devid] audio_calibration_using_app.html cal_devid [cal_apptype] audio_calibration_using_app.html cal_apptype [cal_caltype] audio_calibration_using_app.html cal_caltype [cal_samplerate] audio_calibration_using_app.html cal_samplerate [cal_topoid] audio_calibration_using_app.html cal_topoid [cal_moduleid] audio_calibration_using_app.html cal_moduleid [cal_paramid] audio_calibration_using_app.html cal_paramid and cal_data. \
		cal_data key holds the actual parameters encoded using [base64] http //developer.android.com/reference/android/util/Base64.html string format. \
		Setting data of one parameter using module and parameter keys \
		cal_data key holds the parameters encoded as a string [cal_moduleid] audio_calibration_using_app.html cal_moduleid and [cal_paramid] audio_calibration_using_app.html cal_paramid specifies module and parameter IDs respectively. \
		Refer [set param example] audio_calibration_using_app.html Set%20data%20of%20one%20parameter for more information. \
		Setting data of multiple parameters of modules \
		cal_data key holds module and parameter IDs also along with parameters data in a format shown below. \
		.ccode \
		//RESERVED and LENGTH fields are 16 bit and other 32 bit \
		MODULEID 1 \
		PARAMID 1 \
		RESERVED LENGTH \
		DATA_FOR 1 \
		MODULEID 1 \
		PARAMID 2 \
		RESERVED LENGTH \
		DATA_FOR 2 \
		. \
		MODULEID n \
		PARAMID m \
		RESERVED LENGTH \
		DATA_FOR m \
		Refer [set param example] audio_calibration_using_app.html Set%20data%20of%20multiple%20parameters for more information. \
		NOTE SetParameters interface to ADSP always expects the data in multiple of 4 bytes for a single parameter. \
		Hence ensure length of parameters are multiple of 4. \
		getParameters \
		Get parameters of a module It supports to get parameters associated with a single parameter ID of a module. \
		getParameters method is defined in [android.media.AudioManager] http //developer.android.com/reference/android/media/AudioManager.html class. \
		It is extended with new keys for supporting run time audio calibration. \
		.ccode \
		String data getParameters key1 value1 key2 value2 . \
		Keys required to get parameters are [cal_persist] audio_calibration_using_app.html cal_persist [cal_devid] audio_calibration_using_app.html cal_devid [cal_apptype] audio_calibration_using_app.html cal_apptype [cal_caltype] audio_calibration_using_app.html cal_caltype [cal_samplerate] audio_calibration_using_app.html cal_samplerate \
		[cal_topoid] audio_calibration_using_app.html cal_topoid [cal_moduleid] audio_calibration_using_app.html cal_moduleid [cal_paramid] audio_calibration_using_app.html cal_paramid and cal_data. \
		cal_data key is mandatory and set it to 0 Default value 0 is assumed for all other keys if not set. \
		getParameters method returns a string with two keys cal_result and cal_data . \
		.ccode \
		cal_result error number cal_data base64 encoded string \
		cal_result 0 for Success and other values for Failure cal_data is valid only if the result is success. \
		cal_data returned key \
		Parameters are encoded in base64 format Decode using Base64.decode method to get the integer parameters. \
		Data returned here is valid only when cal_result returned with 0. \
		Refer [get param example] audio_calibration_using_app.html Get%20a%20parameter for more information. \
		Common Keys \
		Key Value pairs defined here are valid for set/get parameters methods. \
		.ccode \
		key value \
		Default values for these keys are 0. \
		Based on these keys set/getParameters identify a module in given topology associated with a selected device or session. \
		cal_persist \
		Flag to configure parameters as persistent or non persistent. \
		Persistent parameters are stored in ACDB and they are valid across reboots. \
		Non persistent parameters are valid for the selected active sessions. \
		0 non persistent Runtime set/get to/from modules running in ADSP for all valid active sessions. \
		These parameters are not valid for new sessions created after the set/get Used for real time calibration. \
		1 Persistent It store parameters in ACDB and persistent across reboots. \
		New parameters are not valid for current active sessions They are effective only for new sessions created after set/get. \
		All non zero values are treated as persistent. \
		cal_devid \
		Audio output devices defined as audio_device_t enum in system/audio.h. \
		Audio device id is converted to devices in QACT where topologies apptypes and other properties are associated. \
		cal_apptype \
		Application type to which the calibration needs to be applied. \
		It is defined in QACT Refer QACT to find the list of application types. \
		For example \
		Audio Playback 0x00011130 \
		Audio Recording 0x00011132 \
		cal_caltype \
		Calibration type for audio COPP/POPP topologies Currently supported only for audio. \
		0 AUDIO_COPP \
		1 AUDIO_POPP \
		All other values are invalid. \
		cal_samplerate \
		Sample rate of the device selected using cal_devid. \
		cal_topoid \
		Topology ID associated to the selected device for which the calibration required. \
		cal_moduleid \
		Module ID associated to the selected topology for which the calibration required. \
		cal_paramid \
		Parameter ID associated to the selected module for which the calibration required. \
		Only topology/module/param IDs defined in the QACT are accessible for set/get. \
		This interface is used only to tune the defined parameters in QACT earlier. \
		Examples Set/Get \
		Utility functions \
		Few utility functions given here which are common for both Set and Get. \
		.ccode \
		// Convert integer array to bytes and then encode. \
		// Base64.NO_WRAP and Base64.NO_PADDING flags are mandatory for proper operation. \
		public String b64encode int[] params \
		if params.length 0 \
		return \
		ByteBuffer byteParams \
		byteParams ByteBuffer.allocateDirect 4*params.length \
		byteParams.order ByteOrder.LITTLE_ENDIAN \
		for int i 0 i params.length i++ \
		byteParams.putInt params[i] \
		byte[] bparams new byte[4*params.length] \
		for int i 0 i 4*params.length i++ \
		bparams[i] byteParams.get i \
		return Base64.encodeToString bparams 0 bparams.length Base64.NO_WRAP Base64.NO_PADDING \
		//Converts received encoded data string to integers \
		public int[] getDecodedParams String keyvalue \
		byte[] decParams Base64.decode keyvalue Base64.NO_WRAP Base64.NO_PADDING \
		ByteBuffer byteParams \
		byteParams ByteBuffer.allocateDirect decParams.length \
		byteParams.order ByteOrder.LITTLE_ENDIAN \
		int[] iParams new int[decParams.length] \
		byteParams.put decParams \
		int len 0 \
		for int i 0 i byteParams.limit i i+4 \
		iParams[len] byteParams.getInt i \
		len++ \
		return iParams \
		// Get value for a given key from key1 value1 pairs \
		public String getValueByKey String key String keyValuePairs \
		String[] res \
		String[] sparams keyValuePairs.split \
		for int i 0 i sparams.length i++ \
		res sparams[i].split \
		if res[0].equalsIgnoreCase key \
		return res[1] \
		return \
		Set data of one parameter \
		Say param_id 0x10001112 module_id 0x10001111 . \
		Setting two volume levels of a current active audio playback session. \
		.ccode \
		int[] param_data [0x4000 0x8000] // volume1 and volume 2 \
		String value b64encode param_data \
		String key cal_persist 0 cal_devid 2 cal_apptype 69936 cal_caltype 0 cal_samplerate 48000 cal_topoid 0x10000001 cal_moduleid 0x10001111 cal_paramid 0x10001112 \
		key key + cal_data \
		key key + param_data \
		AudioManager aManager AudioManager getSystemService Context.AUDIO_SERVICE \
		aManager.setParameters key \
		Set data of multiple parameters \
		Set gain and enable parameters of module1 and filter coeff of module2. \
		Say filter coefficients of length 16 bytes with data [0xA1A2A3A4 0xA5A6A7A8 0xB1B2B3B4 0xB5B6B7B8] \
		.ccode \
		// module 1 \
		int module_id1 0x10001111 \
		int gain_id1 0x10000001 \
		int gain_data 0x4000 \
		int enable_id1 0x10000002 \
		int enable_data 1 \
		// module 2 \
		int module_id2 0x10002222 \
		int filter_id1 0x10000003 \
		// Data format is explained in setParameters API \
		// Data format MODULE 1 PARAMID 1 RESERVED LENGTH DATA MODULE 2 PARAMID 1 RESERVED LENGTH DATA . \
		int[] data [module_id1 gain_id1 4 gain_data module_id1 enable_id1 4 enable_data module_id2 filter_id1 16 0xA1A2A3A4 0xA5A6A7A8 0xB1B2B3B4 0xB5B6B7B8] \
		String value b64encode data \
		String key cal_persist 0 cal_devid 2 cal_apptype 69936 cal_caltype 0 cal_samplerate 48000 cal_topoid 0x10000001 \
		key key + cal_data \
		key key + value \
		AudioManager aManager AudioManager getSystemService Context.AUDIO_SERVICE \
		aManager.setParameters key \
		Get a parameter \
		Get a volume parameter from ACDB \
		cal_persist 1 // persit \
		cal_devid 2 //speaker \
		cal_apptype 69936 //audio playback \
		cal_caltype 0 //COPP \
		cal_topoid 0x10313 //topology id associated to device in QACT \
		cal_moduleid 0x10C38 \
		cal_param_id 0x10C37 \
		.ccode \
		// Get volume \
		String key cal_persist 1 cal_devid 2 cal_apptype 69936 cal_caltype 0 cal_samplerate 48000 cal_topoid 0x10313 cal_moduleid 0x10C37 cal_paramid 0x10C38 cal_data 0 \
		AudioManager aManager AudioManager getSystemService Context.AUDIO_SERVICE \
		String rcv_params aManager.getParameters key \
		String value getValueByKey cal_data rcv_params \
		int[] final_params getDecodedParams value // final_params stores the volume \
		Test Application \
		Audio Calibration Test application audiocal.apk is available in SDK for trying set/get parameters interface This application is useful for quick testing and giving demos. \
		HAP customers can directly use these methods to develop new media applications of interest. \
		The test application imports the user configuration from /data/audiocal.xml file. \
		Configuration XML file stores the device topology module and parameters information Users can modify and import the configurable parameters to select. \
		.lua \
		return E.left E.img src images/audiocal_app.png alt Image not found \
		Follow the simple steps to try an application. \
		Install audiocal.apk \
		.ccode \
		cd HEXAGON_SDK_ROOT /lib/audio/audiocal/ \
		adb install audiocal.apk \
		adb root \
		Edit HEXAGON_SDK_ROOT /lib/audio/audiocal/audiocal.xml with custom module information \
		push audiocal.xml to /data \
		.ccode \
		cd HEXAGON_SDK_ROOT /lib/audio/audiocal \
		adb push audiocal.xml /data \
		Launch Audiocal application on Android phone \
		Click Load Audio Cal Database button to import data from /data/audiocal.xml file \
		Select configurable parameters Say \
		.ccode \
		Device AUDIO_DEVICE_OUT_SPEAKER \
		AppType AUDIO_PLAYBACK \
		calType AUDIO_COPP \
		Sampling 48000 \
		Topology speaker_copp_mono_audio \
		Module codec_gain_ctrl \
		Params rx_codec_gain \
		Persist select checkbox \
		Click Get to receive rx_codec_gain from ACDB Received parameters will be displayed below the Get button. \
		Play any audio file \
		Select same configuration and remove checkbox for Persist \
		Click Get to receive rx_codec_gain from speaker_copp_mono_audio topology in ADSP COPP \
		NOTE Check logcat for more information. \
		.ccode \
		adb logcat s rtclog \
		Quick FAQ \
		1 Is setParameters method returns status success/failure ? \
		No setParameters in Android Manager don t return status of the call You need to do Get after Set and verify the data received. \
		2 Is it possible to add new parameter with unique ID to ACDB using this interface? \
		No This interface only allows to replace the existing parameters in ACDB when used wit persist option You need to use QACT/QACT_Lite tool to add new parameter and then use this interface to modify it at run time from java application. \
		3 Is this interface supports calibration of voice modules? \
		No Currently voice is not supported. \
		4 Parameters failed to persist after reboot? \
		Parameters set using persist option are stored in acdb files created at run time Mostly creation of these files failed due to lack of access to media server. \
		Fix is already released in later APPS builds moving to latest APPS build helps.	",
	"id":88
}
idx.add(doc)
urls[88]='Audio/audio_calibration_using_app.html'
titles[88]="Run Time Audio Calibration"

var doc = {
	"title": "Audio module: on-target",
	"body": " \
		Overview \
		A dynamic library generated and tested on simulator earlier can be loaded on \
		target Android device . \
		The steps are summarized below \
		Update the ACDB Audio Calibration Database with details of custom topology containing new module \
		Pushing the module to Target \
		Conduct real time calibration of the audio module \
		Get started on QACT Lite \
		QACT Qualcomm Audio Calibration Tool Lite helps you load the custom module on target by \
		updating the ACDB See the page [Target Testing QACT] audio_target_testing_qact.html to get started. \
		Pushing the module to Target \
		The dynamic object is pushed to target. \
		See the section [Audio Module Addition] audio_target_testing_qact.html Adding audio module to target \
		Real Time Calibration of Module \
		There are two methods for real time calibration of module. \
		Using QACT Lite. \
		Using QACT Lite \
		QACT Lite provides a GUI based real time calibration of audio modules Refer [QACT Lite page] audio_target_testing_qact.html for details. \
		Using audiocal Java application \
		NOTE Real time calibration using java application is supported for APQ8094 dragonboard only. \
		Real time calibration using java application is supported now More detailed information is available at [audio calibration using app page] audio_calibration_using_app.html \
		This section explains about the usage of android java application audiocal.apk which is a part of SDK and can set/get params of a module. \
		Following steps will perform real time calibration of module parameters \
		Push ADSP split binaries to /etc/firmware and reboot the device. \
		adb root \
		adb install HEXAGON_SDK_ROOT /lib/audio/audiocal/audiocal.apk \
		Add topology module and parameter information to HEXAGON_SDK_ROOT /lib/audio/audiocal/audiocal.xml \
		.ccode \
		! Modules data \
		module name fir_filter id 0x00000001 \
		param name fir_enable id 0x12D03 \
		value 0x1 /value \
		/param \
		param name fir_disable id 0x12D03 \
		value 0x0 /value \
		/param \
		param name fir_highpass_coeff id 0x12D05 \
		value 0x0000000D 0xF838F9A3 0xF5D2F6EC 0xF474F4FB 0xF4747501 0xF5D2F4FB 0xF838F6EC 0xFB1AF9A3 /value \
		/param \
		param name fir_lowpass_coeff id 0x12D05 \
		value 0x0000000D 0x001DFFF3 0x016BFB99 0x0C08FA71 0x0C08309A 0x016BFA71 0x001DFB99 0x0000FFF3 /value \
		/param \
		/module \
		! Topologies data \
		topology name custom_topology id 0x100000FD \
		module name fir_filter id 0x00000001 / \
		/topology \
		adb remount \
		adb push HEXAGON_SDK_ROOT /lib/audio/audiocal/audiocal.xml /data/ \
		Start audio playback preferably loop it \
		Launch Audiocal application in device \
		Press LOAD AUDIO CAL DATABASE button \
		To set/get params \
		Select Device AUDIO_DEVICE_OUT_SPEAKER \
		Select AppType AUDIO_PLAYBACK \
		Select calType AUDIO_COPP \
		Select Sampling 48000 might change based on your topology and device \
		Select Topology custom_topology \
		Select Module fir_filter \
		Select param fir_coeff \
		Don t set Persistent for real time calibration \
		Press Set \
		You can verify the data set or not by pressing Get after Set \
		You can see the effect of setting low pass and high filter coeff	",
	"id":89
}
idx.add(doc)
urls[89]='Audio/TestingAudioOnTarget.html'
titles[89]="Audio module: on-target"

var doc = {
	"title": "Audio overview",
	"body": " \
		Overview \
		*The audio framework described below reflects the software architecture up through the SDM845 family only However dynamic modules produced with this version of the SDK are interoperable with the new audio framework present in the SM8150 family.* \
		Qualcomm s Hexagon SDK allows customers to customize and extend the usage of the \
		Hexagon aDSP. \
		The Hexagon SDK s documentation provides information about Elite firmware architecture deployed on Hexagon aDSP. \
		Elite is the firmware framework on Hexagon processor for Multimedia processing. \
		Simple efficient and flexible framework for audio/voice \
		Extensible to non audio concurrences \
		The service is the basic functional unit in Elite \
		Consists of a thread working on some combination of triggers from command queues data buffer queues response message queues and other signals \
		Static services are created at boot time and are persistent Stream Manager and Device Manager are Static services see diagram below \
		Dynamic services are created managed and destroyed by static services as needed Audio Decoder and Audio Post/Preprocessing services are dynamic services. \
		Goals \
		Enable easy creation of new audio modules \
		Provide a unit test framework that allows off target testing of audio \
		modules \
		On Target testing of dynamic library. \
		Elite audio framework \
		This SDK enables the customization of portions of the Elite Audio Framework. \
		Overview \
		The Elite Audio Framework provides I/O paths to and from audio hardware ports. \
		Elite audio paths are composed of three parts encoders/decoders pre/post \
		processing topologies and a mixer. \
		Each stream consists of either an encoder or a decoder Or in the case \
		of a read/write stream transcoder the stream may consist of both an encoder \
		and a decoder. \
		Pre/post processing Topologies consist of one or more Post Processing pp \
		modules Topologies fall into one of four categories depending on where in \
		the data path they are applied. \
		POPP Per Object Post Processing pp modules applied on a per stream \
		basis after decoding \
		COPP Common Object Post Processing pp modules applied on a per device \
		basis after mixing \
		POPREP Per Object Pre Processing pp modules applied on a per stream \
		basis before encoding \
		COPREP Common Object Pre Processing pp modules applied on a per device \
		basis before mixing \
		The mixer defines how the streams connect to the devices. \
		The following diagram illustrates the structure of audio paths \
		HLOS Stream Manager Device Manager \
		Mixer COPP Device \
		Stream \
		++ Decoder POPP ++ + + + \
		+ + COPP + Device \
		Stream + + COPREP + Device \
		++ Encoder POPREP ++ + + + \
		COPREP Device \
		Pre/Post processing topologies \
		The Elite framework defines a pre/post topology as an ordered chain of one or \
		more pp modules that are applied to the audio data in sequential order. \
		Topologies are identified by a numeric ID and are chosen at runtime for each \
		audio path via HLOS initiated APR messages that contain the desired topology \
		ID Once the stream or device is created the topology cannot be changed. \
		The Elite Framework includes a collection of built in static topology \
		definitions static audio modules. \
		The following diagram illustrates the proposed runtime structure the static \
		aDSP image with custom static and dynamic audio modules Custom1/2.a and \
		Custom3.so are libraries that can contain a combination of one or more audio \
		pp modules. \
		Static Hexagon Image \
		custom2.a \
		PP Mod \
		custom1.a custom3.so \
		PP Mod PP Mod PP Mod \
		PP Mod PP Mod PP Mod \
		Topo Encoder PP Mod PP Mod \
		Definitions \
		Decoder PP Mod PP Mod \
		Elite \
		Framework Decoder PP Mod PP Mod \
		Common Audio Processor Interface v2 CAPI v2 \
		CAPIv2 interface is used in the aDSP framework for the Audio subsystem. \
		For more information about CAPIv2 please refer [CAPIv2 Introduction] /CAPIv2/CAPIv2_Introduction.html \
		Moving ahead \
		Creation of new audio modules \
		See [Audio examples] Examples.html \
		Unit testing \
		See [Audio unit test] TestingAudioUnitTests.html \
		On target testing of audio modules \
		See [Audio module target testing] TestingAudioOnTarget.html	",
	"id":90
}
idx.add(doc)
urls[90]='Audio/audio_overview.html'
titles[90]="Audio overview"

var doc = {
	"title": "Audio examples",
	"body": " \
		Overview \
		The Hexagon SDK contains projects which are intended to serve as templates for \
		creating new custom pp modules and topology definitions These examples use the CAPIV2 interface [CAPIv2] /CAPIv2/CAPIv2_Introduction.html \
		Building architecture \
		Building CAPIv2/CAPI/APPI modules \
		Eclipse based \
		Import the project from specific example to be tested Import the \
		project as Common Library project The project can be found at \
		SDK_ROOT /examples/audio// example_name /eclipse/ . \
		As an example appi_fir is used \
		File Import Hexagon C/C++ \
		Project Type Common Library .lib/.so \
		.lua \
		return E.left E.img src images/import.jpg alt Image not found \
		Ensure that project path SDK root and Tools root are set appropriately. \
		Build the project \
		Right click on project Build Configuration Build all \
		This project builds Dynamic and Static libraries in debug and release mode. \
		Verify all libraries to be built. \
		NOTE Snapshot may vary slightly based on version of Eclipse plug ins used. \
		Command line interface \
		Building and testing a library is clubbed together in a single command The \
		steps to generate a library are covered in command line based unit testing . \
		Moving ahead \
		Unit testing \
		To unit test an CAPIv2/APPI/CAPI module click [here] TestingAudioUnitTests.html \
		Adding CAPIv2/CAPI/APPI modules to amdb \
		Use DSP module manager functionality in QACT Lite to add modules to AMDB. \
		Voice Examples \
		Refer to [Voice examples] /Voice/VoiceExamples.html for details.	",
	"id":91
}
idx.add(doc)
urls[91]='Audio/Examples.html'
titles[91]="Audio examples"

var doc = {
	"title": "Audio unit testing",
	"body": " \
		Overview \
		The Hexagon SDK provides a framework that enables unit testing of created \
		modules Unit testing can be done using \
		Eclipse projects \
		Import existing Eclipse project into workspace compile the project and \
		easily run and debug unit test executable. \
		Quality tests qtests . \
		qtests are specified like any other target in a project s makefile. \
		They are automatically run as part of the build process to complete \
		the build/test development process The tests themselves are compiled \
		into Hexagon binaries and run via the Hexagon simulator. \
		Currently qtests are only meant to be run on the Hexagon simulator not \
		on target. \
		Architecture \
		Support libraries \
		The SDK provides general unit test support libraries \
		[test_main] /Platforms_Simulator.html test_main \
		[test_util] /Platforms_Simulator.html test_util \
		In addition the SDK provides audio specific test support libraries. \
		CAPIv2 Interface \
		test_capi_v2 \
		capi_v2_utils_prop \
		capi_v2_test \
		This library provides a test framework for verifying the functionality of \
		objects that export APPI For more information see [[CAPIv2 test framework]] \
		APPI Interface \
		test_appi \
		appi_test \
		This library provides a test framework for verifying the functionality of \
		objects that export APPI For more information see [[APPI test framework]] \
		CAPIv2 test framework \
		To know about CAPIv2 unit test framework functions and configuration file please refer [CAPIv2 unit test framework] /CAPIv2/Testing_CAPIv2 Unit Tests.html \
		APPI test framework \
		The support library test_appi contains an APPI specific test framework \
		that allows for the verification of objects exporting the APPI interface The \
		framework is run by calling the framework s entry point from within a qtest s \
		[Test sources] /Platforms_Simulator.html Test sources The signature of the entry point \
		is as follows \
		.ccode \
		ADSPResult test_appi_main getsize_f_t getsize_f init_f_t init_f \
		const char *filename_in const char *filename_out \
		const char* filename_config \
		getsize_f and init_f should contain function pointers to the pp module s \
		getsize and init functions These can be obtained by calling dlsym in \
		the qtest s [[Test sources]]. \
		filename_in is the name of an audio file that should be processed by the \
		test \
		filename_out is the name of the output file generated by processing \
		filename_in. \
		filename_config is the [[Test configuration file]] that determines how the \
		framework should verify the APPI module. \
		The qtests for Hexagon SDK examples passthru and gain use the APPI Test \
		Framework For more detailed information about how to call it see those \
		example s qtest source files. \
		Currently the APPI Test Framework does not support verification of the output \
		audio file vs a known reference audio file Future versions of the Hexagon SDK \
		hope to add support for this feature Until then the verification of the output \
		file is left to the user. \
		test_appi \
		. \
		See the main [unit_test documentation] /Platforms_Simulator.html Enabling Simulator test . \
		Test configuration file \
		Each test is configured using a configuration file This file contains a list of \
		commands to execute The test framework reads and executes the commands from \
		the config file sequentially Note that the commands are case sensitive and \
		should be entered exactly as they appear below. \
		The test framework supports the following commands and their parameters \
		[[ProcessData]] \
		NumBuffers number \
		[[SetMediaFormat]] \
		SetNumInChannels number \
		SetNumOutChannels number \
		SetInSamplingRate number \
		SetOutSamplingRate number \
		SetBytesPerSample number \
		[[SetMediaFormatWithMapping]] \
		SetNumInChannelsAndMapping number \
		SetNumOutChannels number \
		SetInSamplingRate number \
		SetOutSamplingRate number \
		SetBytesPerSample number \
		RefPayloadSizeInBytes number \
		[[SetParamInband]] \
		PayloadSizeInBytes number \
		[[GetParamInband]] \
		PayloadSizeInBytes number \
		payload \
		ProcessData \
		. \
		Processes input buffers from the input file to the output file. \
		This command exercises the pp module s APPI methods get_input_required and \
		process . \
		e.g. \
		ProcessData \
		NumBuffers 10 \
		SetMediaFormat \
		Sets the media parameters This should be done to verify the correct handling \
		of specific media parameters and also before a call to [[ProcessData]] to set \
		up the medial parameters to be used during the processing It sets the APPI \
		library with the specified parameters by calling the pp module function \
		reinit . \
		This command exercises the pp module s APPI method reinit . \
		e.g. \
		SetMediaFormat \
		SetNumInChannels 2 \
		SetNumOutChannels 2 \
		SetInSamplingRate 48000 \
		SetOutSamplingRate 48000 \
		SetBytesPerSample 2 \
		SetMediaFormatWithMapping \
		. \
		Sets the media parameters along with channel mapping This should be done to \
		verify the correct handling of specific media parameters and also before a call \
		to [[ProcessData]] to setup the medial parameters to be used during the \
		processing It sets the APPI library with the specified parameters by calling \
		the pp module function reinit . \
		This command exercises the pp module s APPI method reinit . \
		e.g. \
		SetMediaFormatWithMapping \
		SetNumInChannelsAndMapping 3 \
		1 2 3 \
		SetNumOutChannels 3 \
		SetInSamplingRate 48000 \
		SetOutSamplingRate 48000 \
		SetBytesPerSample 2 \
		SetParamInband \
		Sets a parameter value The information on the parameter and its payload are \
		specified after the PayloadSizeInBytes parameter as illustrated in the example \
		below. \
		This command exercises the pp module s APPI method set_param . \
		e.g. \
		SetParamInband \
		PayloadSizeInBytes 24 \
		00 00 00 00 Data Payload address \
		10 00 00 00 Size of Payload \
		F1 FF FF FF MODULE_ID_GAIN_CTRL 0xFFFFFFF1 \
		11 10 00 10 PARAM_ID_GAIN_CTRL_MASTER_GAIN 0x10001011 \
		04 00 00 00 Param Size and Padding \
		02 00 00 00 Gain value and reserved \
		GetParamInband \
		Gets a parameter value The information on the parameter and its payload are \
		specified after the PayloadSizeInBytes parameter as illustrated in the example \
		below Note that GetParamInband contains an additional parameter called \
		RefPayloadSizeInBytes that specifies the expected binary value of the received \
		parameter. \
		This command exercises the pp module s APPI method get_param . \
		e.g. \
		GetParamInband \
		PayloadSizeInBytes 16 \
		00 00 00 00 Data Payload address \
		F1 FF FF FF MODULE_ID_GAIN_CTRL 0xFFFFFFF1 \
		08 07 01 00 APPI_PARAM_ID_ALGORITHMIC_DELAY 0x00010708 \
		04 00 00 00 Param Size and Padding \
		RefPayloadSizeInBytes 4 \
		00 00 00 00 \
		CAPI test framework \
		The unit test file contains a CAPI specific test framework that allows for the \
		verification of objects exporting the CAPI interface The \
		framework is run by calling the framework s entry point from within a qtest s \
		[Test sources] /Platforms_Simulator.html Test sources The signature of the entry point \
		is as follows \
		.ccode \
		void test_capi_main capi_getsize_f getsize_f capi_ctor_f ctor_f \
		void *pFmtBlk const char* filename_in \
		const char* filename_out \
		getsize_f and ctor_f should contain function pointers to the CAPI module s \
		getsize and ctor functions These can be obtained by calling dlsym in \
		the qtest s [[Test sources]]. \
		pFmtBlk corresponds to pointer to format block sent by APPS processor while \
		executing media format update command \
		filename_in is the name of an audio file that should be processed by the \
		test \
		filename_out is the name of the output file generated by processing \
		filename_in. \
		The qtests for SDK example pcm_decoder uses the CAPI Test Framework For \
		more detailed information about how to call it see capi_pcm_decoder.cpp file \
		Currently the CAPI Test Framework does not support verification of the output \
		audio file vs a known reference audio file Future versions of the SDK hope to \
		add support for this feature Until then the verification of the output file is \
		left to the user. \
		Also in CAPI Test Framework media format block is set inside main SDK users \
		are expected to modify module_test.cpp file Currently Media format block \
		pointer is sent to test_capi_main In future versions of SDK this is expected \
		to move to a configuration file hence avoiding manual addition of media format \
		block. \
		Unit testing CAPI/APPI/CAPIv2 modules \
		NOTE Present context covers unit testing of APPI FIR example However similar steps need to be followed for testing CAPIv2 and CAPI modules. \
		Eclipse based \
		Import the library project from specific example to be tested Import the \
		project as Common Library .lib/.so For more information on this please refer \
		IDE Docs \
		As an example appi_fir is used Similar steps should be followed for \
		other examples. \
		File Import Hexagon C/C++ \
		Project Type Common Library .lib/.so \
		.lua \
		return E.left E.img src images/import_library_test.png alt Image not found \
		Ensure that project path SDK root and Tools root are set appropriately. \
		Build the library project \
		Right click on project Build Configuration Build all \
		This project builds Dynamic and Static libraries in debug and release mode. \
		Verify all libraries to be built. \
		Import the test project from specific example to be tested Import the \
		project as Executable .exe For more information on this please refer \
		IDE Docs \
		As an example appi_fir is used Similar steps should be followed for \
		other examples. \
		File Import Hexagon C/C++ \
		Project Type Executable .exe \
		.lua \
		return E.left E.img src images/import_unit_test.jpg alt Image not found \
		Ensure that project path SDK root and Tools root are set appropriately. \
		Build the test project \
		Right click on project Build Configuration Build all \
		This project builds test Executable in debug and release mode. \
		By default Eclipse project builds Static module To test dynamic library \
		add __V_DYNAMIC__ flag to Eclipse test projects. \
		To run/debug unit test exe. \
		a Create a new run configuration for unit test executable. \
		Right click on project Run As Run Configurations Hexagon C/C++ Application \
		.lua \
		return E.left E.img src images/run_config.jpg alt Image not found \
		a Input Arguments to binary \
		Add input arguments to the executable. \
		For APPI input output and config files have to be specified ex appi_fir \
		i / /data/wnoise_48k_stereo.raw o / /data/output_wnoise_48k_stereo.raw \
		c / /data/hpf.cfg \
		.lua \
		return E.left E.img src images/input_args.jpg alt Image not found \
		For CAPI input and output files have to be added ex capi_pcm_decoder \
		i / /data/input.raw o / /data/output.raw \
		For CAPIv2 input and output files have to be added ex capi_v2_decimate \
		i / /data/input.raw o / /data/output.raw \
		c / /data/decimation_factor_set.cfg \
		Instead of adding input arguments manually use qhut file \
		Right click on project test_appi_fir New File \
		Create a new file named test_list.qhut \
		Create new test cases using qhut file \
		.lua \
		return E.left E.img src images/qhut.jpg alt Image not found \
		NOTE This should not be used for capi example as no configuration \
		file supported. \
		a If dynamic library is being tested then specify it s relative path using \
		usefs flag Add the following simulator flag in Miscellaneous box on \
		Simulator tab Example below shows the method to test appi_fir.so Shared \
		debug library. \
		usefs /appi_fir/Shared Debug \
		.lua \
		return E.left E.img src images/usefs.jpg alt Image not found \
		Similarly other simulation parameters can be passed on to simulator from \
		this UI All simulation parameters can be found on Hexagon Programmers \
		Reference manual Explore these parameters to have close results to target \
		on simulator. \
		NOTE All the Test Executables projects are provided with a .launch and .qhut file Launch file .launch file provides required configuration to Run/Debug the project Step 5 can be avoided by \
		clicking on Run or Debug icon by selecting the project This will Run/Debug with the configuration provided in launch file \
		Command line based unit testing \
		In command line based unit test framework the library is built first and then \
		unit tested using a single command. \
		As a reference example appi_fir is used Please execute similar commands to \
		test other APPI/CAPI/CAPIv2 examples. \
		* Instructions to test Dynamic Library \
		Open a CLI shell and navigate to HEXAGON_SDK_ROOT /examples/audio/appi_fir \
		cd HEXAGON_SDK_ROOT /examples/audio/appi_fir \
		Execute the following command to test Dynamic Library. \
		Target hexagon Toolset version v81 Arch Version V65 Flavor Debug Options dynamic \
		make V hexagon_Debug_dynamic_toolv81_v65 tree VERBOSE 1 \
		Verify the test to be passed \
		* Instructions to test Static Library \
		Open a CLI shell and navigate to HEXAGON_SDK_ROOT /examples/audio/appi_fir \
		cd HEXAGON_SDK_ROOT /examples/audio/appi_fir \
		Execute the following command to test Static Library \
		Target hexagon Version V5 Flavor Debug \
		make V hexagon_Debug tree VERBOSE 1 \
		Verify the test to be passed \
		For more information on building using make.d please refer \
		[make.d] /Environments_Build System.html documentation. \
		NOTE In command line based unit testing input arguments to executable are \
		hard coded in the unit test source file. \
		Also for loading a dynamic library usefs flag is added to build system. \
		Measuring KPPS of algorithm in unit testing \
		To measure KPPS requirement measure the number of cycles consumed by APPI process function for one block of data If there is no block size in the algorithm assume it to be around 50 100 samples to eliminate the effect of the fixed overheads in the function. \
		KPPS process_cycles / BLOCK_SIZE * sampling_rate	",
	"id":92
}
idx.add(doc)
urls[92]='Audio/TestingAudioUnitTests.html'
titles[92]="Audio unit testing"

var doc = {
	"title": "Audio",
	"body": " \
		[Overview] audio_overview.html \
		Provides an overview of Elite Framework CAPIv2 modules. \
		[Examples] Examples.html \
		Explanation of audio examples in the Hexagon SDK. \
		Build Architecture and Process. \
		Steps to build CAPIv2 module using Eclipse or in a CLI shell. \
		[Unit testing] TestingAudioUnitTests.html \
		Detailed explanation of Unit test framework for audio modules. \
		Hands on steps to unit test a module using Eclipse or in a CLI shell. \
		[Target testing] TestingAudioOnTarget.html \
		Steps to integrate audio module into AMDB Audio Module Database On Target. \
		[Unit Testiing for Voice] /Voice/TestingVoiceUnitTests.html \
		Exmplanation of test framework for voice modules Steps to unit test a voice module in a command line window. \
		[Target testing for Voice] /Voice/TestingVoiceOnTarget.html \
		Steps to test dynamic voice on a target device. \
		[Run time audio calibration] audio_calibration_using_app.html \
		Provides run time access to audio tuning parameters of modules running in COPP/POPP path from an Android Java user applications. \
		Currently this interface supports only for audio Voice is not supported. \
		This is applicable for APQ8094 only.	",
	"id":93
}
idx.add(doc)
urls[93]='Audio/Applications.html'
titles[93]="Audio"

var doc = {
	"title": "Camera streaming examples",
	"body": " \
		Overview \
		Camera streaming examples includes hvx_add_constant This simple \
		examples shows how a developer would use the utilities provided by camera \
		streaming framework to develop a camera streaming use case for Bayer pixel data \
		processing. \
		Please make sure to have the dependencies ready before running examples on \
		device See [Dependencies]. \
		Goals \
		In general the goals for this example is to \
		Show how to use the utilities provided by camera streaming framework \
		Provide programming model for developers. \
		Show different use cases that camera streaming usually handle \
		Using these examples as reference developers can replace the processing \
		portion of the code with their own and quickly implement their own camera \
		streaming use case. \
		The add_constant example shows how application can pass runtime parameter from \
		OEM plugin to QDSP6 lib and how application can transmit and access buffers between \
		Android and DSP. \
		Example contents \
		Dependencies \
		Camera streaming example require DSP6 V60 and above. \
		Camera streaming example require Hexagon tools version 7.2.06 or above for \
		compilation and simulation. \
		All code level dependencies are included in HexagonSDK. \
		QDSP6 lib s dependencies are at \
		HexagonSDK root / version /lib/camera_streaming/framework \
		This folder contains \
		**adsp_hvx.h** The fastrpc API for camera streaming module to call ADSP from ARM \
		**adsp_hvx_callback.h** The fastrpc API for camera streaming module to callback to ARM \
		**adsp_hvx_common.h** common data structures shared by camera streaming \
		framework and QDSP6 lib \
		**adsp_hvx_process_utils.h** utility functions to help streaming process to be \
		in sync with ISP \
		**libadsp_hvx_skel.so** binary for camera streaming framework on QDSP6 side \
		OEM plugin s dependencies are at \
		HexagonSDK root / version /lib/camera_streaming/framework_stub \
		This folder contains \
		**hvx_lib.h** the API for OEM plugin to implement \
		All dependency files are required to be present to build the examples. \
		File Structure \
		Two examples are provided with HexagonSDK release both have OEM plugin and \
		QDSP6 lib implementation Structure wise both examples are similar so we take \
		hvx_add_constant as example for better explanation. \
		The OEM plugin implementation is at \
		hexagonSDK root / version /examples/camera_streaming/hvx_add_constant_stub \
		A single c source file is included \
		**hvx_add_constant.c** is implemented following hvx_lib.h \
		The QDSP6 lib implementation is at \
		hexagonSDK root / version /examples/camera_streaming/hvx_add_constant \
		It contains a set of header c source and asm source files to generate the \
		shared library for streaming processing. \
		**asm_src/add_constant.S** is the assembly file for add constant function. \
		This file contains most of data processing \
		**inc/hvx_app_add_constant.h** is the header file for copy line function. \
		**inc/hvx_add_constant_def.h** is the header shares runtime parameter \
		structure with user lib in Android side \
		**src/hvx_app_add_constant.c** is the c source code This file contains most \
		of the control logic \
		**hexagon.min** contains information required to build the DSP libraries \
		and test executable It may need to be modified if source files and/or \
		dependencies are changed See [Command line development environment] \
		/Environments_Build System.html for more information \
		**Makefile** should not need to change See \
		[Command line development environment] /Environments_Build System.html \
		for more information \
		The camera streaming framework binary and header is at \
		hexagonSDK root / version /lib/camera_streaming/framework/ship/hexagon_Release_dynamic_toolv80_v60 \
		**hvx_app_common.h** defines data structures shared between OEM plugin and QDSP6 lib. \
		OEM plugin API and implementation could be updated in Android build release. \
		Please always refer to Android build for latest version Place to check in Android \
		build \
		platform /vendor/qcom/proprietary/mm camerasdk/hvx \
		hvx_add_constant example walk through \
		For each application OEM plugin is responsible for configuring high level HVX \
		camera streaming parameters This is done by hvx_lib_get_hvx_info function. \
		**hvx_add_constant.c** at line 38. \
		input to the function \
		sensor_width and sensor_height sensor output resolution which is also \
		HVX input resolution. \
		available_hvx_units and available_hvx_vector_mode this is the hardware capability of \
		HVX supported This will always be 4 and 64 byte mode. \
		output user needs to specify \
		hvx_enable set to HVX_TRUE to enable HVX set to HVX_FALSE to disable HVX. \
		algo_name camera streaming framework will take this string and invoke \
		corresponding algorithm in DSP side Please refer to Naming Conventions for \
		details. \
		hvx_out_width and hvx_out_height unless this is a downscale application \
		always put the same value as sensor_width and sensor_height. \
		request_hvx_units and request_hvx_vector_mode user needs to specify of \
		units and mode to use for this application \
		is_pix_intf_needed set to HVX_TRUE if HVX should be connected to VFE. \
		is_dump_frame_needed set to HVX_TRUE if ADSP APPS buffer commnication is required \
		Some more configurations will be done by QDSP6 lib by filling adsp_streamer_config_t \
		strucutre. \
		**hvx_app_common.h** at line 191 adsp_streamer_config_t is defined. \
		**hvx_app_add_constant.c** at line 42 user needs to implement this get_config \
		function Based on input information of frame width and height availabe l2 size \
		rx/tx_line_size user should determine following parameters \
		rx_lines and tx_lines number of lines in rx buffer and tx buffer For each \
		streamer size of RX/TX buffer is determined by rx_lines*rx_line_size \
		tx_lines*tx_line_size Sum of RX/TX buffer size should not exceed \
		available_l2_size. \
		tx_min_start this is number of lines present in RX before TX can start \
		transmission. \
		dynamic_buf_size size of shared data structure with OEM plugin this buffer \
		will be written into CX. \
		rx_pad_size and rx_pad_type see HVX streaming data padding/stripping support \
		section in [Applications] Applications.html page. \
		**hvx_app_common.h** at line 214 adsp_power_voting_t is defined. \
		The actual ADSP clk and bus BW are dependent on use case so the clk voting are exposed to user. \
		please follow example in **hvx_app_add_constant.c** line 42 to fill in the structure. \
		mips_per_thread is usually one quarter of mips_total. \
		The main frame processing function is implemented \
		**hvx_app_add_constant.c** at line 113. \
		hvx_add_constant example shows OEM plugin can send runtime parameter camera streaming \
		framework will store this piece of data in CX QDSP6 lib can get the dynamic \
		buffer using utility API This buffer contains same data as user lib would send. \
		A common data structure is defined in both OEM plugin and QDSP6 lib for data \
		sharing. \
		**hvx_add_constant.c** at line 22 a structure with single integer is defined. \
		**inc/hvx_add_constant_def.h** at line 12 same structure is defined. \
		OEM plugin can update parameters per frame and send these parameters as a strucutre \
		to camera streaming framework The framework will store the structure in CX an \
		API is provided to get the address of this structure. \
		**hvx_add_constant.c** at line 86 structure hvx_update_t is sent. \
		**hvx_app_add_constant.c** at line 154 by calling process_util_get_dynamic_config_buf \
		API user can get pointer to structure hvx_constant_t which contains same \
		information passed from OEM plugin but this information is delayed by one \
		frame. \
		**hvx_app_add_constant.c** at line 276 user can use this runtime parameter \
		hvx_add_constant example also shows frame buffer communication between ADSP and APPS. \
		QDSP6 lib can get buffer from ARM write into it and send \
		back to ARM A buffer queue is implemented to facilitate the buffer management \
		in camera streaming framework. \
		OEM plugin determins whether this application needs buffer. \
		**hvx_add_constant.c** at line 60 set hvx_info is_dump_frame_needed to HVX_TRUE to \
		enable buffer communication \
		In OEM plugin user also needs to define the size of buffer depending on use case. \
		**hvx_add_constant.c** at line 191. \
		user needs to implement hvx_lib_get_dump_buffer_size function \
		isp hvx interface software module will call this function providing VFE frame structure \
		output_width and output_height are frame resolution \
		right_stripe_offset and overlap are dual VFE parameters \
		dump_frame_size is the return value that indicates the size of buffer each streamer needs \
		if frame dump is the use case dump_frame_size should be as large as frame size with padding \
		if stats collection is use case dump_frame_size should depend on the amount of stats to be collected \
		The filled buffer will be returned to hvx_lib_consume_dump method. \
		**hvx_add_constant.c** at line 97. \
		the example code will store the buffer into file system on device \
		it depends on user and use case how to handle these filled buffers \
		user should implement their own way of buffer handling \
		A buffer queue is implemented within camera streaming framework to maintain \
		internal buffer rotation scheme QDSP6 lib is able to access to the buffers by \
		dequeuing elements. \
		**hvx_app_common.h** at line 132 and line 138 buffer structure and buffer queue \
		structure are defined. \
		**hvx_app_add_constant.c** at line 265 user could dequeue a buffer and find buffer address and buffer label. \
		After the buffer is filled it will be send back to OEM plugin for furthur parsing. \
		**hvx_app_add_constant.c** at line 39 user should call hvx_event_queue_enqueue \
		API to send the buffer to Android Buffer label and buffer address has 1 to 1 mapping Enqueuing filled buffer label would inform streaming framework this buffer is filled. \
		Function naming conventions \
		Multiple OEM plugin libs and QDSP6 libs can exist in device at same time A set \
		of them uses a string to pair with each other The naming of functions and libs \
		should follow these conventions \
		**hvx_add_constant.c** in implementation of hvx_lib_get_hvx_info algo_name \
		will be defined by user. \
		Assuming this algo_name is sample_algo then the QDSP6 lib should be named as \
		libadsp_hvx_sample_algo.so the main processing function in QDSP6 lib should be \
		named as hvx_sample_algo and the get_config function in QDSP6 lib should be \
		named as hvx_sample_algo_get_config . \
		Building examples \
		Steps to build the hvx_add_constant example are as follows The same applys to \
		other camera streaming examples as well. \
		Build OEM plugin \
		From sdk_root /examples/camera_streaming/hvx_add_constant_stub \
		make \
		libmmcamera_hvx_add_constant.so will be generated under ship folder. \
		Build QDSP6 lib \
		From sdk_root /examples/camera_streaming/hvx_add_constant \
		make tree V hexagon_Release_dynamic_toolv80_v60 VERBOSE 1 \
		Note that the tree in the make command is necessary to build all the example s \
		dependencies for the specified variant hexagon_ReleaseG VERBOSE 1 is an \
		optional flag to display the details of the make and its included simulation \
		test result Subsequent rebuilds of the example for the same variant can omit \
		the tree as follows. \
		make V hexagon_Release_dynamic_toolv80_v60 \
		Note that this make command builds the QDSP6 lib in shared library .so format. \
		This shared library will be loaded to target chip set that supports HVX streaming. \
		Load example to device \
		There is a way to test camera streaming code off line on simulator given below but due to the nature of streaming examples \
		are usually tested on a target device with proper imaging sensor mounted. \
		As a pre requirement the target device should have APPS build and DSP build be pre loaded See [Dependencies]page for details On top of \
		that taking hvx_add_constant as example \
		NOTE If you have the images distributed by Qualcomm you should already have these files on the device There is no need to push the files on to the device for first time verification \
		push sdk_root /examples/camera_streaming/hvx_add_constant/hexagon_Release_dynamic_toolv80_v60/libadsp_hvx_add_constant.so \
		to /system/lib/rfsa/adsp on device \
		push sdk_root /examples/camera_streaming/hvx_add_constant_stub/hexagon_Release_dynamic_toolv80_v60/libmmcamera_hvx_add_constant.so to /system/lib on device \
		make sure that the test sig is present under /system/lib/rfsa/adsp For the details of generating test sig for your device click [here] /Tools_Signing.html \
		Running the examples \
		Currently the way to run camera streaming examples is to use adb shell \
		setprop command to enable and disable it. \
		Assuming OEM plugin name is libmmcamera_hvx_add_constant.so do the \
		following and this enables HVX camera streaming and loads the specified QDSP6 \
		lib for processing. \
		adb shell setprop persist.camera.hvx_lib_1 libmmcamera_hvx_add_constant.so \
		Then open any camera application on device to see the pixel data processing \
		effects For hvx_add_constant example bright area will periodically boosted \
		to pink color. \
		To disable streaming which make pixel data completely bypass HVX streaming \
		module and act as a normal ISP do \
		adb shell setprop persist.camera.hvx_lib_1 \
		Collect Frame Dump \
		To Enable frame dump set property persist.camera.hvx_fdump_en The value \
		of this property is the number of frames to dump Do the following to enable \
		dump for first 10 frames. \
		adb shell setprop persist.camera.hvx_fdump_en 10 \
		Debug and logging \
		HVX camera streaming works on both Android side and DSP side. \
		To collect Android log \
		adb logcat vthreadtime log.txt \
		In the log file search for iface_hvx_ for information. \
		To collect DSP side log \
		Open QXDM application select Messages View in View drop down menu then the \
		logs would come Right click and select Export All Text to save current logs \
		into file Search for hvx_app_ for information. \
		HVX camera streaming uses fastrpc heavily please refer to [fastrpc page] /FAQ_FastRPC.html \
		to understand fastrpc related issues. \
		SDM845 Camera Streaming \
		Steps to verify Camera Streaming \
		The steps to verify camera streaming are different for SDM845 than SDM820 SDM835 and SDM660 as the camera software architecture on \
		CPU/HLOS side has changed to CamX. \
		Please follow the below steps to verify. \
		1 Flash the appropriate SDM845 build e.g SDM845.LA.1.0.r1 00476 STD.PROD 1 to \
		device. \
		2 Check if the libdsp_streamer_add_constant.so example skel & \
		libdsp_streamer_skel.so streamer framework skel are present in /vendor/lib/rfsa/adsp \
		on the device. \
		3 If not present on device it should be at below locations in HLOS build \
		push them to /vendor/lib/rfsa/adsp on SDM845 device. \
		HLOS BUILD /vendor/qcom/proprietary/camx/src/hwl/dspinterfaces/libdsp_streamer_skel.so \
		HLOS BUILD /vendor/qcom/proprietary/chi cdk/vendor/node/hvx/addconstant/libdsp_streamer_add_constant.so \
		If you cannot find it in the above mentioned locations create a case and we \
		shall look into it. \
		4 Enable camera streaming HVX mode. \
		adb root \
		adb remount \
		Create a new text file with name **camxoverridesettings.txt** and insert \
		**enableHVXStreaming 1** in file and then push it to the device \
		at following location /vendor/etc/camera Create the folders if they are not \
		already present. \
		or \
		If the file exists then do \
		adb shell echo enableHVXStreaming 1 /vendor/etc/camera/camxoverridesettings \
		.txt \
		adb reboot \
		adb root \
		adb remount \
		adb shell setenforce 0 \
		5 Launch Snapdragon Camera App on MTP or the respective camera app on the \
		device in Preview mode and you should see bright area will be periodically boosted \
		to pink color which indicates the camera streaming mode is working with \
		add constant example. \
		Files in SDK \
		Camera Streaming Framework \
		It is not provided in source The generated library is located at \
		SDK Root /libs/camera_streaming/framework/ship/ \
		hexagon_Release_dynamic_toolv81_v65/libdsp_streamer_skel.so \
		NOTE This file may not be the latest and is placed here for successful linking \
		of the example code developed on DSP side DO NOT push this shared object to \
		device as the build flashed to device will already be using an updated version. \
		Example \
		Example source code is located at SDK Root /examples/camera_streaming/hvx_add_constant \
		To build example \
		make tree_clean V hexagon_Release_dynamic_toolv81_v65 VERBOSE 1 \
		make tree V hexagon_Release_dynamic_toolv81_v65 VERBOSE 1 \
		After successful compilation the shared object libdsp_streamer_add_constant.so \
		will be generated and placed in \
		SDK root /examples/camera_streaming/hvx_add_constant/hexagon_Release_dynamic_toolv81_v65/ship \
		NOTE This example will eventually be replaced with camera streaming algorithm \
		or skel code that will run on the DSP in camera streaming mode. \
		OEM Plug in \
		This is the OEM Plug in to be implemented on the HLOS or CPU side It requires \
		familarity in working with CamX software architecture to be able to successfully \
		integrate and load the plug in. \
		for example the add constant OEM plug in source code and build makefiles are placed \
		at HLOS Build /android/vendor/qcom/proprietary/chi cdk/vendor/node/hvx/addconstant \
		In HLOS build /android/vendor/qcom/proprietary/chi cdk/vendor/node/hvx/addconstant camxchihvxaddconstant.cpp \
		implements the OEM plug in APIs as required and listed in chiisphvxdefs.h. \
		The Android.mk in the folder \
		HLOS Build /android/vendor/qcom/proprietary/chi cdk/vendor/node/hvx/addconstant/build/android \
		makes the OEM plug in part of the com.qti.hvx.addconstant module. \
		Similar changes are required when implementing a custom OEM plugin so that the \
		custom algorithm name static and dynamic config can be specified to DSP.	",
	"id":94
}
idx.add(doc)
urls[94]='Camera%20streaming/Examples.html'
titles[94]="Camera streaming examples"

var doc = {
	"title": "Camera streaming",
	"body": " \
		Introduction \
		Camera streaming enables powerful and efficient on the fly pixel manipulation \
		of camera sensor data The streaming module is designed to process pixel data in \
		Bayer domain It is ideal for camera ISP pre processing or handling camera \
		sensors with non conventional Bayer format. \
		Camera streaming application consists of HVX streaming hardware as well as the \
		software stack that controls it HVX streaming hardware is integrated as part \
		of Snapdragon SOC on selected chip sets The software stack is provided by both \
		Qualcomm camera driver and application developers. \
		Please see the [Dependencies] Examples.html page for details about \
		requirement. \
		Camera streaming overview \
		HVX streaming module \
		The HVX streaming module is a piece of hardware located between ISP interface \
		and the pixel interface of the first module of ISP as illustrated below. \
		.lua \
		return E.left E.img src images/hvx_streaming_module.png \
		This streaming module consists of two parts one is the data mover part which \
		interfaces with camera ISP through a dedicated private AXI bus The data mover \
		part is controlled by a programmable register interface. \
		The second part is tightly integrated QDSP6 It receives and transmits data to \
		and from QDSP6 s L2 cache so QDSP6 can access change and compute on these pixel \
		values from camera sensor This is controlled by program written in C/C++ with \
		QDSP6 instructions. \
		HVX streaming data flow \
		Typical HVX streaming data flow can be illustrated in the following diagram. \
		.lua \
		return E.left E.img src images/hvx_streaming_data_flow.png \
		During the hvx streaming process there is no system bus activity or memory \
		read/write access for pixel data Pixel data from camera sensor will be first \
		fetched from ISP interface and saved to receiver buffer in QDSP6 s L2 cache. \
		From there QDSP6 can perform operations on these data. \
		The computed pixel data are put into transmission buffer which is also located \
		in QDSP6 s L2 cache They are fetched and sent to ISP s first module s pixel \
		interface simultaneously with some delay. \
		Transmission and receiving run at the same speed This requires QDSP6 to process \
		the pixel data faster than the rate of transmitting and receiving data to/from \
		VFE. \
		QDSP6 can also output some of its computing results to system memory through \
		system bus This takes complete different data path as streaming and does not \
		impact each other. \
		HVX streaming data format \
		The HVX streaming module takes Bayer raw data patterns RGGB BGGR GRBG GBRG \
		as well as other Bayer like pixel data format It supports 8 10 12 14 bits \
		data. \
		HVX streaming module will unpack Bayer raw data and put each pixel/component \
		in a 16 bits word and make it LSB aligned Like this \
		.lua \
		return E.left E.img src images/hvx_streaming_pixel_data_format.png \
		The unpacked 16bit data is what a programmer will see in QDSP6 s L2 cache. \
		HVX streaming data padding/stripping support \
		Input padding is supported by streamer hardware When a line is received eight extra pixels may be added to the beginning and end of the line The \
		added pixels may be zeros or a replication of recent pixels. \
		.lua \
		return E.left E.img src images/padding.PNG \
		Output stripping is also supported by streamer hardware Once enabled streamer \
		will transmit data offset from location 0 by 8 pixels. \
		HVX streaming frame format \
		A frame sent from camera sensor contains both valid pixels and invalid pixel data It also includes control strobes such as start of frame SOF end of frame EOF start of line SOL end of line EOL etc \
		The pixel data between any EOL and following SOL control strobe and the lines between EOF and following SOF control strobes is referred to as invalid pixel data. \
		The Streamer Hardware strips the invalid pixel data along with the control strobes and stores only the active pixel data in the L2$ which will be processed by the DSP. \
		The stripped control strobes will be re generated at end of QDSP6 process where pixel data is sent back to ISP s pixel interface. \
		.lua \
		return E.left E.img src images/hvx_streaming_frame_format.png \
		Camera streaming framework and APIs \
		Camera streaming framework is deeply integrated with Qualcomm camera driver in \
		order to provide accurate timing required by streaming This framework enables \
		ARM/DSP interaction HVX and ISP synchronization as well as integration of \
		QDSP6 lib and OEM plugin This diagram gives better understanding of how camera \
		streaming framework works. \
		.lua \
		return E.left E.img src images/camera_streaming_framework.png \
		The blue blocks are libraries to be implemented by user They are OEM plugin and \
		QDSP6 lib respectively. \
		The OEM plugin runs in Android s user space driver This lib provides important \
		information that controls the operations on streaming pixel data by HVX \
		including sensor configurations threading control algorithm coefficients as \
		well as parameters to be updated at runtime Application developers are \
		expected to implement this lib using APIs provided by Qualcomm. \
		QDSP6 lib is the core library where developer s own optimized algorithm will run. \
		OEM plugin API \
		OEM plugin API and implementation could be updated in Android build release. \
		Please always refer to Android build for latest version Place to check in Android \
		build \
		platform /vendor/qcom/proprietary/mm camerasdk/hvx \
		OEM plugin is responsible for configuring the mode size and many other important \
		parameters for camera streaming case It is also responsible to send QDSP6 \
		per frame updates on the fly Algorithm specific information can only be \
		determined by the algorithm developer themselves. \
		In order to achieve that user lib need to be implemented conforming to \
		following API \
		.ccode \
		typedef struct _hvx_lib_sensor_info_t \
		hvx_sensor_filter_arrangement bayer_format \
		unsigned int bits_per_pixel \
		hvx_lib_sensor_info_t \
		. \
		typedef struct _hvx_lib_isp_info_t \
		unsigned int camif_width \
		unsigned int camif_height \
		unsigned int sensor_offset \
		hvx_lib_isp_info_t \
		. \
		typedef struct _hvx_lib_single_isp_info_t \
		hvx_lib_isp_info_t isp_info \
		hvx_lib_single_isp_info_t \
		. \
		typedef struct _hvx_lib_dual_isp_info_t \
		hvx_lib_isp_info_t isp_info[MAX_ISP] \
		hvx_lib_dual_isp_info_t \
		. \
		typedef struct _hvx_lib_config_t \
		hvx_lib_sensor_info_t sensor_info \
		union \
		hvx_lib_single_isp_info_t single_isp_info \
		hvx_lib_dual_isp_info_t dual_isp_info \
		u \
		hvx_lib_isp_type_t isp_type \
		char config_setting_name[64] \
		hvx_lib_config_t \
		typedef struct _hvx_lib_adsp_config_t hvx_lib_adsp_config_t \
		. \
		typedef struct _hvx_lib_adsp_config_t \
		hvx_ret_type_t *adsp_config_call void *adsp_data \
		unsigned int adsp_data_size void *caller_data \
		hvx_lib_adsp_config_t \
		. \
		typedef struct _hvx_lib_stats_t \
		void *stats_left \
		unsigned int stats_left_size \
		void *stats_right \
		unsigned int stats_right_size \
		hvx_lib_stats_t \
		. \
		/** hvx_lib_get_hvx_info_t \
		* \
		* @sensor_width [INPUT] sensor output width \
		* @sensor_height [INPUT] sensor output height \
		* @available_hvx_units [INPUT] currently available hvx units \
		* on DSP side 1 / 2 / 3 / 4 \
		* @available_vector_mode [INPUT] currently available hvx \
		* vector mode \
		* @hvx_enable [OUTPUT] enable / disable HVX for current \
		* configuration \
		* @algo_name [OUTPUT] algorithm name to run on ADSP \
		* @hvx_out_width [OUTPUT] HVX output width \
		* @hvx_out_height [OUTPUT] HVX output height \
		* @request_hvx_units [OUTPUT] hvx units to be used for this \
		* sensor \
		* @request_hvx_vector_mode [OUTPUT] HVX vector mode to be \
		* used for this sensor \
		* @is_pix_intf_needed [OUTPUT] set 1 if output of HVX should \
		* be connected to PIXEL interface \
		* Linearization / rolloff etc \
		* @is_stats_needed [OUTPUT] enable / disable stats output \
		* from HVX \
		* @stats_data_size [OUTPUT] size of each stats data buffer \
		* \
		**/ \
		typedef struct _hvx_lib_get_hvx_info_t \
		unsigned int sensor_width \
		unsigned int sensor_height \
		unsigned int available_hvx_units \
		hvx_lib_vector_mode_t available_hvx_vector_mode \
		unsigned int hvx_enable \
		char algo_name[32] \
		unsigned int hvx_out_width \
		unsigned int hvx_out_height \
		unsigned int request_hvx_units \
		hvx_lib_vector_mode_t request_hvx_vector_mode \
		unsigned int is_pix_intf_needed \
		unsigned int is_stats_needed \
		unsigned int stats_data_size \
		hvx_lib_get_hvx_info_t \
		. \
		/** hvx_lib_sof_params_t \
		* \
		* @frame_id current frame id \
		* @real_gain global real gain \
		* @exposure_time exposure time in ns \
		* @short_real_gain short real gain during HDR \
		* @short_exposure_time short exposure time in ns \
		* @target_luma targed luma to be achieved to settle AEC \
		* @cur_luma current luma value \
		* @avg_luma average luma value \
		* @lux_idx lux index \
		* @aec_settled boolean flag to indicate whether AEC \
		* settled \
		* @r_gain AWB r gain \
		* @g_gain AWB g gain \
		* @b_gain AWB b gain \
		* @color_temp color temperature \
		**/ \
		typedef struct _hvx_lib_sof_params_t \
		unsigned int frame_id \
		/* AEC params */ \
		float real_gain \
		long exposure_time \
		float short_real_gain \
		long short_exposure_time \
		unsigned int target_luma \
		unsigned int cur_luma \
		unsigned int avg_luma \
		float lux_idx \
		int aec_settled \
		/* AWB params */ \
		float r_gain \
		float g_gain \
		float b_gain \
		unsigned int color_temp \
		hvx_lib_sof_params_t \
		. \
		typedef struct _hvx_lib_function_table_t \
		// hvx_lib_open will be called only once before stream on. \
		// user could allocate memory that will be used in OEM plugin scope Android \
		// will hold this memory by pointer oem_data this pointer will be passed \
		// into all subsequent calls thus the memory can be used across the lib. \
		hvx_ret_type_t *hvx_lib_open void **oem_data \
		. \
		// hvx_lib_get_hvx_info will be called once before stream on. \
		// taking input parameter from hvx_info structure user would set HVX \
		// configuration by filling output entries in hvx_info \
		hvx_ret_type_t *hvx_lib_get_hvx_info void *oem_data \
		hvx_lib_get_hvx_info_t *hvx_info \
		. \
		// hvx_lib_set_config will be called once before stream on. \
		// user could send initial dynamic structure to ADSP \
		hvx_ret_type_t *hvx_lib_set_config void *oem_data \
		const hvx_lib_config_t *lib_config \
		const hvx_lib_adsp_config_t *adsp_config \
		void *caller_data \
		. \
		// hvx_lib_consume_stats will be called whenever a filled buffer returns \
		// from HVX. \
		// user can read values from this buffer for analysis \
		hvx_ret_type_t *hvx_lib_consume_stats void *oem_data \
		unsigned int frame_id hvx_lib_stats_t *stats_data \
		const hvx_lib_adsp_config_t *adsp_config void *caller_data \
		. \
		// hvx_lib_sof will be called upon arrival of each SOF \
		// user can send dynamic data through this call \
		hvx_ret_type_t *hvx_lib_sof void *oem_data \
		const hvx_lib_sof_params_t *sof_params \
		const hvx_lib_adsp_config_t *adsp_config \
		void *caller_data \
		. \
		// hvx_lib_close will be called when stream off \
		// user need to free the memory allocated in hvx_lib_open \
		hvx_ret_type_t *hvx_lib_close void *oem_data \
		hvx_lib_function_table_t \
		. \
		hvx_ret_type_t hvx_lib_fill_function_table \
		hvx_lib_function_table_t *func_table \
		QDSP6 lib API \
		QDSP6 lib is the main software module that does the pixel processing during \
		camera streaming User needs to implement two functions in this library \
		configuration and processing. \
		Configuration function will talk to camera streaming framework and configure \
		algorithm specific parameters including input/output buffer size padding etc. \
		This is one time call before streaming starts. \
		Processing function contains the bulks of algorithm details and is usually \
		computationally intensive Once the function is invoked the QDSP6 lib will be \
		in a infinite loop waiting to process pixel data All start/stop and update \
		commands will be sent through a special communication buffer which will be \
		discussed in later sections. \
		QDSP6 lib s processing has to stick to very specific timing to be in sync with \
		ISP s timing To facilitate that a set of utility functions are provided \
		by camera streaming framework. \
		.ccode \
		/** \
		* @brief get framework version \
		* \
		* This function will return the HVX camera streaming framework \
		* verison number as a string. \
		* \
		* @param v output string of version number \
		* @return None \
		*/ \
		void get_framework_version char* v \
		/** \
		* @brief check if vfe id is in range [0 1] \
		* \
		* @param vfe_id vfe id of current processing thread \
		* \
		* @return int 0 valid 1 invalid \
		*/ \
		int process_util_vfe_id_validation unsigned int vfe_id \
		/** \
		* @brief check raw status of streamer[vfe_id] \
		* \
		* @param vfe_id vfe_id of current processing thread \
		* \
		* @return unsigned int RAW_STATUS register value \
		*/ \
		unsigned int process_util_get_streamer_raw_status unsigned int vfe_id \
		/** \
		* @brief get rx buffer starting address based on specific vfe \
		* id \
		* \
		* @param vfe_id vfe_id of current processing thread \
		* \
		* @return void* rx starting address \
		*/ \
		void* process_util_get_rx_addr unsigned int vfe_id \
		/** \
		* Function process_util_get_tx_addr \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* get tx buffer starting address based on specific vfe id \
		* \
		* Return Value \
		* tx address \
		**/ \
		void* process_util_get_tx_addr unsigned int vfe_id \
		/** \
		* Function process_util_get_static_config_buf \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* get static config buffer starting address based \
		* on specific vfe id \
		* \
		* Return Value \
		* buffer address \
		**/ \
		void* process_util_get_static_config_buf unsigned int vfe_id \
		/** \
		* Function process_util_get_dynamic_config_buf \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* get dynamic config buffer starting address based on \
		* specific vfe id \
		* \
		* Return Value \
		* buffer address \
		**/ \
		void* process_util_get_dynamic_config_buf unsigned int vfe_id \
		/** \
		* Function process_util_get_cache \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* @arg p_addr return starting address of availabel L2 \
		* cache \
		* @arg p_size return size of available L2 cache \
		* \
		* Description \
		* get available L2 cache section for processing thread use \
		* \
		* Return Value \
		* None \
		**/ \
		void process_util_get_cache unsigned int vfe_id unsigned char** p_addr int* p_size \
		/** \
		* Function process_util_check_reg_update \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* check if REG_UPDATE bit is set \
		* \
		* Return Value \
		* 0 bit not set \
		* 1 bit set \
		**/ \
		int process_util_check_reg_update unsigned int vfe_id \
		/** \
		* Function process_util_update_metabuf \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* copy shadow CX content to CX \
		* \
		* Return Value \
		* None \
		**/ \
		void process_util_update_metabuf unsigned int vfe_id \
		/** \
		* Function process_util_get_start_flag \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* return start flag set by control thread \
		* \
		* Return Value \
		* 0 do not start \
		* 1 OK to start \
		**/ \
		unsigned int process_util_get_start_flag unsigned int vfe_id \
		/** \
		* Function process_util_get_force_exit_flag \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* return force exit flag set by control thread \
		* \
		* Return Value \
		* 1 exit \
		* 0 do not exit \
		**/ \
		unsigned int process_util_get_force_exit_flag unsigned int vfe_id \
		/** \
		* Function process_util_check_rx_sof \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* check if SOF bit got updated in STATUS register \
		* \
		* Return Value \
		* 1 SOF bit set \
		* 0 SOF bit not set \
		**/ \
		unsigned int process_util_check_rx_sof unsigned int vfe_id \
		/** \
		* Function process_util_reset_rx_sof \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* reset SOF bit to 0 in STATUS register \
		* \
		* Return Value \
		* None \
		**/ \
		void process_util_reset_rx_sof unsigned int vfe_id \
		/** \
		* Function process_util_rx_wait_for_line \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* wait until rx get linecount+1 lines EOLs \
		* say wait until RX_LINE_COUNT register reach linecount+1 \
		* \
		* Return Value \
		* linecount+1 \
		**/ \
		unsigned int process_util_rx_wait_for_line unsigned int vfe_id unsigned int linecount \
		/** \
		* Function process_util_rx_done \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* @arg offset offset of consumed data in rx \
		* \
		* Description \
		* update RX_INDEX_CONSUMED register to offset \
		* \
		* Return Value \
		* None \
		**/ \
		void process_util_rx_done unsigned int vfe_id unsigned int offset \
		/** \
		* Function process_util_rx_done \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* @arg offset offset of transmit data in tx \
		* \
		* Description \
		* update TX_INDEX_AVAIL register to offset \
		* \
		* Return Value \
		* None \
		**/ \
		void process_util_tx_done unsigned int vfe_id unsigned int offset \
		/** \
		* Function process_util_tx_wait_for_eof \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* wait until EOF bit got set in STATUS register \
		* \
		* Return Value \
		* None \
		**/ \
		void process_util_tx_wait_for_eof unsigned int vfe_id \
		/** \
		* Function process_util_tx_clear_eof \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* reset EOF bit to 0 in STATUS register \
		* \
		* Return Value \
		* None \
		**/ \
		void process_util_tx_clear_eof unsigned int vfe_id \
		/** \
		* Function process_util_wrap_idx \
		* \
		* Arguments \
		* @arg idx next idx in TX/RX buffer \
		* @arg bufsize TX/RX size \
		* \
		* Description \
		* if idx hit buffer end rotate to buffer head \
		* \
		* Return Value \
		* incremented idx \
		**/ \
		unsigned int process_util_wrap_idx unsigned int idx unsigned int bufsize \
		/** \
		* Function process_util_get_dump_flag \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* check if frame dump is needed \
		* \
		* Return Value \
		* flag value \
		**/ \
		unsigned int process_util_get_dump_flag unsigned int vfe_id \
		unsigned int process_util_get_stats_flag unsigned int vfe_id \
		/** \
		* Function process_util_get_dump_addr \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* get the buffer addr to be dumped to \
		* \
		* Return Value \
		* buffer address \
		**/ \
		void* process_util_get_dump_addr unsigned int vfe_id \
		/** \
		* Function process_util_get_dump_label \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* get the buffer label to be dumped to \
		* \
		* Return Value \
		* buffer label \
		**/ \
		unsigned char process_util_get_dump_label unsigned int vfe_id \
		/** \
		* Function process_util_clear_dump_flag \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* clear the dump flag once caught in SOF event \
		* \
		* Return Value \
		* none \
		**/ \
		void process_util_clear_dump_flag unsigned int vfe_id \
		/** \
		* Function process_util_reset_streamer \
		* \
		* Arguments \
		* @arg vfe_id vfe id of current processing thread \
		* \
		* Description \
		* in case of overflow happens call this function which \
		* will do \
		* stop streamer \
		* reset streamer \
		* reprogram streamer with previous values \
		* start streamer \
		* \
		* Return Value \
		* none \
		**/ \
		void process_util_recover_streamer unsigned int vfe_id \
		This API could be out of date Please refer to this file in latest SDK release \
		hexagonSDK root /3.x/lib/camera/streaming_framework/ship/hexagon_ReleaseG_dynamic_toolv80_v60 \
		To see the usage of OEM plugin API please refer to these examples \
		hexagonSDK root /3.x/examples/camera_streaming/hvx_add_constant_stub \
		To see the usage of QDSP6 lib API please refer to these examples \
		hexagonSDK root /3.x/examples/camera_streaming/hvx_add_constant \
		Communication and buffers \
		For camera streaming use case there is no system memory buffer used with the \
		exception that QDSP6 output some meta data directly to system memory All \
		operations are done in QDSP6 s L2 cache to cope with camera streaming s high \
		requirement on duty cycle For this purpose camera streaming framework \
		provides mechanism to lock 256K byte of QDSP6 s L2 cache Once locked this \
		portion of cache will not be visible to any other process on QDSP6. \
		The locked QDSP6 s L2 cache is mainly partitioned to three types of buffers \
		Receiving buffer RX Transmission buffer TX and Communication buffer CX . \
		Receiving buffer RX \
		Receiving buffer is used to receive input pixel data from ISP s pixel interface. \
		This latency buffer has only limited size so that RX overflow would occur if \
		the speed of QDSP6 s fetching from RX is slower than speed of streaming which \
		is fatal. \
		Transmission buffer TX \
		Transmission buffer is used to store QDSP6 processed data before they are sent \
		back to ISP s pixel interface If QDSP6 produces data slower than HVX streaming \
		module s read speed a TX underflow will be reported as warning. \
		Communication buffer CX \
		Communication buffer is used to store flags and parameter updates between user \
		lib and QDSP6 lib to avoid the function call overhead which might slow down \
		QDSP6 s processing speed and lead to buffer over run or under run These \
		flags and updates make camera streaming start/stop or change behavior The CX \
		buffer is shadowed meaning any update to this buffer will take effect on the \
		next frame.	",
	"id":95
}
idx.add(doc)
urls[95]='Camera%20streaming/Applications.html'
titles[95]="Camera streaming"

var doc = {
	"title": "Voice module: on-target",
	"body": " \
		Overview \
		A dynamic library generated and tested on simulator earlier can be loaded on \
		target Android device . \
		The steps are summarized below \
		Push Voice module s to device \
		Update the ACDB Audio Calibration Database with details of custom topology \
		Start voice call \
		Conduct real time calibration of the module \
		Push Voice module s to device \
		Voice framework loads custom shared object files at either ADSP boot time or at demand basis. \
		Run following commands to push the files to /system/lib/rfsa/adsp \
		adb root \
		adb remount \
		adb push HEXAGON_SDK_ROOT /examples/audio/capi_v2_gain/hexagon_Debug_dynamic_toolv81_v65/ship/capi_v2_gain.so /system/lib/rfsa/adsp \
		adb reboot \
		Pushing above files and signing can be done together by running a following script \
		.ccode \
		HEXAGON_SDK_ROOT /scripts/push_voice_module.cmd capi_v2_gain \
		Signing of device generation of testsig.so \
		Signing of device is an important step to allow loading of unsigned dynamic modules otherwise loading of modules will fail. \
		Run the following command file to enable it. \
		HEXAGON_SDK_ROOT /scripts/testsig.cmd \
		For more information about Elfsigner please refer \
		[Signing] /Tools_Signing.html \
		Update the ACDB with details of custom topologies \
		QACT Qualcomm Audio Calibration Tool Lite helps to calibrate the modules with set of parameters defined and associate the custom topology with supported devices. \
		Follow the steps mentioned below \
		[Setting up the workspace] voice_calibration_using_qact.html Setting up the workspace \
		[Add custom topologies and associated modules] voice_calibration_using_qact.html Add custom topologies and associated modules \
		[Associate topologies with devices] voice_calibration_using_qact.html Associate topologies with devices \
		[Save the workspace changes to ACDB] voice_calibration_using_qact.html Save the workspace changes to ACDB \
		[Replacing the ACDB on the Target Device] voice_calibration_using_qact.html Replacing the ACDB on the Target Device \
		Start voice call \
		Start voice call and verify the logs on mini dm.exe from module on console \
		Real Time Calibration of Module \
		QACT Lite provides a GUI based calibration for custom voice modules. \
		Launch QPST \
		Launch QACT and choose Connect to Phone icon. \
		If you encounter a message as shown below click Yes and browse to the ACDB location we have created in previous steps Eg C /WORK/ACDB/GAIN_ADDED Choose the workspace file. \
		.lua \
		return E.left E.img src images/qact_connect_phone.png alt Image not found \
		Click on DSP Calibration as shown below Start voice loopback test You will see the COPP topology with CAPI_V2_GAIN in it. \
		.lua \
		return E.left E.img src images/voice_qact_rtc.jpg alt Image not found \
		Double click on the CAPI_V2_GAIN box and you will see the calibration window for the module. \
		Now you may set the various parameters for the module in real time Set the enable flag to 0x1 and provide a gain. \
		After configuring the values click on Set to DSP and you can feel the effect of gain in the live voice loopback. \
		.lua \
		return E.left E.img src images/voice_qact_rtc_set.jpg alt Image not found \
		The Option Get from DSP can be used to retrieve the existing parameter values from the DSP. \
		Troubleshooting Steps for Shared Objects Only \
		If a custom module is a shared object follow these steps to check if the shared object is loaded properly \
		Rename adsprpcd to block bootup dynamic loading processing \
		adb root \
		adb remount \
		adb shell mv /system/bin/adsprpcd /system/bin/adsprpcd1 \
		adb reboot \
		This approach is required for shared objects that are loaded at boot time. \
		If the custom module is not loadedat boot time but is loaded per a use case do not renameadsprpcd Running the use case is sufficient to get loading errors. \
		Wait for the target to connect with the QXDM Professional tool QXDM Pro . \
		In QXDM Pro enable QDSP6 logs \
		Right click and select Config \
		Select Known Messages By Subsystem Enable/Check QDSP6. \
		Start the adsprpcd1 process \
		adb root \
		adb remount \
		adb shell \
		cd /system/bin \
		./adsprpcd1 \
		The logs should load in the QXDM Pro window Any loading errors are also displayed in this window. \
		When finished debugging rename adsprpcd1 back to adsprpcd \
		adb root \
		adb remount \
		adb shell mv /system/bin/adsprpcd1 /system/bin/adsprpcd \
		adb reboot	",
	"id":96
}
idx.add(doc)
urls[96]='Voice/TestingVoiceOnTarget.html'
titles[96]="Voice module: on-target"

var doc = {
	"title": "capi_v2_gain walk-through",
	"body": " \
		Overview \
		This walk through is a step by step guide for building loading \
		and executing the capi_v2_gain voice example on Hexagon simulator and \
		Android target. \
		Prerequisites \
		This walk through assumes you have an Android device that supports \
		both FastRPC and Dynamic Loading. \
		See [calculator prerequisites] /calculator_android.html Prerequisites for more information. \
		Building \
		Before building ensure the Hexagon SDK s dependencies are properly setup The \
		installer should have done this for you If you encounter issues please see \
		[Dependencies] /Dependencies_Common.html . \
		Before using the command line to interact with the Hexagon SDK call \
		[setup_sdk_env.cmd] /readme.html from the Hexagon SDK s root \
		directory This script will setup the paths and environment variables locally \
		in the current shell. \
		setup_sdk_env.cmd \
		First change directory to the capi_v2_gain example \
		cd Hexagon SDK Dir /examples/voice/capi_v2_gain \
		Next build the module and run unit test \
		make tree V hexagon_Debug_dynamic_toolv81_v60 VERBOSE 0 \
		For more information on build syntax see [Make.d] /Environments_Build System.html \
		For more information on the variants to be used you can use the [Feature matrix] /feature_matrix.html as guidance. \
		Now observe the unit test passed successfully and capi_v2_gain.a and \
		capi_v2_gain.so libraries generated at ./hexagon_Debug_dynamic_toolv81_v65/ship/ \
		On target testing \
		Create custom topology with capi_v2_gain.so module and test voice loopback with new topology on Android platform. \
		Follow the steps \
		Use adb as root and remount system read/write \
		adb root \
		adb wait for device \
		adb remount \
		Push capi_v2_gain.so to device \
		cd HEXAGON_SDK_ROOT \
		adb push examples/voice/hexagon_Debug_dynamic_toolv81_v65/ship/capi_v2_gain.so /system/lib/rfsa/adsp \
		Ensure device signed already if not run the following cmd file \
		HEXAGON_SDK_ROOT /scripts/testsig.cmd \
		Update Audio Calibration Data Base ACDB with custom topologies by following the steps \
		[ACDB update with custom topologies and modules] TestingVoiceOnTarget.html Update%20the%20ACDB%20with%20details%20of%20custom%20topologies \
		Start voice call and verify the logs on [mini dm.exe] /Debugging_Message Logging.html mini dm from the module on console All capi_v2_gain module prints are prefixed with CAPI_V2_GAIN . \
		cd HEXAGON_SDK_ROOT \
		./tools/mini dm/WinNT_Debug/mini dm.exe color 1 comport comm port from device manager \
		Change the gain value at run time and observe the effect of gain on voice. \
		Use [Real Time Calibration of module using QACT] TestingVoiceOnTarget.html Real%20Time%20Calibration%20of%20Module \
		Moving ahead \
		For more and detailed information on voice customization and examples refer [Voice] Applications.html \
		Or browse the left sidebar for more topics.	",
	"id":97
}
idx.add(doc)
urls[97]='Voice/capi_v2_gain_walkthrough.html'
titles[97]="capi_v2_gain walk-through"

var doc = {
	"title": "Voice unit testing",
	"body": " \
		Overview \
		The Hexagon SDK provides a framework that enables unit testing of created \
		modules Unit testing can be done using \
		Eclipse projects \
		Import existing Eclipse project into workspace compile the project and \
		easily run and debug unit test executable. \
		Quality tests qtests . \
		qtests are specified like any other target in a project s makefile. \
		They are automatically run as part of the build process to complete \
		the build/test development process The tests themselves are compiled \
		into Hexagon binaries and run via the Hexagon simulator. \
		Currently qtests are only meant to be run on the Hexagon simulator not \
		on target. \
		Architecture \
		Support libraries \
		The SDK provides general unit test support libraries \
		[test_main] /Platforms_Simulator.html test_main \
		[test_util] /Platforms_Simulator.html test_util \
		In addition the SDK provides Voice specific test support libraries. \
		test_capi_v2_voice \
		voice_imc_utils \
		This library provides a test framework for verifying the functionality of \
		objects that export CAPI_V2 For more information see [[CAPI_V2 unit test framework]] \
		CAPI_V2 unit test framework \
		The support library test_capi_v2_voice contains an CAPI_V2 specific test framework \
		that allows for the verification of objects exporting the CAPI_V2 interface. \
		The support library voice_imc_utils contains utility functions to simulate the Intermodule communication. \
		The framework is run by calling the framework s entry point from within a qtest s \
		[Test sources] /Platforms_Simulator.html Test sources The signature of the entry point \
		is as follows \
		.ccode \
		capi_v2_err_t test_capi_v2_main capi_v2_get_static_properties_f get_static_properties_f \
		capi_v2_init_f init_f \
		capi_v2_proplist_t* init_set_properties \
		capi_v2_proplist_t* static_properties \
		const char* filename_in const char* filename_out \
		const char* filename_config \
		get_static_properties_f contain function pointer to the pp module s get_static_properties function. \
		This can be obtained by calling dlsyn in the qtest s [[Test sources]]. \
		This function is used to get the module s properties statically like memory size requirements and etc. \
		init_f contain function pointer to the pp module s initialization function. \
		This can be obtained by calling dlsyn in the qtest s [[Test sources]]. \
		init_set_properties is used to hold the list of properties to be set at initialization of the module \
		Refer CAPI_V2 interface files to find the list of properties supported at initialization \
		static_properties is used to hold the list of static properties \
		filename_in is the name of an PCM data file that should be processed by the test \
		filename_out is the name of the output file generated by processing filename_in. \
		filename_config is the [[Test configuration file]] sequence commands to verify the CAPI_V2 module. \
		The qtests for Hexagon SDK examples passthru and gain use the CAPI_V2 Test \
		Framework For more detailed information about how to call it see those \
		example s qtest source files. \
		Currently the CAPI_V2 Unit Test Framework does not support verification of the output \
		audio file vs a known reference audio file Future versions of the Hexagon SDK \
		hope to add support for this feature Until then the verification of the output \
		file is left to the user. \
		Note For capi_v2_dummy_ecns example entry point is from function test_capi_v2_main_refport where an extra parameter is required to send the reference port input. \
		The cfg files in the respective data folder differs in InputNumberOfPorts SetNumChannelsAndMappingRef and SetNumChannelsAndMapping . \
		There are seperate cfg files for single dual and quad microphobe scenarios Please refer to the cfg files for details. \
		Similarly for capi_v2_voice_imc example entry point is from function test_capi_v2_main_imc . \
		There are seperate cfg files in respective data folder for Tx and Rx modules Please refer to the cfg files for details. \
		test_capi_v2 \
		See the main [unit_test documentation] /Platforms_Simulator.html Enabling Simulator test . \
		Test configuration file \
		Each test is configured using a configuration file This file contains a list of \
		commands to execute The test framework reads and executes the commands from \
		the config file sequentially Note that the commands are case sensitive and \
		should be entered exactly as they appear below. \
		The test framework supports the following commands and their parameters \
		[[ProcessData]] \
		NumBuffers number \
		[[SetMediaFormat]] \
		SetBitstreamFormat number \
		SetDataFormat number \
		SetBitsPerSample number \
		QFactor number \
		SetSamplingRate number \
		SetIsSigned number \
		SetInterleaving number \
		SetNumChannelsAndMapping number \
		[[SetOutputMediaFormat]] \
		SetBitstreamFormat number \
		SetDataFormat number \
		SetBitsPerSample number \
		QFactor number \
		SetSamplingRate number \
		SetIsSigned number \
		SetInterleaving number \
		SetNumChannelsAndMapping number \
		[[SetParamInband]] \
		PayloadSizeInBytes number \
		[[GetParamInband]] \
		PayloadSizeInBytes number \
		payload \
		ProcessData \
		. \
		Processes input buffers from the input file to the output file. \
		This command exercises the pp module s CAPI_V2 methods get_input_required and \
		process . \
		e.g. \
		ProcessData \
		NumBuffers 10 \
		SetMediaFormat \
		Sets the media parameters for input port This should be done to verify the \
		correct handling of specific media parameters and also before a call to [[ProcessData]] \
		to set up the medial parameters to be used during the processing It sets the CAPI_V2 \
		library with the specified parameters by calling the pp module function set_properties. \
		e.g. \
		SetMediaFormat \
		SetBitstreamFormat 69029 \
		SetDataFormat 0 \
		SetNumChannelsAndMapping 2 1 2 \
		SetBitsPerSample 16 \
		QFactor 0 \
		SetSamplingRate 48000 \
		SetIsSigned 1 \
		SetInterleaving 2 \
		SetOutputMediaFormat \
		Sets the media parameters for output port This should be done to \
		verify the correct handling of specific media parameters and also before a call \
		to [[ProcessData]] to setup the medial parameters to be used during the \
		processing It sets the CAPI_V2 library with the specified parameters by calling \
		the pp module function set_properties. \
		e.g. \
		SetOutputMediaFormat \
		SetBitstreamFormat 69029 \
		SetDataFormat 0 \
		SetNumChannelsAndMapping 2 1 2 \
		SetBitsPerSample 16 \
		QFactor 0 \
		SetSamplingRate 48000 \
		SetIsSigned 1 \
		SetInterleaving 2 \
		SetParamInband \
		Sets a parameter value The information on the parameter and its payload are \
		specified after the PayloadSizeInBytes parameter as illustrated in the example \
		below. \
		This command exercises the pp module s CAPI_V2 method set_param . \
		e.g. \
		SetParamInband \
		PayloadSizeInBytes 24 \
		00 00 00 00 Data Payload address msw \
		00 00 00 00 Data Payload address lsw \
		00 00 00 00 mem_map_handle \
		18 00 00 00 Data payload size \
		11 11 11 11 module_id 0x11111111 VOICE_MODULE_DYNAMIC_GAIN_TX_1 \
		11 10 00 10 param_id 0x10001011 PARAM_ID_GAIN_CTRL_MASTER_GAIN \
		04 00 00 00 param_size and padding \
		00 30 00 00 payload Gain value and reserved \
		GetParamInband \
		Gets a parameter value The information on the parameter and its payload are \
		specified after the PayloadSizeInBytes parameter as illustrated in the example \
		below Note that GetParamInband contains an additional parameter called \
		RefPayloadSizeInBytes that specifies the expected binary value of the received \
		parameter. \
		This command exercises the pp module s CAPI_V2 method get_param . \
		e.g. \
		GetParamInband \
		PayloadSizeInBytes 16 \
		00 00 00 00 Data Payload address msw \
		00 00 00 00 Data Payload address lsw \
		00 00 00 00 mem_map_handle \
		11 11 11 11 module_id 0x11111111 VOICE_MODULE_DYNAMIC_GAIN_TX_1 \
		11 10 00 10 param_id 0x10001011 PARAM_ID_GAIN_CTRL_MASTER_GAIN \
		04 00 00 00 \
		RefPayloadSizeInBytes 4 \
		00 30 00 00 \
		Unit testing CAPI_V2 modules \
		Eclipse based \
		Import the project from specific example to be tested Import the \
		project as Executable .exe For more information on this please refer \
		IDE Docs \
		As an example capi_v2_gain is used Similar steps should be followed for \
		other examples. \
		File Import Hexagon C/C++ \
		Project Type Executable .exe \
		Project location HEXAGON_SDK_ROOT examples/voice/capi_v2_gain/eclipse/test_capi_v2_gain \
		.lua \
		return E.left E.img src images/capi_v2_gain_import_unit_test.jpg alt Image not found \
		Ensure that project path SDK root and Tools root are set appropriately. \
		Build the project \
		Right click on project Build Configuration Build all \
		This project compiled in debug and release mode to test dynamic and static libraries. \
		Verify all libraries to be built. \
		By default Eclipse project builds Static module To test dynamic library add __V_DYNAMIC__ flag to Eclipse test projects. \
		To run/debug unit test exe. \
		a Create a new run configuration for unit test executable. \
		Right click on project Run As Run Configurations Hexagon C/C++ Application \
		.lua \
		return E.left E.img src images/capi_v2_gain_eclipse_ut_run_cfg.jpg alt Image not found \
		a Input Arguments to binary \
		Add input arguments to the executable. \
		For CAPI_V2 input output and config files have to be specified ex capi_v2_gain \
		i / /data/wnoise_48k_stereo.raw o / /data/output_wnoise_48k_stereo.raw \
		c / /data/gain.cfg \
		.lua \
		return E.left E.img src images/capi_v2_gain_eclipse_ut_args.jpg alt Image not found \
		Instead of adding input arguments manually use qhut file \
		Right click on project test_capi_v2_gain New File \
		Create a new file named test_list.qhut \
		Create new test cases using qhut file \
		.lua \
		return E.left E.img src images/qhut.jpg alt Image not found \
		a If dynamic library is being tested then specify it s relative path using \
		usefs flag Add the following simulator flag in Miscellaneous box on \
		Simulator tab Example below shows the method to test capi_v2_gain.so Shared \
		debug library. \
		usefs /capi_v2_gain/Shared Debug \
		.lua \
		return E.left E.img src images/capi_v2_gain_eclipse_ut_usefs.jpg alt Image not found \
		Similarly other simulation parameters can be passed on to simulator from \
		this UI All simulation parameters can be found on Hexagon Programmers \
		Reference manual Explore these parameters to have close results to target \
		on simulator. \
		Command line based \
		In command line based unit test framework the library is built first and then \
		unit tested using a single command. \
		As a reference example capi_v2_gain is used Please execute similar commands to \
		test other CAPI_V2 examples. \
		* Instructions to test Dynamic Library \
		Open a CLI shell and navigate to HEXAGON_SDK_ROOT /examples/voice/capi_v2_gain \
		cd HEXAGON_SDK_ROOT /examples/voice/capi_v2_gain \
		Execute the following command to test Dynamic Library. \
		Target hexagon Version V5 Flavor Debug Options dynamic \
		make V hexagon_Debug_dynamic_toolv81_v65 tree VERBOSE 1 \
		Verify the test to be passed \
		For more information on building using make.d please refer \
		[make.d] /Environments_Build System.html documentation. \
		NOTE In command line based unit testing input arguments to executable are \
		hard coded in the unit test source file. \
		Also for loading a dynamic library usefs flag is added to build system.	",
	"id":98
}
idx.add(doc)
urls[98]='Voice/TestingVoiceUnitTests.html'
titles[98]="Voice unit testing"

var doc = {
	"title": "QACT Lite : Testing the Voice Module on Target",
	"body": " \
		Overview \
		QACT Qualcomm Audio Calibration Tool Lite is a PC based tool that lets you \
		modify the ACDB Audio Calibration Database ACDB is a set of binary files \
		containing calibration data for all devices networks and sample rates. \
		The default set of acdb files can be found in the folder /etc on your target \
		device. \
		To enable a custom voice module on target the module must be added to a new \
		topology definition These are the steps from a high level \
		Setting up the workspace \
		Add custom topologies and associated modules \
		Associate topologies with devices \
		Save the workspace changes to ACDB \
		Replacing the ACDB on the Target Device \
		Prerequisites \
		Android Device \
		QACT Lite and QPST installed on system. \
		Please [ /Support_Contact] /Support_Contact.html Qualcomm to obtain them. \
		The User Guide shipped along with QACT will take you \
		through the installation You can refer section 2 of the document \
		for more details \
		ADB drivers installed on system. \
		Setting up the workspace \
		Pull the existing acdb files from the target device Assuming C /Work/ACDB is the working directory \
		adb pull /etc/Speaker_cal.acdb C /Work/ACDB \
		adb pull /etc/Headset_cal.acdb C /Work/ACDB \
		adb pull /etc/Handset_cal.acdb C /Work/ACDB \
		adb pull /etc/Hdmi_cal.acdb C /Work/ACDB \
		adb pull /etc/Global_cal.acdb C /Work/ACDB \
		adb pull /etc/General_cal.acdb C /Work/ACDB \
		adb pull /etc/Bluetooth_cal.acdb C /Work/ACDB \
		NOTE Few devices storing acdb files in /etc/acdbdata/ TargetType / Change the adb commands based on your device acdb files to push and pull. \
		Create a workspace file workspaceFile.qwsp in the same folder You can modify the existing qwsp file if you are provided with one. \
		If creating new a text file with contents as shown should suffice \
		WorkSpace_Data WSVersID Badger_3 \
		ACDBFile_Paths \
		ACDBFile_Paths path Bluetooth_cal.acdb / \
		ACDBFile_Paths path General_cal.acdb / \
		ACDBFile_Paths path Global_cal.acdb / \
		ACDBFile_Paths path Handset_cal.acdb / \
		ACDBFile_Paths path Hdmi_cal.acdb / \
		ACDBFile_Paths path Headset_cal.acdb / \
		ACDBFile_Paths path Speaker_cal.acdb / \
		/ACDBFile_Paths \
		GUI_Data \
		/GUI_Data \
		/WorkSpace_Data \
		Launch QACT Lite Choose Open File icon as shown. \
		.lua \
		return E.left E.img src images/qact_open_file.png alt Image not found \
		Browse to the location C /Work/ACDB and choose the file workspaceFile.qwsp. \
		Now we are ready to modify the acdb for the custom requirement. \
		Add custom topologies and associated modules \
		Add custom topologies defined in voiceproc.json file in earlier steps to ACDB. \
		Open the workspace \
		Open the workspace created in the previous step workspaceFile.qwsp \
		.lua \
		return E.left E.img src images/qact_open_workspace.jpg alt Image not found \
		Add parameters using Parameter Designer \
		Choose parameter designer Tools Parameter Designer Add+ \
		Add parameters of a module \
		As an example Add parameters of CAPI_V2_GAIN module refer SDK_ROOT /examples/voice/capi_v2_gain/inc/capi_v2_gain.h. \
		Enter the parameter name and parameter id \
		Parameter Name CAPI_V2_GAIN_PARAM_ID_MASTER_GAIN \
		Parameter ID 0x10001011 \
		.lua \
		return E.left E.img src images/voice_qct_add_param.jpg alt Image not found \
		Click OK \
		Add information about the parameter Gain value data type default value and etc. \
		Name master_gain \
		Type uint16 \
		Default vlaue 0x3000 \
		.lua \
		return E.left E.img src images/voice_qct_add_param_data.jpg alt Image not found \
		Click Done \
		Similarly add another parameter defined for gain module \
		Parameter Name CAPI_V2_GAIN_PARAM_ID_ENABLE \
		Parameter ID 0x10001001 \
		Finally the parameter designer has two parameters as shown in the image below. \
		.lua \
		return E.left E.img src images/voice_qct_add_param_final.jpg alt Image not found \
		Create module using Module Designer \
		Choose module designer Tools Module Designer Add+ \
		Add modules \
		Add CAPI_V2_GAIN module \
		Module Name VOICE_MODULE_DYNAMIC_GAIN_TX_1 \
		Module ID 0x11111111 \
		Module Type TX \
		.lua \
		return E.left E.img src images/voice_qct_add_module_data.jpg alt Image not found \
		Select list of parameters applicable and Click OK \
		Module Name VOICE_MODULE_DYNAMIC_GAIN_RX_1 \
		Module ID 0x33333333 \
		Module Type RX \
		Finally module designer now contains 2 modules 1 for TX and 1 for RX processing \
		Create custom topology using Topology Designer \
		Choose topology designer Tools Topology Designer Add+ \
		Add custom topology \
		Create custom topologies \
		Topology Name VPM_TX_SINGLE_MIC_DYNAMIC_TOPOLOGY \
		Topology ID 0x00010F83 \
		Topology Type TX \
		.lua \
		return E.left E.img src images/topology_tx.JPG alt Image not found \
		Select list of modules and click OK \
		Similarly add other topologies for TX and RX. \
		Topology Name VPM_RX_DYNAMIC_TOPOLOGY \
		Topology ID 0x00010F82 \
		Topology Type RX \
		.lua \
		return E.left E.img src images/topology_rx.jpg alt Image not found \
		Add newly created topologies to database using Database Designer \
		Tools Database Designer \
		Add newly created TX and RX topologies to VOICE_COPP_TX and VOICE_COPP_RX respectively \
		.lua \
		return E.left E.img src images/database_design_tx.jpg alt Image not found \
		.lua \
		return E.left E.img src images/database_design_rx.jpg alt Image not found \
		Add Dynamic module using DSP Module Manager \
		Add the module information in DSP module manager This is a new feature in QACT to allow addition of dynamic modules to AMDB Audio Module Database .It allows addition of CAPIv2 CAPI as well as APPI modules to AMDB. \
		Select DSP Module Manager from the Tools menu. \
		Click on Add Module button. \
		Select the options for capi_v2_gain module for TX topology. \
		To add a custom shared object information Tag1 should be the same as the tag specified as follows \
		tag _get_static_properties \
		Example capi_v2_gain_get_static_properties \
		tag _init \
		Example capi_v2_gain_init \
		In this example specify Tag1 as capi_v2_gain \
		Custom shared object can be loaded either at boot up or on demand based on the selection for Load Module. \
		If a custom module is not required in a specific product the module can be marked as not required optional . \
		Similarly add the other modules to AMDB. \
		.lua \
		return E.left E.img src images/capi_v2_gain_tx1.jpg alt Image not found \
		NOTE For capi_v2_dummy_ecns example single example overloads Single Mic SM Dual Mic DM and Quad Mic QM dummy ECNS modules. \
		For Single Mic specify Tag1 as capi_v2_custom_dummy_sm_ecns \
		.lua \
		return E.left E.img src images/single_mic.jpg alt Image not found \
		For Dual Mic specify Tag1 as capi_v2_custom_dummy_dm_ecns \
		.lua \
		return E.left E.img src images/dual_mic.jpg alt Image not found \
		For Quad Mic specify Tag1 as capi_v2_custom_dummy_qm_ecns \
		.lua \
		return E.left E.img src images/quad_mic.jpg alt Image not found \
		Associate topologies with devices \
		Associate voice topologies with device using Device designer \
		Tools Device Designer \
		Associate the topologies to specific devices where voip call will be made \
		.lua \
		return E.left E.img src images/device_design_rx.jpg alt Image not found \
		.lua \
		return E.left E.img src images/device_design_tx.JPG alt Image not found \
		NOTE Settings for capi_v2_dummy_ecns example \
		In Device Designer choose \
		For single mic use device SPKR_PHONE_MIC \
		For dual mic use device SPKR_PHONE_MIC_ENDFIRE_FLUENCEV5 \
		For quald mic use device SPKR_PHONE_QUAD_MIC_FLUENCE_PROV2 \
		To enable fluence property on the platform for dummy ecns following are the steps \
		adb root \
		adb remount \
		adb pull /system/build.prop \
		Change the value of the property in build.prop For dual fluence for quad fluencepro . \
		ro.qc.sdk.audio.fluencetype fluence \
		Push the file on target. \
		adb push build.prop /system/ \
		adb shell chmod 644 /system/build.prop \
		adb reboot \
		Save the workspace changes to ACDB \
		Choose Save As from File menu. \
		A window will pop up where you can browse to the folder to save all the acdb files and workspace file For the workspace file browse to your desired location The same location will be picked up for all other files. \
		Assuming you have saved all the files in C /WORK/ACDB/GAIN_ADDED \
		.lua \
		return E.left E.img src images/qact_save_worksapce.png alt Image not found \
		Replacing the ACDB on the Target Device \
		Now that we are done with modifying the ACDB it s time to push the files to Target. \
		Assuming the saved acdb files are kept at C /WORK/ACDB/GAIN_ADDED. \
		Issue the following commands from the folder in a CLI shell. \
		adb push Speaker_cal.acdb /etc/acdbdata/MTP \
		adb push Headset_cal.acdb /etc/acdbdata/MTP \
		adb push Handset_cal.acdb /etc/acdbdata/MTP \
		adb push Hdmi_cal.acdb /etc/acdbdata/MTP \
		adb push Global_cal.acdb /etc/acdbdata/MTP \
		adb push General_cal.acdb /etc/acdbdata/MTP \
		adb push Bluetooth_cal.acdb /etc/acdbdata/MTP \
		adb push adsp_avs_config.acdb /etc/acdbdata/ \
		Reboot the device. \
		NOTE Few devices storing acdb files in /etc/acdbdata/ TargetType / Change the adb commands based on your device acdb files to push and pull.	",
	"id":99
}
idx.add(doc)
urls[99]='Voice/voice_calibration_using_qact.html'
titles[99]="QACT Lite : Testing the Voice Module on Target"

var doc = {
	"title": "Voice overview",
	"body": " \
		Overview \
		Qualcomm s Hexagon SDK allows customers to customize and extend the usage of the \
		Hexagon aDSP. \
		Voice processing path is customizable now with algorithms wrapped in CAPI_V2 interface. \
		It allows the customers to define a topology with dynamic modules for Tx and Rx processing chain. \
		[Voice examples] VoiceExamples.html are provided with walkthrough steps. \
		Follow [capi_v2_gain walkthrough] capi_v2_gain_walkthrough.html to try an example. \
		Goals \
		Enable easy creation of new voice processing modules \
		Provide a unit test framework that allows off target testing of audio \
		modules \
		On Target testing of dynamic library. \
		Elite voice framework \
		This SDK enables the customization of Voice Processing VPM Tx/Rx path of the Elite Voice Framework. \
		Overview \
		The Elite Voice Framework provides I/O paths to and from audio hardware ports. \
		The following diagram illustrates the structure of voice paths \
		HLOS Stream Manager Processing Manager \
		Mixer VPM Rx1 \
		Stream \
		++ Voice Rx Streams ++ + + + \
		+ + VPM Rx2 + Device \
		Stream + + VPM Tx1 + Device \
		++ Voice Tx Streams ++ + + + \
		VPM Tx2 \
		Pre/Post processing topologies \
		The Elite framework defines a pre/post topology as an ordered chain of one or \
		more pp modules that are applied to the voice samples in sequential order. \
		Topologies are identified by a numeric ID and are chosen at runtime for each \
		voice path via HLOS initiated APR messages that contain the desired topology \
		ID Once the stream or device is created the topology cannot be changed. \
		The Elite Framework includes a collection of built in static topology \
		definitions static audio/voice modules and extendable with dynamic topologies \
		and modules. \
		Voice customization \
		Overview \
		Voice framework supports dynamic topologies for Voice Processing Tx and Rx paths. \
		It enables HAP customers to define the voice processing chain with custom algorithms. \
		Steps to define dynamic topology with custom algorithms are explained in detailed at \
		[voice_examples] VoiceExamples.html . \
		Elite Voice Framework ADSP static image \
		V \
		capi_v2_module1.so capi_v2_moduleN.so \
		Elite framework loads the custom shared objects either at boot time or on demand basis \
		and initializes the dynamic modules at start of a voice call. \
		All modules must be wrapped with CAPI_V2 interface to place in dynamic topologies. \
		HAP customers creates capi_v2_modulesN.so by wrapping algorithms with CAPI_V2 interface and \
		place them in dynamic topologies. \
		ADSP static image already provided the dynamic topologies based on the number of mics. \
		HAP customers can define these topologies only with custom dynamic modules. \
		.ccode \
		VPM_TX_SINGLE_MIC_DYNAMIC_TOPOLOGY 0x00010F83 \
		VPM_TX_DUAL_MIC_DYNAMIC_TOPOLOGY 0x00010F84 \
		VPM_TX_QUAD_MIC_DYNAMIC_TOPOLOGY 0x00010F85 \
		VPM_RX_DYNAMIC_TOPOLOGY 0x00010F82 \
		Rx reference data to Tx path \
		Voice CAPI_V2 modules in Tx path can receive Rx path data for echo/noise cancellation by using a framework extension. \
		Module can raise an event with id CAPI_V2_FRAMEWORK_EXTENSIONS_NEED_FAR_END_DATA 0x000000AA for reference signal Refer capi_v2_gain.h \
		file in capi_v2_gain example Module receives PCM input data at port 0 and reference data \
		in port 1. \
		Common Audio Processor Interface v2 CAPI v2 \
		Introduction \
		CAPIv2 interface is used in the aDSP framework for the Voice subsystem. \
		For more information about CAPIv2 please refer [CAPIv2 Introduction] /CAPIv2/CAPIv2_Introduction.html \
		Creating and customizing \
		The simplest way to create a new pp module is to copy rename and \
		modify capi_v2_passthru or capi_v2_gain Please follow the instructions \
		[here] /WorkingWithExamples.html Cloning an Example to clone a project from existing project files \
		The following provides an overview of the process of creating a custom audio \
		pp module. \
		Voice algorithms are wrapped with the CAPI v2. \
		CAPI v2 modules have unique IDs \
		Create a unique module ID \
		Create unique get/set parameter IDs. \
		.ccode \
		define PPID_MODULE 0xFFFFFFF0 \
		define PARAM_ID_CTRL1 0x10000001 \
		define PARAM_ID_CTRL2 0x10000002 \
		Implement the core signal processing algorithm in the process function \
		Implements the supporting functions to make the module CAPI v2 compliant. \
		CAPI v2 Module \
		+ + \
		process \
		init get_static_properties \
		get_param set_param end \
		set_properties get_properties \
		.ccode \
		get_static_properties Returns the list of static properties by the library to framework. \
		init Initializes the CAPI v2 and the library. \
		process Processes an input buffer and generates an output buffer. \
		This calls the core signal processing algorithm in the library. \
		set_param Used to set module calibration parameters. \
		get_param Used to get module calibration parameters. \
		set_properties Used to set properties of CAPI v2 modules. \
		get_properties Used to get properties of CAPI v2 modules. \
		end Destroys the CAPI v2 library. \
		Moving ahead \
		Creation of new voice modules \
		See [Voice examples] VoiceExamples.html \
		Unit testing \
		See [Voice unit testing] TestingVoiceUnitTests.html \
		On target testing of voice modules \
		See [Voice module target testing] TestingVoiceOnTarget.html	",
	"id":100
}
idx.add(doc)
urls[100]='Voice/voice_overview.html'
titles[100]="Voice overview"

var doc = {
	"title": "Voice",
	"body": " \
		[Overview] voice_overview.html \
		Provides an overview Elite Framework CAPI_V2 modules \
		[VoiceExamples] VoiceExamples.html \
		Explanation of voice examples in the Hexagon SDK. \
		Build Architecture and Process. \
		Steps to build CAPI_V2 module using Eclipse or in a CLI shell. \
		[Unit testing] TestingVoiceUnitTests.html \
		Detailed explanation of Unit test framework for voice modules. \
		Hands on steps to unit test a module using Eclipse or in a CLI shell. \
		[Target testing] TestingVoiceOnTarget.html \
		Steps to test dynamic voice on target	",
	"id":101
}
idx.add(doc)
urls[101]='Voice/Applications.html'
titles[101]="Voice"

var doc = {
	"title": "Voice examples",
	"body": " \
		Overview \
		The Hexagon SDK contains projects which are intended to serve as templates for \
		creating new voice custom pp modules and topology definitions. \
		Voice Tx and Rx processing customization is supported with dynamic loading of capi v2 modules. \
		CAPI V2 Wrapper around a Post/Pre processing algorithm. \
		Voice Framework \
		CAPI V2 Wrapper \
		Core Algorithm \
		The SDK contains the following examples *note that some of these are not currently working on some targets Please refer to the [feature matrix] /feature_matrix.html for details* \
		[capi_v2_gain] capi_v2_gain_walkthrough.html Example CAPI_V2 based PP module applies a gain to PCM data \
		capi_v2_gain_32ch Example CAPI_V2 based pp module this example explains on the usage of multi channel module implementation currently framework supports upto 32 channels \
		capi_v2_gain_cpp Example CAPI_V2 based pp module this example explains the usage of C++14 functionaliy in CAPI_V2 module This is the first module which supports C++14 and runs its unit test on QURT instead of running standalone. \
		capi_v2_passthru Example CAPI_V2 based pp module basically an empty shell and has no effect on the PCM data \
		capi_v2_dummy_ecns Example CAPI_V2 based dummy ECNS Echo Cancellation and Noise Suppression module on Voice Path This example describes how to integrate a custom ECNS module on Voice path and supports single dual and quad microphone input scenarios Please run the unit test for the example followed by on target verification Please refer capi_v2_dummy_ecns for implementation details. \
		capi_v2_voice_imc Example CAPI_V2 for Inter Module communication between Tx and Rx modules on Voice Path This algoritm shows an important feature of CAPIv2 interface Intermodule communication between Voice modules There are two modules in this example one running on TX path and the other running on RX path Please run the unit test for the example followed by target verification Please refer capi_v2_voice_imc for implementation details. \
		Libraries may contain one or more pp modules The examples in \
		this SDK are currently built as different libraries but there is no reason they \
		cannot be combined into one. \
		Building architecture \
		CAPI V2 \
		[Building a make.d project] /Environments_Build System.html Building a make.d project provides \
		information on how to build the SDK examples and how to interpret and modify \
		the makefiles. \
		Create a module test file \
		The module test file loads the library and calls the test framework. \
		See [Test sources] /Platforms_Simulator.html Test sources for more information \
		Create a test configuration file \
		The test configuration file exercises the module See \
		[Test configuration file] TestingVoiceUnitTests.html Test configuration file \
		for more information \
		Build the library and the [q test] /Platforms_Simulator.html Overview \
		executable \
		module.o module_test.o test_capi_v2.o \
		test_main.o \
		test_util.o \
		v v v \
		module.a module_q \
		Below shown diagram takes capi_v2_gain as an example \
		capi_v2_gain.o capi_v2_gain_test.o test_capi_v2.o \
		test_main.o \
		test_util.o \
		v v v \
		capi_v2_gain.a capi_v2_gain_q \
		Test the new CAPI V2 module \
		A module can be tested as a standalone unit in the simulation environment \
		The test configuration file defines the test commands to be executed \
		The following diagram shows the structure of an CAPI V2 module q test. \
		module q test \
		test_main \
		v \
		+ + \
		test_util + module_test \
		+ + \
		^ \
		v \
		+ + \
		+ test_capi_v2 + cfg file \
		+ + \
		v \
		+ + \
		Input File + capi_v2_test + Output File \
		+ + \
		^ \
		v \
		module.a \
		Building CAPI V2 modules \
		Eclipse based \
		Import the project from specific example to be tested Import the \
		project as Common Library project As an example capi_v2_gain is used \
		File Import Hexagon C/C++ \
		Project Type Common Library .lib/.so \
		Project location HEXAGON_SDK_ROOT /examples/voice/capi_v2_gain/eclipse/capi_v2_gain \
		.lua \
		return E.left E.img src images/capi_v2_gain_eclipse_import.jpg alt Image not found \
		Ensure that project path SDK root and Tools root are set appropriately. \
		Build the project \
		Right click on project Build Configuration Build all \
		This project builds Dynamic and Static libraries in debug and release mode. \
		Verify all libraries to be built. \
		NOTE Snapshot may vary slightly based on version of Eclipse plugins used. \
		Command line interface \
		Building and testing a library is clubbed together in a single command The \
		steps to generate a library are covered in command line based unit testing . \
		Moving ahead \
		Unit testing \
		To unit test an CAPI V2 module click [here] TestingVoiceUnitTests.html	",
	"id":102
}
idx.add(doc)
urls[102]='Voice/VoiceExamples.html'
titles[102]="Voice examples"

var doc = {
	"title": "CAPIv2 Unit test framework",
	"body": " \
		Overview \
		The Hexagon SDK contains projects which are intended to serve as templates for \
		creating new custom pp modules and topology definitions. \
		CAPIv2 Wrapper around a Post/Pre processing algorithm These wrappers are used across different services like \
		Audio front end AFE Audio processing services COPP/POPP Listen Stream manager LSM \
		Elite Framework \
		CAPIv2 Wrapper \
		Core Algorithm \
		The SDK contains the following examples for audio PP processing chain \
		capi_v2_decimate Example CAPIv2 based audio processing module that decimates input signal depending on decimation factor set by client processor This example speeds up audio using decimation Similar to fast forward functionality The input and output sampling rates remain same but the input signal is decimated by decimation factor set by Client processor This leads to playing out lesser number of samples at the same output sampling rate thus speeding up the audio playback giving perceptual quality like fast forward feature As an example refer [this] Testing_CAPIv2 Unit Tests.html Important Note for CAPIv2 Decimate Example \
		capi_v2_sp Example CAPIv2 based AFE algorithm to run across AFE TX and RX paths This algoritm shows an important feature of CAPIv2 interface Intermodule communication There are two modules in this example one running on TX path and the other running on RX path The testing procedure for capi_v2_sp is same as other APPI/CAPIv2 modules Please run the unit test for the example followed by on target verification Please refer capi_v2_sp for implementation details. \
		Unit test framework \
		Modules running in either TX or RX path No Intermodule communication \
		The support library test_capi_v2 contains an CAPIv2 specific test framework \
		that allows for the verification of objects exporting the CAPIv2 interface The \
		framework is run by calling the framework s entry point from within a qtest s \
		[Test sources] /Platforms_Simulator.html Test sources The signature of the entry point \
		is as follows \
		.ccode \
		capi_v2_err_t test_capi_v2_main capi_v2_get_static_properties_f get_static_properties_f \
		capi_v2_init_f init_f \
		capi_v2_proplist_t* init_set_properties \
		capi_v2_proplist_t* static_properties \
		const char* filename_in const char* filename_out \
		const char* filename_config \
		get_static_properties_f and init_f should contain function pointers to the capi_v2 module s \
		get_static_properties and init functions These can be obtained by calling dlsym in \
		the qtest s [[Test sources]]. \
		init_set_properties is a structure of init properties that need to be set in the module \
		static_properties is meant to get static properties from the module. \
		filename_in is the name of an audio file that should be processed by the \
		test \
		filename_out is the name of the output file generated by processing \
		filename_in. \
		filename_config is the [[Test configuration file]] that determines how the \
		framework should verify the CAPIv2 module. \
		The qtests for Hexagon SDK CAPIv2 example decimate use the CAPIv2 Test \
		Framework For more detailed information about how to call it see those \
		example s qtest source files. \
		Currently the CAPIv2 Test Framework does not support verification of the output \
		audio file vs a known reference audio file Future versions of the Hexagon SDK \
		hope to add support for this feature Until then the verification of the output \
		file is left to the user. \
		Modules running in both TX and RX path Intermodule communication \
		The support library test_capi_v2 contains an CAPIv2 specific test framework \
		that allows communication of two modules running seperately This is mainly \
		intended for the verification of objects exporting the CAPIv2 interface The \
		framework is run by calling the framework s entry point from within a qtest s \
		[Test sources] /Platforms_Simulator.html Test sources The signature of the entry point \
		is as follows \
		.ccode \
		capi_v2_err_t test_capi_v2_main_feedback capi_v2_get_static_properties_f get_static_properties_rx_f \
		capi_v2_init_f init_rx_f \
		capi_v2_get_static_properties_f get_static_properties_tx_f \
		capi_v2_init_f init_tx_f \
		capi_v2_proplist_t* init_set_properties \
		capi_v2_proplist_t* static_properties \
		const char* filename_rx_in \
		const char* filename_rx_out \
		const char* filename_rx_config \
		const char* filename_tx_in \
		const char* filename_tx_out \
		const char* filename_tx_config \
		get_static_properties_rx_f and init_rx_f should contain function pointers to the RX capi_v2 module s \
		get_static_properties and init functions These can be obtained by calling dlsym in \
		the qtest s [[Test sources]]. \
		get_static_properties_tx_f and init_tx_f should contain function pointers to the RX capi_v2 module s \
		get_static_properties and init functions These can be obtained by calling dlsym in \
		the qtest s [[Test sources]]. \
		init_set_properties is a structure of init properties that need to be set in the module \
		static_properties is meant to get static properties from the module. \
		filename_rx_in is the name of an audio file that should be processed by the \
		RX module \
		filename_rx_out is the name of the output file generated by processing \
		filename_rx_in by RX module. \
		filename_rx_config is the [[Test configuration file]] that determines how the \
		framework should verify the CAPIv2 module. \
		filename_tx_in is the name of an audio file that should be processed by the \
		TX module \
		filename_tx_out is the name of the output file generated by processing \
		filename_tx_in by TX module. \
		filename_tx_config is the [[Test configuration file]] that determines how the \
		framework should verify the CAPIv2 module. \
		The qtests for Hexagon SDK CAPIv2 example decimate use the CAPIv2 Test \
		Framework For more detailed information about how to call it see those \
		example s qtest source files. \
		Currently the CAPIv2 Test Framework does not support verification of the output \
		audio file vs a known reference audio file Future versions of the Hexagon SDK \
		hope to add support for this feature Until then the verification of the output \
		file is left to the user. \
		Test configuration file \
		Each test is configured using a configuration file This file contains a list of \
		commands to execute The test framework reads and executes the commands from \
		the config file sequentially Note that the commands are case sensitive and \
		should be entered exactly as they appear below. \
		The test framework supports the following commands and their parameters \
		[[ProcessData]] \
		NumBuffers number \
		[[SetMediaFormat]] \
		SetBitstreamFormat number \
		SetDataFormat number \
		SetNumChannelsAndMapping number \
		SetBitsPerSample number \
		QFactor number \
		SetSamplingRate number \
		SetIsSigned number \
		SetInterleaving number \
		[[SetOutputMediaFormat]] \
		SetBitstreamFormat number \
		SetDataFormat number \
		SetNumChannelsAndMapping number \
		SetBitsPerSample number \
		QFactor number \
		SetSamplingRate number \
		SetIsSigned number \
		SetInterleaving number \
		[[SetParamInband]] \
		PayloadSizeInBytes number \
		[[GetParamInband]] \
		PayloadSizeInBytes number \
		payload \
		ProcessData \
		. \
		Processes input buffers from the input file to the output file. \
		This command exercises the pp module s CAPIv2 methods get_input_required and \
		process . \
		e.g. \
		ProcessData \
		NumBuffers 10 \
		SetMediaFormat \
		Sets the input media parameters This should be done to verify the correct handling \
		of specific media parameters and also before a call to [[ProcessData]] to set \
		up the medial parameters to be used during the processing It sets the CAPIv2 \
		library with the specified parameters by calling the pp module function \
		reinit . \
		This command exercises the pp module s CAPIv2 method reinit . \
		e.g. \
		SetMediaFormat \
		SetBitstreamFormat 69029 \
		SetDataFormat 0 \
		SetNumChannelsAndMapping 2 0 1 \
		SetBitsPerSample 16 \
		QFactor 0 \
		SetSamplingRate 48000 \
		SetIsSigned 1 \
		SetInterleaving 2 \
		SetOutputMediaFormat \
		Sets the output media parameters This should be done to verify the correct handling \
		of specific media parameters and also before a call to [[ProcessData]] to set \
		up the medial parameters to be used during the processing It sets the CAPIv2 \
		library with the specified parameters by calling the pp module function \
		reinit . \
		This command exercises the pp module s CAPIv2 method reinit . \
		e.g. \
		SetOutputMediaFormat \
		SetBitstreamFormat 69029 \
		SetDataFormat 0 \
		SetNumChannelsAndMapping 2 0 1 \
		SetBitsPerSample 16 \
		QFactor 0 \
		SetSamplingRate 48000 \
		SetIsSigned 1 \
		SetInterleaving 2 \
		SetParamInband \
		Sets a parameter value The information on the parameter and its payload are \
		specified after the PayloadSizeInBytes parameter as illustrated in the example \
		below. \
		This command exercises the pp module s CAPIv2 method set_param . \
		e.g. \
		SetParamInband \
		PayloadSizeInBytes 32 \
		00 00 00 00 Data Payload address msw \
		00 00 00 00 Data Payload address lsw \
		00 00 00 00 mem_map_handle \
		18 00 00 00 Data payload size \
		11 11 11 11 module_id 0x00010F17 CAPI_V2_DECIMATE \
		13 2D 01 00 param_id 0x00012D13 CAPI_V2_PARAM_ID_DECIMATE_ENABLE \
		04 00 00 00 param_size \
		01 00 00 00 payload Enable/Disable \
		GetParamInband \
		Gets a parameter value The information on the parameter and its payload are \
		specified after the PayloadSizeInBytes parameter as illustrated in the example \
		below Note that GetParamInband contains an additional parameter called \
		RefPayloadSizeInBytes that specifies the expected binary value of the received \
		parameter. \
		This command exercises the pp module s CAPIv2 method get_param . \
		e.g. \
		GetParamInband \
		PayloadSizeInBytes 16 \
		00 00 00 00 Data Payload address msw \
		00 00 00 00 Data Payload address lsw \
		00 00 00 00 mem_map_handle \
		0C 00 00 00 Data payload size \
		11 11 11 11 module_id 0x00010F17 CAPI_V2_DECIMATE \
		13 2D 01 00 param_id 0x00012D13 CAPI_V2_PARAM_ID_DECIMATE_ENABLE \
		04 00 00 00 Param Size and Padding \
		RefPayloadSizeInBytes 4 \
		00 00 00 00 \
		Important Note for CAPIv2 Decimate Example \
		CAPIv2 Decimate example performs decimation of input samples by the decimation factor set by Client processor There are two parameters defined for Decimate module. \
		CAPI_V2_PARAM_ID_DECIMATE_ENABLE 0x00012D13 \
		Parameter ID to enable decimate module Module is enabled by setting the flag to 1. \
		CAPI_V2_PARAM_ID_UPDATE_DECIMATION_FACTOR 0x00012D15 \
		Parameter ID to set decimation factor from APPS processor The decimation factor has to be an integer Based on the value of decimation factor the input samples are discarded. \
		Assume input samples are 0x81 0x34 0x23 0x56 0x82 0x68 0x39 \
		Assume bits per sample is 8. \
		Output when \
		a Decimation factor is 1 0x81 0x34 0x23 0x56 0x82 0x68 0x39 . \
		b Decimation factor is 2 0x81 0x23 0x82 0x39 . \
		c Decimation factor is 3 0x81 0x56 0x39 . \
		. \
		For more information please refer capi_v2_decimate.h SDK_ROOT /examples/audio/capi_v2_decimate/inc \
		Moving ahead \
		See [Unit testing] /Audio/TestingAudioUnitTests.html Unit testing CAPI/APPI/CAPIv2 modules of CAPIv2 module	",
	"id":103
}
idx.add(doc)
urls[103]='CAPIv2/Testing_CAPIv2%20Unit%20Tests.html'
titles[103]="CAPIv2 Unit test framework"

var doc = {
	"title": "CAPIv2",
	"body": " \
		Purpose \
		The present context is intended for developers who have worked with the Audio \
		Post Processor Interface APPI and want to start using the newer Common Audio \
		Processor Interface Version 2 CAPIv2 instead. \
		Major Differences between APPI and CAPIv2 \
		This section describes the major differences between APPI and CAPIv2 in how \
		various functionality is provided CAPIv2 features are not explained in detail \
		here the [CAPIv2 Introduction Document] CAPIv2_Introduction.html Introduction \
		explains them in detail. \
		Data Flow \
		Data flow is controlled for APPI modules by the client by querying for the input \
		size using the get_input_requirements function There is no such function in \
		CAPIv2 Instead CAPIv2 defines two distinct types of modules based on the \
		method that they use – modules that require buffering and those that don t. \
		Events \
		Modules can now notify the framework of events using a callback function This \
		eliminates the need for the framework to explicitly query for changes to the \
		module state with every API call using predefined param ids which was required \
		in APPI Some examples of events that can be raised by the module are updates \
		to the output media format the algorithmic delay and the bandwidth requirement. \
		Properties and Parameters \
		APPI modules have functions for setting and getting parameters identified by \
		param ids The interface defined some param ids to set and get parameters which \
		are used by the framework and hence must be implemented by all modules In \
		addition to these module developers also define their own param ids for \
		parameters which are needed for functionality that is specific to the module. \
		CAPIv2 makes a distinction between parameters that are used for framework \
		functionality and those that are used for module specific functionality In \
		CAPIv2 parameters that are used for framework functionality are called \
		properties Parameters that are used for module specific functionality are \
		called parameters Separate functions are used for setting and getting \
		properties and for setting and getting parameters Certain properties may \
		also be queried without creating an instance of the module Certain properties \
		may also be set at the time of initialization of the module. \
		Querying Properties Statically \
		APPI requires that the module developer provide a function to query the size \
		that is to be allocated to hold an instance of the module This function is \
		called before creating any instance of the module CAPIv2 generalizes this \
		concept and replaces this function with a function that can be used to query \
		a number of different properties of the module without creating an instance \
		of the module One of these properties is the instance size which provides \
		the same functionality as the corresponding APPI function However there are \
		many other properties that may be queried such as the stack size requirement \
		the buffering model used whether the module supports in place processing etc. \
		Media Type at Initialization \
		APPI requires that the framework provide the input media type at initialization \
		and the module return the output media type This requirement is removed in \
		CAPIv2 The input media format is a property that can be set by the framework \
		at any time It may be sent at the init time but it is not required The \
		output media type is provided to the framework by the module using an event \
		which may be raised at any time It is completely independent of the setting \
		of the input media type. \
		Multiple Ports \
		APPI modules have exactly one input and one output CAPIv2 modules may have any \
		number including zero of input ports and output ports. \
		Converting APPI Modules to CAPIv2 \
		This section describes the major steps needed to change an APPI module to a \
		CAPIv2 module. \
		Getsize \
		The getsize function has been generalized in CAPIv2 called \
		get_static_properties In addition to the size the client may request for \
		other properties such as the stack size data buffering model explained later \
		and whether the module can do inplace computation this flag was returned from \
		the init function in APPI The get_static_properties function must iterate \
		through the property structure that is passed by the client and fill in the \
		data for each property. \
		APPI allows the client to pass in a buffer with arbitrary data to the getsize \
		function to be used to calculate the size The contents of the buffer were not \
		defined CAPIv2 allows the client to pass in the same properties that it passes \
		in during the call to init The payload for each property is defined based on \
		the property ID Custom data can still be passed to the module using the \
		CAPI_V2_CUSTOM_INIT_DATA property. \
		APPI Version \
		. \
		.ccode \
		ADSPResult appi_module_getsize const appi_buf_t *params_ptr uint32_t *size_ptr \
		*size_ptr calculate_module_size params_ptr \
		return ADSP_EOK \
		CAPIv2 Version \
		.ccode \
		capi_v2_err_t capi_v2_module_get_static_properties capi_v2_proplist *init_properties capi_v2_proplist *static_properties \
		capi_v2_err_t err CAPI_V2_EOK \
		uint32_t i 0 \
		for i 0 i props_ptr props_num i++ \
		capi_v2_buf_t *payload &prop_ptr[i].payload \
		switch prop_ptr[i].id \
		case CAPI_V2_INIT_MEMORY_REQUIREMENT \
		capi_v2_init_memory_requirement_t *data_ptr capi_v2_init_memory_requirement_t* payload data_ptr \
		uint32_t size calculate_module_size init_properties \
		data_ptr size_in_bytes size \
		payload actual_data_len sizeof capi_v2_init_memory_requirement_t \
		break \
		case CAPI_V2_STACK_SIZE \
		capi_v2_stack_size_t *data_ptr capi_v2_stack_size_t* payload data_ptr \
		data_ptr size_in_bytes STACK_SIZE \
		payload actual_data_len sizeof capi_v2_stack_size_t \
		break \
		case CAPI_V2_IS_INPLACE \
		capi_v2_is_inplace_t *data_ptr capi_v2_is_inplace_t* payload data_ptr \
		data_ptr is_inplace INPLACE_VALUE //Note Returned from init in the APPI version. \
		payload actual_data_len sizeof capi_v2_is_inplace_t \
		break \
		case CAPI_V2_REQUIRES_DATA_BUFFERING \
		capi_v2_requires_data_buffering_t *data_ptr capi_v2_requires_data_buffering_t* payload data_ptr \
		data_ptr requires_data_buffering FALSE //Note Please refer to the section on Data Buffering to determine what to fill here. \
		payload actual_data_len sizeof capi_v2_requires_data_buffering_t \
		break \
		default \
		payload actual_data_len 0 \
		CAPI_V2_SET_ERROR err CAPI_V2_EUNSUPPORTED \
		// CAPI_V2_SET_ERROR must be used to set the error so that the errors from all iterations are accumulated. \
		return err \
		Init \
		The init function is used to initialize the module object just like in APPI. \
		Instead of passing an arbitrary buffer for initialization params a property \
		list is passed This allows the module to determine the payload structure of \
		each property based on the property id. \
		The client passes media type information to the APPI module in the call to the \
		init function For CAPIv2 modules passing the media type information at init \
		time is optional The media type may or may not be present in the init property \
		list that the client provides The client may provide the media type information \
		separately by calling the set_properties function The process function will not \
		be called before the media format is set. \
		The module is not required to return the output media type in the call to init. \
		The output media type can be provided to the client at any time using the \
		CAPI_V2_EVENT_OUTPUT_MEDIA_FORMAT_UPDATED event Please refer to the section \
		on reinit section below for details on this. \
		The client will pass in properties which need to be set at init time These \
		properties must be set to the module just like a call to the set_properties \
		function. \
		APPI Version \
		. \
		.ccode \
		ADSPResult appi_module_init \
		appi_t* _pif \
		bool_t* is_in_place_ptr \
		const appi_format_t* in_format_ptr \
		appi_format_t* out_format_ptr \
		appi_buf_t* info_ptr \
		// Initialize the memory pointed to by the _pif pointer optionally using info_ptr \
		. \
		// Set the input media format from in_format_ptr \
		. \
		// Populate the output media format to out_format_ptr \
		*is_in_place_ptr INPLACE_VALUE // Note This is moved to the get_static_properties function in CAPIv2 Please refer to section 3.1. \
		return ADSP_EOK \
		CAPIv2 Version \
		. \
		.ccode \
		capi_v2_err_t capi_v2_module_init \
		capi_v2_t* _pif \
		capi_v2_proplist_t* init_set_properties \
		capi_v2_err_t err CAPI_V2_EOK \
		// Initialize the memory pointed to by the _pif pointer optionally using init_set_properties. \
		. \
		// Set the properties provided by the client They may or may not include the input media format. \
		CAPI_V2_SET_ERROR err set_properties_internal init_set_properties \
		// Error handling not shown. \
		// Raise any events if required All events are optional here Please refer to the section on events. \
		return err \
		Media Type at Init \
		The media type information is provided to APPI modules at initialization time. \
		This helps the module to set up its internal buffers and other states The \
		module must also return the output media format at this time This requirement \
		is removed in CAPIv2. \
		In CAPIv2 the input media format is an event that may or may not be set by \
		the framework at initialization time It will be set before the first call to \
		the process function though The output media format is an event that may be \
		raised by the module at any time independent of the setting of the input media \
		format As a consequence of this the module will need to wait for the input \
		media format setting before setting up its internal buffers and any state that \
		depends on the media format Thus some logic from the init function may need \
		to be moved to the set_properties function where the input media format is set. \
		A flag may be used to keep track of whether the module is completely initialized \
		or not Any calls to the process function may be returned with an error if the \
		module is partially initialized. \
		Caching of Parameters \
		. \
		CAPIv2 guarantees that the process function will not be called until the input \
		media type is set However there is no such restriction regarding the set_param \
		function Any module parameters may be set before the input media type is \
		received If the module is only partially initialized it may need to allocate \
		temporary memory to cache these parameter values and then set them only once \
		the module is fully initialized The get_param function should also be updated \
		to return the cached parameters if the module is not fully initialized. \
		Process and get_input_requirements \
		There is no get_input_requirements function in CAPIv2 Based on the logic that \
		was used for getting the input requirements the module must advertise itself \
		as either requiring buffering from the framework or not This is done in the \
		get_static_properties function Some changes are also required in the process \
		function. \
		Modules that do sample by sample processing \
		The simplest data flow is for modules that can process any number of \
		amples at a time and return the same number of samples For such modules \
		the get_input_requirements function simply returns the number of output \
		samples Such modules can identify themselves as not requiring any data \
		buffering The process function logic does not need to be modified at all. \
		The APPI structures just need to be changed to the CAPIv2 structures. \
		APPI Version \
		.ccode \
		ADSPResult appi_module_get_input_req \
		appi_t* _pif \
		const uint32_t output_size \
		uint32_t* input_size \
		*input_size output_size \
		return ADSP_EOK \
		ADSPResult appi_module_process \
		appi_t* _pif \
		const appi_buflist_t* input \
		appi_buflist_t* output \
		appi_buf_t* info_ptr \
		ADSPResult result ADSP_EOK \
		num_bytes input buf_ptr[0].actual_data_len output buf_ptr[0].max_data_len ? input buf_ptr[0].actual_data_len output buf_ptr[0].max_data_len \
		// Process num_bytes of data. \
		. \
		// Update the buffer offsets \
		uint32_t i 0 \
		for i 0 i input bufs_num i++ \
		input buf_ptr[i].actual_data_len num_bytes \
		for i 0 i output bufs_num i++ \
		output buf_ptr[i].actual_data_len num_bytes \
		return ADSP_EOK \
		CAPIv2 Version \
		.ccode \
		capi_v2_err_t capi_v2_module_get_static_properties capi_v2_proplist *init_properties \
		capi_v2_proplist *static_properties \
		capi_v2_err_t err CAPI_V2_EOK \
		uint32_t i 0 \
		for i 0 i props_ptr props_num i++ \
		capi_v2_buf_t *payload &prop_ptr[i].payload \
		switch prop_ptr[i].id \
		. \
		case CAPI_V2_REQUIRES_DATA_BUFFERING \
		capi_v2_requires_data_buffering_t *data_ptr capi_v2_requires_data_buffering_t* payload data_ptr \
		data_ptr requires_data_buffering FALSE \
		payload actual_data_len sizeof capi_v2_requires_data_buffering_t \
		break \
		. \
		return err \
		capi_v2_err_t capi_v2_module_process \
		capi_v2_t* _pif \
		capi_v2_stream_data_t* input[] \
		capi_v2_stream_data_t* output[] \
		capi_v2_err_t err CAPI_V2_EOK \
		num_bytes input[0] buf_ptr[0].actual_data_len output[0] buf_ptr[0].max_data_len ? input[0] buf_ptr[0].actual_data_len output[0] buf_ptr[0].max_data_len \
		// Process num_bytes of data using the same logic as the APPI version. \
		. \
		// Update the buffer offsets \
		uint32_t i 0 \
		for i 0 i input[0] bufs_num i++ \
		input[0] buf_ptr[i].actual_data_len num_bytes \
		for i 0 i output[0] bufs_num i++ \
		output[0] buf_ptr[i].actual_data_len num_bytes \
		return CAPI_V2_EOK \
		Modules that process in a fixed frame size \
		Such modules follow a logic which is similar Rebuffering Requirements These modules should identify themselves as not requiring any data buffering The process function logic should be changed to the logic that is described in the section [ Non buffered data flow model ] CAPIv2_Introduction.html Non Buffered Data Flow Model . \
		The memory requirements of the module will not change with this modification in logic The module will output an additional frame of zeros at the beginning however This will cause an increase in the delay If this is not desirable then the procedure described in the point below for Any Other Module can be used However using this logic will make the data flow less uniform the data flow will be similar to the APPI module and also add some processing and memory overhead on the framework. \
		Any Other Module \
		If the module s data flow doesn t fit into the models described above then it must identify itself as requiring data buffering The process function should ensure that the module either empties its input or fills up its output with every call This will not require any modification to the process function logic since the APPI logic guarantees this behaviour in the following way \
		If the input was less than the input requirement the APPI module must empty the input and it may partially fill the output Thus the input is emptied in this case. \
		If the input was equal to the input requirement the APPI module must empty the input and fill the output This the input is again emptied in this case. \
		If the input was more than the input requirement the APPI module must fill the output and it may partially empty the input The output is filled in this case. \
		Thus no change is needed in the process function logic The get_input_requirements function can simply be removed from the API since it is no longer needed in CAPIv2. \
		APPI Version \
		.ccode \
		ADSPResult appi_module_get_input_req \
		appi_t* _pif \
		const uint32_t output_size \
		uint32_t* input_size \
		// Arbitrary logic to determine the input size from the output size. \
		. \
		return ADSP_EOK \
		ADSPResult appi_module_process \
		appi_t* _pif \
		const appi_buflist_t* input \
		appi_buflist_t* output \
		appi_buf_t* info_ptr \
		ADSPResult result ADSP_EOK \
		// Arbitrary processing logic that conforms to the APPI interface rules. \
		. \
		// Update the buffer offsets \
		uint32_t i 0 \
		for i 0 i input bufs_num i++ \
		input buf_ptr[i].actual_data_len num_bytes_consumed \
		for i 0 i output bufs_num i++ \
		output buf_ptr[i].actual_data_len num_bytes_produced \
		return ADSP_EOK \
		CAPIv2 Version \
		.ccode \
		capi_v2_err_t capi_v2_module_get_static_properties capi_v2_proplist *init_properties capi_v2_proplist *static_properties \
		capi_v2_err_t err CAPI_V2_EOK \
		uint32_t i 0 \
		for i 0 i props_ptr props_num i++ \
		capi_v2_buf_t *payload &prop_ptr[i].payload \
		switch prop_ptr[i].id \
		. \
		case CAPI_V2_REQUIRES_DATA_BUFFERING \
		capi_v2_requires_data_buffering_t *data_ptr capi_v2_requires_data_buffering_t* payload data_ptr \
		data_ptr requires_data_buffering TRUE \
		payload actual_data_len sizeof capi_v2_requires_data_buffering_t \
		break \
		. \
		return err \
		capi_v2_err_t capi_v2_module_process \
		capi_v2_t* _pif \
		capi_v2_stream_data_t* input[] \
		capi_v2_stream_data_t* output[] \
		capi_v2_err_t err CAPI_V2_EOK \
		// Process data using the same logic as the APPI version. \
		. \
		// Update the buffer offsets \
		uint32_t i 0 \
		for i 0 i input[0] bufs_num i++ \
		input[0] buf_ptr[i].actual_data_len num_bytes_consumed \
		for i 0 i output[0] bufs_num i++ \
		output[0] buf_ptr[i].actual_data_len num_bytes_produced \
		return CAPI_V2_EOK \
		ReInit \
		The ReInit function is called for APPI modules to specify the input media \
		type and get the output media type The input and output media types are \
		decoupled in CAPIv2 The framework sets the input media type property to \
		specify the input media type and the module needs to raise the output media \
		type event to notify the framework of changes in the output media type. \
		To convert an existing APPI module to CAPIv2 the reinit function logic can \
		simply be called internally when the input media type property is set by the \
		framework The output media format returned by this logic must then be notified \
		to the framework by raising the output media type event. \
		APPI Version \
		. \
		.ccode \
		ADSPResult appi_module_reinit \
		appi_t* _pif \
		const appi_format_t* in_format_ptr \
		appi_format_t* out_format_ptr \
		appi_buf_t* info_ptr \
		return internal_media_type_setting_logic _pif in_format_ptr out_format_ptr \
		CAPIv2 Version \
		. \
		.ccode \
		typedef struct pcm_media_format \
		capi_v2_set_get_media_format_t main \
		capi_v2_standard_data_format_t std_fmt \
		pcm_media_format \
		capi_v2_err_t capi_v2_module_set_properties \
		capi_v2_t* _pif \
		capi_v2_proplist_t *props_ptr \
		capi_v2_err_t err CAPI_V2_EOK \
		uint32_t i 0 \
		for i 0 i props_ptr props_num i++ \
		capi_v2_buf_t *payload &prop_ptr[i].payload \
		switch prop_ptr[i].id \
		. \
		case CAPI_V2_INPUT_MEDIA_FORMAT \
		pcm_media_format *input_fmt pcm_media_format* payload data_ptr \
		pcm_media_format output_fmt \
		CAPI_V2_SET_ERROR err internal_media_type_setting_logic _pif input_fmt &output_fmt \
		payload actual_data_len sizeof pcm_media_format \
		raise_output_media_type_event _pif &output_fmt //Refer to the CAPIv2 Interface document2 for details on how to raise events. \
		break \
		. \
		return err \
		Set_param and get_param \
		The set and get parameter mechanism works the same way in CAPIv2 as APPI. \
		CAPIv2 also requires two other functions to be implemented – set_properties \
		and get_properties These functions also work in a similar fashion as the \
		set_param and get_param functions. \
		Params and Properties \
		. \
		Properties are predefined pieces of information that can be set or queried from \
		a module They are applicable to many different modules Some examples of \
		properties are stack size requirement output media format event callback \
		function pointer They can be set and queried using the set_properties and \
		get_properties functions Some properties can also be queried using the \
		get_static_properties function Also some properties can be set using the init \
		function. \
		Parameters are pieces of information that are usually applicable to only the \
		particular module For example a module that implements a filter may have \
		parameters such as cutoff frequency filter length and filter type A module \
		that implements volume control functionality may have parameters such as volume \
		level and mute. \
		Parameters can be set by the client processor of the aDSP They are generally \
		used to tune algorithms Properties are used for general control flow by the \
		framework They are not exposed to the client processor. \
		To convert the existing APPI set param and get param functions to CAPIv2 the \
		APPI parameters which have been changed to properties in CAPIv2 need to be \
		extracted from the functions and put into the set properties and get properties \
		functions. \
		Events for State Changes \
		APPI defines special parameter IDs for the framework to query the current \
		algorithmic delay KPPS bandwidth and process state of the module The \
		framework queries each of these independently whenever it feels that they might \
		have changed. \
		These parameters are now changed to events It is the responsibility of the \
		module to raise an event when there is a change in any of these parameters. \
		This reduces the run time overhead of polling by the framework and simplifies \
		the get_param function. \
		These parameters should be removed from the get_param function and code should \
		be added to raise appropriate events instead Please refer to the CAPIv2 \
		Interface Document2 for details on how to raise events. \
		APPI Version \
		.ccode \
		ADSPResult appi_module_set_param \
		appi_t* _pif \
		uint32_t param_id \
		const appi_buf_t* params_ptr \
		ADSPResult result ADSP_EOK \
		switch param_id \
		case APPI_PARAM_ID_ALGORITHMIC_RESET \
		// Code to perform reset. \
		. \
		break \
		// Module specific parameters \
		. \
		return result \
		ADSPResult appi_module_get_param \
		appi_t* _pif \
		uint32_t param_id \
		appi_buf_t* params_ptr \
		ADSPResult result ADSP_EOK \
		switch param_id \
		case APPI_PARAM_ID_ALGORITHMIC_DELAY \
		// Calculation of algorithmic delay \
		. \
		break \
		case APPI_PARAM_ID_PROCESS_CHECK \
		// Filling up process state \
		. \
		break \
		case APPI_PARAM_ID_KPPS \
		// Filling up the KPPS requirement \
		. \
		break \
		case APPI_PARAM_ID_MEDIA_FORMAT_CHANGE \
		// Setting a flag to indicate whether the media format has changed. \
		. \
		break \
		// Module specific parameters \
		. \
		return result \
		CAPIv2 Version \
		.ccode \
		capi_v2_err_t capi_v2_module_set_param \
		capi_v2_t* _pif \
		uint32_t param_id \
		const capi_v2_port_info_t* port_info_ptr \
		capi_v2_buf_t* params_ptr \
		capi_v2_err_t err CAPI_V2_EOK \
		switch param_id \
		// Module specific parameters \
		return err \
		capi_v2_err_t capi_v2_module_get_param \
		capi_v2_t* _pif \
		uint32_t param_id \
		const capi_v2_port_info_t* port_info_ptr \
		capi_v2_buf_t* params_ptr \
		capi_v2_err_t err CAPI_V2_EOK \
		switch param_id \
		// Module specific parameters \
		return err \
		capi_v2_err_t capi_v2_module_set_properties \
		capi_v2_t* _pif \
		capi_v2_proplist_t* props_ptr \
		capi_v2_err_t err CAPI_V2_EOK \
		capi_v2_prop_t *prop_array props_ptr prop_ptr \
		for uint8_t i 0 i props_ptr props_num i++ \
		capi_v2_buf_t *payload & prop_array[i].payload \
		switch prop_array[i].id \
		case CAPI_V2_ALGORITHMIC_RESET \
		// Code to perform reset. \
		break \
		// Other properties as required Please refer to the CAPIv2 interface document2 for a list of all the properties defined in the interface. \
		. \
		return err \
		capi_v2_err_t capi_v2_module_get_properties \
		capi_v2_t* _pif \
		capi_v2_proplist_t* props_ptr \
		capi_v2_err_t err CAPI_V2_EOK \
		capi_v2_prop_t *prop_ptr props_ptr prop_ptr \
		for i 0 i props_ptr props_num i++ \
		capi_v2_buf_t *payload &prop_ptr[i].payload \
		switch prop_ptr[i].id \
		// Properties as required None of the standard APPI parameters have been converted to get properties Please refer to the CAPIv2 interface document2 for a description of all the properties. \
		. \
		return err \
		/* \
		Code must be added to raise the following events if the corresponding get parameters were implemented in the APPI version of the module \
		CAPI_V2_EVENT_KPPS Must be raised whenever the KPPS requirement changes If the KPPS requirement never changes it can be raised once at init time. \
		CAPI_V2_EVENT_BANDWIDTH Must be raised whenever the bandwidth requirement changes If the bandwidth requirement never changes it can be raised once at init time. \
		CAPI_V2_EVENT_OUTPUT_MEDIA_FORMAT_UPDATED Must be raised whenever the output media format changes For APPI modules this is typically when the input media format is set The input media format is set using a set_properties call so this event can be raised at that point For more details please refer to the section on reinit 3.4 . \
		CAPI_V2_EVENT_PROCESS_STATE Must be raised when the process state of the module changes i.e when the module goes from enabled to disabled and disabled to enabled. \
		CAPI_V2_EVENT_ALGORITHMIC_DELAY Must be raised whenever the algorithmic delay changes This typically happens when some algorithm specific configuration changes due to a set param call This event must be raised at that point. \
		*/ \
		Using CAPIv2 Features to Optimize the Code \
		This section describes some additional optimizations that are possible by using \
		some of the new features of CAPIv2. \
		Module Disablement from the Process Function \
		The process state of an APPI module could be communicated to the framework only \
		when the framework queries for it This query is typically only done after a \
		set_param or reinit function call This works fine if a module was disabled by \
		setting a param and the module immediately stops processing However many \
		modules perform a smooth transition from the enabled to the disabled state \
		to avoid glitches in the output Such modules must return their process state \
		as true when queried immediately after the call to set_param After their \
		transition is over they have to keep copying the input to the output since \
		the framework doesn t query for process state later. \
		Process state changes can be notified to the framework using an event in CAPIv2. \
		This allows the module to finish its transition to the disabled state and then \
		raise an event from the process call The framework then stops calling the \
		process function of the module. \
		Output Media Type Update Based on Parameter Setting \
		APPI modules can only return the output media type when their reinit function \
		is called If the output format of a module changes based on a parameter \
		setting the module must wait for the reinit function to be called before using \
		the new media type This typically requires the addition of special code in the \
		framework to detect this setting and call reinit. \
		CAPIv2 provides an event for the module to inform the framework of output media \
		type changes This event can be called from the set_param function when a \
		parameter setting changes the output media format The new output media format \
		can be used from the next process call. \
		Testing CAPIv2 Modules \
		Audio Testing procedure of CAPIv2 modules is same as APPI/CAPI modules. \
		For more information please click [here] /Audio/Examples.html Building CAPIv2/CAPI/APPI modules \
		Voice Testing procedure of voice CAPIv2 modules is mentioned [here] /Voice/voice_overview.html Introduction	",
	"id":104
}
idx.add(doc)
urls[104]='CAPIv2/APPI_to_CAPIv2%20Migration.html'
titles[104]="CAPIv2"

var doc = {
	"title": "CAPIv2",
	"body": " \
		Introduction \
		The present context describes the Hexagon™ Multimedia Common Audio Processor Interface v2 CAPI v2 \
		which is used in the aDSP framework for the Audio subsystem Elite . \
		It allows the control layer to use any audio encoder decoder or post processing feature \
		through a common set of APIs thereby abstracting the details of the underlying algorithm. \
		The CAPIv2 also helps the control layers such as Audio Encoder Service Audio Decoder Service \
		Audio Post processing and Audio Pre processing services to \
		Be generic \
		Localize the changes specific to the algorithms \
		This document is intended for software developers who will be using the CAPIv2. \
		This document provides the public interfaces necessary to use the features provided by the CAPIv2. \
		A high level overview and information on leveraging the interface functionality are also provided. \
		The CAPIv2 provides a set of generic utilities that can be used by the standalone applications \
		Elite service and many other such frameworks to interact with the audio core libraries. \
		These utilities are the only interface for the upper software layers to interact with these audio libraries. \
		Differences between CAPI APPI and CAPIv2 \
		The CAPIv2 interface is intended to be a common interface to be used for audio decoders and encoders \
		which were using CAPI earlier and audio post processing algorithms which were using APPI earlier . \
		Some of the key new features introduced in CAPIv2 are \
		A mechanism for the module to notify the client service of any events that may occur while processing. \
		The ability to have more than one input port and more than one output port. \
		The major difference between CAPI APPI API and CAPIv2 is the buffering model. \
		CAPIv2 provides two different buffering models any of which can be chosen by the module developer. \
		These models are different from the buffering models used by CAPI and APPI. \
		CAPIv2 Interface \
		Function Interface Wrapper \
		Wrapper for the virtual function table capi_v2_vtbl_t. \
		This capi_v2_t structure appears to the caller as a virtual function table The virtual function table in the \
		instance structure is followed by other structure elements but those are invisible to the users of the \
		CAPI_V2 object This capi_v2_t structure is all that is publicly visible. \
		Type Parameter Description \
		const capi_v2_vtbl_t vtbl_ptr vtbl_ptr Pointer to the \
		 virtual function table \
		Virtual Function Table \
		The capi_v2_vtbl_t structure contains the following functions \
		capi_v2_vtbl_t process \
		capi_v2_vtbl_t end \
		capi_v2_vtbl_t set_param \
		capi_v2_vtbl_t get_param \
		capi_v2_vtbl_t set_properties \
		capi_v2_vtbl_t get_properties \
		Data Structure Documentation \
		. \
		struct capi_v2_vtbl_t \
		Function table structure for plain implementations of CAPIv2 compliant objects. \
		Objects must have a pointer to a function table as the first element in their instance structure This struct is \
		the function table type for all such objects. \
		Data Fields \
		capi_v2_err_t  process capi_v2_t _pif capi_v2_stream_data_t input[ ] capi_v2_stream_data_t \
		output[ ] \
		capi_v2_err_t  end capi_v2_t _pif \
		capi_v2_err_t  set_param capi_v2_t _pif uint32_t param_id const capi_v2_port_info_t \
		port_info_ptr capi_v2_buf_t params_ptr \
		capi_v2_err_t  get_param capi_v2_t _pif uint32_t param_id const capi_v2_port_info_t \
		port_info_ptr capi_v2_buf_t params_ptr \
		capi_v2_err_t  set_properties capi_v2_t _pif capi_v2_proplist_t proplist_ptr \
		capi_v2_err_t  get_properties capi_v2_t _pif capi_v2_proplist_t proplist_ptr \
		Each pp module requires the following to be added to Audio Module Database \
		pp module ID Either a unique ID or the ID of an existing pp module that \
		should be overridden by the new pp module. \
		get_static_properties function The resulting library must export a pp module specific \
		get_static_properties function that will be called by the Elite framework to get \
		the number of properties defined in Elite_CAPI_V2_properties.h before initializing the pp module. \
		The prototype of the get_static_properties function is as follows \
		.ccode \
		typedef capi_v2_err_t *capi_v2_get_static_properties_f \
		capi_v2_proplist_t *init_set_proplist \
		capi_v2_proplist_t *static_proplist \
		For more information see capi_v2_passthru.h/.c and Elite_CAPI_V2.h. \
		Naming convention The name of this function must be of the form tag _get_static_properties. \
		The tag may be any string as long as the function name is a valid C function name. \
		This tag will be used while registering the module with the DSP Example volume_control_get_static_properties The tag is volume_control. \
		init function The resulting library must export a pp module specific \
		init function that will be called by the Elite framework to init the pp \
		module and obtain a pointer to the pp module s CAPI v2 object. \
		The prototype of the init function is as follows \
		.ccode \
		typedef capi_v2_err_t *capi_v2_init_f \
		capi_v2_t* _pif \
		capi_v2_proplist_t *init_set_proplist \
		For more information look at capi_v2_passthru.h/.c and Elite_CAPI_V2.h. \
		Naming convention The name of this function must be of the form tag _init. \
		The tag should be the same as the tag used in the naming of the get_static_properties \
		function This tag will be used while registering the module with the DSP. \
		Example volume_control_init The tag is volume_control which matches with the \
		example given for get_static_properties. \
		Creating and customizing \
		The following provides an overview of the process of creating a custom audio \
		pp module. \
		Algorithms are wrapped with the CAPI v2. \
		CAPI v2 modules have unique IDs \
		Create a unique module ID \
		Create unique get/set parameter IDs. \
		.ccode \
		define PPID_MODULE 0xFFFFFFF0 \
		define PARAM_ID_CTRL1 0x10000001 \
		define PARAM_ID_CTRL2 0x10000002 \
		Implement the core signal processing algorithm in the process function \
		Implements the supporting functions to make the module CAPI v2 compliant. \
		CAPI v2 Module \
		+ + \
		process \
		init get_static_properties \
		get_param set_param end \
		set_properties get_properties \
		.ccode \
		get_static_properties Returns the list of static properties by the library to framework. \
		init Initializes the CAPI v2 and the library. \
		process Processes an input buffer and generates an output buffer. \
		This calls the core signal processing algorithm in the library. \
		set_param Used to set module calibration parameters. \
		get_param Used to get module calibration parameters. \
		set_properties Used to set properties of CAPI v2 modules. \
		get_properties Used to get properties of CAPI v2 modules. \
		end Destroys the CAPI v2 library. \
		CAPIv2 Properties \
		Buffering \
		CAPIv2 has two models of data flow \
		Non buffered This model is applicable to all modules that do not perform any rate conversion encoding or decoding. \
		Buffered This model is applicable to modules which perform rate conversion or perform encoding or decoding. \
		The type of data flow model must be exposed by the module as a parameter that can be queried statically This is done via the CAPI_V2_REQUIRES_DATA_BUFFERING property that can be queried through the capi_v2_get_static_properties_f function exposed by the module. \
		Non Buffered Data Flow Model \
		The non buffered data flow model works as follows \
		The client must ensure that it provides the same number of samples on every input port of the module In case of compressed data the same number of bytes must be provided on every input port. \
		The number of output samples provided on every output port of the module must be the same as the number of input samples In case of compressed data the number of bytes on every port must be the same as the number of input bytes The client code must ensure that there is enough space in the output buffer. \
		The module must be able to handle any number of input samples or input bytes in the case of compressed data . \
		This model incurs low overhead so it should be used whenever possible This model can also be used for modules that perform processing in fixed blocks of data frames This can be achieved by using the following technique \
		Define one buffer per port equal to the frame size. \
		Initially mark all the buffers at the input ports as empty. \
		Initially mark all the buffers at output ports as full and initialize them all to zero. \
		Define a buffer offset variable which is common for all ports and initialize it to zero This variable holds the number of samples present in the internal input buffers and the number of samples read from the internal output buffers. \
		Whenever process is called do the following \
		.ccode \
		n number of samples provided at each input port \
		F frame size in samples \
		buf_offset the value of the common buffer offset variable \
		while n 0 \
		valid_samples_in_internal_output_bufs F minus buf_offset \
		copy_size min n valid_samples_in_internal_output_bufs \
		On every input port copy copy_size samples from the input buffers provided by the client to the internal input buffers. \
		On every output port copy copy_size samples from the internal output buffers to the output buffers provided by the client. \
		buf_offset + copy_size \
		n copy_size \
		if buf_offset F \
		// At this point there are F samples in every internal input buffer \
		// and F samples of free space in every internal output buffer. \
		// Perform data processing using the data from the internal input buffers and writing data into the internal output buffers. \
		buf_offset 0 \
		Buffered Data Flow Model \
		The buffered data flow model works as follows \
		The module must define a threshold in terms of the number of bytes for every input and output port This threshold for any port may be queried by the client at any time using the CAPI_V2_PORT_DATA_THRESHOLD property If the threshold changes the module must raise the CAPI_V2_EVENT_PORT_DATA_THRESHOLD_CHANGE event for each port on which the threshold changed. \
		For input ports the threshold indicates the minimum amount of data needed to guarantee that processing can be done For example consider an input buffer with 100 bytes of data and a threshold of 25 bytes If the module consumes more than 75 bytes the amount of remaining data in the input buffer will be less than its threshold When this happens the module may stop further processing and return from the process function Note It may be possible for the module to perform processing with lesser amount of data in some cases For example if the module performs decoding of compressed data this value will be the worst case compressed frame size The module would be able to perform decoding with lesser data if the actual compressed frame size is smaller In this case it may continue processing. \
		For output ports the threshold indicates the minimum amount of free space needed to guarantee that processing can be done For example consider an output buffer with a maximum size of 100 bytes and a threshold of 25 bytes If the module produces more than 75 bytes of data the remaining free space in the output buffer will be less than the threshold When this happens the module may stop further processing and return from the process function. \
		The client may provide input and output buffers of any size when calling process. \
		When the process call returns the module must have consumed enough data so that the amount of valid data remaining in at least one input port is less than the threshold for that port OR the module must have produced enough data so that the amount of free space remaining in at least one output port is less than the threshold for that port. \
		Some examples of thresholds that can be provided are \
		Decoders Input threshold the worst case compressed frame size Output threshold the size of one uncompressed frame. \
		Encoders Input threshold the size of one uncompressed frame Output threshold the worst case compressed frame size. \
		Sample rate converter that can work on an arbitrary number of samples Input threshold 1 output threshold 1. \
		This model incurs high overhead so it should be used only when necessary. \
		Events \
		A mechanism is provided for the module to notify the client of events that happen. \
		Events are identified by pre defined event ids The interface also describes the payload corresponding to each event id. \
		The following information is provided by the module to the client when the callback function is called \
		An opaque state token that is provided by the client at the module creation time. \
		The event id \
		The port number associated with this event This is optional. \
		A buffer containing the payload associated with this event The buffer must be allocated by the module It can be freed by the module once the callback function returns. \
		All event ids and their payloads are described in the ‘Interfaces’ section. \
		A typical call flow is illustrated in Figure below Here two events are raised in a call to the process function The client takes the appropriate action within the callback function. \
		.lua \
		return E.left E.img src images/call_flow_for_raising_events.jpg alt Image not found \
		Framework Extensions \
		CAPIv2 provides a mechanism for extending the functionality of the interface The additional functionality is provided via framework extensions. \
		A framework extension is typically defined using a header file that is included both by the module and the client. \
		Each extension is identified using a GUID The header file then describes how the client and module that use the extensions behave. \
		Any set parameter IDs and payloads constant definitions and function declarations required for this extension are also present in the header file. \
		The client queries the module for the list of extensions that it needs using capi_v2_get_static_properties If the client supports these extensions \
		it can create the module and proceed If not the client must error out Here is an example of a framework extension Consider a module that performs \
		sample removal or insertion in order to match the audio going from one clock domain to another This module would then need the clock drift information \
		to be passed to it A framework extension can be created for this purpose The extension header would have the GUID identifying this extension and the \
		param ID and payload format to be used by the client to pass the drift information to the module Any module that implements the rate matching functionality \
		can then include this header and return the GUID in the list of framework extensions it needs The client can then perform the required set parameters to \
		pass the drift information. \
		Properties and Parameters \
		CAPIv2 provides two different ways of setting and getting information from a module – properties and parameters Both properties and parameters are \
		identified by ids and have a specific payload associated with each id All valid property ids and their payloads are defined in the CAPIv2 header files. \
		Module developers cannot define custom properties Properties can be set using the set_properties method and can be queried using the get_properties method. \
		Some properties can be queried without creating an instance of a module using the capi_v2_get_static_properties_f function exposed by the module. \
		Some properties can be set at initialization time using the capi_v2_init_f function exposed by the module. \
		Parameter ids and their payloads are defined by the module developer They can be set using the set_param method and queried using the get_param method. \
		Error Codes \
		The error codes returned by CAPIv2 functions are interpreted as bit fields Multiple bits cam be set at the \
		same time to indicate various errors. \
		Use the helper macro CAPI_V2_SET_ERROR to set a bit in the error code Use the helper macro \
		CAPI_V2_IS_ERROR_CODE_SET to check if a specific bit is set in the error code. \
		Set Properties and Get Properties Errors \
		Functions that use the capi_v2_proplist_t structure can be used to set or get multiple property values at the \
		same time Errors that might occur must be handled as follows \
		If the property is not supported by the module the CAPI_V2_EUNSUPPORTED flag must be set in the error code and the actual_data_len field for that property must be set to zero. \
		If there is another error the corresponding flag must be set in the error code and the actual_data_len field must be set to the number of bytes read or written just like for the success case . \
		Initialization Errors \
		An error returned from the capi_v2_init_f function indicates the module was not initialized Return an \
		error if the module cannot proceed because of a problem. \
		The module must return CAPI_V2_EOK if any unsupported property is set during initialization. \
		If the module returns an error from capi_v2_init_f the module must ensure that all cleanup is done \
		because the capi_v2_vtbl_t end method will not be called. \
		Converting APPI to CAPIv2 \
		To convert existing APPI module to CAPIv2 please click [here] APPI_to_CAPIv2 Migration.html Purpose \
		Moving Ahead \
		Testing CAPIv2 Modules \
		Audio Testing procedure of CAPIv2 modules is same as APPI/CAPI modules. \
		For more information please click [here] /Audio/Examples.html Building CAPIv2/CAPI/APPI modules \
		Voice Testing procedure of voice CAPIv2 modules is mentioned [here] /Voice/voice_overview.html Introduction	",
	"id":105
}
idx.add(doc)
urls[105]='CAPIv2/CAPIv2_Introduction.html'
titles[105]="CAPIv2"

var doc = {
	"title": "Hexagon Vector Extensions (HVX)",
	"body": " \
		Hexagon/HVX Overview \
		Hexagon Vector eXtensions HVX is a wide vector engine available on select products with Hexagon V60 and higher. \
		It is especially useful for achieving low power high performance imaging and machine learning algorithms Below \
		is a block diagram of the Hexagon v60/v62/v65 processor with its two HVX units. \
		.lua \
		return E.left E.img src images/block_dgm.png alt Image not found \
		Below is a diagram of the Hexagon v66 processor present in SM8150 It is upgraded with four HVX units and the \
		now each cluster has dedicated scalar MAC & FP units. \
		.lua \
		return E.left E.img src images/v66_block_dgm.png alt Image not found \
		As shown in the diagrams instruction packets flow through the scalar Hexagon pipeline where any \
		included scalar instructions are processed after which any the packets continue on to HVX Vector \
		FIFO As such HVX instructions can be intermixed with non HVX \
		a.k.a scalar instructions even within an instruction packet in DSP applications. \
		In addition to wide vector instructions the HVX module also includes a proprietary \
		[camera streaming] /Camera streaming/Applications.html interface that allows \
		high resolution raw camera sensor pixels to be streamed through the DSP for line based processing prior to entering \
		the camera front end This architecture enables pixel manipulation and statistics collection on the full sized sensor \
		outputs without any additional external memory traffic. \
		Note that the HVX engine is directly connected to L2 cache bypassing L1 HVX instructions \
		are pipelined deeply \
		enough to avoid any observed latencies for L2 loads or stores when the pipeline is full and L2 traffic is \
		not too congested However due to the depth of the HVX pipeline it is expensive to do a transfer \
		from an HVX register to a scalar register or to perform a scalar memory load from an address \
		following an HVX store to the same cache line It is advisable when using HVX in performance sensitive \
		code to do all loads stores and arithmetic via HVX instructions and to use scalar instructions and \
		registers only for addressing control and/or processing on a different data set than that being done \
		in HVX. \
		HVX was introduced in the SDM820/SDM821 family a.k.a MSM8996/MSM8996 PRO in the Hexagon v60 aDSP Applications \
		DSP SDM835 a.k.a MSM8998 followed the same architecture with an upgrade to the Hexagon v62 for the aDSP. \
		Starting in SDM660 HVX has moved to the new Compute DSP cDSP in order to separate it from audio and voice \
		processing that remains on the aDSP In SDM660 the cDSP is a Hexagon v60 In SDM845 the cDSP is the Hexagon \
		v65 which introduces an internal memory Vector TCM and a new scatter/gather mechanism. \
		For details see document 80 P8754 31 Hexagon CDSP HVX Overview for SDM660 available in CreatePoint . \
		The cDSP subsystem in SDM845 also includes a UBWC/DMA engine and \
		a Hexagon Co processor HCP block which includes some video post processing functions UBWC/DMA and HCP \
		are both controlled from cDSP software More information on the UBWC/DMA engine and the HCP block will \
		be available in the next release of the Hexagon SDK In SM8150 there are 4 128B HVX units and 64B mode is \
		no longer supported. \
		Access to the Hexagon with HVX for compute applications is enabled via [FastRPC] /APIs_FastRPC.html . \
		Within the Hexagon code there has been an evolution in the SW frameworks that manage \
		FastRPC HVX contexts and mode core and bus clocks and RTOS features such as multi threading. \
		The sections below explain this evolution throughout the targets \
		supported by this SDK revision This evolution \
		has been managed such that applications written originally for one target should \
		still work reasonably without any code changes on later targets though the recommendations for \
		best practices have changed with each target This table summarizes the key differences between supported targets \
		which are listed in chronological order. \
		+ + + \
		Target Hexagon DSP with HVX Key differences \
		Version \
		+ + + + + \
		SDM820/ v60 aDSP shared First DSP with HVX and Camera Streaming support \
		SDM821 with audio Recommended dspCV_concurrency_query lookup/eviction to \
		protect audio \
		512 KB L2 cache partitioned 50%/50% during audio/compute \
		concurrency \
		Recommended calling dspCV_init_with_attributes \
		remotely from Apps processor to initialize each compute \
		session and vote for clock settings \
		HVX can only be used by explicitly locking an HVX \
		context from each thread issuing HVX instructions and \
		unlocking after completion of HVX instructions \
		+ + + + + \
		SDM835 v62 aDSP shared Higher core frequency than SDM820/SDM821 at a given \
		with audio voltage corner \
		FastRPC supports domain handles and session restart \
		FastRPC supports 1 way IO Coherence to reduce Apps \
		processor cache maintenance overheads Enabled by \
		default \
		Recommended dspCV_concurrency_query lookup/eviction to \
		protect audio \
		512 KB L2 cache partitioned 50%/50% during audio/compute \
		concurrency \
		Recommended calling dspCV_init_with_attributes \
		remotely from Apps processor to initialize each compute \
		session and vote for clock settings \
		HVX can only be used by explicitly locking an HVX \
		context from each thread issuing HVX instructions and \
		unlocking after completion of HVX instructions \
		+ + + + + \
		SDM660 v60 cDSP FastRPC supports domain handles and session restart \
		FastRPC supports 1 way IO Coherence to reduce Apps \
		processor cache maintenance overheads Enabled by \
		default \
		Recommended to remove calls to \
		dspCV_concurrency_query \
		512 KB L2 cache dedicated to cDSP \
		Recommended using HAP_power DCVS_V2 API s instead of \
		dspCV_init_with_attributes to vote for clock settings \
		HVX can only be used by explicitly locking an HVX \
		context from each thread issuing HVX instructions and \
		unlocking after completion of HVX instructions \
		HVX Resource Manager helps facilitate time sharing of \
		HVX contexts among concurrenct HVX applications \
		+ + + + + \
		SDM845 v65 cDSP FastRPC supports domain handles and session restart \
		FastRPC supports 1 way IO Coherence to reduce Apps \
		processor cache maintenance overheads Enabled by \
		default \
		Recommended to remove calls to \
		dspCV_concurrency_query \
		512 KB L2 cache dedicated to cDSP \
		Recommended using HAP_power DCVS_V2 API s instead of \
		dspCV_init_with_attributes to vote for clock \
		settings \
		HVX context management moves inside the QuRT RTOS \
		Applications may freely use HVX instructions without \
		explicitly locking an HVX context HVX contexts are \
		saved/restored as needed during context switches \
		+ + + + + \
		SM8150 v66 cDSP FastRPC supports a QoS mode for reducing round trip \
		latency by constraining the sleep behavior of the \
		Apps processor during FastRPC activity \
		1024 KB L2 cache dedicated to cDSP \
		4x128B HVX contexts with no support for 64B mode \
		+ + + + + \
		Supported Hexagon/HVX Targets \
		Following are the targets supported by this SDK release along with descriptions of what is \
		new/unique to each. \
		SDM820/821 Hexagon v60 \
		On this target HVX applications share the Hexagon v60 with audio and voice processing Due to the \
		high priority low latency requirements of audio and voice HVX applications except for camera \
		streaming which runs at highest priority with fixed resources are subject to some constraints. \
		L2 Cache \
		L2 cache is shared by all concurrent aDSP users The runtime environment is tuned to seamlessly \
		manage partitioning of the cache depending on the concurrency present at any given time For \
		cache partitioning to work as designed all concurrent applications must vote for resources through \
		[HAP_power API s] /DSP Power & Perf.html HAP Power API including the \
		specification of the application s client class This vote is done by dspCV on behalf of its application \
		inside dspCV_init_with_attributes which is described later . \
		aDSP Eviction \
		. \
		A well behaved compute application should periodically at least every 30 msec check the aDSP concurrency \
		level and either terminate pause or migrate processing from the aDSP to the CPU if the \
		concurrency is deemed too heavy The [dspCV library] /FastCV/Applications_Computer Vision.html dspCV Library \
		offers a simple concurrency check API \
		to advise a compute application whether it is safe to continue operating on the aDSP or not based on \
		currently existing concurrencies and target specific thresholds Usage of this API is demonstrated in the \
		[Compute examples] /Examples_ComputeHVX.html such as downscaleBy2. \
		HVX context management \
		To use any HVX instructions a SW thread must lock an HVX context a.k.a register file and unlock \
		when it is finished issuing HVX instructions These contexts are managed by the \
		Hexagon RTOS i.e QuRT and are issued on a first come first serve basis. \
		Any SW thread issuing HVX instructions must first explicitly \
		vote for HVX power via [HAP_power API] /DSP Power & Perf.html HAP Power API recommended at the beginning of the HVX use case \
		lock an HVX context via QuRT API recommended just before each block of HVX functions e.g in each frame \
		And after finishing its sequence of HVX instructions it must \
		unlock its HVX context via QuRT API recommended just after each block of HVX functions e.g in each frame \
		Revoke its vote for HVX power via [HAP_power API] /DSP Power & Perf.html HAP Power API recommended at the end of the HVX use case \
		The QuRT API s are documented in the QuRT User Guide located at 80 VB419 78 Hexagon QuRT \
		RTOS User Guide available at $ HEXAGON_SDK_ROOT /tools/Hexagon_Tools/ tools version /Documents \
		and the details about HAP_Power APIs can be found [here] /DSP Power & Perf.html HAP Power API . \
		The [dspCV library] /FastCV/Applications_Computer Vision.html dspCV Library offers API s that \
		abstract these details as demonstrated in the [Computer Vision Examples] \
		/Examples_ComputeHVX.html downscaleBy2 example Note that HVX contexts may be \
		locked by a thread in either a blocking or non blocking call and may be locked in 64 byte or \
		128 byte mode Additionally it is possible for the caller to reserve multiple HVX contexts on behalf of \
		its user process prior to locking any of them This is helpful in multi threaded \
		implementations in that the set up of the multiple threads can be done with certainty that their \
		HVX unit lock attempts will succeed without blocking. \
		Using HVX as a shared resource involves several considerations. \
		+ + + \
		Consideration Comments \
		+ + + \
		64 byte vs 128 byte mode Generally 128 byte mode is recommended since it is \
		possible to fully utilize the HVX hardware with half \
		as many HW threads as in 64 byte mode This leaves \
		more processing resource open for non HVX \
		concurrencies e.g audio \
		Further it is ideal to be \
		consistent in using one mode i.e 128 byte across \
		all HVX functions that may be concurrent as the mode \
		is global meaning any threads trying to use a the \
		other mode i.e 64 byte will not be able to lock an \
		otherwise available HVX context until all 128 byte \
		users release their locks \
		And finally if C HVX \
		intrinsics are used the compiler must be hinted \
		whether the mode used at run time will be 64 or 128 \
		so consistency is recommended Files compiled with \
		mhvx will assume 64 byte mode and files compiled \
		with mhvx double will assume 128 byte mode \
		Note that assembly code often can be written \
		agnostically of the mode with the vector length \
		passed as a run time argument \
		**Summary ** Always use 128 byte mode unless there is \
		a compelling reason to use 64 and concurrencies with \
		128 byte users can be avoided \
		+ + + \
		When to use HVX context This is recommended if there will be multiple threads \
		reservation prior to HVX context trying to lock HVX and it is desirable to resolve \
		lock API? ahead of time how many can be locked It is not \
		recommended to hold an HVX reservation throughout use \
		case duration as it will prevent any possible HVX \
		concurrency \
		+ + + \
		When to use blocking or Non blocking is preferred if there is a fall back \
		non blocking call to lock HVX option i.e non HVX implementation for the same \
		context? function or if an error code should be immediately \
		returned to the caller Blocking should only be used \
		if use case is tolerant of an indefinitely long \
		blockage to wait for other users of HVX to release \
		context locks \
		+ + + \
		What if HVX is not available? If HVX reservation or lock is not available \
		the implementation should either fail back to the \
		application which might pause terminate or \
		transition to a CPU implementation or complete the \
		request using a non HVX implementation of the same \
		algorithm with lower performance expected \
		+ + + \
		Clocks Setup \
		Every application running on the aDSP is required to vote for its Hexagon MHz and bus bandwidth \
		requirements The recommended voting method for SDM820/821 is to invoke dspCV_init_with_attributes \
		remotely from the application as described in \
		[dspCV library] /FastCV/Applications_Computer Vision.html dspCV Library \
		and demonstrated in the [Computer Vision Examples] /Examples_ComputeHVX.html . \
		SDM820/SDM821 Hexagon/HVX Documents and Resources \
		. \
		80 NV396 32 Hexagon aDSP HVX Overview for MSM8996/MSM8998 available in CreatePoint \
		80 N2040 30 Hexagon V60 HVX Programmers Reference Manual available in Hexagon Tools document bundle \
		80 VB419 97 Hexagon HVX Vector Extension Programming available in CreatePoint \
		80 VB419 78 Hexagon QuRT RTOS User Guide available at $ HEXAGON_SDK_ROOT /tools/Hexagon_Tools/ tools version /Documents \
		80 NF772 36 Introduction to HVX Streaming for Camera for MSM8996/8998 available in CreatePoint \
		Single threaded HVX Code simulator examples in Hexagon Tools 8.0.x and higher distribution Tools Location /examples/HVX \
		For more details see the README files in the HVX folder and in each example folder These single threaded examples are for simulation only. \
		[Multi threaded HVX code simulator/target examples] /Examples_ComputeHVX.html \
		[Camera Streaming framework and examples] /Camera streaming/Applications.html \
		[dspCV Library] /FastCV/Applications_Computer Vision.html dspCV Library \
		SDM835 Hexagon v62 \
		SDM835 is largely the same as SDM820/SDM821 with the following differences \
		Hexagon is clocked at a higher frequencies for each voltage corner. \
		Hexagon version is v62 which contains several new instructions. \
		FastRPC buffers are 1 way IO Coherent Transparent to user Apps processor cache maintenance \
		within FastRPC is reduced. \
		FastRPC adds support for domains and session restart See [FastRPC] /APIs_FastRPC.html \
		for details See benchmark at [Computer Vision Examples] /Examples_ComputeHVX.html for \
		example domain handle usage. \
		[HAP_power] /DSP Power & Perf.html HAP Power API introduces the DCVS_v2 API for simplified clock voting If the libdspCV_skel.so shipped \
		on SDM835 devices is replaced by the libdspCV_skel.so built from this SDK user is recommended to follow \
		the new SDM660 Clocks Setup recommendation below Otherwise continue using dspCV_init_with_attributes \
		as in SDM820/SDM821. \
		C++ 11 and 14 standards are supported. \
		A new USB [on target debugger] /Debugging_Target.html is available. \
		SDM835 Hexagon/HVX Documents and Resources \
		Same as above for SDM820/SDM821 plus \
		80 N2040 37 Hexagon V62 HVX Programmers Reference Manual available in Hexagon Tools document bundle \
		SDM660 Hexagon v60 \
		Following are the key changes in SDM660. \
		Removal of audio/voice concurrency considerations \
		. \
		SDM660 has a new Compute DSP cDSP subsystem separated from the aDSP to isolate audio/voice \
		from imaging/compute processing With this split \
		The Hexagon version is reverted back to v60 same as on SDM820. \
		The L2 is no longer partitioned during concurrency the 512KB is always available to \
		imaging/compute applications running on the cDSP. \
		It is no longer recommended to use dspCV to query for concurrency to determine if it \
		is safe to use the cDSP Access to cDSP resources is moderated by thread priority and \
		explicit HVX locking It is left to applications to determine if their required QoS is \
		not being met and to take their own corrective actions. \
		HVX Context Management \
		To better facilitate time sharing of HVX contexts among concurrent applications \
		an HVX resource manager has been introduced in sysmon Details are described [here] \
		/APIs_DSP Clk & Rsrc Mgmt.html . \
		This resource manager wraps existing QuRT HVX lock/unlock and reserve functions using \
		configurable time outs to help more reserve and lock attempts succeed within reasonable time. \
		Clocks Setup \
		Starting in SDM660 the recommendation is to remove any linkage or reference to dspCV \
		such as calls to dspCV_init_with_attributes from the Apps processor. \
		The reasons are \
		Simplifying Apps side dependencies to make domain/session restart easier. \
		FastRPC has instituted default voting for compute sessions targeting nominal \
		operation which may be good enough for most applications If desired applications \
		may override default settings by voting into \
		[HAP_power] /DSP Power & Perf.html HAP Power API for example with a \
		DCVS_v2 payload from the applications handle open implementation or other custom initialization \
		or clock setup function. \
		dspCV has added a static constructor which automatically performs all the required initializations \
		previously done in dspCV_init_with_attributes except for clock settings whenever a shared object \
		that is dynamically linked to libdspCV_skel.so is loaded. \
		This new recommendation for clocks setup for a scenario in which the \
		session default is over ridden is demonstrated in the benchmark example in the \
		[Computer Vision examples] /Examples_ComputeHVX.html . \
		SDM660 Hexagon/HVX Documents and Resources \
		Same as above for SDM820/SDM821 plus \
		80 P8754 31 Hexagon CDSP HVX Overview for SDM660 available in CreatePoint \
		SDM845/SDM670/SDM710 Hexagon v65 \
		SDM845 like SDM660 has a separate cDSP for imaging/compute use cases The guidelines \
		for SDM660 given above are also relevant for SDM845 with several additional key differences \
		Significantly faster clocking peak frequency around 1.2 GHz . \
		Adds a 256KB internal TCM Vector TCM or VTCM with better latency and BW performance than L2. \
		Hexagon v65 contains many new instructions including scatter and gather instructions \
		which only operate within VTCM More information about VTCM and scatter/gather are given in \
		*HVX v65 Features* Createpoint document number 80 P9301 84 . \
		Planned as the likely last target to support 64 byte HVX mode recommendation is to \
		converge software to 128 byte mode. \
		The QuRT RTOS has integrated HVX register files a.k.a contexts into its regular context save and \
		restore operations Calls to lock and unlock HVX contexts are no longer required in most cases with \
		the following exceptions \
		While 128 byte mode is default qurt_hvx_lock or dspCV_hvx_lock can still be used for now \
		to secure 64 byte mode operation for the requesting thread all threads wanting 64 byte mode must \
		use either these legacy or the new qurt_hvx_set API. \
		If a thread has completed a set of HVX instructions but will continue running non HVX instructions \
		for a considerable time before any system call e.g mutex or signal wait it is advisable to \
		explicitly unlock the HVX context via qurt_hvx_unlock dspCV_hvx_unlock or the new \
		qurt_hvx_set This can be done even if the context was never explicitly locked and serves as \
		a hint to the RTOS that the HVX context can be freed The RTOS may then reassign the HVX context \
		to another SW thread without performing a save/restore of the registers If the same thread that \
		unlocked its context later wants \
		to resume using HVX it may do so and the RTOS will acquire a new HVX context for it upon the first \
		encountered HVX instruction or call to one of the explicit locking API s . \
		For cDSP applications linked to libdspCV_skel.so there is no longer a need to explicitly power on \
		HVX via dspCV_hvx_power_on This is done implicitly in the dspCV static constructor. \
		benchmark_v65 is a new example at [Computer Vision examples] /Examples_ComputeHVX.html \
		that illustrates the new features and best practices for SDM845 and beyond The older examples should \
		also work as is on SDM845 . \
		FastRPC domains src_app/benchmark.c application demonstrates one way to look up the availability of \
		cDSP and prefer to offload to it instead of aDSP. \
		FastRPC session restart the f crash10 option demonstrates a crash in the benchmark cDSP application \
		along with how to restart that session and recover operation in src/benchmark.c. \
		Clock Setting Demonstrates a custom function benchmark_setClocks for voting clocks via the HAP_power \
		DCVS_v2 API. \
		dspCV static constructor Dynamic linking of libdspCV_skel.so from libbenchmark_skel.so causes \
		dspCV s static constructor to invoke at load time hence creating the worker pool and powering on HVX \
		implicitly. \
		VTCM and scatter/gather the f bilateral option uses VTCM and scatter/gather in its implementation. \
		See src_dsp/bilateral_imp.c for calls to HAP_vtcm_manager and related logic for allocating and using VTCM. \
		See asm_src/bilateral_v65.S for assembly code that uses scatter/gather instructions. \
		Multi threading for HVX jobs it is recommended to choose the number of worker threads based on the global \
		variable dspCV_num_hvx128_contexts For scalar workloads dspCV_num_workers is recommended These will \
		set the number of workers appropriately to maximally use available resources HVX 128B contexts and number of HW threads \
		respectively on the given target. \
		dspCV_hvx_prepare_mt_job is no longer recommended for use Now that QuRT supports HVX concurrencies smoothly \
		this function would only cause extra overhead and possible confusion. \
		The steps required for building and running the benchmark application on target are shown in the \
		build.cmd and benchmark_v65_walkthrough.py scripts respectively. \
		SDM845 Hexagon/HVX Documents and Resources \
		Same as above for SDM660 plus \
		80 N2040 41 Hexagon V65 HVX Programmers Reference Manual available in Hexagon Tools document bundle \
		80 P9301 84 HVX v65 Features \
		SM8150 Hexagon v66 \
		SM8150 contains a Hexagon v66g_1024 architecture \
		Significantly faster clocking peak frequency around 1.4 GHz . \
		HVX capability is doubled with 4x128B units and discontinued support for 64B mode. \
		Scalar MAC and Floating Point capability is doubled with each cluster now having its own dedicated units. \
		L2 size is increased to 1024 KB. \
		New instructions increasing neural network performance available via Hexagon NN library . \
		benchmark_v65 is the best general example and recommended starting point for v65 and v66 development. \
		SM8150 Hexagon/HVX Documents and Resources \
		Same as above for SDM845 plus \
		80 N2040 42 Hexagon V66 Programmers Reference Manual available in Hexagon Tools document bundle \
		80 N2040 44 Hexagon V66 HVX Programmers Reference Manual \
		Hexagon/HVX Libraries \
		The following libraries of accelerated functions are available in this SDK. \
		Hexagon NN \
		The [Hexagon NN library] /images/80 VB419 110_Hexagon_NN_Library_User_Guide.pdf offers API s to construct and execute neural networks optimized on HVX. \
		$ HEXAGON_SDK_ROOT /libs/hexagon_nn \
		Usage tutorials are also available \
		$ HEXAGON_SDK_ROOT /examples/hexagon_nn/tutorials \
		FastCV \
		The [FastCV library] /FastCV/Applications_Computer Vision.html FastCV Library \
		at $ HEXAGON_SDK_ROOT /libs/fastcv/fastcv \
		contains several hundred functions optimized for Hexagon v5x i.e scalar Some \
		of these are further optimized for HVX. \
		qmath \
		qmath is a collection of accelerated math routines Initially it supports \
		a set of pseudo floating point arithmetic operations on HVX vectors For more information \
		on supported API s performance and accuracy \
		see [qmath library] /images/80 VB419 105_Qualcomm_Math_Library.pdf For example usage see the \
		qmath example at \
		$ HEXAGON_SDK_ROOT /examples/qmath/qmath_sample_8996 for MSM8996 which does not support multi domain FastRPC . \
		$ HEXAGON_SDK_ROOT /examples/qmath/qmath_sample for all other targets . \
		This simple example \
		solves the quadratic equation over vectors of pseudo floating point values and provides \
		profiling and accuracy comparisons to native float.	",
	"id":106
}
idx.add(doc)
urls[106]='HVX/ArchitectureOverview.html'
titles[106]="Hexagon Vector Extensions (HVX)"

var doc = {
	"title": "Welcome to the HVX add-on for Hexagon SDK 3.4",
	"body": " \
		New capabilities \
		Hexagon SDK 3.4.0 \
		Support for SM8150 HW and simulator \
		Addition of warping example in benchmark_v65 \
		Addition of FastRPC QoS option in benchmark_v65 \
		Hexagon SDK 3.3.0 \
		Support for SDM845 HW and simulator. \
		Hexagon HVX benchmark_v65 example best starting point for SDM845/Hexagon v65 development . \
		qmath library offers non IEEE compliant HVX vectorized floating point arithmetic conversion \
		to/from arrays of float or double. \
		Qprintf qdebug is deprecated library with macros and functions to call from Hexagon assembly or C/C++ for message \
		logging of HVX registers \
		qfxp library is a utility for assisting in the process of converting floating point code to fixed point. \
		Hexagon SDK 3.2 \
		Support for SDM660 HW. \
		Support on SDM660 for benchmark example in [Computer Vision Examples] /FastCV/Examples_Computer Vision.html . \
		Hexagon SDK 3.1 \
		Support for MSM8998 HW. \
		New examples for GEMM General Matrix Multiplication and Dilate5x5 in \
		[Computer Vision Examples] /FastCV/Examples_Computer Vision.html \
		New 8998 only benchmark example in [Computer Vision Examples] /FastCV/Examples_Computer Vision.html . \
		[3.1.0 HVX Release Notes] Release Notes.html \
		Hexagon SDK 3.0 \
		Support for MSM8996 HW. \
		Several new [Computer Vision Examples] /FastCV/Examples_Computer Vision.html \
		Camera Streaming use case [documentation] /Camera streaming/Applications.html \
		and [examples] /Camera streaming/Examples.html \
		Video Postprocessing use case [documentation] /Video processing/Applications.html \
		and [examples] /Video processing/Examples.html \
		[Documentation] /HVX/Technologies_aDSP Concurrency.html on how to manage \
		aDSP and HVX concurrency.	",
	"id":107
}
idx.add(doc)
urls[107]='HVX/Add-ons.html'
titles[107]="Welcome to the HVX add-on for Hexagon SDK 3.4"

var doc = {
	"title": "Neural Networks examples",
	"body": " \
		Overview \
		There are several tutorials on using the Hexagon NN library at $ HEXAGON_SDK_ROOT /examples/hexagon_nn/tutorials. \
		Please see the README.md at that location for more details on the tutorials specifically or \
		[Hexagon NN Library User Guide] /images/80 VB419 110_Hexagon_NN_Library_User_Guide.pdf for more background \
		on using the Hexagon NN library.	",
	"id":108
}
idx.add(doc)
urls[108]='Neural%20Networks/Examples.html'
titles[108]="Neural Networks examples"

var doc = {
	"title": "Neural Networks",
	"body": " \
		Introduction \
		The Hexagon NN library offers optimized functions useful in common neural networks This library is available for use via FastRPC or directly \
		from within the cDSP environment. \
		For more details please see [Hexagon NN Library User Guide] /images/80 VB419 110_Hexagon_NN_Library_User_Guide.pdf .	",
	"id":109
}
idx.add(doc)
urls[109]='Neural%20Networks/Applications.html'
titles[109]="Neural Networks"

var doc = {
	"title": "cornerApp Example",
	"body": " \
		Overview \
		The cornerApp example illustrates a basic use case with DSP acceleration including the FastCV library. \
		inc/cornerApp.idl defines the FastRPC interface between the Apps Processor \
		and DSP portions of the customer application See the [FastRPC] /APIs_FastRPC.html \
		documentation or the [FastRPC FAQ] /FAQ_FastRPC.html for more information. \
		src/cornerApp.c is the source for the executable to test the DSP \
		corner detection algorithm It can be built for Android to run on target \
		or built for Hexagon to link with the DSP libs and run on the Hexagon Simulator. \
		It has an image compiled into memory which it sends \
		to the DSP and reads back the list of detected corners. \
		src/cornerApp_imp.c is the DSP portion of the example It implements the methods \
		defined in cornerApp.idl and invokes FastCV API s to perform the corner detection. \
		src/verify.h contains macros for result checking useful in cornerApp.c. \
		glue contains make system information regarding dependencies into other \
		modules of the Hexagon SDK It should not need to be changed. \
		android.min contains information required to build the Android executable It \
		may need to be modified if source files and/or dependencies are changed See \
		[Build environment] /Environments_Build System.html for \
		more information. \
		hexagon.min contains information required to build the DSP libraries and \
		test executable It \
		may need to be modified if source files and/or dependencies are changed See \
		[Build environment] /Environments_Build System.html for \
		more information. \
		Makefile should not need to change See \
		[Build environment] /Environments_Build System.html for \
		more information. \
		qprof.cfg is an input configuration file to generate graphical profiling when \
		running the example on the Hexagon simulator. \
		*Note this document is written for MSM8996 Hexagon V60 configuration For MSM8998 simply replace v60 \
		with v62 wherever it appears in build flavors.* \
		cornerApp example simulation \
		Following are the steps to build the cornerApp example for Hexagon simulation using the unit test \
		framework described in [Unit testing] /Platforms_Simulator.html From $ HEXAGON_SDK_ROOT /examples/fastcv/cornerApp \
		make tree V hexagon_ReleaseG_toolv80_v60 \
		Note that the tree in the make command is necessary to build all the example s dependencies \
		for the specified variant hexagon_ReleaseG . \
		Subsequent rebuilds of the example for the same variant can omit the tree as follows. \
		make V hexagon_ReleaseG_toolv80_v60 \
		Note that this make command builds the Hexagon static library version of the \
		example and also builds/links the test application in cornerApp.c and finally \
		triggers the application to run in the Hexagon simulator Note the simulation \
		command line is echoed at the beginning of the run It is possible to \
		copy/paste this command to try different simulator options described in \
		[Hexagon Simulator User Guide] /Tools_Hexagon Tools 8.3.html . \
		For example to model the effects of cache misses in the profiling add the following flags \
		to the simulation command line This setting causes the simulation to take longer but \
		more closely predicts the performance that would be seen on a Hexagon target. \
		timing buspenalty 75 \
		With this option you can see the number of cycles increases from the cycle count printed at \
		the end of the simulation One of the goals of optimizing is to bring the cycle count with \
		buspenalty as close as possible to the ideal cache cycle count measured without the timing flag. \
		For more details on optimization techniques see the [Image downscale example] Image Downscale.html . \
		cornerApp example on target \
		In order to test dynamic modules on the device the device needs to be prepared with \
		a testsig as described in [Signing] /Tools_Signing.html . \
		Following are the steps to build the cornerApp example for the target \
		from $ HEXAGON_SDK_ROOT /examples/fastcv/cornerapp \
		make tree V hexagon_ReleaseG_dynamic_toolv80_v60 \
		make tree V android_ReleaseG \
		Note that the tree in the make command is necessary to build all the example s dependencies \
		for the specified variants hexagon_ReleaseG_dynamic_toolv80_v60 and android_ReleaseG . \
		Subsequent rebuilds of the example for the same variants can omit the tree as follows. \
		make V hexagon_ReleaseG_dynamic_toolv80_v60 \
		make V android_ReleaseG \
		Following are the steps to load the binaries onto the device via adb. \
		adb root \
		adb remount \
		adb shell mkdir p /vendor/bin \
		adb push android_ReleaseG/ship/libcornerApp.so /vendor/lib \
		adb push android_ReleaseG/ship/cornerApp /vendor/bin \
		adb shell chmod 755 /vendor/bin/cornerApp \
		adb push hexagon_ReleaseG_dynamic_toolv80_v60/ship/libcornerApp_skel.so /vendor/lib/rfsa/adsp \
		adb push / / /libs/fastcv/dspCV/hexagon_ReleaseG_dynamic_toolv80_v60/ship/libdspCV_skel.so /vendor/lib/rfsa/adsp \
		adb push / / /libs/fastcv/fastcv/hexagon_ReleaseG_dynamic_toolv80_v60/libfastcvadsp.so /vendor/lib/rfsa/adsp \
		adb push / / /libs/common/apps_mem_heap/ship/hexagon_ReleaseG_dynamic_toolv80_v60/libapps_mem_heap.so /vendor/lib/rfsa/adsp \
		Following are the steps to execute the test on the device via adb. \
		adb shell /vendor/bin/cornerApp \
		The output should look as follows profiling number may vary \
		initq6 done . \
		Num corners detected 60 Expected 60 \
		run time of corner detection 349501 microseconds for 100 iterations \
		deinit done Num corners detected 60	",
	"id":110
}
idx.add(doc)
urls[110]='FastCV/cornerApp.html'
titles[110]="cornerApp Example"

var doc = {
	"title": "Image filtering (Gaussian 7x7) example",
	"body": " \
		Overview \
		The image filtering example in $ HEXAGON_SDK_ROOT /examples/fastcv/guassian7x7 is similar to the \
		[Image downscale example] Image Downscale.html . \
		However it illustrates a few different approaches that can be taken to managing the HVX \
		resources \
		The application reserves available HVX units up front via dspCV initialization attribute \
		failing if none are available \
		and ensuring they remain reserved for the remaining lifetime of the application. \
		128 byte mode is explicitly chosen at run time This is to enable use of the intrinsics \
		which are compiled via mhvx double in hexagon.min to assume 128 byte mode. \
		there is no fallback to a non HVX implementation If HVX is unavailable error is returned. \
		Suggested Exercises \
		The following exercises are recommended to the user \
		Profile and compare C vs intrinsics and 64 byte vs 128 byte modes with and without timing. \
		Use Hexagon profiler and uarchtrace tools to investigate the sources of stalls in the execution. \
		Experiment with different multi threading and L2 prefetch strategies. \
		Modify the intrinsics or assembly to produce more than one output row per invocation to see if \
		it helps reduce cycles.	",
	"id":111
}
idx.add(doc)
urls[111]='FastCV/Image%20Gaussian7x7.html'
titles[111]="Image filtering (Gaussian 7x7) example"

var doc = {
	"title": "Image downscaling example",
	"body": " \
		Overview \
		This example illustrates the off loading of an image downscale function to the Hexagon aDSP with the \
		[HVX co processor] /HVX/ArchitectureOverview.html in the Snapdragon run time environment. \
		*Note that this example is maintained up through MSM8996 For MSM8998 and beyond it is recommended to \
		start with the benchmark or benchmark_v65 for SDM845 and beyond example in %HEXAGON_SDK_ROOT%/examples/common .* \
		*Also note that the Qurt based simulation is not supported on v60 v62 architectures.* \
		The goals of this downscaleBy2 example are to \
		Provide background on the considerations e.g concurrency with audio/voice for using \
		the aDSP and HVX in particular for compute off loading such as image processing and \
		computer vision. \
		Provide details on the dspCV library which provides convenient run time framework API s \
		for implementing multi threaded dynamically loadable compute processing. \
		Illustrate how build run profile optimize and debug a simple multi threaded HVX algorithm in the \
		Hexagon simulator and on Hexagon V60 HW platforms. \
		The pre requisites are \
		Run the setup environment scripts [Setup Instructions] /readme.html \
		Install a [test signature] /Tools_Signing.html on your device. \
		Suggested to run the basic [Calculator Example] /Examples_Common.html calculator first. \
		downscaleBy2 Code Walkthrough \
		$ HEXAGON_SDK_ROOT /examples/common/downscaleBy2/src/downscaleBy2.c \
		This is the source for a simple adb shell executable that exercises the Hexagon implementation of downscaleBy2. \
		The downscaleBy2 project can be built for Android as follows \
		make tree V android_Release \
		It is also designed to compile and run as a Hexagon executable in the Hexagon simulator when statically \
		linked with the DSP implementation library as follows \
		make tree V hexagon_Release_toolv83_v60 VERBOSE 1 \
		**Shared Buffer Memory Allocation** \
		The code snippet below shows the usage of ION memory for shared data buffers This is crucial for efficient RPC \
		performance Different targets may have different ION heaps available for allocation and \
		sharing with the aDSP. \
		This example like the calculator example uses ION memory via the rpcmem utility which \
		selects the appropriate ION heap after detecting the target. \
		For more information about rpcmem and ION see \
		[Using the ION allocator] /APIs_FastRPC.html Using the ION allocator . \
		Below are portions of src/downscaleBy2.c that perform the shared buffer allocation steps. \
		.ccode \
		define USE_ION_MEMORY // to demonstrate the performance difference between ION and HLOS memory for sharing with ADSP. \
		ifndef USE_ION_MEMORY \
		define rpcmem_init \
		define rpcmem_deinit \
		define rpcmem_alloc a b c memalign 4096 c // simulate allocation from page boundary 4 KB \
		define rpcmem_free a free a \
		endif \
		. \
		ifdef __hexagon__ // some defs/stubs so app can build for Hexagon simulation \
		define rpcmem_init \
		define rpcmem_deinit \
		define rpcmem_alloc a b c memalign 4096 c // simulate allocation from page boundary 4 KB \
		define rpcmem_free a free a \
		endif \
		. \
		include rpcmem.h // helper API s for shared buffer allocation \
		. \
		// allocate ion buffers \
		rpcmem_init \
		VERIFY 0 ! src uint8_t* rpcmem_alloc RPCMEM_DEFAULT_HEAP RPCMEM_DEFAULT_FLAGS srcSize \
		printf src allocated %d/n int srcSize \
		VERIFY 0 ! dst uint8_t* rpcmem_alloc RPCMEM_DEFAULT_HEAP RPCMEM_DEFAULT_FLAGS dstSize \
		printf dst allocated %d/n int dstSize \
		. \
		if src \
		rpcmem_free src \
		if dst \
		rpcmem_free dst \
		// free ion buffers \
		rpcmem_deinit \
		**Initializing RPC session** \
		Generally an Android user process may implicitly initiate an RPC session by invoking \
		any FastRPC API That session will trigger the RPC driver to establish a corresponding \
		RPC user process on the Hexagon which will service all subsequent RPC invocations \
		from the same Android user process and will be destroyed by the RPC driver when the \
		same Android user process is killed. \
		In this example dspCV_initQ6_with_attributes is called to \
		perform useful initializations and configurations at the time of \
		establishing an RPC session with the Hexagon These include \
		clock voting to boost the Hexagon core clock and SNOC bus clock . \
		configuring latency tolerance to be considered by Hexagon sleep driver whenever \
		Hexagon is idle and available to be moved into a lower power state. \
		Creation of a worker thread pool for multi threaded algorithms. \
		The configuration settings described above are available as attributes to be passed \
		in the call to dspCV_initQ6_with_attributes and are described in \
		$ HEXAGON_SDK_ROOT /libs/fastcv/dspCV/inc/dspCV.idl. \
		Following are the code snippets where dspCV is initialized and de initialized. \
		.ccode \
		// call dspCV_initQ6_with_attributes to define Q6 clock and bus frequencies. \
		// Since this app is not real time and can fully load the DSP clock & bus resources \
		// throughout its lifetime vote for the maximum available MIPS & BW The selection of values \
		// in this initialization is crucial in defining the desired power vs performance trade off. \
		dspCV_Attribute attrib[] \
		// The below values will result in the maximum aDSP performance at Turbo voltage. \
		DSP_TOTAL_MCPS 1000 // Slightly more MCPS than are available on current targets \
		DSP_MCPS_PER_THREAD 500 // drive the clock to MAX on known targets \
		PEAK_BUS_BANDWIDTH_MBPS 12000 // 12 GB/sec is slightly higher than the max realistic max BW on existing targets. \
		BUS_USAGE_PERCENT 100 // This app is non real time and constantly reading/writing memory \
		// The below values will result in performance at nominal voltage initially \
		// and allow DCVS to move up and down as it deems optimal. \
		// DSP_TOTAL_MCPS 600 // Within nominal range for 8996 for initial performance setting \
		// DSP_MCPS_PER_THREAD 50 // A low setting here allows DCVS to drop clock as low as it deems possible over time \
		// PEAK_BUS_BANDWIDTH_MBPS 6000 // A BW within nominal range for 8996 . \
		// BUS_USAGE_PERCENT 50 // This app is non real time and constantly reading/writing memory \
		retVal dspCV_initQ6_with_attributes attrib sizeof attrib /sizeof attrib[0] \
		printf return value from dspCV_initQ6 %d /n retVal \
		**Invoking the FastRPC API** \
		The rest of the file is setup and logic for testing the Hexagon implementation of the \
		downscaleBy2 function Below is the actual invocation that calls into the FastRPC stub. \
		.ccode \
		// For HVX case note that src srcStride dst dstStride all must be multiples of 128 bytes. \
		// The HVX code for this example function does not handle unaligned inputs. \
		retVal downscaleBy2_scaleDownBy2 src srcSize srcWidth srcHeight srcStride dst dstSize dstStride uint32* &profResult \
		$ HEXAGON_SDK_ROOT /examples/common/downscaleBy2/src/downscaleBy2_imp.c \
		This file implements the Hexagon version of the downscaleBy2 function It is called \
		by the autogenerated FastRPC skel when the application makes an invocation into the \
		FastRPC stub. \
		**Debug Messaging** \
		The example shows how to generate messages useful for debugging and profiling Please \
		see [Message logging] /Debugging_Message Logging.html for more details Below are \
		relevant code snippets \
		.ccode \
		// enable message outputs for profiling by defining _DEBUG and including HAP_farf.h \
		ifndef _DEBUG \
		define _DEBUG \
		endif \
		include HAP_farf.h \
		. \
		FARF HIGH Warning HVX is reserved but not used src dst srcStride and/or dstStride are not aligned to 128 bytes as required \
		**Profiling** \
		The example shows how to measure the time in cycles and microseconds of execution of \
		the downscale function Note the relevant code sections along with the computation \
		to confirm the Hexagon core clock value. \
		.ccode \
		// profile DSP execution time without RPC overhead via HAP_perf api s. \
		include HAP_perf.h \
		. \
		// record start time in both microseconds and pcycles for profiling \
		ifdef PROFILING_ON \
		uint64 startTime HAP_perf_get_time_us \
		uint64 startCycles HAP_perf_get_pcycles \
		endif \
		. \
		// record end time in both microseconds and pcycles for profiling \
		ifdef PROFILING_ON \
		uint64 endCycles HAP_perf_get_pcycles \
		uint64 endTime HAP_perf_get_time_us \
		*profResult uint32 endTime startTime \
		FARF HIGH downscaleBy2 profiling %d PCycles %d microseconds Observed clock rate %d MHz \
		int endCycles startCycles int endTime startTime int endCycles startCycles / endTime startTime \
		endif \
		. \
		**aDSP Concurrency Checking** \
		The following block demonstrates a simple check for the aDSP concurrency level In this example an \
		indication that the concurrency level is too high for compute to run an error code is returned This \
		example will simply fail Real applications may choose a better way to handle high concurrency scenarios \
		such as performing the processing in the CPU if there is an equivalent implementation or pausing \
		the application etc. \
		.ccode \
		// Determine if it is safe from an audio/voice/camera concurrency perspective to run a compute function now \
		dspCV_ConcurrencyAttribute attrib[] \
		COMPUTE_RECOMMENDATION 0 // query for compute concurrency recommendation \
		dspCV_concurrency_query attrib sizeof attrib /sizeof attrib[0] \
		if COMPUTE_RECOMMENDATION_NOT_OK attrib[0].value \
		// return error back to application \
		return AEE_EBADSTATE \
		**HVX Context Configuration** \
		Here we examine how HVX is used conditioned upon availability i.e legacy targets \
		without HVX are also supported The wrapper and utility HVX control functions from \
		dspCV_hvx.h are used for this purpose. \
		The invocation function downscaleBy2_scaleDownBy2 contains the top level HVX logic This \
		example only supports using HVX if the input and output image buffers are aligned to HVX \
		vector width of 128 bytes both in start address and stride Note that it is possible \
		to support unaligned buffers primarily through use of HVX instructions for bytewise enabled \
		write vector alignment and unaligned load/store operations But it is ideal to manage \
		the buffers to avoid these whenever possible Some drawbacks of unaligned load/store operations \
		include \
		Each unaligned load or store requires 2 fetches from L2 and an implicit permute \
		operation. \
		Unaligned load and store instructions lack some of the options that aligned loads \
		and stores offer such as bytewise enabled immediate use new and non temporal. \
		Extra care must be taken for unaligned loads and stores at the beginning or end of \
		a buffer whose size is not a multiple of the vector width VLEN to avoid the \
		possibility of accessing unmapped pages. \
		In this example invocation with improperly aligned buffers results in fallback to the \
		non HVX implementation Below is a code snippet from downscaleBy2_scaleDownBy2 with \
		comments for the top level HVX logic. \
		.ccode \
		// Determine if HVX is available and in what configuration \
		dspCV_hvx_config_t hvxInfo 0 \
		int numWorkers 0 \
		// This HVX implementation assumes 128 byte aligned buffers and strides \
		if 0 127 & uint32 imgSrc uint32 imgDst srcStride dstStride \
		// Call utility function to prepare for a multi threaded HVX computation sequence. \
		dspCV_hvx_prepare_mt_job &hvxInfo \
		// Check results and react accordingly extended if/else used here for clarity of example \
		if hvxInfo.numUnits 0 \
		// hvxInfo.numUnits 0 indicates the target does not have HVX HW In this example \
		// we fall back to the non HVX implementation and use all available worker threads . \
		// In other functions without a fallback it might be appropriate to return an error \
		// code indicating HVX is not present on the target. \
		numWorkers dspCV_num_workers \
		else if hvxInfo.numUnits 0 \
		// hvxInfo.numUnits 0 indicates the target has HVX HW but currently there are no \
		// contexts available for reservation In this example \
		// we fall back to the non HVX implementation and use all available worker threads . \
		// In other functions without a fallback it might be appropriate to either return an error \
		// code indicating HVX is not currently available. \
		numWorkers dspCV_num_workers \
		else \
		// Reservation of HVX units was successful Prepare to multi thread across however many \
		// threads HVX was reserved for. \
		numWorkers hvxInfo.numThreads \
		else \
		// Boundary conditions for using this HVX function are not met Perform corrective action. \
		// In this example we will fall back to non HVX implementation In other functions it \
		// may be appropriate to return an error response. \
		if dspCV_hvx_num_reserved 0 \
		FARF HIGH Warning HVX is reserved but not used src dst srcStride and/or dstStride are not aligned to 128 bytes as required \
		// multi thread the non HVX implementation according to how many worker threads are available. \
		numWorkers dspCV_num_workers \
		Note that the choice of how many worker threads to dispatch is based on whether HVX is \
		being used Please see [Multi threading] Multi threading above for the background \
		information This is to ensure that the number of competing worker threads be limited \
		to the number of successfully reserved HVX contexts if any If HVX is not to be used \
		the number of dispatched workers is simply set to the number of available workers. \
		Now we examine the HVX logic in worker callback function downby2_callback Below is \
		the callback function with comments inline. \
		.ccode \
		// multi threading callback function \
		static void downby2_callback void* data \
		downby2_callback_t *dptr downby2_callback_t* data \
		// If HVX contexts reserved lock one for this thread. \
		// Even though HVX contexts have been reserved for this process each thread still needs to \
		// lock a context before using any HVX instructions. \
		int hvxReserved dptr hvxInfo numUnits 0 \
		int lockResult 0 \
		if hvxReserved \
		// 128B mode preferred \
		lockResult dspCV_hvx_lock DSPCV_HVX_MODE_128B 0 \
		// 128B mode failure likely indicates a concurrent HVX user with mode already locked to 64B. \
		// This function is compatible with both 128B and 64B modes so try falling back to 64B. \
		if lockResult ! 128 lockResult dspCV_hvx_lock DSPCV_HVX_MODE_64B 0 \
		if 0 lockResult \
		// This should never happen but fall back to scalar with a warning message. \
		FARF HIGH Warning HVX is reserved but could not be locked Using scalar version \
		lockResult 0 \
		// loop until no more horizontal stripes to process \
		while lockResult 0 \
		// atomically add 1 to the job count to claim a stripe. \
		unsigned int jobCount dspCV_atomic_inc_return & dptr jobCount 1 \
		// if all horizontal stripes have been claimed for processing break out and exit the callback \
		if jobCount * dptr rowsPerJob dptr srcHeight \
		break \
		// Set pointers to appropriate line of image for this stripe \
		unsigned char *src dptr src + dptr srcStride * dptr rowsPerJob * jobCount \
		unsigned char *dst dptr dst + dptr dstStride * dptr rowsPerJob / 2 * jobCount \
		// find height of this stripe Usually dptr rowsPerJob except possibly for the last stripe. \
		unsigned int remainingRows dptr srcHeight dptr rowsPerJob * jobCount \
		unsigned int srcHeight remainingRows dptr rowsPerJob ? remainingRows dptr rowsPerJob \
		// call optimized assembly \
		if !hvxReserved !lockResult \
		// legacy implementation for non HVX targets or for HVX targets in case HVX is not available. \
		down2 src dptr srcWidth srcHeight dptr srcStride dst dptr dstStride \
		else \
		// HVX optimized implementation \
		down2_hvx src dptr srcWidth srcHeight dptr srcStride dst dptr dstStride lockResult \
		// If HVX was locked unlock it. \
		if lockResult 0 dspCV_hvx_unlock \
		// release multi threading job token \
		dspCV_worker_pool_synctoken_jobdone dptr token \
		$ HEXAGON_SDK_ROOT /examples/common/downscaleBy2/asm_src/downscaleBy2_asm.S \
		This file contains the hand optimized assembly function for downscaling down2_hvx . \
		The function is thoroughly commented inline but below are some key points to note \
		There is no usage of DCZEROA or DCFETCH which were used to good \
		effect in down2 the non HVX implementation This is because HVX load/store \
		operations go directly through L2 cache so that L1 cache operations are \
		not useful. \
		VLEN the vector width is passed in as an argument and the assembly code is \
		agnostic all operations operate in terms of VLEN or log2 VLEN never a 128 or 64 . \
		While VLEN can be defined by the compiler the true value is defined at run time \
		based on the mode in which the HVX context was locked Keeping the assembly code \
		agnostic is ideal for portability of pre compiled libraries that may be used in \
		different targets and run time environments. \
		All of the load/store operations use the non temporal qualifier NT This is a \
		hint to the core that the line is not expected to be immediately reused and hence \
		is a good candidate for cache eviction This helps reduce thrashing other threads \
		cache. \
		Care is taken with the Early Source instructions in the inner loop to avoid \
		interlock stalls as described in 4.4 of Hexagon V60 Vector Extensions Architecture Specification. \
		While start addresses and strides are required to be VLEN aligned the width is not. \
		Handling unaligned width requires bytewise enabled stores and extra tail logic. \
		$ HEXAGON_SDK_ROOT /examples/common/downscaleBy2/src/downscaleBy2_C_intrinsics.c \
		. \
		This file contains the C with intrinsics version of down2_hvx It is sparsely commented \
		as it is basically a back port of the assembly version into C One noteworthy difference \
		is that the vector data types from hexagon_types.h cannot be agnostic of run time VLEN. \
		The compiler must choose one or the other and in this example 128 byte mode is assumed \
		through the use of mhvx double in the hexagon.min makefile. \
		Building and Running for Hexagon V60 with HVX On target \
		To execute the downscaleBy2 example on a V60 device use the following steps from $ HEXAGON_SDK_ROOT /examples/common/downscaleBy2 \
		.ccode \
		make tree V hexagon_Release_dynamic_toolv83_v60 \
		make tree V android_Release \
		adb root \
		adb wait for device \
		adb remount \
		adb push hexagon_Release_dynamic_toolv83_v60/ship/libdownscaleBy2_skel.so /vendor/lib/rfsa/adsp \
		adb push android_Release/ship/downscaleBy2 /vendor/bin \
		adb shell chmod 755 /vendor/bin/downscaleBy2 \
		adb push / / /libs/fastcv/dspCV/hexagon_Release_dynamic_toolv83_v60/ship/libdspCV_skel.so /vendor/lib/rfsa/adsp \
		adb push / / /libs/common/apps_mem_heap/ship/hexagon_Release_dynamic_toolv83_v60/libapps_mem_heap.so /vendor/lib/rfsa/adsp \
		adb shell /vendor/bin/downscaleBy2 \
		All the above steps are captured in the script \
		For Windows \
		HEXAGON_SDK_ROOT /examples/common/downscaleBy2/downby2_walkthrough.py \
		For Linux \
		HEXAGON_SDK_ROOT /examples/common/downscaleBy2/downby2_walkthrough.py \
		The output should look like the following \
		.ccode \
		D /p4/main/a/pkg/downscaleBy2 adb shell /vendor/bin/downscaleBy2 \
		return value from dspCV_initQ6 0 \
		src allocated 2073600 \
		dst allocated 1036800 \
		calling downscaleBy2_scaleDownBy2 on a 1920x1080 image . \
		run time of downscaleBy2_scaleDownBy2 1531906 microseconds for 1000 iterations \
		DSP measured duration for single last invocation 450 microseconds \
		return value from downscaleBy2_scaleDownBy2 0 \
		Number of bit exact errors 0 \
		calling dspCV_deinitQ6 . \
		return value from dspCV_deinitQ6 0 \
		success \
		Optimization \
		Here we explore the on target performance improvements gained by the optimization approaches that have \
		been implemented in this example. \
		C vs Intrinsics vs Assembly \
		. \
		The example is running a hand written assembly version of the core downscale algorithm To compare the performance \
		450 microseconds measured within DSP above to the C with intrinsics and plain C versions edit the hexagon.min \
		file in the example directory Around line 20 change as follows to select the C with intrin \
		.ccode \
		choose one of the following 3 to profile different implementations. \
		The assembly implementation is the best others are just for comparison. \
		libdownscaleBy2_skel.ASM_SRCS + asm_src/downscaleBy2_asm.S \
		libdownscaleBy2_skel_C_SRCS + src/downscaleBy2_plain_C \
		libdownscaleBy2_skel_C_SRCS + src/downscaleBy2_C_intrinsics \
		Then do the following. \
		.ccode \
		make V hexagon_Release_dynamic_toolv83_v60 \
		adb push hexagon_Release_dynamic_toolv83_v60/ship/libdownscaleBy2_skel.so /vendor/lib/rfsa/adsp \
		adb shell /vendor/bin/downscaleBy2 \
		You will see that the C with intrinsics version is slightly slower while the plain C version is \
		dramatically slower. \
		L2 prefetch \
		. \
		L2 prefetch is a crucial element of Hexagon optimization It enables pipelined background transfer of external \
		memory into the L2 cache ahead of corresponding load instructions This particular example is not a very \
		good demonstration of the benefit because the HVX load instructions in the downscale assembly code \
		are so tightly packed that they get effectively pipelined anyway The benefit is much better illustrated if we \
		use the non HVX version of the downscale. \
		To do this revert the above changes to hexagon.min to enable the assembly version again and \
		make the following change to src/downscaleBy2_imp.c around line 120 \
		.ccode \
		// call optimized assembly \
		if 1 // !hvxReserved !lockResult \
		and then \
		.ccode \
		make V hexagon_Release_dynamic_toolv83_v60 \
		adb push hexagon_Release_dynamic_toolv83_v60/ship/libdownscaleBy2_skel.so /vendor/lib/rfsa/adsp \
		adb shell /vendor/bin/downscaleBy2 \
		You should see that the DSP measured duration has roughly doubled due to using the non HVX version \
		of assembly code Note again that this particular being so dominated by memory access does not fully \
		illustrate the power of HVX computation Now observe the impact of L2 prefetch by disabling in the \
		non HVX assembly In file src_dsp/downscaleBy2.asm around line 86 comment out the following line \
		.ccode \
		//L2FETCH R0 R25 24 // during processing of src rows N N+1 fetch rows N N+3 \
		Build push and run again You should now see the DSP measured duration roughly triple. \
		Multi threading \
		. \
		Another crucial element of Hexagon optimization is multi threading Due to the interleaved multi threaded \
		architecture of the Hexagon full utilization of the DSP can only be achieved when multiple software threads \
		are running concurrently. \
		The downscaleBy2 example uses the dspCV worker pool to assist with multi threading To observe the impact \
		first restore the L2 prefetch in the non HVX assembly code but don t revert the hack to make it use the \
		non HVX version Then in src/downscaleBy2_imp.c around line 250 switch from the multi threaded \
		job sumbission to the in context call to the callback as follows. \
		.ccode \
		// for multi threaded impl use this line. \
		// void dspCV_worker_pool_submit job \
		// This line can be used instead of the above to directly invoke the \
		// callback function without dispatching to the worker pool Useful \
		// to avoid multi threading in debug scenarios to narrow down problems. \
		job.fptr job.dptr \
		Build push and run You should see about a 1.5x increase compared to the multi threaded version Note that \
		if you revert the hack to choose the non HVX version and run the HVX version with and without multi threading \
		there is not much difference This is again due to fact that the HVX version of this example is completely \
		bottle necked by memory throughput even when there is only 1 active thread. \
		Revert all of the changes from the above experiments. \
		Advanced Profiling On target \
		Detailed on target profiling is available with the sysmon utility which is present with \
		documentation in the SDK at /tools/utils/sysmon.	",
	"id":112
}
idx.add(doc)
urls[112]='FastCV/Image%20Downscale.html'
titles[112]="Image downscaling example"

var doc = {
	"title": "Computer vision",
	"body": " \
		Overview \
		Qualcomm s Hexagon SDK allows customers to develop DSP accelerated Computer \
		Vision applications on Hexagon V5 and later products via [dynamic loading] /APIs_Dynamic Loading.html \
		and [FastRPC] /APIs_FastRPC.html The [dspCV utility library] dspCV Library abstracts \
		the DSP runtime environment for any compute application not necessarily just Computer Vision to \
		effectively use DSP resources The [FastCV library] FastCV Library contains many image processing API s \
		optimized for the Hexagon DSP This SDK includes several [examples] /Examples_ComputeHVX.html \
		demonstrating usage of both of these libraries in the typical usage model shown below. \
		Apps DSP \
		Proc \
		libdspCV_skel.so \
		HVX context mgmt \
		Thread Worker Pool \
		Customer FastRPC \
		App ^ ^ \
		+ + \
		+ + Customer libfastcvadsp.so \
		App \
		dspCV Library \
		The dspCV library in $ HEXAGON_SDK_ROOT /lib/fastcv/dspCV aims to abstract as much of the DSP runtime environment as possible to \
		reduce effort in offloading compute processing to the DSP It offers API s to perform such \
		functions as clock/power voting multi threaded callbacks concurrency checking and \
		HVX resource management. \
		New for SDM660/SDM845 \
		Separation of the cDSP from the aDSP and other new features in relevant SW frameworks have \
		reduced the need for some of dspCV API s The evolution of frameworks and recommendations \
		for each supported target are detailed in the [Hexagon/HVX Overview] /HVX/ArchitectureOverview.html . \
		To summarize that information it is no longer recommended to use dspCV for clock voting or even \
		to explicitly call dspCV_init_with_attributes dspCV_concurrency API s are no longer needed. \
		In SDM845 dspCV_hvx API s are no longer needed dspCV can be linked against and its worker pool \
		will be initialized via static constructor at loading time. \
		dspCV remoted API s \
		*As mentioned above using these remote API s is no longer recommended from SDM660 forward. \
		They are still supported for backward compatibility.* \
		Following are the remoted API s to be called from the Application Processor which are fully \
		documented inline in the $ HEXAGON_SDK_ROOT /lib/fastcv/dspCV/inc/dspCV.idl header file. \
		dspCV_initQ6_with_attributes boosts the DSP and SNOC bus clocks \
		to values indicated by the attributes specified Please see the inline \
		documentation in $ HEXAGON_SDK_ROOT /lib/fastCV/dspCV/inc/dspCV.idl for details on specifying \
		the desired power/performance trade off options available to the calling application. \
		This function will also instantiate and reference count \
		a singleton worker thread pool per process on the DSP for subsequent use by any \
		multi threaded DSP functions within the established RPC process. \
		Calls to dspCV_deinitQ6 will revoke clock boosts and tear down the worker pool once \
		reference count reaches 0 . \
		dspCV_getQ6_concurrency_attributes allows the application to perform instantaneous \
		queries for information on the DSP concurrency level. \
		**dspCV_initQ6_with_attributes ** and **dspCV_deinitQ6 ** are meant to be called at the beginning and end of a \
		use case respectively In between those calls DSP applications can use the multi threading callback API s in \
		**$ HEXAGON_SDK_ROOT /lib/fastcv/dspCV/ flavor /dspCV_worker.h** Essentially the \
		application can submit jobs to the worker pool where each job is pair of a function callback pointer \
		and a data pointer to pass to that callback in a worker thread context. \
		dspCV C callable API s from within the DSP \
		dspCV_worker.h HVX API s \
		This header $ HEXAGON_SDK_ROOT /lib/fastCV/dspCV/inc/dspCV_worker.h contains API s for utilizing the worker thread pool utility. \
		Here are the key API s it contains which are documented inline in that file. \
		.ccode \
		// signature of callbacks to be invoked by worker threads \
		typedef void *dspCV_worker_callback_t void* \
		// descriptor for requested callback \
		typedef struct \
		dspCV_worker_callback_t fptr // function pointer \
		void* dptr // data pointer \
		dspCV_worker_job_t \
		// initialize a synchronization token for the number of jobs to be submitted done by master \
		void dspCV_worker_pool_synctoken_init dspCV_synctoken_t *token unsigned int njobs \
		// submit a callback + data ptr job to the worker pool done by master \
		int dspCV_worker_pool_submit dspCV_worker_job_t job \
		// release a synchronization token done by the worker callback \
		void dspCV_worker_pool_synctoken_jobdone dspCV_synctoken_t *token \
		// wait until all synchronization tokens have been released done by master \
		void dspCV_worker_pool_synctoken_wait dspCV_synctoken_t *token \
		// utility to atomically increment a counter Useful for letting workers compete for numbered jobs \
		unsigned int dspCV_atomic_inc_return unsigned int *target \
		// utility to atomically decrement a counter Useful for letting workers compete for numbered jobs \
		unsigned int dspCV_atomic_dec_return unsigned int *target \
		dspCV_hvx.h HVX API s \
		. \
		The dspCV library contains helper functions to assist with HVX resource logic in \
		$ HEXAGON_SDK_ROOT /lib/fastCV/dspCV/inc/dspCV_hvx.h Here are the API s it contains which are \
		documented inline in that file. \
		.ccode \
		int dspCV_hvx_reserve unsigned int num_units \
		void dspCV_hvx_unreserve void \
		int dspCV_hvx_num_reserved void \
		int dspCV_hvx_power_on void \
		void dspCV_hvx_power_off void \
		int dspCV_hvx_lock dspCV_hvx_mode_t mode unsigned int block \
		void dspCV_hvx_unlock void \
		void dspCV_hvx_prepare_mt_job dspCV_hvx_config_t *hvx_config \
		void dspCV_hvx_cleanup_mt_job dspCV_hvx_config_t *hvx_config \
		void dspCV_hvx_disable void \
		void dspCV_hvx_enable void \
		void dspCV_hvx_set_default_mode dspCV_hvx_mode_t mode \
		dspCV_concurrency.h Concurrency API s \
		. \
		In addition to being remoted to the Application Processor concurrency information may also be \
		queried by the DSP compute application implementation from with the DSP The API s are available \
		with inline documentation in $ HEXAGON_SDK_ROOT /lib/fastCV/dspCV/inc/dspCV_concurrency.h \
		.ccode \
		void dspCV_concurrency_query dspCV_ConcurrencyAttribute* attrib int attribLen \
		void dspCV_concurrency_set_audio_mpps_1_hvx_threshold int threshold \
		void dspCV_concurrency_set_audio_mpps_2_hvx_threshold int threshold \
		One of the attributes available for the dspCV_concurrency_query API is COMPUTE_RECOMMENDATION. \
		Requesting this attribute will return COMPUTE_RECOMMENDATION_OK or COMPUTE_RECOMMENDATION_NOT_OK \
		depending on the current concurrency A well behaved compute application should make this query at \
		convenient times at last every 30 msec and halt DSP processing upon receiving COMPUTE_RECOMMENDATION_NOT_OK. \
		Other attributes listed in $ HEXAGON_SDK_ROOT /lib/fastCV/dspCV/inc/dspCV.idl \
		are also available for gathering additional information. \
		FastCV Library \
		This SDK release contains Hexagon FastCV libraries conforming to version 1.7.1 of the \
		FastCV API defined [QDevNet] https //developer.qualcomm.com/docs/fastcv/api/index.html . \
		These libraries are found at $ HEXAGON_SDK_ROOT /lib/fastcv/fastcv and are available as static libraries \
		for linking into simulator executables and as dynamic libraries for on target usage . \
		FastCV 1.7.1 API s that have been hand optimized for Hexagon V5x \
		are listed in [QDSP6 V5 optimized functions] QDSP6 V5 optimized functions . \
		Hexagon V60 and v62 are backward compatible to benefit from all the V5 optimized functions. \
		Additionally functions that have been re optimized specifically for HVX are listed \
		in [HVX optimized functions] HVX optimized functions . \
		QDSP6 V5 optimized functions \
		* fcv2PlaneWarpPerspectiveu8 \
		* fcv3ChannelTransformAffineClippedBCu8 \
		* fcv3ChannelWarpPerspectiveu8 \
		* fcv3ChannelWarpPerspectiveu8_v2 \
		* fcvAbsDifff32 \
		* fcvAbsDiffs32 \
		* fcvAbsDiffu8 \
		* fcvAbsDiffVc3f32 \
		* fcvAbsDiffVc3s32 \
		* fcvAbsDiffVc3u8 \
		* fcvAbsDiffVc4f32 \
		* fcvAbsDiffVc4s32 \
		* fcvAbsDiffVc4u8 \
		* fcvAbsDiffVf32 \
		* fcvAbsDiffVs32 \
		* fcvAbsDiffVu8 \
		* fcvAdaptiveThresholdGaussian11x11u8 \
		* fcvAdaptiveThresholdGaussian3x3u8 \
		* fcvAdaptiveThresholdGaussian5x5u8 \
		* fcvAdaptiveThresholdMean11x11u8 \
		* fcvAdaptiveThresholdMean3x3u8 \
		* fcvAdaptiveThresholdMean5x5u8 \
		* fcvAddf32 \
		* fcvAdds16 \
		* fcvAdds16_v2 \
		* fcvAddScalarf32 \
		* fcvAddScalars16 \
		* fcvAddSquaredu8u16 \
		* fcvAddu16u8u16 \
		* fcvAddu8 \
		* fcvAddu8u16 \
		* fcvAddWeightedu8 \
		* fcvAverages32 \
		* fcvAverageu8 \
		* fcvBilateralFilter5x5u8 \
		* fcvBilateralFilter5x5u8_v2 \
		* fcvBilateralFilter7x7u8 \
		* fcvBilateralFilter7x7u8_v2 \
		* fcvBilateralFilter9x9u8 \
		* fcvBilateralFilter9x9u8_v2 \
		* fcvBilateralFilterRecursiveu8 \
		* fcvBitCount32x1u8 \
		* fcvBitCount32x4u8 \
		* fcvBitCount64x1u8 \
		* fcvBitCount64x4u8 \
		* fcvBitCountu32 \
		* fcvBitCountu8 \
		* fcvBitwiseAndu8 \
		* fcvBitwiseNotu8 \
		* fcvBitwiseOrs32 \
		* fcvBitwiseOru8 \
		* fcvBitwiseXoru8 \
		* fcvBlockDotProductf32 \
		* fcvBlockDotProductu8 \
		* fcvBoundingRectangle \
		* fcvBoxFilter11x11u8 \
		* fcvBoxFilter3x3u8 \
		* fcvBoxFilter3x3u8_v2 \
		* fcvBoxFilter5x5u8 \
		* fcvBoxFilterNxNf32 \
		* fcvChannelCombine2Planesu8 \
		* fcvChannelCombine3Planesu8 \
		* fcvChannelCombine4Planesu8 \
		* fcvChannelExtractu8 \
		* fcvCleanUp \
		* fcvClusterEuclideanf32 \
		* fcvClusterEuclideanNormed36f32 \
		* fcvClusterEuclideanNormedf32 \
		* fcvClusterEuclideanu8 \
		* fcvColorCbCrSwapu8 \
		* fcvColorRGB888ToGrayu8 \
		* fcvColorRGB888ToHSV888u8 \
		* fcvColorRGB888toYCrCbu8 \
		* fcvColorRGB888toYCrCbu8_v2 \
		* fcvColorYCrCb420PseudoPlanarToRGB8888u8 \
		* fcvColorYCrCbH1V1toRGB888u8 \
		* fcvColorYCrCbH1V2toRGB888u8 \
		* fcvColorYCrCbH2V1toRGB888u8 \
		* fcvColorYCrCbH2V2toRGB888u8 \
		* fcvColorYUV420toRGB565u8 \
		* fcvColorYUV420toRGB8888u8 \
		* fcvConAdaTrackf32 \
		* fcvConAdaTracks32 \
		* fcvConAdaTracku8 \
		* fcvConvertDepths16u8 \
		* fcvConvertDepthu8s16 \
		* fcvConvValids16 \
		* fcvCopyRotated17x17u8 \
		* fcvCornerFast10InMaskScoreu8 \
		* fcvCornerFast10InMasku8 \
		* fcvCornerFast10Scoreu8 \
		* fcvCornerFast10u8 \
		* fcvCornerFast9InMaskScoreu8 \
		* fcvCornerFast9InMaskScoreu8_v2 \
		* fcvCornerFast9InMasku8 \
		* fcvCornerFast9Scoreu8 \
		* fcvCornerFast9Scoreu8_v2 \
		* fcvCornerFast9u8 \
		* fcvCornerHarrisAdaptiveu8 \
		* fcvCornerHarrisInMasku8 \
		* fcvCornerHarrisScoreu8 \
		* fcvCornerHarrisu8 \
		* fcvCornerRefineSubPixu8 \
		* fcvCrossProduct3x1f32 \
		* fcvDCTu8 \
		* fcvDescriptor17x17u8To36s8 \
		* fcvDescriptorSampledMeanAndVar36f32 \
		* fcvDotProduct11x12u8 \
		* fcvDotProduct128x1s8 \
		* fcvDotProduct128x1u8 \
		* fcvDotProduct128x4s8 \
		* fcvDotProduct128x4u8 \
		* fcvDotProduct36x1s8 \
		* fcvDotProduct36x1u8 \
		* fcvDotProduct36x4s8 \
		* fcvDotProduct36x4u8 \
		* fcvDotProduct64x1s8 \
		* fcvDotProduct64x1u8 \
		* fcvDotProduct64x4s8 \
		* fcvDotProduct64x4u8 \
		* fcvDotProduct8x8u8 \
		* fcvDotProductf32 \
		* fcvDotProductNorm128x4s8 \
		* fcvDotProductNorm128x4u8 \
		* fcvDotProductNorm36x4s8 \
		* fcvDotProductNorm36x4u8 \
		* fcvDotProductNorm64x4s8 \
		* fcvDotProductNorm64x4u8 \
		* fcvDotProducts8 \
		* fcvDotProductu8 \
		* fcvDWT53Tabs16 \
		* fcvDWTHaaru8 \
		* fcvElementMultiplyf32 \
		* fcvElementMultiplys16 \
		* fcvElementMultiplyu8 \
		* fcvElementMultiplyu8s16 \
		* fcvElementMultiplyu8u16 \
		* fcvFFTu8 \
		* fcvFilterCanny3x3u8 \
		* fcvFilterCanny3x3u8_v2 \
		* fcvFilterCanny3x3u8_v3 \
		* fcvFilterCannyu8 \
		* fcvFilterConvolveMxNu8 \
		* fcvFilterConvolveMxNu8s16 \
		* fcvFilterConvSepMxNs16 \
		* fcvFilterCorr3x3s8 \
		* fcvFilterCorr3x3s8_v2 \
		* fcvFilterCorrNxNu8 \
		* fcvFilterCorrNxNu8f32 \
		* fcvFilterCorrNxNu8s16 \
		* fcvFilterCorrSep11x11s16 \
		* fcvFilterCorrSep11x11s16_v2 \
		* fcvFilterCorrSep13x13s16 \
		* fcvFilterCorrSep13x13s16_v2 \
		* fcvFilterCorrSep15x15s16 \
		* fcvFilterCorrSep15x15s16_v2 \
		* fcvFilterCorrSep17x17s16 \
		* fcvFilterCorrSep17x17s16_v2 \
		* fcvFilterCorrSep9x9s16 \
		* fcvFilterCorrSep9x9s16_v2 \
		* fcvFilterCorrSepMxNu8 \
		* fcvFilterCorrSepNxNs16 \
		* fcvFilterDilate3x3u8 \
		* fcvFilterDilate3x3u8_v2 \
		* fcvFilterDilate3x3u8_v3 \
		* fcvFilterDilateNxNu8 \
		* fcvFilterErode3x3u8 \
		* fcvFilterErode3x3u8_v2 \
		* fcvFilterErode3x3u8_v3 \
		* fcvFilterErodeNxNu8 \
		* fcvFilterGaussian11x11u8 \
		* fcvFilterGaussian11x11u8_v2 \
		* fcvFilterGaussian3x3u8 \
		* fcvFilterGaussian3x3u8_v2 \
		* fcvFilterGaussian3x3u8_v3 \
		* fcvFilterGaussian5x5s16 \
		* fcvFilterGaussian5x5s16_v2 \
		* fcvFilterGaussian5x5s32 \
		* fcvFilterGaussian5x5s32_v2 \
		* fcvFilterGaussian5x5u8 \
		* fcvFilterGaussian5x5u8_v2 \
		* fcvFilterMedian3x3u8 \
		* fcvFilterMedian3x3u8_v2 \
		* fcvFilterMedian3x3u8_v3 \
		* fcvFilterMedianMxNs16 \
		* fcvFilterSobel3x3u8 \
		* fcvFilterSobel3x3u8_v2 \
		* fcvFilterSobel3x3u8s16 \
		* fcvFilterSobel5x5u8s16 \
		* fcvFilterSobel7x7u8s16 \
		* fcvFilterThresholdOtsuu8 \
		* fcvFilterThresholdRangeu8 \
		* fcvFilterThresholdRangeu8_v2 \
		* fcvFilterThresholdu8 \
		* fcvFilterThresholdu8_v2 \
		* fcvFilterThresholdu8_v3 \
		* fcvFindContoursCcompu8 \
		* fcvFindContoursExternalu8 \
		* fcvFindContoursListu8 \
		* fcvFindContoursTreeu8 \
		* fcvFindForegroundIntegrateImageYCbCr420u32 \
		* fcvFlipRGB888u8 \
		* fcvFlipu16 \
		* fcvFlipu8 \
		* fcvFloodfillMergedu8 \
		* fcvFloodfillSimpleu8 \
		* fcvGeomAffineEvaluatef32 \
		* fcvGeomAffineFitf32 \
		* fcvGeomDistortPoint2x1f32 \
		* fcvGeomDistortPoint2xNf32 \
		* fcvGeomHomographyEvaluatef32 \
		* fcvGeomHomographyEvaluatef32_v2 \
		* fcvGeomHomographyFitf32 \
		* fcvGeomPoseEvaluateErrorf32 \
		* fcvGeomPoseEvaluatef32 \
		* fcvGeomPoseOptimizeGNf32 \
		* fcvGeomPoseRefineGNf32 \
		* fcvGeomPoseUpdatef32 \
		* fcvGeomProjectPoint3x1f32 \
		* fcvGeomProjectPoint3xNf32 \
		* fcvGeomUndistortPoint2x1f32 \
		* fcvGeomUndistortPoint2xNf32 \
		* fcvGetPerspectiveTransformf32 \
		* fcvGetVersion \
		* fcvGLBPu8 \
		* fcvGoodFeatureToTracku8 \
		* fcvHammingDistance32x1u8 \
		* fcvHammingDistance32x1u8a4 \
		* fcvHammingDistance32x4u8a4 \
		* fcvHammingDistance64x1u8 \
		* fcvHammingDistance64x1u8a4 \
		* fcvHammingDistance64x4u8 \
		* fcvHammingDistance64x4u8a4 \
		* fcvHammingDistanceu8 \
		* fcvHoughCircleu8 \
		* fcvHoughLineu8 \
		* fcvICPJacobianErrorSE3f32 \
		* fcvIDCTs16 \
		* fcvIDWT53Tabs16 \
		* fcvIDWTHaars16 \
		* fcvIFFTf32 \
		* fcvImageDetectEdgePixelsu8 \
		* fcvImageDifff32 \
		* fcvImageDiffs16 \
		* fcvImageDiffu8 \
		* fcvImageDiffu8_v2 \
		* fcvImageDiffu8f32 \
		* fcvImageDiffu8s8 \
		* fcvImageGradientInterleavedf32_v2 \
		* fcvImageGradientInterleaveds16 \
		* fcvImageGradientInterleaveds16_v2 \
		* fcvImageGradientPlanarf32_v2 \
		* fcvImageGradientPlanars16 \
		* fcvImageGradientPlanars16_v2 \
		* fcvImageGradientScharrInterleaveds16 \
		* fcvImageGradientSobelInterleavedf32 \
		* fcvImageGradientSobelInterleavedf32_v2 \
		* fcvImageGradientSobelInterleaveds16 \
		* fcvImageGradientSobelInterleaveds16_v2 \
		* fcvImageGradientSobelInterleaveds16_v3 \
		* fcvImageGradientSobelPlanarf32 \
		* fcvImageGradientSobelPlanarf32_v2 \
		* fcvImageGradientSobelPlanarf32f32 \
		* fcvImageGradientSobelPlanarf32f32_v2 \
		* fcvImageGradientSobelPlanars16 \
		* fcvImageGradientSobelPlanars16_v2 \
		* fcvImageGradientSobelPlanars16_v3 \
		* fcvImageGradientSobelPlanars8 \
		* fcvImageGradientSobelPlanars8_v2 \
		* fcvImageHistogramEqualizeu8 \
		* fcvImageIntensityHistogram \
		* fcvImageIntensityStats \
		* fcvImageMomentsf32 \
		* fcvImageMomentss32 \
		* fcvImageMomentsu8 \
		* fcvImageSegmentationRegionGrow \
		* fcvImageSpatialHistogramu8 \
		* fcvImageSpatialHistogramu8_v2 \
		* fcvIntegrateImageLine64u8 \
		* fcvIntegrateImageLineu8 \
		* fcvIntegrateImageu8 \
		* fcvIntegrateImageu8_v2 \
		* fcvIntegrateImageu8u64 \
		* fcvIntegrateImageYCbCr420PseudoPlanaru8 \
		* fcvIntegratePatch12x12u8 \
		* fcvIntegratePatch12x12u8_v2 \
		* fcvIntegratePatch18x18u8 \
		* fcvIntegratePatch18x18u8_v2 \
		* fcvIntegratePatchu8 \
		* fcvIntegratePatchu8_v2 \
		* fcvIntegratePatchu8_v3 \
		* fcvJacobianSE2f32 \
		* fcvKDTreeCreate36s8f32 \
		* fcvKDTreeDestroy36s8f32 \
		* fcvKDTreeQuery36s8f32 \
		* fcvKMeansTreeSearch36x10s8 \
		* fcvLinearSearch8x36s8 \
		* fcvLocalHarrisMaxu8 \
		* fcvMagnitudes16 \
		* fcvMatrixMultiplyf32 \
		* fcvMatrixMultiplys8s32 \
		* fcvMeanShiftf32 \
		* fcvMeanShifts32 \
		* fcvMeanShiftu8 \
		* fcvMemAlloc \
		* fcvMemFree \
		* fcvMinMaxLocf32 \
		* fcvMinMaxLocs16 \
		* fcvMinMaxLocs32 \
		* fcvMinMaxLocu16 \
		* fcvMinMaxLocu32 \
		* fcvMinMaxLocu8 \
		* fcvMserExtNN8u8 \
		* fcvMserExtu8 \
		* fcvMserExtu8_v2 \
		* fcvMserExtu8_v3 \
		* fcvMserInit \
		* fcvMserNN8Init \
		* fcvMserNN8u8 \
		* fcvMserRelease \
		* fcvMserSplitExtu8 \
		* fcvMseru8 \
		* fcvMseru8_v2 \
		* fcvMultiplyScalarf32 \
		* fcvMultiplyScalars16 \
		* fcvNCCPatchesOnRectu8 \
		* fcvNCCPatchOnCircle8x8u8 \
		* fcvNCCPatchOnCircle8x8u8_v2 \
		* fcvNCCPatchOnSquare8x8u8 \
		* fcvNCCPatchOnSquare8x8u8_v2 \
		* fcvNormalizeLocalBoxf32 \
		* fcvNormalizeLocalBoxu8 \
		* fcvPhases16 \
		* fcvPyramidAllocate \
		* fcvPyramidCreateu8 \
		* fcvPyramidCreateu8_v2 \
		* fcvPyramidCreateu8_v3 \
		* fcvPyramidDelete \
		* fcvRemapRGBA8888BLu8 \
		* fcvRemapRGBA8888NNu8 \
		* fcvRemapu8 \
		* fcvScaleDown3To2u8 \
		* fcvScaleDownBLu8 \
		* fcvScaleDownBy2Gaussian3x3u8 \
		* fcvScaleDownBy2Gaussian5x5u8 \
		* fcvScaleDownBy2Gaussian5x5u8_v2 \
		* fcvScaleDownBy2u8 \
		* fcvScaleDownBy2u8_v2 \
		* fcvScaleDownBy4u8 \
		* fcvScaleDownBy4u8_v2 \
		* fcvScaleDownMNInterleaveu8 \
		* fcvScaleDownMNu8 \
		* fcvScaleDownNNu8 \
		* fcvScaleDownu8 \
		* fcvScaleDownu8_v2 \
		* fcvScaleu8 \
		* fcvScaleUpBy2Gaussian5x5u8 \
		* fcvScaleUpBy2Gaussian5x5u8_v2 \
		* fcvScaleUpPolyu8 \
		* fcvSetElementsc3f32 \
		* fcvSetElementsc3s32 \
		* fcvSetElementsc3u8 \
		* fcvSetElementsc4f32 \
		* fcvSetElementsc4s32 \
		* fcvSetElementsc4u8 \
		* fcvSetElementsf32 \
		* fcvSetElementss32 \
		* fcvSetElementsu8 \
		* fcvSetOperationMode \
		* fcvSolveCholeskyf32 \
		* fcvSolvef32 \
		* fcvSort8Scoresf32 \
		* fcvSubtracts16 \
		* fcvSubtractu8 \
		* fcvSubtractu8s16 \
		* fcvSumOfAbsoluteDiffs8x8u8 \
		* fcvSumOfAbsoluteDiffs8x8u8_v2 \
		* fcvSumOfSquaredDiffs36x4s8 \
		* fcvSumOfSquaredDiffs36xNs8 \
		* fcvSumOfSquaredDiffsf32 \
		* fcvSumOfSquaredDiffss8 \
		* fcvSumOfSquaredDiffsu8 \
		* fcvSVDf32 \
		* fcvSVMPredict2Classf32 \
		* fcvTableLookupu8 \
		* fcvTiltedIntegralu8s32 \
		* fcvTrackBMOpticalFlow16x16u8 \
		* fcvTrackLKOpticalFlowu8 \
		* fcvTrackLKOpticalFlowu8_v2 \
		* fcvTransformAffine8x8u8 \
		* fcvTransformAffine8x8u8_v2 \
		* fcvTransformAffineClippedu8 \
		* fcvTransformAffineClippedu8_v2 \
		* fcvTransformAffineu8 \
		* fcvTransformAffineu8_v2 \
		* fcvTransposef32 \
		* fcvTransposeRGB888u8 \
		* fcvTransposeu16 \
		* fcvTransposeu8 \
		* fcvUpdateMotionHistoryu8s32 \
		* fcvWarpPerspectiveu8 \
		* fcvWarpPerspectiveu8_v2 \
		* fcvWarpPerspectiveu8_v3 \
		HVX optimized functions \
		* fcvAbsDiffu8 \
		* fcvAdds16 \
		* fcvAdds16_v2 \
		* fcvAddScalars16 \
		* fcvAddu16u8u16 \
		* fcvAddu8 \
		* fcvAddu8u16 \
		* fcvBitwiseAndu8 \
		* fcvBitwiseNotu8 \
		* fcvBitwiseOrs32 \
		* fcvBitwiseOru8 \
		* fcvBitwiseXoru8 \
		* fcvBoxFilter3x3u8 \
		* fcvBoxFilter3x3u8_v2 \
		* fcvBoxFilter5x5u8 \
		* fcvBoxFilter5x5u8_v2 \
		* fcvChannelExtractu8 Y extraction For FASTCV_NV12 FASTCV_NV21 FASTCV_IYUV and FASTCV_YUV4 only \
		* fcvColorYCrCb420PseudoPlanarToRGB8888u8 only if width height are even \
		* fcvCornerFast9u8 \
		* fcvCornerHarrisu8 \
		* fcvDeinterleaveu8 \
		* fcvFilterCanny3x3u8 only if src dst strides dx and dy are 128 byte aligned height 60 and width 128 \
		* fcvFilterCanny3x3u8_v2 only if src dst strides dx and dy are 128 byte aligned height 60 and width 128 \
		* fcvFilterCanny3x3u8_v3 only if src dst strides dx and dy are 128 byte aligned height 60 and width 128 \
		* fcvFilterDilate3x3u8 \
		* fcvFilterDilate3x3u8_v2 \
		* fcvFilterDilate3x3u8_v3 \
		* fcvFilterDilateNxNu8 \
		* fcvFilterErode3x3u8 \
		* fcvFilterErode3x3u8_v2 \
		* fcvFilterErode3x3u8_v3 \
		* fcvFilterErodeNxNu8 \
		* fcvFilterGaussian3x3u8_v3 \
		* fcvFilterGaussian5x5u8 \
		* fcvFilterGaussian5x5u8_v2 \
		* fcvFilterMedian3x3u8 \
		* fcvFilterMedian3x3u8_v3 \
		* fcvFilterSobel3x3u8 \
		* fcvFilterSobel3x3u8_v2 \
		* fcvFilterThresholdu8 \
		* fcvFilterThresholdu8_v2 \
		* fcvGoodFeatureToTracku8 \
		* fcvHammingDistanceu8 \
		* fcvImageDiffs16 \
		* fcvImageDiffu8 \
		* fcvImageDiffu8_v2 \
		* fcvImageDiffu8s8 \
		* fcvImageIntensityHistogram \
		* fcvIntegrateImageu8_v2 \
		* fcvInterleaveu8 \
		* fcvPyramidCreateu8 only if srcWidth 128 && srcHeight%2 0 && srcWidth%4 0 \
		* fcvPyramidCreateu8_v2 only if srcWidth 128 && srcHeight%2 0 && srcWidth%4 0 \
		* fcvScaleDownBy2Gaussian5x5u8 \
		* fcvScaleDownBy2Gaussian5x5u8_v2 \
		* fcvScaleDownBy2u8 \
		* fcvScaleDownBy2u8_v2 \
		* fcvScaleDownBy4u8 \
		* fcvScaleDownBy4u8_v2 \
		* fcvScaleDownMNInterleaveu8 \
		* fcvScaleDownMNu8 \
		* fcvScaleDownu8 \
		* fcvScaleDownu8_v2 \
		* fcvScaleUpBy2Gaussian5x5u8 only if srcWidth 128 \
		* fcvScaleUpBy2Gaussian5x5u8_v2 only if srcWidth 128 \
		* fcvSetElementsc3f32 \
		* fcvSetElementsc3s32 \
		* fcvSetElementsc3u8 \
		* fcvSubtracts16 \
		* fcvSubtractu8 \
		* fcvSubtractu8s16 \
		* fcvTrackLKOpticalFlowu8_v3 \
		* fcvTransposeu8	",
	"id":113
}
idx.add(doc)
urls[113]='FastCV/Applications_Computer%20Vision.html'
titles[113]="Computer vision"

// end hiding script from old browsers -->
