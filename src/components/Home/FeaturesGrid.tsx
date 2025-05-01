const FeaturesGrid: React.FC = () => {

    return(
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">😈</div>
            <h3 className="text-xl font-semibold text-white mb-2">Prank Your Friends</h3>
            <p className="text-purple-200">Send messages that make your friends work for it</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🎭</div>
            <h3 className="text-xl font-semibold text-white mb-2">Create Suspense</h3>
            <p className="text-purple-200">Build anticipation before revealing your message</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Instant Sharing</h3>
            <p className="text-purple-200">Generate and share links or QR codes in seconds</p>
          </div>
        </div>
    );
};

export default FeaturesGrid;