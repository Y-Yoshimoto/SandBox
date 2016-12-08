#ifndef Integration_h
#define Integration_h

void make_hist(double value,double *hist)
{
    int index;
    double in=(value-Low)*Hset;
    index=(int)in;
    if (index>=0 && index < HSize) {
        hist[index]++;
    }
}

void Output_hist(double *hist)
{
    double x;
    FILE *fp;
    fp=fopen("Hist.dat","w");
    int i;
    for (i=0; i<HSize; i++) {
        x=(double)i/Hset+Low;
        fprintf(fp,"%lf %lf\n",x,hist[i]/(double)Bin);
    }
    fclose(fp);
}

double S_A(uint64_t *array,int *k)
{
    int i;
    double Sum=0.0;
    for (i = 0 ; i < 12 ; i++){
    Sum+=sfmt_to_res53(array[*k]);
    *k=*k+1;
    //printf("%d\n",*k);
    }
    return (Sum/12.0-6.0);
}

void MCStep(double *average,double *sum_of_squares,double *hist)
{
    double a=0,s=0;
    int i;
#pragma omp parallel num_threads(THREADS)
    {
        sfmt_t sfmt;
        sfmt_init_gen_rand(&sfmt, (unsigned int)time(NULL)+omp_get_thread_num());
        uint64_t *array;
        int k=0;
        array = malloc(sizeof(double)*Array_size);
        sfmt_fill_array64(&sfmt, array,Array_size);

        srand((unsigned)time(NULL)+omp_get_thread_num());

        #pragma omp for reduction(+:a,s)
        for (i=0; i<Bin; i++) {

            double x=sqrt(-2.0*log(sfmt_to_res53(array[k++])));
            double y=PPI*sfmt_to_res53(array[k++]);

            //double x=sqrt(-2.0*log((double)rand()/RAND_MAX));
            //double y=PPI*(double)rand()/RAND_MAX;

            double value=x*cos(y);

            //double value=S_A(array,&k);
            //x*sin(y);
            a+=value;
            s+=(value*value);
            make_hist(value,hist);
            //printf("%lf %lf %lf\n",value,x,y);
        }
        *average=a/(double)Bin;
        *sum_of_squares=s/(double)Bin;
        free(array);
    }
}

#endif
