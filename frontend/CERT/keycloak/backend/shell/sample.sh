#!/bin/bash
echo "* Request for authorization"
RESULT=`curl -d "username=chiba00807@gmail.com&password=password&grant_type=password&client_id=admin-cli" "http://localhost:8884/realms/master/protocol/openid-connect/token"`
echo "\n"

echo "* Recovery of the token"
TOKEN=`echo $RESULT | sed 's/.*access_token":"//g' | sed 's/".*//g'`
echo "\n"
echo "* Display token"
echo $TOKEN

echo "\n"
echo " * user creation\n"
# curl -v http://localhost:8884/admin/realms/admin99/users -H "Content-Type: application/json" -H "Authorization: bearer $TOKEN"   --data '{"firstName":"xyz","lastName":"xyz", "email":"demo2@gmail.com", "enabled":"true"}'

curl --insecure -X POST -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json; charset=UTF-8" -d '{"username":"hogehoge", "enabled": true, "email": "hogehoge@example.com"}' http://localhost:8884/admin/realms/admin99/users -v

echo "\n"
echo " * user getInformation \n"

USER=`curl --insecure -X GET -H "Authorization: Bearer $TOKEN" http://localhost:8884/admin/realms/admin99/users?username=hogehoge`
echo $USER

echo "\n"
echo " * user getInformation ID \n"

export userid=$(curl --insecure -X GET -H "Authorization: Bearer $TOKEN" http://localhost:8884/admin/realms/admin99/users?username=hogehoge | jq -r .[].id)

echo $userid

echo "\n"
echo " * user getInformation SETTINT PASSWORD \n"


curl --insecure -X PUT -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json; charset=UTF-8" -d '{"type": "password", "value": "test1234", "temporary": true}' http://localhost:8884/admin/realms/admin99/users/${userid}/reset-password -v


echo "\n"
echo " * user getInformation attribute \n"

export attributes=$(curl --insecure -X GET -H "Authorization: Bearer $TOKEN" http://localhost:8884/admin/realms/admin99/users?username=hogehoge | jq -r '.[].attributes.secret_question')

echo $attributes


echo "\n"
echo " * user EditInformation Attribute \n"

curl --insecure -X PUT -H "Authorization: Bearer $TOKEN" -H "Content-Type: application/json; charset=UTF-8" -d '{"attributes":{"secret_question":"ffffffffffff"}}' http://localhost:8884/admin/realms/admin99/users/${userid} -v

