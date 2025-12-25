const Event = () => {
  return (
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4">Welcome to the Event Page</h1>

      <p className="text-blue text-lg">
        This is the event section of the application.
      </p>

      <div className="bg-base text-text p-4 rounded-lg mt-4">
        Catppuccin Latte UI
      </div>

      <button className="bg-blue text-pink hover:bg-sapphire px-4 py-2 rounded mt-4">
        Click Me
      </button>

      {/* FIXED: text-pink last */}
      <p className="text-xl text-red mt-4">
        Beautiful pastel colors 😍
      </p>
    </div>
  );
};

export default Event;


