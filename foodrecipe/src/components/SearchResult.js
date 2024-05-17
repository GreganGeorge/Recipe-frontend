import "./SearchResult.css";

export const SearchResult = ({ result }) => {
  const image='https://res.cloudinary.com/ehizeex-shop/image/upload/v1672672612/NetflixApp/ric_a4ewxo.jpg'
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${result}!`)}
    >
      {result}
      <div className='bg-_gradient shadow w-full rounded-lg'>
                 <img src={image} alt={result} className='rounded-lg h-[80px] md:h-[80px] w-[80px]' />

                <div className='p-3'>
                    <p className='text-black font-semibold'>{result}</p>

                    <div className='mt-2'>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full mr-3 text-green-500'>
                            {result}
                        </span>
                        <span className='px-2 py-1 text-[12px] capitalize bg-[#0c452243] shadow-xl rounded-full text-green-500'>
                            {result}
                        </span>
                    </div>
                </div>
            </div>
    </div>
  );
};
