import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import Moment from 'moment';
import '../assets/css/style.css';

function Posts(props) {

  const [modalShow, setModalShow] = useState(0);

  if (props.loading) {
    return <h1>Loading</h1>;
  }

  const showModal = (value) => {
    setModalShow(value);
  };
  const hideModal = (value) => {
    setModalShow(0);
  };


  return (
      <>
    {props.posts && props.posts.map((post, index) => (
        <div key={index} className="blogwrap" data-aos="clogo" data-aos-once="true" data-aos-duration="1200">
          <div className="blog-post">
            <h2><Link to={"/blog-detail/" + post.slug.current} key={post.slug.current} className="text-capitalize">{post.title}</Link></h2>
                <p className="lastupdate">
                <Link to="#"><i className="fa fa-user-circle-o"></i> {post.name}</Link>
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
              <Link to="#" onClick={() => showModal(post._id)} className="readpost">Read More</Link>
              </div>
              <Modal
                show={modalShow === post._id}
                onHide={() => hideModal(post._id)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-vcenter">
                  
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="row">
                  <div className="col-12">
                  <BlockContent blocks={post.body} 
                    projectId={sanityClient.clientConfig.projectId}
                    dataset={sanityClient.clientConfig.dataset}/>
                  </div>             
                </div> 
                </Modal.Body>
              </Modal>   
           </div>
           </div>
           ))}
           </>
  );
}

export default Posts;