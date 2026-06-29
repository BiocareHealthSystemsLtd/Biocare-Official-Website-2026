import testimonialsData from '../data/testimonials.json';
import { StarIcon } from './Icons';

export default function TestimonialSection() {
  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-primary-700 tracking-tight">
            Trusted by Doctors & Engineers
          </h2>
          <p className="mt-2 text-gray-500 max-w-xl mx-auto text-sm">
            Read testimonials from health superintendents, clinical operators, and labs using our products.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonialsData.map((test) => (
            <div 
              key={test.id} 
              className="bg-slate-50 border border-slate-100 rounded-2xl p-6 flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                {/* Rating */}
                <div className="flex space-x-1 mb-4 text-amber-500">
                  {[...Array(test.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-4 h-4" />
                  ))}
                </div>
                
                {/* Text */}
                <p className="text-gray-600 text-xs italic leading-relaxed mb-6 font-normal">
                  "{test.text}"
                </p>
              </div>

              {/* User Bio */}
              <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                <div className="bg-primary-100 text-primary-600 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                  {test.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="block font-display font-extrabold text-gray-800 text-xs">{test.name}</span>
                  <span className="block text-[10px] text-gray-400 font-semibold uppercase">{test.role}</span>
                  <span className="block text-[10px] text-primary-600 font-medium">{test.facility}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
