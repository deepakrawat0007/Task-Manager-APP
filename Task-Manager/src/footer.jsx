
const Footer = ()=>{
    return (
        <>
        <footer class="bg-light text-center text-white new-col" >
  {/* <!-- Grid container --> */}
  <div class="container p-4 pb-0">
    {/* <!-- Section: Social media --> */}
    <section class="mb-4">
      {/* <!-- Facebook --> */}
      <span
        class="btn text-white btn-floating m-1"
        style={{backgroundColor: "#3b5998"}}
        
        role="button"
        ><i class="fab fa-facebook-f"></i
      ></span>

      {/* <!-- Twitter --> */}
      <span
        class="btn text-white btn-floating m-1"
        style={{backgroundColor: "#55acee"}}
        
        role="button"
        ><i class="fab fa-twitter"></i
      ></span>

      {/* <!-- Google --> */}
      <span
        class="btn text-white btn-floating m-1"
        style={{backgroundColor: "#dd4b39"}}
        
        role="button"
        ><i class="fab fa-google"></i
      ></span>

      {/* <!-- Instagram --> */}
      <span
        class="btn text-white btn-floating m-1"
        style={{backgroundColor: "#ac2bac"}}
        
        role="button"
        ><i class="fab fa-instagram"></i
      ></span>

      {/* <!-- Linkedin --> */}
      <span
        class="btn text-white btn-floating m-1"
        style={{backgroundColor: "#0082ca"}}
        
        role="button"
        ><i class="fab fa-linkedin-in"></i
      ></span>
      {/* <!-- Github --> */}
      <a
        class="btn text-white btn-floating m-1"
        style={{backgroundColor: "#333333"}}
        href="https://github.com/deepakrawat0007/Task-Manager-APP"
        title="Git-Repo"
        role="button"
        ><i class="fab fa-github"></i
      ></a>
    </section>
    {/* <!-- Section: Social media --> */}
  </div>
  {/* <!-- Grid container --> */}

  {/* <!-- Copyright --> */}
  <div class="text-center p-3" style={{backgroundColor: "rgba(0, 0, 0, 0.2)"}}>
    © 2023 Copyright: ALL Rights Reserved 
    <span class="text-white" href="https://mdbootstrap.com/"> Deepak Rawat</span>
  </div>
  {/* <!-- Copyright --> */}
</footer></>
    )
}

export default Footer