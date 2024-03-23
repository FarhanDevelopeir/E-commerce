const GuestComponent = (props) => {
  return (
    <div className="flex justify-center mt-3">
      <button
        onClick={() => props.handleGuestLogin()}
        className={`${
          props.isSubmitting
            ? "bg-gray-200 pointer-events-none cursor-not-allowed text-gray-400"
            : " bg-black text-white  relative "
        }py-2 w-[175px] rounded-lg `}
      >
        Login as guest
      </button>
      {props.isSubmitting && props.userType === "Guest" ? (
        <div className="absolute mt-[5px]  h-5 w-5 border-dashed border-4 border-gray-600 rounded-full animate-spin"></div>
      ) : (
        ""
      )}
    </div>
  );
};

export default GuestComponent;
