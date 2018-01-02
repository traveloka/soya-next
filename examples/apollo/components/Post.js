import React from "react";
import Link from "next/link";

export default class Post extends React.Component {
  render() {
    return (
      <Link href={`/post?id=${this.props.post.id}`}>
        <a className="bg-white ma3 box post flex flex-column no-underline br2">
          <div
            className="image"
            style={{
              backgroundImage: `url(${this.props.post.imageUrl})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              paddingBottom: "100%"
            }}
          />
          <div className="flex items-center black-80 fw3 description">
            {this.props.post.description}
          </div>
        </a>
      </Link>
    );
  }
}
