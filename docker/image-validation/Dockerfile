FROM node
MAINTAINER Olivier Liechti <olivier.liechti@heig-vd.ch>
# NOTE: fixed note version
#
# When we build the image, we copy the executable jar in the image file system. 
#
COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

ENTRYPOINT ["node", "/opt/app/app.js"]
