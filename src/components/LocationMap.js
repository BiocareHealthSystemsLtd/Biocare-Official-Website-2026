import siteConfig from '../data/siteConfig';
import { MapIcon, PhoneIcon } from './Icons';

export default function LocationMap() {
  return (
    <section className="bg-white py-12 lg:py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-slate-200">
          <div>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
              Physical Location & Showroom
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
              Visit Our Nairobi Facility
            </h2>
          </div>
          <p className="text-xs text-slate-600 max-w-md mt-2 md:mt-0 leading-relaxed">
            Healthcare administrators, lab heads, and procurement teams are welcome to inspect equipment and discuss specifications at our Nairobi showroom.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Info Card */}
          <div className="lg:col-span-4 bg-slate-50 border border-slate-200 p-6 rounded space-y-5 text-xs text-slate-700">
            <div>
              <span className="font-bold text-slate-900 text-sm block mb-1">
                Biocare Health Systems Limited
              </span>
              <p className="text-slate-500">Showroom, Workshop & Warehouse</p>
            </div>

            <div className="space-y-3.5">
              <div className="flex items-start space-x-2.5">
                <MapIcon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Physical Address:</span>
                  <span className="text-slate-600 leading-relaxed block mt-0.5">
                    {siteConfig.officeAddress.building},<br />
                    {siteConfig.officeAddress.street}, {siteConfig.officeAddress.landmark},<br />
                    Ngara, Nairobi, Kenya
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-2.5">
                <PhoneIcon className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-slate-800 block">Telephone Inquiries:</span>
                  <a href={`tel:${siteConfig.phones[0].link}`} className="text-primary-700 hover:underline block font-medium mt-0.5">
                    {siteConfig.phones[0].value} (Sales Desk)
                  </a>
                  <a href={`tel:${siteConfig.phones[1].link}`} className="text-primary-700 hover:underline block font-medium">
                    {siteConfig.phones[1].value} (Office Admin)
                  </a>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200">
                <span className="font-semibold text-slate-800 block mb-1">Operating Hours:</span>
                <span className="block text-slate-600">Monday - Friday: 8:00 AM - 5:00 PM</span>
                <span className="block text-slate-600">Saturday: 9:00 AM - 1:00 PM</span>
                <span className="block text-slate-400 mt-0.5">Closed on Sundays and Public Holidays</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-200">
              <a
                href="https://maps.app.goo.gl/uXyL8c71pXF9P9w19"
                target="_blank"
                rel="noreferrer"
                className="block text-center bg-slate-800 hover:bg-slate-900 text-white font-medium py-2.5 px-4 rounded text-xs transition-colors"
              >
                Open in Google Maps
              </a>
            </div>
          </div>

          {/* Maps Iframe */}
          <div className="lg:col-span-8 h-80 sm:h-96 md:h-[420px] bg-slate-100 rounded border border-slate-200 overflow-hidden relative">
            <iframe
              src={siteConfig.googleMapsEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Biocare Health Systems Nairobi Showroom Location Map"
              className="absolute inset-0 w-full h-full"
            ></iframe>
          </div>

        </div>
      </div>
    </section>
  );
}
