import React from 'react'
import software from '../images/software.jpg'
import health from '../images/health.jpg'
import financial from '../images/financial.jpg'
export default function Services() {
  return (
    <div>
        <div className="container my-5">
            <h1 className='text-center'>
            WHO WE ARE
            </h1>
            <h5 className='text-center'>
            We are a digital transformation consultancy and software development company that provides cutting edge engineering solutions, helping Fortune 500 companies and enterprise clients untangle complex issues that always emerge during their digital evolution journey. Since 2007 we have been a visionary and a reliable software engineering partner for world-class brands.
            </h5>
        </div>
        <div className="container my-3">
            <h1 className='text-center'>
            WHO <span className='colored-text'>LOOP AGILE NOW</span> SERVES
            </h1>
        </div>
      <div className="container my-5">
    <div className="row gy-4">
        <div className="col-sm">
            <div className="card h-100">
                <img src={software} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title fw-bold text-center">SOFTWARE PRODUCT COMPANIES</h5>
                    <p className="card-text text-center pt-2">We deliver end-to-end consulting services that allow software product companies to better serve clients.
                    </p>
                </div>
            </div>
        </div>
        <div className="col-sm">
            <div className="card h-100">
                <img src={health} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title fw-bold text-center">HEALTHCARE</h5>
                    <p className="card-text text-center pt-2">Our clients range from large hospitals, rural medical centers, tissue and blood processing organizations, individual doctors, multi-location clinics, and full-service hospitals. </p>
                </div>
            </div>
        </div>
        <div className="col-sm">
            <div className="card h-100">
                <img src={financial} className="card-img-top" alt="..."/>
                <div className="card-body">
                    <h5 className="card-title fw-bold text-center">FINANCIAL SERVICES</h5>
                    <p className="card-text text-center pt-2">LAN managed services model optimizes IT system performance and reliability while creating a predictable and sustainable IT.</p>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}
