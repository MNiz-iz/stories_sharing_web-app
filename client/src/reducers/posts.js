//use posts replace state = []
//export for use in index.js line 5
export default (posts = [], action) => {
    switch (action.type) {
        case 'DELETE':
            //if filter post is id != id from action paylode delete method
            return posts.filter((post) => post._id !== action.payload);
        case 'UPDATE':
        case 'LIKE':
            //if data of post id = id post update => update post in memory if not return post without update
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
        case 'FETCH_ALL': //for fetch data
            return action.payload;
        case 'CREATE': //for create data
            return [...posts, action.payload];
        default:
            return posts;
    }
}