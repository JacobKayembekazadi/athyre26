
import React, { useState } from 'react';
import { Gift, Mail, CreditCard, Check } from 'lucide-react';

const GIFT_CARD_AMOUNTS = [25, 50, 75, 100, 150, 200];

const GiftCards: React.FC = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(50);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [deliveryMethod, setDeliveryMethod] = useState<'email' | 'physical'>('email');

  const displayAmount = customAmount ? parseInt(customAmount) || 0 : selectedAmount;

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-24">
      {/* Hero - Compact on mobile */}
      <section className="py-10 md:py-16 px-4 md:px-6 bg-black text-white">
        <div className="container mx-auto text-center">
          <Gift className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-4 md:mb-6 opacity-60" />
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-3 md:mb-6">
            GIFT CARDS
          </h1>
          <p className="text-gray-400 text-sm md:text-base max-w-xl mx-auto font-medium">
            Give the gift of movement.
          </p>
        </div>
      </section>

      {/* Gift Card Configuration */}
      <section className="py-8 md:py-16 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16">
            {/* Gift Card Preview - Shows first on mobile */}
            <div className="order-1 lg:order-1">
              <div className="aspect-[3/2] bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 md:p-8 flex flex-col justify-between shadow-2xl">
                <div className="flex justify-between items-start">
                  <div className="text-white text-xl md:text-2xl font-black tracking-tighter">ATHŸRE</div>
                  <Gift className="text-white/30" size={24} />
                </div>
                <div>
                  <div className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-1 md:mb-2">
                    Gift Card
                  </div>
                  <div className="text-white text-4xl md:text-5xl font-black">
                    ${displayAmount}
                  </div>
                </div>
              </div>
              {/* What's Included - Hidden on mobile, shown on desktop */}
              <div className="hidden md:block mt-8 p-6 bg-gray-50 rounded-lg">
                <h3 className="font-bold mb-4">What's Included:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    Valid on all products
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    Never expires
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    Delivered instantly via email
                  </li>
                  <li className="flex items-center gap-3 text-sm text-gray-600">
                    <Check size={16} className="text-green-500 flex-shrink-0" />
                    Personalized message option
                  </li>
                </ul>
              </div>
            </div>

            {/* Configuration Form */}
            <div className="order-2 lg:order-2">
              {/* Amount Selection */}
              <div className="mb-8 md:mb-10">
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 md:mb-4">
                  Select Amount
                </h3>
                <div className="grid grid-cols-3 gap-2 md:gap-3 mb-3 md:mb-4">
                  {GIFT_CARD_AMOUNTS.map(amount => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount('');
                      }}
                      className={`py-3 md:py-4 font-bold text-sm border-2 transition-all rounded-lg md:rounded-none ${
                        selectedAmount === amount && !customAmount
                          ? 'border-black bg-black text-white'
                          : 'border-gray-200 hover:border-black'
                      }`}
                    >
                      ${amount}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                  <input
                    type="number"
                    placeholder="Custom Amount"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    min="10"
                    max="500"
                    className="w-full border-2 border-gray-200 px-4 py-3 md:py-4 pl-8 text-sm font-bold focus:outline-none focus:border-black transition-all rounded-lg md:rounded-none"
                  />
                </div>
                <p className="text-[10px] md:text-xs text-gray-400 mt-2">Custom amount: $10 - $500</p>
              </div>

              {/* Delivery Method */}
              <div className="mb-8 md:mb-10">
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 md:mb-4">
                  Delivery Method
                </h3>
                <div className="grid grid-cols-2 gap-3 md:gap-4">
                  <button
                    onClick={() => setDeliveryMethod('email')}
                    className={`p-4 md:p-6 border-2 transition-all text-left rounded-lg md:rounded-none ${
                      deliveryMethod === 'email'
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <Mail className={`mb-2 md:mb-3 ${deliveryMethod === 'email' ? 'text-black' : 'text-gray-400'}`} size={20} />
                    <div className="font-bold text-xs md:text-sm mb-0.5 md:mb-1">Email</div>
                    <div className="text-[10px] md:text-xs text-gray-400">Instant</div>
                  </button>
                  <button
                    onClick={() => setDeliveryMethod('physical')}
                    className={`p-4 md:p-6 border-2 transition-all text-left rounded-lg md:rounded-none ${
                      deliveryMethod === 'physical'
                        ? 'border-black'
                        : 'border-gray-200 hover:border-gray-400'
                    }`}
                  >
                    <CreditCard className={`mb-2 md:mb-3 ${deliveryMethod === 'physical' ? 'text-black' : 'text-gray-400'}`} size={20} />
                    <div className="font-bold text-xs md:text-sm mb-0.5 md:mb-1">Physical</div>
                    <div className="text-[10px] md:text-xs text-gray-400">2-3 days</div>
                  </button>
                </div>
              </div>

              {/* Recipient Info */}
              <div className="mb-6 md:mb-10">
                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-3 md:mb-4">
                  Recipient Details
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <input
                    type="text"
                    placeholder="RECIPIENT NAME"
                    className="w-full border-2 border-gray-200 px-4 py-3 md:py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all rounded-lg md:rounded-none"
                  />
                  <input
                    type="email"
                    placeholder="RECIPIENT EMAIL"
                    className="w-full border-2 border-gray-200 px-4 py-3 md:py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all rounded-lg md:rounded-none"
                  />
                  <textarea
                    placeholder="ADD A MESSAGE (OPTIONAL)"
                    rows={3}
                    className="w-full border-2 border-gray-200 px-4 py-3 md:py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-black transition-all resize-none rounded-lg md:rounded-none"
                  />
                </div>
              </div>

              {/* Add to Cart */}
              <button className="w-full bg-black text-white py-4 md:py-5 font-black text-sm uppercase tracking-widest hover:bg-gray-800 transition-all rounded-lg md:rounded-none">
                Add to Cart - ${displayAmount}
              </button>

              {/* Mobile: What's Included */}
              <div className="md:hidden mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-600">
                  <span className="flex items-center gap-1.5">
                    <Check size={14} className="text-green-500" />
                    Valid on all products
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={14} className="text-green-500" />
                    Never expires
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Check size={14} className="text-green-500" />
                    Instant delivery
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Section - Compact on mobile */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-gray-50">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 md:mb-6">
            CORPORATE GIFTING
          </h2>
          <p className="text-gray-500 text-sm md:text-base mb-6 md:mb-10 font-medium leading-relaxed">
            Order gift cards in bulk for your team or clients.
          </p>
          <button className="w-full md:w-auto border-2 border-black px-8 md:px-10 py-3 md:py-4 font-bold text-xs uppercase tracking-widest hover:bg-black hover:text-white transition-all rounded-lg md:rounded-none">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default GiftCards;
