import React from "react";
import "../../Styles/UserPages/TermsAncConditions.css";
import { Helmet } from "react-helmet";
const TermsAncConditions = () => {
  React.useEffect(() => {
    window && window.scrollTo(0, 0);
  }, []);
  return (
    <>
      {" "}
      <Helmet>
        <title>PetLife | T&Cs</title>
      </Helmet>
      <main className="header-offset content-wrapper about-wrapper mt-3">
        <div className="terms-container">
          <div className="row">
            <div className="col-md-2"></div>
            <div className="col-md-8 col-sm-offset-2">
              <section className="terms-title">
                <h1>Terms &amp; Conditions</h1>
                <hr />
              </section>
              <div className="terms-body">
                <h3>Vaccination Status and Health</h3>
                <p>
                  <ol>
                    <li>
                      All pets must have up to date vaccinations. These must be
                      completed at least 2 weeks before boarding.
                    </li>
                    <li>
                      Owners must apply a tick & flea treatment such as
                      Frontline before checking in their pet, to ensure that the
                      pet is free of external parasites. Otherwise we will apply
                      this treatment and charge the cost to owners.
                    </li>
                    <li>
                      Pet Owners shall produce their pet’s current or most
                      recent Vaccination Certificate from a qualified and
                      certified veterinarian. The Vaccination Certificate shall
                      not be more than 12 months old from the date of boarding.
                    </li>
                    <li>
                      <i>Pet Life &copy;</i> reserves the right to cancel any
                      booking if the Pet owner fails to produce the pet’s most
                      recent Vaccination Certificate.
                    </li>
                  </ol>
                </p>
                <hr />
                <h3>
                  <i>Pet Life &copy;</i>’s Obligations
                </h3>
                <p>
                  <i>Pet Life &copy;</i> agrees to:
                  <ol start="5">
                    <li>Feed the pets at regular intervals;</li>
                    <li>Provide reasonable kennel facilities;</li>
                    <li>
                      Provide a reasonably safe environment for the pet subject
                      to Pet Owner’s warranty that the pet does not and will not
                      pose a danger or risk (whether physical or by way of
                      transmission of disease or parasites) to other pets at{" "}
                      <i>Pet Life &copy;</i>;
                    </li>
                    <li>
                      Maintain the pet in good health as far as reasonably
                      possible and to the best of <i>Pet Life &copy;</i>’s
                      abilities subject to Pet Owner’s fulfilment of the
                      mandatory conditions in 1 above.
                    </li>
                  </ol>
                </p>
                <hr />
                <h3>Emergency Situations - the Affected Pet</h3>
                <ol start="5">
                  <li>
                    If the pet should for any reason whatsoever become ill or
                    injured, (“the Affected Pet”) during the pet’s stay at Pet
                    Hotel, <i>Pet Life &copy;</i> shall be entitled at its
                    absolute discretion to do any one or more of the following:
                    <ol start="A">
                      <li>
                        Contact the Pet Owner to collect the pet if the Pet
                        Owner is contactable;
                      </li>
                      <li>
                        Contact the Emergency Contact Person if the Pet Owner is
                        not contactable;
                      </li>
                      <li>
                        Provide such medical attention or care which{" "}
                        <i>Pet Life &copy;</i>
                        deems is necessary or appropriate at any animal hospital
                        or pet clinic chosen by <i>Pet Life &copy;</i>;
                      </li>
                      <li>
                        Keep or maintain the Affected Pet by engaging a
                        veterinarian until collection by the Pet Owner.
                      </li>
                    </ol>
                  </li>
                  <li>
                    Pet Owner waives all rights and claims against{" "}
                    <i>Pet Life &copy;</i> and further agrees not to hold or
                    make <i>Pet Life &copy;</i> liable for any injury or illness
                    or death to the Affected Pet.
                  </li>
                  <li>
                    Pet Owner also waives all rights and claims against{" "}
                    <i>Pet Life &copy;</i>
                    and further agrees not to hold or make{" "}
                    <i>Pet Life &copy;</i> liable for any step or action or
                    thing or decision made or taken by Pet Hotel concerning the
                    Affected Pet.
                  </li>
                  <li>
                    Maintain the pet in good health as far as reasonably
                    possible and to the best of <i>Pet Life &copy;</i>’s
                    abilities subject to Pet Owner’s fulfilment of the mandatory
                    conditions in 1 above.
                  </li>
                </ol>
                <hr />
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-2"></div>
      </main>
    </>
  );
};

export default TermsAncConditions;
