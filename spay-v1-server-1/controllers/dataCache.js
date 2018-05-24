const endPointCache = new Map()

// const nodeCache = require( "node-cache" );
// const dataCache = new nodeCache();

// const addAccount = (account)=> {
//     return dataCache.set(acc.accountId, acc, 10000 );
// }

// const getAccount = (accountId)=> {
//     let value = dataCache.get(accountId);
//     if ( value == undefined ){
//         return null    
//     }
//     return value
// }

// const addPushEndpoint = (push)=> {
//     return dataCache.set(push.accountId, push, 10000 );
// }

// const getPushEndpoint = (accountId)=> {
//     let value = dataCache.get(accountId);
//     if ( value == undefined ){
//         return null    
//     }
//     return value
// }

const addPushEndpoint = (push)=> {
    return endPointCache.set(push.accountId, push);
}

const getPushEndpoint = (accountId)=> {
    return endPointCache.get(accountId);
}

module.exports = {
	// addAccount,
    // getAccount,
    addPushEndpoint,
    getPushEndpoint
};