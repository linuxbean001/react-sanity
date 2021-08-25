import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import RecentBlog from './RecentBlog';
import SideBlog from './SideBlog';
import { useParams } from "react-router-dom";
import sanityClient from "../client.js";
import BlockContent from "@sanity/block-content-to-react";
import imageUrlBuilder from "@sanity/image-url";
import Moment from 'moment';
import blogService from './../services/blogService';
// import commentService from './../services/commentService';
// import { useForm } from 'react-hook-form';
// import toaster from './../helpers/toaster';
import { ToastContainer } from 'react-toastify';
import Image from 'react-bootstrap/Image';

const builder = imageUrlBuilder(sanityClient);
function urlFor(source) {
  return builder.image(source);
}

function BlogDetail() {

  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  // const { register, handleSubmit, formState: { errors } } = useForm();

  useEffect(() => {
    new blogService().getBlogBySlug(slug).then(data => {
      setPostData(data)
    });
  }, [slug]);

  // const onSubmit = (data, e) => {
  //   new commentService().createComments(data).then(res => {
  //     if(res === "Success"){
  //       new toaster().successMessage("comments added successfully.");
  //       new blogService().getBlogBySlug(slug).then(data => {
  //         setPostData(data)
  //       });
  //       e.target.reset();
  //     }else{
  //       new toaster().errorMessage("Error");
  //     }
  //   });
  // }

  if (!postData) return <div>Loading...</div>;

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={3000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    />
    <main>
      <header className="Hero Hero--philosophy blogDetails">
        <figure className="Hero__background">
          <Image fluid src={process.env.PUBLIC_URL+'/images/banner.jpg'} alt=""/>
        </figure>
        <Link className= "text-decoration-none text-dark text-uppercase" to="/">
        <h4 className="container text-uppercase">HOME</h4>
        </Link>
      </header>
    </main>
    <section className="blogsection detailsb">
    <div className="container">
      <div className="row">
        <div className="col-12 col-md-8">
        <div className="blogwrap" data-aos="clogo" data-aos-once="true" data-aos-duration="1200">
          <div className="blog-post">
            <h2 className= "text-capitalize">{postData.title}</h2>
              <p className="lastupdate">
                <Link to="#"><i className="fa fa-user-circle-o"></i> {postData.name}</Link>
                <i className="fa fa-calendar"></i> {Moment(postData.publishedAt).format('MMM DD, YYYY')}
                <i className="fa fa-hashtag"></i> {postData.categories}
                <span className="comments-type">
                <i className="fa fa-comments-o"></i>
                <Link to="#"> {(postData.comments) ? postData.comments.length : 0 } comments</Link>
                </span>
              </p>              
          </div>
           <div className="row post-content">
             <div className="col-12 col-md-12">
              <img src={urlFor(postData.mainImage).url()} className="card-img" alt="..."/>
             </div>
              <div className="col-12 col-md-12 mt-4">
                <BlockContent blocks={postData.body} 
                projectId={sanityClient.clientConfig.projectId}
                dataset={sanityClient.clientConfig.dataset}/>
             </div>
           </div>
           </div>
                  {/* <div className="row reply">
              <div className="col-12">
                <h2 className="m-0">Leave a Reply</h2>
                <p>Your email address will not be published. Required fields are marked *</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input {...register("_id")} type="hidden" name="_id" value={postData._id} />
                  <div className="form-group">
                    <input type="text" name="name" {...register("name", {
                      required: "This field is required",
                    })} className="form-control" placeholder="Name*" id="usr"/>
                    {errors.name && <p className="errorMsg">{errors.name.message}</p>}
                  </div>
                  <div className="form-group">
                    <input type="text" name="email" {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                        message: "Invalid email address"
                      }
                    })} className="form-control" placeholder="Email*" id="email"/>
                    {errors.email && <p className="errorMsg">{errors.email.message}</p>}
                  </div>
                  <div className="form-group">
                    <textarea name="comment" {...register("comment", {
                      required: "This field is required",
                    })} className="form-control" rows="5" placeholder="Comment" id="comment"></textarea>
                    {errors.comment && <p className="errorMsg">{errors.comment.message}</p>}
                  </div>
                  <div className="form-group mt-4">
                      <input type="submit" className="readmore" value="Post Comment"/>
                  </div>
                  </form>
              </div>
            </div> */}
        </div>
        <SideBlog/>
      </div>
  </div>
  <RecentBlog/>
  </section>
    </>
  );
}

export default BlogDetail;
