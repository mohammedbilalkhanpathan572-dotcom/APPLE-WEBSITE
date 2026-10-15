import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#f5f5f7] text-[#6e6e73] text-[11px] sm:text-xs pt-12 pb-16 border-t border-black/10">
      <div className="max-w-[1024px] mx-auto px-4 sm:px-6 space-y-6">
        {/* Footnotes Section */}
        <div className="space-y-3 pb-6 border-b border-black/10 leading-relaxed text-[#86868b]">
          <p>
            * Trade-in values will vary based on the condition, year, and configuration of your eligible trade-in device. Not all devices are eligible for credit. You must be at least 18 years old to be eligible to trade in for credit or for an Apple Gift Card. Trade-in value may be applied toward qualifying new device purchase, or added to an Apple Gift Card. Actual value awarded is based on receipt of a qualifying device matching the description provided when estimate was made.
          </p>
          <p>
            1. Apple Card Monthly Installments (ACMI) is a 0% APR payment option that is only available if you select it at checkout in the U.S. for eligible products purchased at Apple Store locations, apple.com, the Apple Store app, or by calling 1-800-MY-APPLE. Taxes and shipping are not included in ACMI and are subject to the card's variable APR.
          </p>
          <p>
            2. Apple Intelligence is available in beta on all iPhone 16 models, iPhone 15 Pro, and iPhone 15 Pro Max, with Siri and device language set to U.S. English.
          </p>
          <p>
            3. Battery life claim refers to larger models. All battery claims depend on network configuration and many other factors; actual results will vary.
          </p>
        </div>

        {/* Directory Links Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-8 py-4">
          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">Shop and Learn</h4>
            <ul className="space-y-2">
              <li><a href="#store" className="hover:text-[#1d1d1f] transition-colors">Store</a></li>
              <li><a href="#mac" className="hover:text-[#1d1d1f] transition-colors">Mac</a></li>
              <li><a href="#ipad" className="hover:text-[#1d1d1f] transition-colors">iPad</a></li>
              <li><a href="#iphone" className="hover:text-[#1d1d1f] transition-colors">iPhone</a></li>
              <li><a href="#watch" className="hover:text-[#1d1d1f] transition-colors">Watch</a></li>
              <li><a href="#vision" className="hover:text-[#1d1d1f] transition-colors">Vision</a></li>
              <li><a href="#airpods" className="hover:text-[#1d1d1f] transition-colors">AirPods</a></li>
              <li><a href="#accessories" className="hover:text-[#1d1d1f] transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">Apple Wallet</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Wallet</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Card</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Pay</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Cash</a></li>
            </ul>

            <h4 className="font-semibold text-[#1d1d1f] pt-2">Account</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Manage Your Apple Account</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Store Account</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">iCloud.com</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">Entertainment</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple TV+</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Music</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Arcade</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Fitness+</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple News+</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Podcasts</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Books</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">Apple Store</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Find a Store</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Genius Bar</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Today at Apple</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Group Reservations</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Camp</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Trade In</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Order Status</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Shopping Help</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold text-[#1d1d1f]">About Apple</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Newsroom</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Apple Leadership</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Career Opportunities</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Ethics & Compliance</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-[#1d1d1f] transition-colors">Contact Apple</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#86868b]">
          <div>
            Copyright © {new Date().getFullYear()} Apple Inc. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Privacy Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Terms of Use</a>
            <span>·</span>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Sales Policy</a>
            <span>·</span>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Legal</a>
            <span>·</span>
            <a href="#" className="hover:text-[#1d1d1f] transition-colors">Site Map</a>
            <span>·</span>
            <span className="font-medium text-[#1d1d1f]">United States</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
