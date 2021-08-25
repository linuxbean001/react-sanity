import React from 'react';
import { Link } from 'react-router-dom';
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Moment from 'moment';
import '../assets/css/style.css';

function Posts(props) {

  if (props.loading) {
    return <h1>Loading</h1>;
  }

  return (
    <>
    {props.posts && props.posts.map((post, index) => (
      <div key={index} className="blogwrap" data-aos="clogo" data-aos-once="true" data-aos-duration="1200">
        <div className="blog-post">
          <h2><Link to={"/blog-detail/" + post.slug.current} key={post.slug.current} className="text-capitalize">{post.title}</Link></h2>
          <p className="lastupdate">
            <Link to="#"><i className="fa fa-user"></i> {post.name}</Link>
            <i className="fa fa-calendar"></i> {Moment(post.publishedAt).format('MMM DD, YYYY')}
            <i className="fa fa-hashtag"></i> {post.category}
            <span className="comments-type">
            <i className="fa fa-comments-o"></i>
            <Link to="#"> {(post.comments) ? post.comments.length : 0 } comments</Link>
            </span>
          </p>               
        </div>                   
        <div className="row post-content">
          <div className="col-12 col-md-4">
            <img src={post.mainImage.asset.url} className="card-img" alt="..."/>
          </div>
          <div className="col-12 col-md-8 whats-next">
            <BlockContent blocks={post.body} 
            projectId={sanityClient.clientConfig.projectId}
            dataset={sanityClient.clientConfig.dataset}/>
          </div>
          <div className="readpostmain">
            <Link to={"/blog-detail/" + post.slug.current} key={post.slug.current} className="readpost">Read More</Link>
          </div> 
        </div>
      </div>
    ))}
    </>
  );
}

export default Posts;