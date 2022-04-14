import React from "react";
import "../../Styles/UserPages/TermsAncConditions.css";
import { Helmet } from "react-helmet";
const FAQ = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Helmet>
        <title>PetLife | FAQs</title>
      </Helmet>
      <main className="header-offset content-wrapper about-wrapper mt-3">
        <div className="terms-container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 col-sm-offset-2">
              <section className="terms-title">
                <h1>Frequently Asked Questions</h1>
                <hr />
              </section>
              <div className="terms-body">
                <div className="outer">
                  <div className="question">
                    What is your minimum age when accepting a dog for boarding
                    or daycare?
                  </div>
                  <div className="answer">
                    As always, our primary concern is the welfare of the dogs in
                    our care. It is generally recommended that puppies get their
                    first round of “adult” shots at 12 weeks and once this first
                    round is completed we are happy to have them join us at the
                    hotel.
                  </div>
                </div>
                <div className="outer">
                  <div className="question">
                    Can all of my dogs stay together in the same suite?
                  </div>
                  <div className="answer">
                    Yes, we actually encourage dogs from the same home to stay
                    together. We find that dogs from the same home usually do
                    better when they stay with their siblings or buddies.
                  </div>
                </div>
                <div className="outer">
                  <div className="question">
                    Do you give discounts for multiple pets?
                  </div>
                  <div className="answer">
                    We offer discounts for each pet for both daycare and
                    boarding services, as per Hotel Concerned has to Offer.
                  </div>
                </div>
                <div className="outer">
                  <div className="question">
                    while my pet is boarding with you, will they be taken out
                    for walks?
                  </div>
                  <div className="answer">
                    Yes, we do take pets outside of our hotel if, the feature is
                    present in the service being offered, subject to
                    environmental features.
                  </div>
                </div>
                <div className="outer">
                  <div className="question">
                    My pets like to have toys with them. can they have their
                    favorite toys while boarding with you?
                  </div>
                  <div className="answer">
                    Absolutely. Your pet can have their favorite toy in his/her
                    suite during their boarding stay.
                  </div>
                </div>
                <div className="outer">
                  <div className="question">
                    How do I book a grooming treatment for my pet?
                  </div>
                  <div className="answer">
                    For pups in need of a little therapeutic kudos, select
                    services from menu. Book the services and get the required
                    services.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </main>
    </>
  );
};

export default FAQ;
