FROM node:14.17

#  put source in docker image

COPY src /opt/app/

WORKDIR /opt/app/
RUN npm install

EXPOSE 2205

ENTRYPOINT ["node", "auditor.js"]
#CMD ["node", "auditor.js"]
