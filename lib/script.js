/**
  * @param  {org.example.empty.updatePost} tx
  * @transaction
  */

function UpdatePost(tx) {
  console.log("Inside Update Post transaction");
  tx.newPost.description = tx.description;
  return getAssetRegistry('org.example.empty.Post')
    .then(function (assetRegistry) {
      return assetRegistry.update(tx.newPost);
    });          
}

/**
  * @param  {org.example.empty.createPost} post
  * @transaction
  */

function createPost(post) {
  
   var owner = getCurrentParticipant();
   var id=post.assetId
  return getAssetRegistry("org.example.empty.Post")
  .then(function(postAssetRegistry) {
      
      var factory = getFactory();
      var newPost = factory.newResource("org.example.empty", "Post", id);
      newPost.title = post.title;
      newPost.description = post.description;  
      newPost.creator=owner;
    
      return postAssetRegistry.add(newPost);
  })
}
/**
  * @param  {org.example.empty.deletePost} post
  * @transaction
  */
function deletePost(post){
  
  return getAssetRegistry("org.example.empty.Post")
  .then(function(removeAsset){
    
   return removeAsset.remove(post.deletepost);
  });
}

/**
  * @param  {org.example.empty.upVote} post
  * @transaction
  */
function upvotepost(post){

  post.upvotePost.upVoteCount++;
  
  return getAssetRegistry("org.example.empty.Post")
  .then(function(upvoteRegistry){
  
    return upvoteRegistry.update(post.upvotePost);
  });
}