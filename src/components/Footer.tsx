type Props = {};

const Footer = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-y-10 px-32 py-14 bg-gray-100 text-gray-600">
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">COMPANY</h5>
        <p>How Travel works</p>
        <p>Careers</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">Newsroom</h5>
        <p>Press & Media</p>
        <p>Sponsorships</p>
        <p>Investor Relations</p>
        <p>Inquiries</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">TRAVEL ADVICE</h5>
        <p>Coronavirus (COVID-19)</p>
        <p>Change accommodation booking</p>
      </div>
      <div className="space-y-4 text-xs text-gray-800">
        <h5 className="font-bold">SUPPORT</h5>
        <p>Terms and Conditions</p>
        <p>Legal Information</p>
        <p>Privacy Policy</p>
        <p>Business Support</p>
        <p>Cyber Security</p>
      </div>
    </div>
  );
};

export default Footer;
