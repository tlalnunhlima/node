const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser:true, useUnifiedTopology: true});

var id = '6094b1797b4e61121c47c9a6';

BlogPost.create({title: 'ramthim unaute chanchin', body: 'Ramthim unaute chanchin hi Pu T Lalchhuangliana ziak a ni a, hetiang lam chanchin ziahna bu hi a tam lo hle mai a, a theih chuan hetiang lam lehkhabu hi tam zel se tih hi a duhawm hle a ni.'}, (error, blogpost) =>{
    console.log(error, blogpost);
});