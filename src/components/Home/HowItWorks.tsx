const HowItWorks: React.FC = () => {
    return(
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-16">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">1</div>
              <p className="text-purple-200 text-center">Write your message and enter your name</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">2</div>
              <p className="text-purple-200 text-center">Share the generated link or QR code</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold mb-4">3</div>
              <p className="text-purple-200 text-center">Watch as your friend navigates through challenges to read your message</p>
            </div>
          </div>
        </div>
    );
};

export default HowItWorks;