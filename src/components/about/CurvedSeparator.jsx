const CurvedSeparator = () => {
    return (
        <section className="relative h-64 md:h-96 w-full -mt-10 mb-10 overflow-hidden">
            {/* White Top Part */}
            <div className="absolute top-0 left-0 w-full h-1/2 bg-white z-0"></div>

            {/* Blue Curve SVG */}
             <div className="absolute top-1/2 left-0 w-full h-full bg-primary transform -skew-y-3 origin-top-left z-0 scale-110"></div>
            
            {/* Overlapping Image */}
            <div className="absolute inset-0 flex items-center justify-center z-10 px-4">
                 <div className="w-full max-w-4xl h-48 md:h-72 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500 border-4 border-white">
                    <img 
                        src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80" 
                        alt="Construction Site"
                        className="w-full h-full object-cover" 
                    />
                 </div>
            </div>
        </section>
    );
};

export default CurvedSeparator;
