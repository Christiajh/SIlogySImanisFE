function StorySection({ title, stories, image }) {
  return (
    <section className="story-section">
      <h2>{title}</h2>
      <div className="content-wrapper">
        <div className="stories">
          {stories.map((story, index) => (
            <div key={index} className="story-card">
              <h3>{story.quote}</h3>
              <p>- {story.author}</p>
            </div>
          ))}
        </div>
        <div className="image-container">
          <img src={image} alt="Indigenous community" />
        </div>
      </div>
      <div className="newsletter-signup">
        <p>Receive stories like these directly in your inbox</p>
        <p>Sign up for occasional updates, stories, and opportunities to get included:</p>
      </div>
    </section>
  );
}

export default StorySection;