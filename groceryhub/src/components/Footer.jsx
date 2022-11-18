import React from 'react';
import { CDBFooter, CDBFooterLink, CDBBtn, CDBIcon, CDBContainer,CDBBox } from 'cdbreact';

export const Footer = () => {
  return (
    <div style = {{backgroundColor : "black"}}>
    <CDBFooter className="shadow">
      <CDBBox display="flex" flex="column" className=" mx-auto py-5" style={{ width: '80%' }}>
        <CDBBox display="flex" justifyContent="between" className="flex-wrap">
          <CDBBox>
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <span className="ml-3 h5 font-weight-bold" style={{ color: 'white' }}>Grocery Hub</span>
            </a>
          </CDBBox>
          <CDBBox display="flex" style={{ width: '50%' }} justifyContent="between">
            <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: '600',color: 'white' }}>
                Grocery Hub
              </p>
              <CDBBox flex="column" display="flex" style={{ cursor: 'pointer', padding: '0' }}>
                <CDBFooterLink href="/"><span style={{ color: 'white' }}>Resources</span> </CDBFooterLink>
                <CDBFooterLink href="/"><span style={{ color: 'white' }}>About Us</span></CDBFooterLink>
                <CDBFooterLink href="/"><span style={{ color: 'white' }}>Contact</span></CDBFooterLink>
                <CDBFooterLink href="/"><span style={{ color: 'white' }}>Blog</span></CDBFooterLink>
              </CDBBox>
            </CDBBox>
            {/* <CDBBox>
              <p className="h5 mb-4" style={{ fontWeight: '600' }}>
                Products
              </p>
              <CDBBox display="flex" flex="column" style={{ cursor: 'pointer', padding: '0' }}>
                <CDBFooterLink href="/"><span style={{ color: 'white' }}>WindFrame</span></CDBFooterLink>
                <CDBFooterLink href="/"><span style={{ color: 'white' }}>Loop</span></CDBFooterLink>
                <CDBFooterLink href="/"><span style={{ color: 'white' }}>Resources</span></CDBFooterLink>
              </CDBBox>
            </CDBBox> */}
          </CDBBox>
        </CDBBox>
        <CDBBox display="flex" className="mt-4" justifyContent="between">
          <small className="ml-2" style={{ color: 'white' }}>&copy;  GroceryHub, 2022. All rights reserved.</small>
          <CDBBox display="flex">
            <CDBBtn flat color="dark" className="p-2">
              <CDBIcon fab icon="facebook-f" />
            </CDBBtn>
            <CDBBtn flat color="dark" className="mx-3 p-2">
              <CDBIcon fab icon="twitter" />
            </CDBBtn>
            <CDBBtn flat color="dark" className="p-2">
              <CDBIcon fab icon="instagram" />
            </CDBBtn>
          </CDBBox>
        </CDBBox>
      </CDBBox>
    </CDBFooter>
    </div>
  );
};