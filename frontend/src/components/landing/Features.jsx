import {
  Activity,
  CalendarDays,
  ChartNoAxesCombined,
  Clock3,
  LayoutDashboard,
  LockKeyhole,
  MousePointer2,
  UsersRound,
  Radio,
} from "lucide-react";
import Reveal from "../common/Reveal.jsx";

const features = [
  {
    icon: Radio,
    title: "RFID-based attendance",
    text: "Make the check-in experience quick and contactless with a simple card tap.",
    color: "blue",
  },
  {
    icon: Activity,
    title: "Real-time updates",
    text: "See attendance records flow through the system as students check in.",
    color: "cyan",
  },
  {
    icon: UsersRound,
    title: "Student management",
    text: "Keep student attendance information organized in one clear place.",
    color: "purple",
  },
  {
    icon: Clock3,
    title: "Attendance history",
    text: "Review recorded attendance by date to understand each day's activity.",
    color: "orange",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Daily & monthly reports",
    text: "Turn attendance records into an at-a-glance view of trends over time.",
    color: "green",
  },
  {
    icon: LayoutDashboard,
    title: "Digital dashboard",
    text: "Bring important campus attendance information together in a modern interface.",
    color: "navy",
  },
  {
    icon: LockKeyhole,
    title: "Thoughtful data handling",
    text: "Build with responsible access and student data protection in mind.",
    color: "pink",
  },
  {
    icon: MousePointer2,
    title: "Easy to use",
    text: "Keep the experience approachable for students and administrators alike.",
    color: "yellow",
  },
];

export default function Features() {
  return (
    <section className="section features-section" id="features">
      <div className="container">
        <Reveal className="section-heading">
          <span className="eyebrow eyebrow-blue">BUILT FOR CAMPUS LIFE</span>
          <div className="heading-row">
            <h2>
              Small tap.
              <br />
              Big <span>difference.</span>
            </h2>
            <p>
              Thoughtful features that make attendance feel less like a
              chore—and more like a seamless part of the day.
            </p>
          </div>
        </Reveal>
        <div className="features-grid">
          {features.map(({ icon: Icon, title, text, color }, index) => (
            <Reveal
              className="feature-card"
              key={title}
              delay={(index % 4) * 0.055}
            >
              <div className={`feature-icon icon-${color}`}>
                <Icon size={21} strokeWidth={1.8} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <span className="feature-index">0{index + 1}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
