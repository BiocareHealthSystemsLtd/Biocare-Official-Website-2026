import siteConfig from '../data/siteConfig';
import { MapIcon, PhoneIcon } from './Icons';

export default function LocationMap() {
  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Info Card */}
          <div className="lg:col-span-4 bg-white border border-gray-200/80 p-6 md:p-8 rounded-2xl shadow-sm space-y-6">
            <div>
              <span className="text-[10px] font-bold text-secondary-600 uppercase tracking-widest block font-sans">
                FIND OUR SHOWROOM
              </span>
              <h2 className="text-xl md:text-2xl font-display font-extrabold text-primary-700 tracking-tight mt-1">
                Visit Us in Nairobi
              </h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="flex items-start space-x-3">
                <MapIcon className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">Physical Address:</span>
                  <span className="text-gray-600 leading-relaxed block mt-0.5">
                    {siteConfig.officeAddress.building},<br />
                    {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark},<br />
                    Ngara, Nairobi
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <PhoneIcon className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-gray-800 block">Call Showroom:</span>
                  <a href={`tel:${siteConfig.phones[0].link}`} className="text-primary-600 hover:underline block mt-0.5 font-sans font-semibold">
                    {siteConfig.phones[0].value}
                  </a>
                  <a href={`tel:${siteConfig.phones[1].link}`} className="text-primary-600 hover:underline block font-sans font-semibold">
                    {siteConfig.phones[1].value}
                  </a>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-100">
                <span className="font-bold text-gray-800 block">Operating Hours:</span>
                <span className="text-gray-600 block mt-1">
                  Mon - Fri: 8:00 AM - 5:00 PM
                </span>
                <span className="text-gray-600 block">
                  Saturday: 9:00 AM - 1:00 PM
                </span>
                <span className="text-gray-400 block mt-1 italic">
                  Closed on Sundays and Public Holidays
                </span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href="https://maps.app.goo.gl/uXyL8c71pXF9P9w19" // Standard Google Maps link
                target="_blank"
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold py-2.5 px-6 rounded-lg text-xs transition-colors flex items-center justify-center space-x-2 shadow-sm"
              >
                <span>Get Driving Directions</span>
              </a>
            </div>
          </div>

          {/* Maps Iframe */}
          <div className="lg:col-span-8 h-80 sm:h-96 md:h-[450px] bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden relative">
            <iframe
              src={siteConfig.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Biocare Health Systems Limited Nairobi Office Location Map"
              className="absolute inset-0"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
