#include <stdio.h>
#include <stdlib.h>
#include <time.h>
#include <math.h>
#include <omp.h>
#include "SFMT.h"

#include "Module.h"
#include "Integration.h"


int main(int argc, const char * argv[]) {

    double average=0;//平均
    double sum_of_squares=0;//二乗和
    double hist[HSize]={0.0};

    MCStep(&average,&sum_of_squares,hist);
    Output_hist(hist);

    double variance,deviation,error;//分散,偏差,誤差
    variance=sum_of_squares-average*average;
    deviation=sqrt(variance);
    error=deviation/sqrt((double)Bin);
    double gap=average-M_PI/4.0;
    FILE *fp;
    fp=fopen("Result.dat","w");
    //printf("%.10lf %.10lf %.10lf %.10lf %.10lf",average,deviation,error,M_PI/4.0,gap);
    fprintf(fp,"%.10lf %.10lf %.10lf %.10lf %.10lf",average,deviation,error,M_PI/4.0,gap);
    fclose(fp);

    return 0;
}
