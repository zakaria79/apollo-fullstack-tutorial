const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const { createStore } = require('./utils');

const LaunchAPI = require('./datasources/launch');
const UserAPI = require('./datasources/user');

const store = createStore();

const server = new ApolloServer({
	typeDefs,
	dataSources: () => ({
		launchAPI: new LaunchAPI(),
		UserAPI: new UserAPI({ store })
	})
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});
