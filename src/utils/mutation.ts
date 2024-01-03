const mutation = (callback: MutationCallback) => {
  const target = document.querySelector("body");

  if (target) {
    const mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(
      target,
      {
        childList: true,
        subtree: true,
      },
    );
  }
};

export default mutation;
