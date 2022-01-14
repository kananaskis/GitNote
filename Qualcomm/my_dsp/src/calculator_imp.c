/*==============================================================================
  Copyright (c) 2012-2014 Qualcomm Technologies, Inc.
  All rights reserved. Qualcomm Proprietary and Confidential.
==============================================================================*/

#include <stdio.h>
#include "HAP_farf.h"
#include "calculator.h"

int calculator_sum(const int* vec, int vecLen, int64* res)
{
  int ii = 0;
  *res = 0;
  for (ii = 0; ii < vecLen; ++ii) {
    *res = *res + vec[ii];
  }
  FARF(RUNTIME_HIGH, "===============     DSP: sum result %lld ===============", *res);
  return 0;
}
/*
int calculator_diff(const int* vec, int vecLen, int64* res)
{
  int ii = 0;
  *res = vec[0];
  for (ii = 1; ii < vecLen; ++ii) {
    *res = *res - vec[ii];
  }
  FARF(RUNTIME_HIGH, "===============     DSP: diff result %lld ===============", *res);
  return 0;
}
*/

