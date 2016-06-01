cd ./client/src/main
gulp dist:raw
cd ../../..
mvn clean install
./launch.sh