AWS_PROFILE=serverless-local npx serverless deploy

or

npx serverless deploy --aws-profile serverless-local ./node_modules/.bin/serverless deploy


create the variable path SLSUSER with you name for the lambda creation.

Be careful setting environment variables. because node run in other processes, if you don't 'export' the ENV var is going to run in the local process and not in the node process.