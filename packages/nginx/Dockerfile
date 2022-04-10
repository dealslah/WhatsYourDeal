FROM public.ecr.aws/ubuntu/nginx:latest
RUN rm -rf /etc/nginx/sites-available
RUN rm -rf /etc/nginx/sites-enabled
COPY default.conf /etc/nginx/conf.d/default.conf