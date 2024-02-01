import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className=" text-center text-white border">

                <div className="container p-4 pb-0">

                    <section className="mb-4">

                        <a
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: ' #3b5998'}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-facebook-f"></i
                        ></a>

                        <a
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: '#55acee'}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-twitter"></i
                        ></a>


                        <a
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor:' #dd4b39'}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-google"></i
                        ></a>


                        <a
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor: "#ac2bac"}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-instagram"></i
                        ></a>

                        <a
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor:'#0082ca'}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-linkedin-in"></i
                        ></a>

                        <a
                            className="btn text-white btn-floating m-1"
                            style={{backgroundColor:'#333333'}}
                            href="#!"
                            role="button"
                        ><i className="fab fa-github"></i
                        ></a>
                    </section>

                </div>



                <div className="text-center p-3  " style={{backgroundColor:'rgb(153, 2, 47)'}}>
                    © 2023 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">Storehook.com</a>
                </div>

            </footer>
        </div>
    )
}

export default Footer