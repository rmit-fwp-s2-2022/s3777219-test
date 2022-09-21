import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faTwitter, faInstagram,faGithub,faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <div>
        <footer className="bg-dark text-center text-white">
  <div className="container p-4 pb-0">
    <section className="mb-4">
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><FontAwesomeIcon icon={faFacebookF} size="lg" /></a>
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><FontAwesomeIcon icon={faTwitter} size="lg" /></a>
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><FontAwesomeIcon icon={faInstagram} size="lg" /></a>
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><FontAwesomeIcon icon={faGithub} size="lg" /></a>
      <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button"
        ><FontAwesomeIcon icon={faLinkedin} size="lg" /></a>
      </section>
  </div>
  <div className="text-center p-3 copy-right">
    © {new Date().getFullYear()} Copyright:
    <a className="text-white mx-1 text-decoration-none" href="/"> LOOP AGILE NOW</a>
  </div>
</footer>
       </div>
  )
}
