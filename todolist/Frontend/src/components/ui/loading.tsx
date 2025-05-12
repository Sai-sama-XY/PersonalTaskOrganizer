type LoadingProps = {
    height?: string;
  };
  
  function Loading({ height }: LoadingProps) {
    return (
      <div className={`${height ?? 'h-[50vh]'} flex items-center justify-center`}>
        <div className="mt-[-10vh] h-16 w-16 animate-spin rounded-full border-8 border-l-black border-gray-300" />
      </div>
    );
  }
  
  export default Loading;
  