import { ArrowUpRight, UserRound } from "lucide-react";
import Reveal from "../common/Reveal.jsx";
import { teamMembers } from "../../data/teamMembers.js";

function MemberPhoto({ member }) {
  if (member.photo) {
    return (
      <img className="member-photo" src={member.photo} alt={`${member.name}`} />
    );
  }
  return (
    <div
      className={`member-photo member-placeholder placeholder-${member.color}`}
      aria-label="Replaceable member photo placeholder"
    >
      <span className="member-placeholder-number">{member.initials}</span>
      <UserRound className="member-silhouette" size={78} strokeWidth={1.15} />
      <span className="photo-edit-hint">ADD PHOTO</span>
    </div>
  );
}

export default function Team() {
  return (
    <section className="section team-section" id="team">
      <div className="container">
        <Reveal className="section-heading">
          <span className="eyebrow eyebrow-blue">
            THE PEOPLE BEHIND THE BUILD
          </span>
          <div className="heading-row">
            <h2>
              Meet the team
              <br />
              behind the <span>project.</span>
            </h2>
            <p>
              Together we build smarter campus technology. Ten curious minds,
              one shared idea—and a lot of learning along the way.
            </p>
          </div>
        </Reveal>
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <Reveal
              className="member-card"
              key={member.initials}
              delay={(index % 5) * 0.045}
            >
              <MemberPhoto member={member} />
              <div className="member-info">
                <div className="member-topline">
                  <span className="member-role">{member.role}</span>
                  {/* <ArrowUpRight size={15} /> */}
                </div>
                <h3>{member.name}</h3>
                <p>{member.rollNumber}</p>
                <span className="member-department">{member.department}</span>
              </div>
            </Reveal>
          ))}
        </div>
       
      </div>
    </section>
  );
}
