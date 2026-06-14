import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────
// INDIAN MOCK DATA
// ─────────────────────────────────────────────────────────────
const DOCTORS = [
  { id:1, name:"Dr. Priya Sharma", specialty:"Cardiology", location:"Mumbai, Maharashtra", hospital:"Kokilaben Dhirubhai Ambani Hospital", rating:4.9, reviews:412, fee:800, experience:16, image:"PS", available:true, qualification:"MD, DM (Cardiology), AIIMS Delhi", slots:["9:00 AM","10:30 AM","2:00 PM","4:00 PM"], lang:["Hindi","English","Marathi"] },
  { id:2, name:"Dr. Arjun Mehta", specialty:"Neurology", location:"Delhi, NCT", hospital:"AIIMS New Delhi", rating:4.9, reviews:318, fee:1200, experience:20, image:"AM", available:true, qualification:"MD, DM (Neurology), AIIMS", slots:["11:00 AM","1:00 PM","3:30 PM"], lang:["Hindi","English"] },
  { id:3, name:"Dr. Kavitha Nair", specialty:"Pediatrics", location:"Bengaluru, Karnataka", hospital:"Manipal Hospital, Whitefield", rating:4.8, reviews:556, fee:600, experience:13, image:"KN", available:true, qualification:"MD (Paediatrics), PGIMER", slots:["9:30 AM","11:30 AM","4:30 PM","6:00 PM"], lang:["Kannada","English","Malayalam"] },
  { id:4, name:"Dr. Rajesh Iyer", specialty:"Dermatology", location:"Chennai, Tamil Nadu", hospital:"Apollo Hospitals, Greams Road", rating:4.7, reviews:289, fee:700, experience:11, image:"RI", available:false, qualification:"MD (Dermatology), Madras Medical College", slots:["10:00 AM","2:00 PM"], lang:["Tamil","English"] },
  { id:5, name:"Dr. Sunita Agarwal", specialty:"Gynecology", location:"Jaipur, Rajasthan", hospital:"Santokba Durlabhji Memorial Hospital", rating:4.8, reviews:374, fee:750, experience:18, image:"SA", available:true, qualification:"MD, DGO, FICOG", slots:["8:00 AM","12:00 PM","3:00 PM","5:00 PM"], lang:["Hindi","English","Rajasthani"] },
  { id:6, name:"Dr. Vikram Bose", specialty:"Psychiatry", location:"Kolkata, West Bengal", hospital:"NIMHANS Kolkata Centre", rating:4.6, reviews:201, fee:900, experience:22, image:"VB", available:true, qualification:"MD (Psychiatry), MBBS, NIMHANS", slots:["10:30 AM","2:30 PM","4:00 PM"], lang:["Bengali","English","Hindi"] },
  { id:7, name:"Dr. Anjali Verma", specialty:"Orthopedics", location:"Hyderabad, Telangana", hospital:"Yashoda Hospital, Secunderabad", rating:4.8, reviews:243, fee:850, experience:14, image:"AV", available:true, qualification:"MS (Ortho), DNB, AIIMS Hyderabad", slots:["9:00 AM","1:00 PM","5:00 PM"], lang:["Telugu","Hindi","English"] },
  { id:8, name:"Dr. Mohammed Rafi", specialty:"General Medicine", location:"Pune, Maharashtra", hospital:"Ruby Hall Clinic", rating:4.7, reviews:488, fee:500, experience:12, image:"MR", available:true, qualification:"MD (General Medicine), BJ Medical College", slots:["8:30 AM","11:00 AM","3:00 PM","6:30 PM"], lang:["Urdu","Marathi","Hindi","English"] },
  { id:9, name:"Dr. Deepika Pillai", specialty:"Oncology", location:"Thiruvananthapuram, Kerala", hospital:"Regional Cancer Centre", rating:4.9, reviews:167, fee:1500, experience:19, image:"DP", available:true, qualification:"MD, DM (Oncology), Tata Memorial", slots:["10:00 AM","2:00 PM"], lang:["Malayalam","English"] },
  { id:10, name:"Dr. Suresh Patel", specialty:"Ophthalmology", location:"Ahmedabad, Gujarat", hospital:"Aravind Eye Hospital", rating:4.8, reviews:332, fee:650, experience:15, image:"SP", available:false, qualification:"MS (Ophthalmology), L V Prasad Eye Institute", slots:["9:00 AM","12:00 PM"], lang:["Gujarati","Hindi","English"] },
  { id:11, name:"Dr. Neha Gupta", specialty:"Endocrinology", location:"Lucknow, Uttar Pradesh", hospital:"SGPGI, Lucknow", rating:4.7, reviews:198, fee:950, experience:10, image:"NG", available:true, qualification:"MD, DM (Endocrinology), SGPGI", slots:["11:00 AM","3:00 PM","5:00 PM"], lang:["Hindi","English"] },
  { id:12, name:"Dr. Anil Desai", specialty:"Cardiology", location:"Nagpur, Maharashtra", hospital:"AIIMS Nagpur", rating:4.6, reviews:155, fee:700, experience:9, image:"AD", available:true, qualification:"MD, DM (Cardiology), AIIMS Nagpur", slots:["10:00 AM","1:30 PM","4:00 PM"], lang:["Marathi","Hindi","English"] },
];

const INDIAN_CITIES = ["All Cities","Mumbai","Delhi","Bengaluru","Chennai","Hyderabad","Pune","Kolkata","Jaipur","Ahmedabad","Lucknow","Nagpur","Thiruvananthapuram","Kochi","Chandigarh","Bhopal","Indore","Surat","Vadodara","Patna","Bhubaneswar"];
const SPECIALTIES = ["All Specialties","Cardiology","Neurology","Pediatrics","Dermatology","Orthopedics","Psychiatry","General Medicine","Oncology","Gynecology","Ophthalmology","Endocrinology"];

// ── Demo quick-login accounts ──
const DEMO_ACCOUNTS = [
  { role:"patient", name:"Rohit Sharma", email:"rohit@patient.in", password:"patient123", phone:"9876543210" },
  { role:"doctor",  name:"Dr. Priya Sharma", email:"priya@doctor.in", password:"doctor123", phone:"9123456789", specialty:"Cardiology" },
  { role:"admin",   name:"Admin",             email:"admin@mediconnect.in", password:"admin123",  phone:"9000000000" },
];

const SAMPLE_APPOINTMENTS = [
  { id:1, doctor:"Dr. Priya Sharma", specialty:"Cardiology", date:"2026-06-18", time:"10:00 AM", status:"upcoming", fee:800, location:"Mumbai, Maharashtra", hospital:"Kokilaben Dhirubhai Ambani Hospital" },
  { id:2, doctor:"Dr. Kavitha Nair", specialty:"Pediatrics", date:"2026-06-08", time:"11:30 AM", status:"completed", fee:600, location:"Bengaluru, Karnataka", hospital:"Manipal Hospital" },
  { id:3, doctor:"Dr. Arjun Mehta", specialty:"Neurology", date:"2026-05-22", time:"3:00 PM", status:"completed", fee:1200, location:"Delhi, NCT", hospital:"AIIMS New Delhi" },
];

const PRESCRIPTIONS = [
  { id:1, doctor:"Dr. Kavitha Nair", qualification:"MD (Paediatrics), PGIMER", hospital:"Manipal Hospital, Bengaluru", date:"2026-06-08", patient:"Rohit Sharma", age:28, diagnosis:"Acute Upper Respiratory Tract Infection", medicines:[
    { name:"Tab. Azithromycin 500mg", dose:"Once daily", duration:"5 days", instructions:"After food" },
    { name:"Tab. Paracetamol 650mg", dose:"Three times daily", duration:"3 days", instructions:"As needed for fever" },
    { name:"Syrup Benadryl 10ml", dose:"Twice daily", duration:"5 days", instructions:"After food" },
  ], notes:"Take complete rest. Drink warm fluids. Avoid cold food. Return if fever persists beyond 3 days.", followUp:"2026-06-22", regNo:"MCI-KN-34521" },
  { id:2, doctor:"Dr. Arjun Mehta", qualification:"MD, DM (Neurology), AIIMS", hospital:"AIIMS New Delhi", date:"2026-05-22", patient:"Rohit Sharma", age:28, diagnosis:"Migraine without aura", medicines:[
    { name:"Tab. Sumatriptan 50mg", dose:"As needed at onset", duration:"SOS", instructions:"Do not exceed 2 tablets in 24 hrs" },
    { name:"Tab. Propranolol 20mg", dose:"Twice daily", duration:"30 days", instructions:"Do not stop suddenly" },
  ], notes:"Maintain migraine diary. Avoid triggers (bright light, stress). Regular sleep schedule. Follow up in 4 weeks.", followUp:"2026-06-22", regNo:"MCI-AM-12098" },
];

const HEALTH_TIPS = [
  { icon:"💧", title:"Stay Hydrated", tip:"Drink 8–10 glasses of water daily. During Indian summers, increase intake and add ORS if needed." },
  { icon:"🧘", title:"Yoga & Exercise", tip:"30 minutes of yoga or brisk walking daily helps manage diabetes, BP and stress — common in India." },
  { icon:"🥗", title:"Balanced Thali", tip:"Include dal, sabzi, roti, rice, curd — a complete Indian thali covers all macro nutrients." },
  { icon:"😴", title:"Quality Sleep", tip:"7–8 hours of sleep is essential. Avoid screens an hour before bed for better rest." },
];

const ADMIN_STATS = [
  { label:"Total Patients", value:"18,492", change:"+8.2%", icon:"👥", color:"#1A6B8A" },
  { label:"Active Doctors", value:"384", change:"+3.1%", icon:"🩺", color:"#2ECC8F" },
  { label:"Appointments Today", value:"1,842", change:"+15.4%", icon:"📅", color:"#8B5CF6" },
  { label:"Revenue MTD", value:"₹28,49,200", change:"+12.7%", icon:"💰", color:"#F59E0B" },
];

const DOCTOR_REQUESTS = [
  { id:1, patient:"Rohit Sharma", type:"General Checkup", time:"10:00 AM", date:"Jun 18", status:"pending" },
  { id:2, patient:"Priya Singh", type:"Follow-up Consult", time:"11:30 AM", date:"Jun 18", status:"confirmed" },
  { id:3, patient:"Suresh Kumar", type:"Cardiology Consult", time:"2:00 PM", date:"Jun 18", status:"pending" },
  { id:4, patient:"Anita Desai", type:"Lab Report Review", time:"4:00 PM", date:"Jun 18", status:"confirmed" },
];

// ─────────────────────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────────────────────
const avatarColor = (s="AA") => {
  const colors=["#1A6B8A","#2ECC8F","#8B5CF6","#F59E0B","#E05252","#06B6D4","#EC4899"];
  return colors[(s.charCodeAt(0)+(s.charCodeAt(1)||0))%colors.length];
};
const inp = (dark) => ({
  width:"100%", padding:"11px 14px", borderRadius:8,
  border:`1px solid ${dark?"#2A4A5E":"#D1E8F0"}`,
  fontSize:14, boxSizing:"border-box",
  background:dark?"#243B4E":"#F8FBFD",
  color:dark?"#E2EEF5":"#0D2B3E", outline:"none", fontFamily:"inherit"
});

// ─────────────────────────────────────────────────────────────
// PRESCRIPTION PDF GENERATOR
// Builds an HTML string → Blob → downloads as .html file
// (also opens a print-preview tab when possible)
// ─────────────────────────────────────────────────────────────
function buildRxHTML(rx) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Prescription_${rx.patient.replace(/ /g,"_")}_${rx.date}.pdf</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:'Segoe UI',Arial,sans-serif;color:#1a1a1a;background:#fff;}
.page{max-width:740px;margin:0 auto;padding:36px;}
.header{display:flex;justify-content:space-between;align-items:flex-start;
  padding-bottom:16px;border-bottom:3px solid #1A6B8A;margin-bottom:22px;}
.logo{font-size:24px;font-weight:800;color:#1A6B8A;}
.logo span{color:#2ECC8F;}
.clinic{font-size:12px;color:#555;margin-top:4px;line-height:1.7;}
.rx-no{font-size:11px;color:#888;text-align:right;margin-top:6px;}
.sec{font-size:10px;font-weight:700;color:#1A6B8A;letter-spacing:.1em;
  text-transform:uppercase;margin:0 0 8px;}
.patient-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;
  background:#F0F7FA;border-radius:8px;padding:14px;margin-bottom:20px;}
.field label{font-size:9px;color:#888;text-transform:uppercase;letter-spacing:.07em;display:block;}
.field p{font-size:14px;font-weight:700;color:#0D2B3E;margin-top:3px;}
.diag{background:#EBF8F4;border-left:4px solid #2ECC8F;
  padding:12px 16px;border-radius:6px;margin-bottom:20px;
  font-size:15px;font-weight:700;color:#0D2B3E;}
table{width:100%;border-collapse:collapse;margin-bottom:20px;font-size:13px;}
th{background:#1A6B8A;color:#fff;padding:10px 12px;text-align:left;font-size:11px;font-weight:700;}
td{padding:10px 12px;border-bottom:1px solid #E2EEF5;vertical-align:top;}
tr:nth-child(even) td{background:#F8FBFD;}
.notes{background:#FFF7ED;border-left:4px solid #F59E0B;
  padding:12px 16px;border-radius:6px;margin-bottom:22px;
  font-size:13px;color:#555;line-height:1.75;}
.followup{background:#EBF4FA;border-radius:8px;padding:10px 14px;
  font-size:13px;color:#1A6B8A;font-weight:600;margin-bottom:24px;}
.footer{display:flex;justify-content:space-between;align-items:flex-end;
  padding-top:16px;border-top:2px dashed #D1E8F0;margin-top:8px;}
.sig-name{font-size:15px;font-weight:800;color:#0D2B3E;}
.sig-qual{font-size:11px;color:#888;margin-top:3px;}
.stamp{display:inline-flex;align-items:center;justify-content:center;
  border:2px solid #2ECC8F;border-radius:50%;width:70px;height:70px;
  font-size:9px;font-weight:700;color:#2ECC8F;text-align:center;
  line-height:1.4;padding:6px;margin-top:10px;}
.wm{position:fixed;top:50%;left:50%;
  transform:translate(-50%,-50%) rotate(-30deg);
  font-size:90px;color:rgba(26,107,138,0.04);
  font-weight:900;pointer-events:none;white-space:nowrap;}
@media print{.wm{display:none;} @page{margin:1.5cm;}}
</style></head><body>
<div class="wm">MediConnect</div>
<div class="page">
  <div class="header">
    <div>
      <div class="logo">&#127973; Medi<span>Connect</span> India</div>
      <div class="clinic">${rx.hospital}<br>Registration No: ${rx.regNo}</div>
    </div>
    <div style="text-align:right">
      <div style="font-size:14px;font-weight:700;color:#0D2B3E">${rx.doctor}</div>
      <div style="font-size:11px;color:#888">${rx.qualification}</div>
      <div class="rx-no">Date: ${rx.date} &nbsp;|&nbsp; Rx&nbsp;#${String(rx.id).padStart(6,"0")}</div>
    </div>
  </div>

  <div class="sec">Patient Information</div>
  <div class="patient-grid">
    <div class="field"><label>Patient Name</label><p>${rx.patient}</p></div>
    <div class="field"><label>Age</label><p>${rx.age} years</p></div>
    <div class="field"><label>Date of Consultation</label><p>${rx.date}</p></div>
  </div>

  <div class="sec">Diagnosis</div>
  <div class="diag">${rx.diagnosis}</div>

  <div class="sec">&#8478;&nbsp; Medications</div>
  <table>
    <thead><tr><th>#</th><th>Medicine</th><th>Dose / Frequency</th><th>Duration</th><th>Instructions</th></tr></thead>
    <tbody>
      ${rx.medicines.map((m,i)=>`<tr><td>${i+1}</td><td><strong>${m.name}</strong></td><td>${m.dose}</td><td>${m.duration}</td><td>${m.instructions}</td></tr>`).join("")}
    </tbody>
  </table>

  <div class="sec">Doctor's Notes &amp; Advice</div>
  <div class="notes">${rx.notes}</div>

  <div class="followup">&#128197;&nbsp; Follow-up Appointment: <strong>${rx.followUp}</strong></div>

  <div class="footer">
    <div style="font-size:11px;color:#888;max-width:300px;line-height:1.6">
      This prescription was digitally generated via MediConnect India.<br>
      Valid for <strong>30 days</strong> from the date of issue.<br>
      ABHA-compliant &bull; For queries: support@mediconnect.in
    </div>
    <div style="text-align:right">
      <div class="sig-name">${rx.doctor}</div>
      <div class="sig-qual">${rx.qualification}</div>
      <div><div class="stamp">&#10004; Digitally Signed</div></div>
    </div>
  </div>
</div>
<script>window.onload=function(){window.print();}</script>
</body></html>`;
}

function downloadPrescription(rx) {
  const html = buildRxHTML(rx);
  const blob = new Blob([html], { type:"text/html;charset=utf-8" });
  const url  = URL.createObjectURL(blob);
  // Try to open in new tab for print dialog
  try {
    const tab = window.open(url,"_blank");
    if(tab) { setTimeout(()=>URL.revokeObjectURL(url), 60000); return; }
  } catch(e){}
  // Fallback: trigger direct download of .html file
  const a = document.createElement("a");
  a.href = url;
  a.download = `MediConnect_Prescription_${rx.patient.replace(/ /g,"_")}_${rx.date}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url), 5000);
}

// ─────────────────────────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────────────────────────
function Avatar({ initials="AB", size=40 }) {
  return (
    <div style={{ width:size, height:size, borderRadius:"50%", background:avatarColor(initials),
      display:"flex", alignItems:"center", justifyContent:"center",
      color:"#fff", fontWeight:700, fontSize:size*0.36, flexShrink:0, letterSpacing:"0.5px"
    }}>{initials}</div>
  );
}

function Badge({ status }) {
  const map = {
    upcoming:{ bg:"#EBF8F4", color:"#2ECC8F", label:"Upcoming" },
    completed:{ bg:"#F0F7FA", color:"#1A6B8A", label:"Completed" },
    cancelled:{ bg:"#FEF2F2", color:"#E05252", label:"Cancelled" },
    pending:{ bg:"#FFF7ED", color:"#F59E0B", label:"Pending" },
    confirmed:{ bg:"#EBF8F4", color:"#2ECC8F", label:"Confirmed" },
    verified:{ bg:"#EBF8F4", color:"#2ECC8F", label:"Verified" },
    unverified:{ bg:"#FFF7ED", color:"#F59E0B", label:"Unverified" },
  };
  const s = map[status]||map.pending;
  return <span style={{ background:s.bg, color:s.color, padding:"3px 10px", borderRadius:20, fontSize:12, fontWeight:600 }}>{s.label}</span>;
}

function StarRating({ rating }) {
  return (
    <span style={{ color:"#F59E0B", fontSize:13 }}>
      {"★".repeat(Math.floor(rating))}{"☆".repeat(5-Math.floor(rating))}
      <span style={{ color:"#6B8EA3", marginLeft:4 }}>{rating}</span>
    </span>
  );
}

function Toast({ msg, onClose }) {
  useEffect(()=>{ const t=setTimeout(onClose,3500); return ()=>clearTimeout(t); },[]);
  return (
    <div style={{ position:"fixed", top:20, right:20, zIndex:9999, background:"#2ECC8F", color:"#fff",
      padding:"14px 20px", borderRadius:10, boxShadow:"0 4px 20px rgba(0,0,0,0.15)",
      display:"flex", gap:10, alignItems:"center", animation:"slideIn 0.3s ease", maxWidth:340
    }}>
      <span style={{ fontSize:18 }}>✅</span>
      <span style={{ fontWeight:500, fontSize:14 }}>{msg}</span>
      <button onClick={onClose} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", marginLeft:"auto", fontSize:18 }}>×</button>
    </div>
  );
}

function Modal({ title, children, onClose }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(13,31,45,0.65)", zIndex:1000,
      display:"flex", alignItems:"center", justifyContent:"center", padding:16
    }} onClick={onClose}>
      <div style={{ background:"#fff", borderRadius:16, padding:28, maxWidth:520, width:"100%",
        maxHeight:"92vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.2)"
      }} onClick={e=>e.stopPropagation()}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
          <h3 style={{ margin:0, color:"#0D2B3E", fontSize:18 }}>{title}</h3>
          <button onClick={onClose} style={{ background:"#F0F7FA", border:"none", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:16, color:"#6B8EA3" }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOCTOR CARD
// ─────────────────────────────────────────────────────────────
function DoctorCard({ doctor:d, onBook, dark }) {
  const surface = dark?"#162837":"#fff";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";
  return (
    <div style={{ background:surface, borderRadius:16, padding:22, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
      boxShadow:"0 2px 12px rgba(26,107,138,0.06)", transition:"all 0.2s"
    }}
    onMouseOver={e=>{e.currentTarget.style.boxShadow="0 8px 32px rgba(26,107,138,0.14)";e.currentTarget.style.transform="translateY(-2px)"}}
    onMouseOut={e=>{e.currentTarget.style.boxShadow="0 2px 12px rgba(26,107,138,0.06)";e.currentTarget.style.transform="none"}}>
      <div style={{ display:"flex", gap:12, alignItems:"flex-start", marginBottom:12 }}>
        <Avatar initials={d.image} size={50} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:700, fontSize:15, color:text, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{d.name}</div>
          <div style={{ color:"#1A6B8A", fontSize:13, fontWeight:600 }}>{d.specialty}</div>
          <div style={{ color:muted, fontSize:11, marginTop:2 }}>📍 {d.location}</div>
        </div>
        <div style={{ background:d.available?"#EBF8F4":"#FEF2F2", color:d.available?"#2ECC8F":"#E05252",
          borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700, whiteSpace:"nowrap"
        }}>{d.available?"● Online":"● Busy"}</div>
      </div>
      <div style={{ fontSize:11, color:muted, marginBottom:10, lineHeight:1.5 }}>
        🏥 {d.hospital}<br/>🎓 {d.qualification}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, marginBottom:14 }}>
        <div><StarRating rating={d.rating}/> <span style={{ color:muted, fontSize:11 }}>({d.reviews})</span></div>
        <span style={{ color:muted }}>{d.experience} yrs exp</span>
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:14 }}>
        {d.lang.map(l=><span key={l} style={{ background:dark?"#243B4E":"#F0F7FA", color:muted, fontSize:10, padding:"2px 8px", borderRadius:12, fontWeight:600 }}>{l}</span>)}
      </div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingTop:12, borderTop:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
        <div>
          <div style={{ color:muted, fontSize:11 }}>Consultation</div>
          <div style={{ color:text, fontWeight:800, fontSize:18 }}>₹{d.fee}</div>
        </div>
        <button onClick={()=>onBook(d)} style={{ background:"#1A6B8A", color:"#fff", border:"none",
          padding:"10px 20px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer"
        }}>Book Now</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOCTORS PAGE
// ─────────────────────────────────────────────────────────────
function DoctorsPage({ onBook, dark }) {
  const [specialty, setSpecialty] = useState("All Specialties");
  const [city, setCity] = useState("All Cities");
  const [search, setSearch] = useState("");
  const [availOnly, setAvailOnly] = useState(false);
  const surface = dark?"#162837":"#fff";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";

  const filtered = DOCTORS.filter(d => {
    const ms = specialty==="All Specialties"||d.specialty===specialty;
    const mc = city==="All Cities"||d.location.includes(city);
    const mq = !search || d.name.toLowerCase().includes(search.toLowerCase())||d.specialty.toLowerCase().includes(search.toLowerCase())||d.location.toLowerCase().includes(search.toLowerCase());
    return ms&&mc&&mq&&(!availOnly||d.available);
  });

  return (
    <div style={{ minHeight:"100vh", background:dark?"#0D1F2D":"#F0F7FA" }}>
      <div style={{ background:"linear-gradient(135deg,#1A6B8A,#0D4F6B)", padding:"36px 24px", textAlign:"center" }}>
        <h1 style={{ color:"#fff", fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:800, margin:"0 0 6px" }}>Find Doctors Across India</h1>
        <p style={{ color:"rgba(255,255,255,0.72)", margin:0, fontSize:15 }}>{DOCTORS.length} verified specialists · Online consultations available</p>
      </div>
      <div style={{ maxWidth:1100, margin:"0 auto", padding:24 }}>
        <div style={{ background:surface, borderRadius:12, padding:18, marginBottom:24,
          display:"flex", gap:12, flexWrap:"wrap", alignItems:"center",
          border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`
        }}>
          <input value={search} onChange={e=>setSearch(e.target.value)}
            placeholder="🔍  Search by name, specialty or city..."
            style={{ flex:1, minWidth:200, padding:"10px 14px", borderRadius:8,
              border:"1px solid #D1E8F0", fontSize:14,
              background:dark?"#243B4E":"#F0F7FA", color:dark?"#E2EEF5":"#0D2B3E"
            }}/>
          <select value={specialty} onChange={e=>setSpecialty(e.target.value)} style={{ padding:"10px 14px", borderRadius:8, border:"1px solid #D1E8F0", fontSize:14, background:dark?"#243B4E":"#F0F7FA", color:dark?"#E2EEF5":"#0D2B3E" }}>
            {SPECIALTIES.map(s=><option key={s}>{s}</option>)}
          </select>
          <select value={city} onChange={e=>setCity(e.target.value)} style={{ padding:"10px 14px", borderRadius:8, border:"1px solid #D1E8F0", fontSize:14, background:dark?"#243B4E":"#F0F7FA", color:dark?"#E2EEF5":"#0D2B3E" }}>
            {INDIAN_CITIES.map(c=><option key={c}>{c}</option>)}
          </select>
          <label style={{ display:"flex", alignItems:"center", gap:8, fontSize:14, color:text, cursor:"pointer", whiteSpace:"nowrap" }}>
            <input type="checkbox" checked={availOnly} onChange={e=>setAvailOnly(e.target.checked)}/> Available Now
          </label>
          <span style={{ color:muted, fontSize:13 }}>{filtered.length} doctors found</span>
        </div>
        {filtered.length ? (
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(300px,1fr))", gap:20 }}>
            {filtered.map(d=><DoctorCard key={d.id} doctor={d} onBook={onBook} dark={dark}/>)}
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"60px 0", color:muted }}>
            <div style={{ fontSize:52, marginBottom:12 }}>🔍</div>
            <div style={{ fontSize:16, fontWeight:600 }}>No doctors match your filters</div>
            <div style={{ fontSize:14, marginTop:6 }}>Try changing city or specialty</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// AUTH PAGE  — with easy demo login
// ─────────────────────────────────────────────────────────────
function AuthPage({ mode, onAuth, onToggle, dark }) {
  const [form, setForm] = useState({ name:"", email:"", password:"", role:"patient", specialty:"" });
  const [error, setError] = useState("");
  const isLogin = mode==="login";
  const surface = dark?"#162837":"#fff";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";
  const bg = dark?"#0D1F2D":"#F0F7FA";

  // One-click demo login — immediately authenticates without needing to submit
  const loginAsDemo = (acc) => {
    onAuth({ name:acc.name, email:acc.email, role:acc.role, phone:acc.phone, specialty:acc.specialty||"" });
  };

  const handle = (e) => {
    e.preventDefault();
    setError("");
    if(!form.email || !form.password){ setError("Please enter your email and password."); return; }
    // Check against demo accounts
    const found = DEMO_ACCOUNTS.find(a => a.email.trim()===form.email.trim() && a.password===form.password);
    if(found){ onAuth({ name:found.name, email:found.email, role:found.role, phone:found.phone, specialty:found.specialty||"" }); return; }
    // For registration or any other login, derive role and proceed
    if(!isLogin){
      onAuth({ ...form, name: form.name||form.email.split("@")[0] });
      return;
    }
    // Generic login — role inferred from email keyword
    const role = form.email.includes("doctor")?"doctor":form.email.includes("admin")?"admin":"patient";
    onAuth({ ...form, role, name: form.name||form.email.split("@")[0] });
  };

  return (
    <div style={{ minHeight:"100vh", background:bg, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
      <div style={{ display:"flex", maxWidth:920, width:"100%", borderRadius:20, overflow:"hidden", boxShadow:"0 20px 60px rgba(0,0,0,0.1)" }}>
        {/* Left brand panel */}
        <div style={{ flex:"0 0 340px", background:"linear-gradient(160deg,#1A6B8A,#2ECC8F)",
          padding:40, display:"flex", flexDirection:"column", justifyContent:"center"
        }} className="hide-mobile">
          <div style={{ fontSize:48, marginBottom:16 }}>🏥</div>
          <h2 style={{ color:"#fff", fontSize:26, fontWeight:800, margin:"0 0 10px" }}>MediConnect India</h2>
          <p style={{ color:"rgba(255,255,255,0.85)", lineHeight:1.7, margin:"0 0 28px", fontSize:14 }}>
            India's trusted online healthcare platform. Connect with top doctors, book appointments, and receive digital prescriptions.
          </p>
          {["🔒 ABDM-aligned data security","🇮🇳 12,000+ Indian specialists","📱 Available in 10+ languages","💊 Digital prescriptions & records"].map(f=>(
            <div key={f} style={{ color:"rgba(255,255,255,0.9)", fontSize:13, marginBottom:9 }}>{f}</div>
          ))}

          {/* Quick Demo Logins — one click to enter */}
          <div style={{ marginTop:28, background:"rgba(255,255,255,0.12)", borderRadius:12, padding:16 }}>
            <div style={{ color:"rgba(255,255,255,0.9)", fontSize:12, fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>⚡ One-Click Demo Login</div>
            {DEMO_ACCOUNTS.map(acc=>(
              <button key={acc.role} onClick={()=>loginAsDemo(acc)} style={{
                display:"flex", alignItems:"center", justifyContent:"space-between", width:"100%",
                background:"rgba(255,255,255,0.18)", border:"1px solid rgba(255,255,255,0.3)",
                borderRadius:9, padding:"10px 14px", marginBottom:8, cursor:"pointer",
                color:"#fff", fontSize:13, fontWeight:600, transition:"background 0.15s"
              }}
              onMouseOver={e=>e.currentTarget.style.background="rgba(255,255,255,0.28)"}
              onMouseOut={e=>e.currentTarget.style.background="rgba(255,255,255,0.18)"}>
                <span>{acc.role==="patient"?"👤 Patient":acc.role==="doctor"?"🩺 Doctor":"⚙️ Admin"} — {acc.name}</span>
                <span style={{ background:"#2ECC8F", borderRadius:6, padding:"2px 8px", fontSize:11, fontWeight:700 }}>Enter →</span>
              </button>
            ))}
            <div style={{ color:"rgba(255,255,255,0.55)", fontSize:11, marginTop:6 }}>No password needed for demo</div>
          </div>
        </div>

        {/* Form */}
        <div style={{ flex:1, background:surface, padding:40, minWidth:0 }}>
          <h2 style={{ color:text, fontSize:22, fontWeight:800, margin:"0 0 6px" }}>
            {isLogin?"Welcome back 👋":"Create your account"}
          </h2>
          <p style={{ color:muted, fontSize:14, marginBottom:24 }}>
            {isLogin?"Sign in to your MediConnect account":"Join India's leading digital healthcare platform"}
          </p>

          {/* Mobile demo buttons */}
          <div style={{ marginBottom:16 }}>
            <div style={{ fontSize:11, fontWeight:700, color:muted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>⚡ Demo Quick Entry</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {DEMO_ACCOUNTS.map(acc=>(
                <button key={acc.role} onClick={()=>loginAsDemo(acc)} style={{
                  background:"#EBF4FA", color:"#1A6B8A", border:"1px solid #1A6B8A30",
                  borderRadius:8, padding:"8px 16px", fontSize:13, fontWeight:700,
                  cursor:"pointer", textTransform:"capitalize"
                }}>
                  {acc.role==="patient"?"👤":acc.role==="doctor"?"🩺":"⚙️"} {acc.role}
                </button>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
            <div style={{ flex:1, height:1, background:dark?"#243B4E":"#E2EEF5" }}/>
            <span style={{ color:muted, fontSize:12 }}>or sign in manually</span>
            <div style={{ flex:1, height:1, background:dark?"#243B4E":"#E2EEF5" }}/>
          </div>

          <form onSubmit={handle}>
            {!isLogin && (
              <div style={{ marginBottom:14 }}>
                <label style={{ display:"block", fontSize:13, fontWeight:600, color:text, marginBottom:6 }}>Full Name</label>
                <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Rohit Sharma" style={inp(dark)}/>
              </div>
            )}
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:text, marginBottom:6 }}>Email Address</label>
              <input type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.in" style={inp(dark)}/>
            </div>
            <div style={{ marginBottom:14 }}>
              <label style={{ display:"block", fontSize:13, fontWeight:600, color:text, marginBottom:6 }}>Password</label>
              <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••" style={inp(dark)}/>
            </div>
            {!isLogin && (
              <>
                <div style={{ marginBottom:14 }}>
                  <label style={{ display:"block", fontSize:13, fontWeight:600, color:text, marginBottom:8 }}>Register as</label>
                  <div style={{ display:"flex", gap:10 }}>
                    {["patient","doctor","admin"].map(r=>(
                      <button type="button" key={r} onClick={()=>setForm({...form,role:r})} style={{
                        flex:1, padding:"10px", borderRadius:8, cursor:"pointer",
                        border:`2px solid ${form.role===r?"#1A6B8A":"#D1E8F0"}`,
                        background:form.role===r?"#EBF4FA":surface,
                        color:form.role===r?"#1A6B8A":muted,
                        fontWeight:form.role===r?700:500, fontSize:13, textTransform:"capitalize"
                      }}>{r==="patient"?"👤 Patient":r==="doctor"?"🩺 Doctor":"⚙️ Admin"}</button>
                    ))}
                  </div>
                </div>
                {form.role==="doctor" && (
                  <div style={{ marginBottom:14 }}>
                    <label style={{ display:"block", fontSize:13, fontWeight:600, color:text, marginBottom:6 }}>Specialty</label>
                    <select value={form.specialty} onChange={e=>setForm({...form,specialty:e.target.value})} style={inp(dark)}>
                      <option value="">Select specialty</option>
                      {SPECIALTIES.slice(1).map(s=><option key={s}>{s}</option>)}
                    </select>
                  </div>
                )}
              </>
            )}
            {error && <div style={{ color:"#E05252", fontSize:13, marginBottom:10, background:"#FEF2F2", padding:"8px 12px", borderRadius:7 }}>⚠️ {error}</div>}
            <button type="submit" style={{ width:"100%", background:"#1A6B8A", color:"#fff", border:"none",
              padding:"13px", borderRadius:9, fontSize:15, fontWeight:700, cursor:"pointer",
              marginTop:6, boxShadow:"0 4px 14px rgba(26,107,138,0.3)"
            }}>{isLogin?"Sign In →":"Create Account →"}</button>
          </form>

          <p style={{ textAlign:"center", marginTop:18, fontSize:14, color:muted }}>
            {isLogin?"New to MediConnect? ":"Already have an account? "}
            <button onClick={onToggle} style={{ background:"none", border:"none", color:"#1A6B8A", fontWeight:700, cursor:"pointer", fontSize:14 }}>
              {isLogin?"Register here":"Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// BOOKING MODAL
// ─────────────────────────────────────────────────────────────
function BookingModal({ doctor:d, onClose, onConfirm, dark }) {
  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("2026-06-18");
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";
  return (
    <Modal title={`Book with ${d.name}`} onClose={onClose}>
      <div style={{ background:dark?"#0D2B3E":"#F0F7FA", borderRadius:10, padding:14, marginBottom:18, display:"flex", gap:12, alignItems:"center" }}>
        <Avatar initials={d.image} size={48}/>
        <div>
          <div style={{ fontWeight:700, fontSize:15, color:text }}>{d.name}</div>
          <div style={{ color:"#1A6B8A", fontSize:13 }}>{d.specialty}</div>
          <div style={{ color:muted, fontSize:12 }}>🏥 {d.hospital}</div>
        </div>
      </div>
      <div style={{ marginBottom:14 }}>
        <label style={{ fontSize:13, fontWeight:600, color:text, display:"block", marginBottom:6 }}>Select Date</label>
        <input type="date" value={date} onChange={e=>setDate(e.target.value)} min="2026-06-12" style={inp(dark)}/>
      </div>
      <div style={{ marginBottom:20 }}>
        <label style={{ fontSize:13, fontWeight:600, color:text, display:"block", marginBottom:10 }}>Available Slots (IST)</label>
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {d.slots.map(s=>(
            <button key={s} onClick={()=>setSlot(s)} style={{
              padding:"8px 16px", borderRadius:8, cursor:"pointer", fontSize:13,
              border:`2px solid ${slot===s?"#1A6B8A":"#D1E8F0"}`,
              background:slot===s?"#1A6B8A":"transparent",
              color:slot===s?"#fff":text, fontWeight:slot===s?700:400
            }}>{s}</button>
          ))}
        </div>
      </div>
      <div style={{ background:dark?"#0D2B3E":"#EBF8F4", borderRadius:8, padding:14, marginBottom:18, fontSize:13, color:text }}>
        {[["Consultation Fee",`₹${d.fee}`],["Platform Fee","₹49"],["Total",`₹${d.fee+49}`]].map(([k,v],i)=>(
          <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:i<2?6:0,
            paddingTop:i===2?8:0, borderTop:i===2?`1px solid ${dark?"#243B4E":"#C8EAD8"}`:undefined,
            fontWeight:i===2?700:400
          }}>
            <span style={{ color:i<2?muted:text }}>{k}</span>
            <strong style={{ color:i===2?"#1A6B8A":text }}>{v}</strong>
          </div>
        ))}
      </div>
      <button onClick={()=>slot&&onConfirm({ doctor:d.name, specialty:d.specialty, date, time:slot, fee:d.fee, hospital:d.hospital, location:d.location })}
        disabled={!slot} style={{ width:"100%", background:slot?"#1A6B8A":"#ccc", color:"#fff", border:"none",
          padding:"13px", borderRadius:9, fontSize:15, fontWeight:700, cursor:slot?"pointer":"not-allowed"
        }}>
        {slot?`Confirm & Pay ₹${d.fee+49} →`:"Select a time slot"}
      </button>
    </Modal>
  );
}

// ─────────────────────────────────────────────────────────────
// PATIENT DASHBOARD
// ─────────────────────────────────────────────────────────────
function PatientDashboard({ user, onNavigate, dark }) {
  const [tab, setTab] = useState("overview");
  const [bookDoc, setBookDoc] = useState(null);
  const [appointments, setAppointments] = useState(SAMPLE_APPOINTMENTS);
  const [toast, setToast] = useState(null);
  const surface = dark?"#162837":"#fff";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";

  const TABS = [
    { id:"overview",icon:"📊",label:"Overview" },
    { id:"book",icon:"🔍",label:"Find Doctors" },
    { id:"appointments",icon:"🗓️",label:"Appointments" },
    { id:"records",icon:"📋",label:"Medical Records" },
    { id:"prescriptions",icon:"💊",label:"Prescriptions" },
    { id:"payments",icon:"💳",label:"Payments" },
    { id:"profile",icon:"👤",label:"Profile" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:dark?"#0D1F2D":"#F0F7FA" }}>
      {toast && <Toast msg={toast} onClose={()=>setToast(null)}/>}
      {bookDoc && <BookingModal doctor={bookDoc} onClose={()=>setBookDoc(null)}
        onConfirm={appt=>{
          setAppointments([{...appt,id:Date.now(),status:"upcoming"},...appointments]);
          setBookDoc(null); setToast(`Appointment booked with ${appt.doctor}! ₹${appt.fee+49} paid.`);
        }} dark={dark}/>}
      <Sidebar tabs={TABS} active={tab} onChange={setTab} user={user} role="Patient" dark={dark}
        sideColor={dark?"#0D2B3E":"#1A6B8A"} onLogout={onNavigate&&(()=>{ onNavigate("logout"); })} />
      <main style={{ flex:1, overflowY:"auto", padding:28, minWidth:0 }}>
        {tab==="overview" && <PatientOverview appointments={appointments} onBook={()=>setTab("book")} surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="book" && <DoctorsPage onBook={setBookDoc} dark={dark}/>}
        {tab==="appointments" && <AppointmentsTab appointments={appointments} surface={surface} text={text} muted={muted} dark={dark}
          onCancel={id=>{setAppointments(appointments.map(a=>a.id===id?{...a,status:"cancelled"}:a)); setToast("Appointment cancelled.");}}/>}
        {tab==="records" && <MedicalRecordsTab surface={surface} text={text} muted={muted} dark={dark} onUpload={()=>setToast("✅ Record uploaded and saved securely!")}/>}
        {tab==="prescriptions" && <PrescriptionsTab surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="payments" && <PaymentsTab appointments={appointments} surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="profile" && <ProfileTab user={user} surface={surface} text={text} muted={muted} dark={dark} onSave={()=>setToast("Profile updated!")}/>}
      </main>
    </div>
  );
}

function Sidebar({ tabs, active, onChange, user, role, dark, sideColor, onLogout }) {
  const [confirmLogout, setConfirmLogout] = useState(false);
  return (
    <aside style={{ width:220, background:sideColor, display:"flex", flexDirection:"column", flexShrink:0, position:"relative" }}>
      {confirmLogout && (
        <div style={{ position:"absolute", inset:0, background:"rgba(13,31,45,0.93)", zIndex:10,
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, gap:12 }}>
          <div style={{ fontSize:36 }}>🚪</div>
          <div style={{ color:"#fff", fontWeight:700, fontSize:15, textAlign:"center" }}>Sign out?</div>
          <div style={{ color:"rgba(255,255,255,0.6)", fontSize:12, textAlign:"center", lineHeight:1.6 }}>You will need to log in again to access your dashboard.</div>
          <button onClick={onLogout} style={{ background:"#E05252", color:"#fff", border:"none",
            borderRadius:8, padding:"10px 0", fontWeight:700, fontSize:14, cursor:"pointer", width:"100%", marginTop:4 }}>
            Yes, Sign Out
          </button>
          <button onClick={()=>setConfirmLogout(false)} style={{ background:"rgba(255,255,255,0.08)",
            color:"rgba(255,255,255,0.8)", border:"1px solid rgba(255,255,255,0.2)",
            borderRadius:8, padding:"10px 0", fontWeight:600, fontSize:14, cursor:"pointer", width:"100%" }}>
            Cancel
          </button>
        </div>
      )}
      <div style={{ padding:"22px 20px", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ color:"#fff", fontWeight:800, fontSize:17 }}>🏥 MediConnect</div>
        <div style={{ color:"rgba(255,255,255,0.55)", fontSize:11, marginTop:3 }}>{role} Portal</div>
      </div>
      <div style={{ flex:1, padding:"10px 0", overflowY:"auto" }}>
        {tabs.map(t=>(
          <button key={t.id} onClick={()=>onChange(t.id)} style={{
            display:"flex", alignItems:"center", gap:10, width:"100%",
            padding:"11px 18px", border:"none", cursor:"pointer", textAlign:"left",
            background:active===t.id?"rgba(46,204,143,0.2)":"transparent",
            color:active===t.id?"#2ECC8F":"rgba(255,255,255,0.72)",
            fontWeight:active===t.id?700:400, fontSize:13,
            borderLeft:active===t.id?"3px solid #2ECC8F":"3px solid transparent",
            transition:"all 0.15s"
          }}>
            <span style={{ fontSize:15 }}>{t.icon}</span>{t.label}
          </button>
        ))}
      </div>
      <div style={{ padding:14, borderTop:"1px solid rgba(255,255,255,0.1)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
          <Avatar initials={(user.name||"U").substring(0,2).toUpperCase()} size={34}/>
          <div style={{ minWidth:0 }}>
            <div style={{ color:"#fff", fontSize:12, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{user.name}</div>
            <div style={{ color:"rgba(255,255,255,0.45)", fontSize:10 }}>{role}</div>
          </div>
        </div>
        <button onClick={()=>setConfirmLogout(true)} style={{
          width:"100%", background:"rgba(224,82,82,0.15)", border:"1px solid rgba(224,82,82,0.3)",
          color:"#ff8888", borderRadius:8, padding:"8px 10px", fontSize:12, fontWeight:700,
          cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:6
        }}>
          🚪 Sign Out
        </button>
      </div>
    </aside>
  );
}

function PatientOverview({ appointments, onBook, surface, text, muted, dark }) {
  const upcoming = appointments.filter(a=>a.status==="upcoming");
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 20px" }}>Dashboard Overview</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(170px,1fr))", gap:14, marginBottom:24 }}>
        {[
          { label:"Upcoming Appointments", value:upcoming.length, icon:"📅", color:"#1A6B8A" },
          { label:"Completed Visits", value:appointments.filter(a=>a.status==="completed").length, icon:"✅", color:"#2ECC8F" },
          { label:"Prescriptions", value:PRESCRIPTIONS.length, icon:"💊", color:"#8B5CF6" },
          { label:"Medical Records", value:3, icon:"📋", color:"#F59E0B" },
        ].map(s=>(
          <div key={s.label} style={{ background:surface, borderRadius:12, padding:18,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, borderTop:`3px solid ${s.color}`
          }}>
            <div style={{ fontSize:28, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:28, fontWeight:800, color:text }}>{s.value}</div>
            <div style={{ fontSize:12, color:muted, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      {upcoming.length>0 && (
        <div style={{ background:surface, borderRadius:12, padding:20, marginBottom:18, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
          <h3 style={{ color:text, fontWeight:700, margin:"0 0 14px", fontSize:16 }}>Upcoming Appointments</h3>
          {upcoming.map(a=>(
            <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
              padding:"12px 0", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, flexWrap:"wrap", gap:8
            }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <Avatar initials={a.doctor.split(" ").map(w=>w[0]).join("").replace("Dr","").substring(0,2)} size={40}/>
                <div>
                  <div style={{ fontWeight:700, color:text, fontSize:14 }}>{a.doctor}</div>
                  <div style={{ color:muted, fontSize:12 }}>{a.specialty} · {a.hospital||""}</div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ color:text, fontWeight:600, fontSize:13 }}>📅 {a.date} · ⏰ {a.time}</div>
                <Badge status={a.status}/>
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Prescriptions quick access */}
      <div style={{ background:surface, borderRadius:12, padding:20, marginBottom:18, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
        <h3 style={{ color:text, fontWeight:700, margin:"0 0 14px", fontSize:16 }}>Recent Prescriptions</h3>
        {PRESCRIPTIONS.slice(0,2).map(rx=>(
          <div key={rx.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"10px 0", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, flexWrap:"wrap", gap:8
          }}>
            <div>
              <div style={{ fontWeight:600, color:text, fontSize:14 }}>💊 {rx.diagnosis}</div>
              <div style={{ color:muted, fontSize:12 }}>{rx.doctor} · {rx.date}</div>
            </div>
            <button onClick={()=>downloadPrescription(rx)} style={{
              background:"#1A6B8A", color:"#fff", border:"none",
              padding:"7px 16px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer",
              display:"flex", alignItems:"center", gap:6
            }}>⬇ Download Rx</button>
          </div>
        ))}
      </div>
      <button onClick={onBook} style={{ background:"#1A6B8A", color:"#fff", border:"none",
        padding:"12px 28px", borderRadius:9, fontSize:14, fontWeight:700, cursor:"pointer"
      }}>+ Book New Appointment</button>
    </div>
  );
}

function AppointmentsTab({ appointments, surface, text, muted, dark, onCancel }) {
  const [filter, setFilter] = useState("all");
  const filtered = filter==="all" ? appointments : appointments.filter(a=>a.status===filter);
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>My Appointments</h2>
      <div style={{ display:"flex", gap:8, marginBottom:18, flexWrap:"wrap" }}>
        {["all","upcoming","completed","cancelled"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{
            padding:"7px 16px", borderRadius:20, cursor:"pointer",
            border:`1px solid ${filter===f?"#1A6B8A":dark?"#243B4E":"#D1E8F0"}`,
            background:filter===f?"#1A6B8A":"transparent",
            color:filter===f?"#fff":muted, fontWeight:filter===f?700:400, fontSize:13, textTransform:"capitalize"
          }}>{f}</button>
        ))}
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {filtered.map(a=>(
          <div key={a.id} style={{ background:surface, borderRadius:12, padding:20,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12
          }}>
            <div style={{ display:"flex", gap:14, alignItems:"center" }}>
              <Avatar initials={a.doctor.replace("Dr. ","").split(" ").map(w=>w[0]).join("").substring(0,2)} size={46}/>
              <div>
                <div style={{ fontWeight:700, color:text, fontSize:15 }}>{a.doctor}</div>
                <div style={{ color:muted, fontSize:13 }}>{a.specialty}</div>
                <div style={{ color:muted, fontSize:12, marginTop:4 }}>📅 {a.date} · ⏰ {a.time} · 💵 ₹{a.fee}</div>
                {a.hospital && <div style={{ color:muted, fontSize:11 }}>🏥 {a.hospital}</div>}
              </div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
              <Badge status={a.status}/>
              {a.status==="upcoming" && (
                <>
                  <button style={{ background:"#EBF4FA", color:"#1A6B8A", border:"none", padding:"7px 14px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>📹 Join Call</button>
                  <button onClick={()=>onCancel(a.id)} style={{ background:"#FEF2F2", color:"#E05252", border:"none", padding:"7px 14px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>Cancel</button>
                </>
              )}
              {a.status==="completed" && (
                <button onClick={()=>{
                  const rx = PRESCRIPTIONS.find(p=>p.doctor===a.doctor);
                  if(rx) downloadPrescription(rx);
                }} style={{ background:"#1A6B8A", color:"#fff", border:"none", padding:"7px 14px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>⬇ Download Rx</button>
              )}
            </div>
          </div>
        ))}
        {!filtered.length && (
          <div style={{ textAlign:"center", padding:"48px 0", color:muted }}>
            <div style={{ fontSize:40, marginBottom:12 }}>📭</div>
            <div style={{ fontSize:15, fontWeight:600 }}>No {filter} appointments</div>
          </div>
        )}
      </div>
    </div>
  );
}

function MedicalRecordsTab({ surface, text, muted, dark, onUpload }) {
  const DEFAULTS = [
    { id:"d1", name:"Blood Report – May 2026", date:"2026-05-10", type:"Haematology", size:"2.4 MB", lab:"SRL Diagnostics", dataUrl:null, mimeType:"application/pdf" },
    { id:"d2", name:"Chest X-Ray", date:"2026-04-15", type:"Radiology", size:"5.1 MB", lab:"Apollo Diagnostics", dataUrl:null, mimeType:"image/jpeg" },
    { id:"d3", name:"ECG Report", date:"2026-03-20", type:"Cardiology", size:"1.8 MB", lab:"Dr. Lal Path Labs", dataUrl:null, mimeType:"application/pdf" },
  ];
  const [records, setRecords] = useState(DEFAULTS);
  const [uploading, setUploading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [meta, setMeta] = useState({ name:"", type:"General", lab:"" });
  const [dragOver, setDragOver] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);
  const fileRef = useRef();

  const typeIcon = (t) => {
    if(t==="Radiology"||t==="Imaging") return "🩻";
    if(t==="Cardiology") return "❤️";
    if(t==="Haematology"||t==="Blood") return "🩸";
    if(t==="Neurology") return "🧠";
    return "📄";
  };

  const fmtSize = (bytes) => {
    if(bytes<1024) return bytes+"B";
    if(bytes<1024*1024) return (bytes/1024).toFixed(1)+"KB";
    return (bytes/(1024*1024)).toFixed(1)+" MB";
  };

  const processFile = (file) => {
    if(!file) return;
    setPendingFile(file);
    setMeta(m=>({ ...m, name: file.name.replace(/\.[^.]+$/,""), lab: m.lab }));
    setShowForm(true);
  };

  const handleFiles = (e) => processFile(e.target.files[0]);
  const handleDrop  = (e) => { e.preventDefault(); setDragOver(false); processFile(e.dataTransfer.files[0]); };

  const confirmUpload = () => {
    if(!pendingFile || !meta.name) return;
    setUploading(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const newRec = {
        id: "u"+Date.now(),
        name: meta.name,
        date: new Date().toISOString().split("T")[0],
        type: meta.type,
        size: fmtSize(pendingFile.size),
        lab: meta.lab||"Self-uploaded",
        dataUrl: ev.target.result,
        mimeType: pendingFile.type,
        fileName: pendingFile.name,
      };
      setRecords(r=>[newRec,...r]);
      setUploading(false);
      setShowForm(false);
      setPendingFile(null);
      setMeta({ name:"", type:"General", lab:"" });
      onUpload();
    };
    reader.readAsDataURL(pendingFile);
  };

  const downloadRecord = (r) => {
    if(r.dataUrl) {
      // Real uploaded file — download as original
      const a = document.createElement("a");
      a.href = r.dataUrl;
      a.download = r.fileName || r.name;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
    } else {
      // Default records — generate a sample PDF-like HTML
      const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${r.name}</title>
<style>body{font-family:Arial,sans-serif;max-width:700px;margin:40px auto;padding:24px;color:#0D2B3E;}
h1{color:#1A6B8A;border-bottom:3px solid #1A6B8A;padding-bottom:10px;}
.meta{background:#F0F7FA;border-radius:8px;padding:16px;margin:20px 0;display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.meta div{font-size:14px;} .meta strong{color:#1A6B8A;}
.note{background:#FFF7ED;border-left:4px solid #F59E0B;padding:12px 16px;border-radius:6px;font-size:13px;margin-top:20px;}
</style></head><body>
<h1>🏥 MediConnect India — Medical Record</h1>
<div class="meta">
<div><strong>Report Name</strong><br>${r.name}</div>
<div><strong>Test Type</strong><br>${r.type}</div>
<div><strong>Date</strong><br>${r.date}</div>
<div><strong>Laboratory</strong><br>${r.lab}</div>
<div><strong>File Size</strong><br>${r.size}</div>
</div>
<div class="note">&#9432; This is a sample record placeholder. Upload your actual document using the Upload button to store and download your real medical reports.</div>
</body></html>`;
      const blob = new Blob([html],{type:"text/html"});
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href=url; a.download=`${r.name.replace(/ /g,"_")}.html`;
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(()=>URL.revokeObjectURL(url),5000);
    }
  };

  const viewRecord = (r) => {
    if(r.dataUrl) {
      const tab = window.open("","_blank");
      if(tab) {
        if(r.mimeType.startsWith("image/")) {
          tab.document.write(`<html><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;min-height:100vh"><img src="${r.dataUrl}" style="max-width:100%;max-height:100vh"/></body></html>`);
        } else {
          tab.document.write(`<html><body style="margin:0"><embed src="${r.dataUrl}" width="100%" height="100%" style="position:fixed;top:0;left:0;right:0;bottom:0"/></body></html>`);
        }
      }
    }
  };

  const deleteRecord = (id) => setRecords(r=>r.filter(x=>x.id!==id));

  const RECORD_TYPES = ["General","Haematology","Radiology","Cardiology","Neurology","Pathology","Dermatology","Ophthalmology","Other"];

  return (
    <div>
      {/* Header */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20, flexWrap:"wrap", gap:12 }}>
        <div>
          <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:0 }}>Medical Records</h2>
          <p style={{ color:muted, fontSize:13, margin:"4px 0 0" }}>{records.length} records stored securely</p>
        </div>
        <button onClick={()=>fileRef.current.click()} style={{ background:"#1A6B8A", color:"#fff", border:"none",
          padding:"10px 20px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer",
          display:"flex", alignItems:"center", gap:8
        }}>
          <span style={{fontSize:16}}>📤</span> Upload Record
        </button>
        <input ref={fileRef} type="file" accept=".pdf,.jpg,.jpeg,.png,.doc,.docx,.txt" onChange={handleFiles} style={{display:"none"}}/>
      </div>

      {/* Drop zone */}
      <div
        onDragOver={e=>{e.preventDefault();setDragOver(true)}}
        onDragLeave={()=>setDragOver(false)}
        onDrop={handleDrop}
        onClick={()=>fileRef.current.click()}
        style={{ border:`2px dashed ${dragOver?"#1A6B8A":"#D1E8F0"}`,
          background:dragOver?(dark?"#0D2B3E":"#EBF4FA"):surface,
          borderRadius:12, padding:"28px 20px", textAlign:"center", marginBottom:20,
          cursor:"pointer", transition:"all 0.2s"
        }}>
        <div style={{fontSize:36,marginBottom:8}}>📂</div>
        <div style={{color:text,fontWeight:600,fontSize:14}}>Drag & Drop your report here</div>
        <div style={{color:muted,fontSize:12,marginTop:4}}>Supports PDF, JPG, PNG, DOC — Click to browse</div>
      </div>

      {/* Upload form modal */}
      {showForm && pendingFile && (
        <div style={{ position:"fixed", inset:0, background:"rgba(13,31,45,0.65)", zIndex:1000,
          display:"flex", alignItems:"center", justifyContent:"center", padding:16
        }}>
          <div style={{ background:surface, borderRadius:16, padding:28, maxWidth:460, width:"100%",
            boxShadow:"0 20px 60px rgba(0,0,0,0.2)"
          }}>
            <h3 style={{color:text,fontWeight:700,fontSize:18,margin:"0 0 4px"}}>Confirm Upload</h3>
            <p style={{color:muted,fontSize:13,marginBottom:20}}>📎 {pendingFile.name} · {fmtSize(pendingFile.size)}</p>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:12,fontWeight:700,color:muted,marginBottom:6,textTransform:"uppercase"}}>Report Name *</label>
              <input value={meta.name} onChange={e=>setMeta({...meta,name:e.target.value})} style={inp(dark)} placeholder="e.g. Blood Test Report June 2026"/>
            </div>
            <div style={{marginBottom:14}}>
              <label style={{display:"block",fontSize:12,fontWeight:700,color:muted,marginBottom:6,textTransform:"uppercase"}}>Report Type</label>
              <select value={meta.type} onChange={e=>setMeta({...meta,type:e.target.value})} style={inp(dark)}>
                {RECORD_TYPES.map(t=><option key={t}>{t}</option>)}
              </select>
            </div>
            <div style={{marginBottom:22}}>
              <label style={{display:"block",fontSize:12,fontWeight:700,color:muted,marginBottom:6,textTransform:"uppercase"}}>Laboratory / Hospital</label>
              <input value={meta.lab} onChange={e=>setMeta({...meta,lab:e.target.value})} style={inp(dark)} placeholder="e.g. SRL Diagnostics, Apollo"/>
            </div>
            <div style={{display:"flex",gap:10}}>
              <button onClick={confirmUpload} disabled={!meta.name||uploading} style={{
                flex:1, background:meta.name?"#1A6B8A":"#ccc", color:"#fff", border:"none",
                padding:"12px", borderRadius:9, fontSize:14, fontWeight:700,
                cursor:meta.name?"pointer":"not-allowed"
              }}>{uploading?"Uploading…":"✅ Save Record"}</button>
              <button onClick={()=>{setShowForm(false);setPendingFile(null);}} style={{
                background:"#F0F7FA", color:muted, border:"none",
                padding:"12px 16px", borderRadius:9, fontSize:14, cursor:"pointer"
              }}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Records list */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {records.map(r=>(
          <div key={r.id} style={{ background:surface, borderRadius:12, padding:18,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10
          }}>
            <div style={{ display:"flex", gap:14, alignItems:"center", flex:1, minWidth:0 }}>
              <div style={{ width:46, height:46, borderRadius:10,
                background: r.dataUrl?"linear-gradient(135deg,#1A6B8A,#2ECC8F)":"#EBF4FA",
                display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, flexShrink:0
              }}>{r.dataUrl?"📁":typeIcon(r.type)}</div>
              <div style={{minWidth:0}}>
                <div style={{ fontWeight:700, color:text, fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{r.name}</div>
                <div style={{ color:muted, fontSize:12, marginTop:3 }}>{r.type} · {r.date} · {r.size} · {r.lab}</div>
                {r.dataUrl && <div style={{color:"#2ECC8F",fontSize:11,fontWeight:600,marginTop:2}}>✅ Uploaded by you</div>}
              </div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {r.dataUrl && (
                <button onClick={()=>viewRecord(r)} style={{ background:"#EBF4FA", color:"#1A6B8A", border:"none",
                  padding:"7px 14px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer"
                }}>👁 View</button>
              )}
              <button onClick={()=>downloadRecord(r)} style={{ background:"#1A6B8A", color:"#fff", border:"none",
                padding:"7px 16px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer",
                display:"flex", alignItems:"center", gap:6
              }}>⬇ Download</button>
              {r.dataUrl && (
                <button onClick={()=>deleteRecord(r.id)} style={{ background:"#FEF2F2", color:"#E05252", border:"none",
                  padding:"7px 10px", borderRadius:7, fontSize:13, cursor:"pointer"
                }}>🗑</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// PRESCRIPTIONS TAB  — with beautiful download button
// ─────────────────────────────────────────────────────────────
function PrescriptionsTab({ surface, text, muted, dark }) {
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 8px" }}>My Prescriptions</h2>
      <p style={{ color:muted, fontSize:14, marginBottom:20 }}>Download your prescriptions as a print-ready PDF — signed by your doctor.</p>
      <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
        {PRESCRIPTIONS.map(rx=>(
          <div key={rx.id} style={{ background:surface, borderRadius:14, padding:24,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
            boxShadow:"0 2px 12px rgba(26,107,138,0.05)"
          }}>
            {/* Header */}
            <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:10, marginBottom:16 }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <div style={{ width:44, height:44, borderRadius:10, background:"linear-gradient(135deg,#1A6B8A,#2ECC8F)",
                  display:"flex", alignItems:"center", justifyContent:"center", fontSize:22
                }}>💊</div>
                <div>
                  <div style={{ fontWeight:700, color:text, fontSize:16 }}>{rx.diagnosis}</div>
                  <div style={{ color:"#1A6B8A", fontSize:13, marginTop:2 }}>{rx.doctor}</div>
                  <div style={{ color:muted, fontSize:12 }}>{rx.hospital}</div>
                </div>
              </div>
              <div style={{ textAlign:"right" }}>
                <div style={{ color:muted, fontSize:12 }}>📅 {rx.date}</div>
                <button onClick={()=>downloadPrescription(rx)} style={{
                  marginTop:8, background:"linear-gradient(135deg,#1A6B8A,#0D4F6B)",
                  color:"#fff", border:"none", padding:"10px 20px", borderRadius:9,
                  fontSize:13, fontWeight:700, cursor:"pointer", display:"flex",
                  alignItems:"center", gap:8, boxShadow:"0 3px 12px rgba(26,107,138,0.3)"
                }}>
                  <span style={{ fontSize:16 }}>⬇</span> Download Prescription PDF
                </button>
              </div>
            </div>

            {/* Medicines */}
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:12, fontWeight:700, color:muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>Medicines</div>
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {rx.medicines.map((m,i)=>(
                  <div key={i} style={{ background:dark?"#243B4E":"#F0F7FA", borderRadius:8, padding:"10px 14px",
                    borderLeft:"3px solid #2ECC8F", display:"flex", justifyContent:"space-between",
                    alignItems:"center", flexWrap:"wrap", gap:8
                  }}>
                    <div>
                      <div style={{ fontWeight:700, color:text, fontSize:13 }}>{m.name}</div>
                      <div style={{ color:muted, fontSize:12 }}>{m.dose} · {m.duration}</div>
                    </div>
                    <div style={{ background:dark?"#1A3A50":"#EBF8F4", color:"#2ECC8F", fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:20 }}>{m.instructions}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor's Notes */}
            <div style={{ background:dark?"#243B4E":"#FFF7ED", borderRadius:8, padding:"12px 14px",
              borderLeft:"3px solid #F59E0B", marginBottom:12
            }}>
              <div style={{ fontSize:12, fontWeight:700, color:"#F59E0B", marginBottom:4 }}>DOCTOR'S NOTES</div>
              <div style={{ fontSize:13, color:text, lineHeight:1.65 }}>{rx.notes}</div>
            </div>

            {/* Follow-up & Download */}
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:10 }}>
              <div style={{ background:dark?"#0D2B3E":"#EBF4FA", borderRadius:8, padding:"8px 14px", fontSize:13, color:"#1A6B8A", fontWeight:600 }}>
                📅 Follow-up: {rx.followUp}
              </div>
              <button onClick={()=>downloadPrescription(rx)} style={{
                background:"#2ECC8F", color:"#fff", border:"none",
                padding:"9px 20px", borderRadius:8, fontSize:13, fontWeight:700,
                cursor:"pointer", display:"flex", alignItems:"center", gap:6
              }}>
                🖨️ Print / Save PDF
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function PaymentsTab({ appointments, surface, text, muted, dark }) {
  const total = appointments.reduce((s,a)=>s+a.fee,0);
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>Payments</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:14, marginBottom:22 }}>
        {[
          { label:"Total Spent",value:`₹${total.toLocaleString("en-IN")}`,icon:"💳",color:"#1A6B8A" },
          { label:"Consultations",value:appointments.length,icon:"🗓️",color:"#2ECC8F" },
          { label:"Pending",value:"₹0",icon:"⏳",color:"#F59E0B" },
        ].map(s=>(
          <div key={s.label} style={{ background:surface, borderRadius:12, padding:18,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, borderTop:`3px solid ${s.color}`
          }}>
            <div style={{ fontSize:24, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:22, fontWeight:800, color:text }}>{s.value}</div>
            <div style={{ fontSize:12, color:muted, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background:surface, borderRadius:12, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, overflow:"hidden" }}>
        <div style={{ padding:"14px 20px", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, fontWeight:700, color:text, fontSize:15 }}>Transaction History</div>
        {appointments.map(a=>(
          <div key={a.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"14px 20px", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, flexWrap:"wrap", gap:8
          }}>
            <div>
              <div style={{ fontWeight:600, color:text, fontSize:14 }}>{a.doctor}</div>
              <div style={{ color:muted, fontSize:12 }}>{a.specialty} · {a.date}</div>
            </div>
            <div style={{ textAlign:"right" }}>
              <div style={{ fontWeight:700, color:text, fontSize:15 }}>₹{a.fee+49}</div>
              <Badge status={a.status==="upcoming"?"pending":"confirmed"}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileTab({ user, surface, text, muted, dark, onSave }) {
  const [form, setForm] = useState({
    name:user.name||"", email:user.email||"", phone:user.phone||"+91 9876543210",
    dob:"1995-08-22", city:"Mumbai", state:"Maharashtra",
    bloodGroup:"B+", allergies:"Penicillin", abhaId:"14-3456-7890-1234"
  });
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>Profile Settings</h2>
      <div style={{ background:surface, borderRadius:12, padding:24, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
        <div style={{ display:"flex", gap:20, alignItems:"center", marginBottom:24, flexWrap:"wrap" }}>
          <Avatar initials={(user.name||"U").substring(0,2).toUpperCase()} size={72}/>
          <div>
            <div style={{ fontWeight:700, color:text, fontSize:18 }}>{user.name}</div>
            <div style={{ color:muted, fontSize:13, marginTop:4 }}>Patient · Member since 2025</div>
            <div style={{ color:"#1A6B8A", fontSize:12, marginTop:4, fontWeight:600 }}>ABHA ID: {form.abhaId}</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14 }}>
          {[["Full Name","name"],["Email","email"],["Mobile","phone"],["Date of Birth","dob"],["City","city"],["State","state"],["Blood Group","bloodGroup"],["Known Allergies","allergies"],["ABHA ID","abhaId"]].map(([lbl,key])=>(
            <div key={key}>
              <label style={{ display:"block", fontSize:12, fontWeight:600, color:muted, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.05em" }}>{lbl}</label>
              <input value={form[key]} onChange={e=>setForm({...form,[key]:e.target.value})} style={inp(dark)}/>
            </div>
          ))}
        </div>
        <button onClick={onSave} style={{ background:"#1A6B8A", color:"#fff", border:"none",
          padding:"12px 28px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", marginTop:18
        }}>Save Changes</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOCTOR DASHBOARD
// ─────────────────────────────────────────────────────────────
function DoctorDashboard({ user, dark, onLogout }) {
  const [tab, setTab] = useState("overview");
  const [requests, setRequests] = useState(DOCTOR_REQUESTS);
  const [toast, setToast] = useState(null);
  const surface = dark?"#162837":"#fff";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";

  const TABS = [
    { id:"overview",icon:"📊",label:"Overview" },
    { id:"appointments",icon:"🗓️",label:"Appointments" },
    { id:"patients",icon:"👥",label:"Patient Records" },
    { id:"consultation",icon:"📹",label:"Consultation" },
    { id:"prescriptions",icon:"💊",label:"Write Rx" },
    { id:"earnings",icon:"💰",label:"Earnings" },
    { id:"profile",icon:"👤",label:"Profile" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:dark?"#0D1F2D":"#F0F7FA" }}>
      {toast && <Toast msg={toast} onClose={()=>setToast(null)}/>}
      <Sidebar tabs={TABS} active={tab} onChange={setTab} user={user} role="Doctor" dark={dark} sideColor={dark?"#0A2030":"#0D4F6B"} onLogout={onLogout}/>
      <main style={{ flex:1, overflowY:"auto", padding:28, minWidth:0 }}>
        {tab==="overview" && <DoctorOverview requests={requests} surface={surface} text={text} muted={muted} dark={dark}
          onAccept={id=>{setRequests(requests.map(r=>r.id===id?{...r,status:"confirmed"}:r)); setToast("Appointment confirmed!");}}
          onReject={id=>{setRequests(requests.filter(r=>r.id!==id)); setToast("Appointment declined.");}}/>}
        {tab==="appointments" && <DoctorAppointments requests={requests} surface={surface} text={text} muted={muted} dark={dark}
          onAccept={id=>{setRequests(requests.map(r=>r.id===id?{...r,status:"confirmed"}:r)); setToast("Confirmed!");}}
          onReject={id=>{setRequests(requests.filter(r=>r.id!==id)); setToast("Declined.");}}/>}
        {tab==="patients" && <PatientRecordsTab surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="consultation" && <ConsultationRoom surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="prescriptions" && <DoctorPrescriptions surface={surface} text={text} muted={muted} dark={dark} onSave={()=>setToast("✅ Prescription saved & sent to patient!")}/>}
        {tab==="earnings" && <EarningsDashboard surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="profile" && <ProfileTab user={user} surface={surface} text={text} muted={muted} dark={dark} onSave={()=>setToast("Profile updated!")}/>}
      </main>
    </div>
  );
}

function DoctorOverview({ requests, surface, text, muted, dark, onAccept, onReject }) {
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 20px" }}>Doctor Overview</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, marginBottom:24 }}>
        {[
          { label:"Today's Patients",value:"8",icon:"👤",color:"#1A6B8A" },
          { label:"Pending Requests",value:requests.filter(r=>r.status==="pending").length,icon:"⏳",color:"#F59E0B" },
          { label:"Confirmed",value:requests.filter(r=>r.status==="confirmed").length,icon:"✅",color:"#2ECC8F" },
          { label:"This Month",value:"₹64,200",icon:"💰",color:"#8B5CF6" },
        ].map(s=>(
          <div key={s.label} style={{ background:surface, borderRadius:12, padding:18,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, borderTop:`3px solid ${s.color}`
          }}>
            <div style={{ fontSize:26, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:24, fontWeight:800, color:text }}>{s.value}</div>
            <div style={{ fontSize:12, color:muted, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ background:surface, borderRadius:12, padding:20, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
        <h3 style={{ color:text, fontWeight:700, margin:"0 0 14px", fontSize:15 }}>Today's Requests</h3>
        {requests.map(r=>(
          <div key={r.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"12px 0", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, flexWrap:"wrap", gap:8
          }}>
            <div style={{ display:"flex", gap:12, alignItems:"center" }}>
              <Avatar initials={r.patient.split(" ").map(w=>w[0]).join("").substring(0,2)} size={38}/>
              <div>
                <div style={{ fontWeight:700, color:text, fontSize:14 }}>{r.patient}</div>
                <div style={{ color:muted, fontSize:12 }}>{r.type} · {r.date} {r.time}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <Badge status={r.status}/>
              {r.status==="pending" && (
                <>
                  <button onClick={()=>onAccept(r.id)} style={{ background:"#EBF8F4", color:"#2ECC8F", border:"none", padding:"6px 14px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>Accept</button>
                  <button onClick={()=>onReject(r.id)} style={{ background:"#FEF2F2", color:"#E05252", border:"none", padding:"6px 14px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer" }}>Decline</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DoctorAppointments({ requests, surface, text, muted, dark, onAccept, onReject }) {
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>Appointment Requests</h2>
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {requests.map(r=>(
          <div key={r.id} style={{ background:surface, borderRadius:12, padding:20,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12
          }}>
            <div style={{ display:"flex", gap:14, alignItems:"center" }}>
              <Avatar initials={r.patient.split(" ").map(w=>w[0]).join("").substring(0,2)} size={46}/>
              <div>
                <div style={{ fontWeight:700, color:text, fontSize:15 }}>{r.patient}</div>
                <div style={{ color:"#1A6B8A", fontSize:13 }}>{r.type}</div>
                <div style={{ color:muted, fontSize:12, marginTop:3 }}>📅 {r.date} · ⏰ {r.time}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center", flexWrap:"wrap" }}>
              <Badge status={r.status}/>
              {r.status==="pending" && (
                <>
                  <button onClick={()=>onAccept(r.id)} style={{ background:"#2ECC8F", color:"#fff", border:"none", padding:"8px 18px", borderRadius:7, fontSize:13, fontWeight:700, cursor:"pointer" }}>✓ Accept</button>
                  <button onClick={()=>onReject(r.id)} style={{ background:"#FEF2F2", color:"#E05252", border:"none", padding:"8px 18px", borderRadius:7, fontSize:13, fontWeight:700, cursor:"pointer" }}>✕ Decline</button>
                </>
              )}
              {r.status==="confirmed" && (
                <button style={{ background:"#1A6B8A", color:"#fff", border:"none", padding:"8px 18px", borderRadius:7, fontSize:13, fontWeight:700, cursor:"pointer" }}>📹 Start Call</button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ConsultationRoom({ surface, text, muted, dark }) {
  const [inCall, setInCall] = useState(false);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState([
    { from:"patient", text:"Good morning Doctor. I have been having headaches since yesterday." },
    { from:"doctor", text:"Good morning Priya. Please don't worry, I will check everything." },
  ]);
  const [elapsed, setElapsed] = useState(0);
  const [stream, setStream] = useState(null);
  const [camError, setCamError] = useState("");
  const videoRef = useRef(null);
  const timerRef = useRef(null);
  const chatEndRef = useRef(null);

  const startCall = async () => {
    setCamError("");
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video:true, audio:true });
      setStream(s);
      if(videoRef.current) videoRef.current.srcObject = s;
    } catch(err) {
      setCamError("Camera/mic not available — showing demo mode.");
      setStream("demo");
    }
    setInCall(true);
    timerRef.current = setInterval(()=>setElapsed(e=>e+1), 1000);
  };

  const endCall = () => {
    if(stream && stream !== "demo") { stream.getTracks().forEach(t=>t.stop()); }
    setStream(null);
    setInCall(false);
    setElapsed(0);
    if(timerRef.current) clearInterval(timerRef.current);
  };

  const toggleMic = () => {
    if(stream && stream !== "demo") stream.getAudioTracks().forEach(t=>{ t.enabled = !t.enabled; });
    setMic(m=>!m);
  };
  const toggleCam = () => {
    if(stream && stream !== "demo") stream.getVideoTracks().forEach(t=>{ t.enabled = !t.enabled; });
    setCam(c=>!c);
  };

  useEffect(()=>{ chatEndRef.current?.scrollIntoView({behavior:"smooth"}); },[messages,chatOpen]);
  useEffect(()=>()=>{ if(timerRef.current) clearInterval(timerRef.current); if(stream&&stream!=="demo") stream.getTracks().forEach(t=>t.stop()); },[]);

  const fmt = (s) => `${String(Math.floor(s/60)).padStart(2,"0")}:${String(s%60).padStart(2,"0")}`;
  const sendMsg = () => {
    if(!chatMsg.trim()) return;
    setMessages(m=>[...m,{from:"doctor",text:chatMsg.trim()}]);
    setChatMsg("");
  };

  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>Consultation Room</h2>
      {!inCall ? (
        <div style={{ background:surface, borderRadius:16, padding:32, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, textAlign:"center" }}>
          <div style={{ fontSize:64, marginBottom:16 }}>📹</div>
          <h3 style={{ color:text, fontSize:20, fontWeight:700, margin:"0 0 8px" }}>Start Video Consultation</h3>
          <p style={{ color:muted, fontSize:14, marginBottom:8 }}>Next patient: <strong style={{ color:text }}>Priya Singh</strong> — Follow-up at 11:30 AM</p>
          <p style={{ color:muted, fontSize:13, marginBottom:28 }}>Your camera and microphone will be requested when you start the call.</p>
          <button onClick={startCall} style={{ background:"#2ECC8F", color:"#fff", border:"none",
            padding:"14px 40px", borderRadius:10, fontSize:16, fontWeight:700, cursor:"pointer",
            boxShadow:"0 4px 20px rgba(46,204,143,0.3)" }}>📹 Start Call Now</button>
        </div>
      ) : (
        <div style={{ background:"#0A1218", borderRadius:16, overflow:"hidden" }}>
          {/* Call duration bar */}
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"10px 18px", background:"#0D1F2D" }}>
            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"#2ECC8F", animation:"pulse 1.5s infinite" }}/>
              <span style={{ color:"#fff", fontSize:13, fontWeight:600 }}>Live Consultation</span>
            </div>
            <span style={{ color:"#2ECC8F", fontWeight:700, fontSize:14 }}>⏱ {fmt(elapsed)}</span>
          </div>
          {camError && (
            <div style={{ background:"#FFF7ED", padding:"8px 16px", fontSize:12, color:"#F59E0B", textAlign:"center" }}>
              ⚠ {camError}
            </div>
          )}
          {/* Video grid */}
          <div style={{ display:"grid", gridTemplateColumns:chatOpen?"1fr":"1fr 1fr", gap:2, height:300 }}>
            {/* Local video (doctor) */}
            <div style={{ background:"#162837", position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {stream && stream !== "demo" ? (
                <video ref={videoRef} autoPlay muted playsInline
                  style={{ width:"100%", height:"100%", objectFit:"cover", transform:"scaleX(-1)" }}/>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10 }}>
                  <Avatar initials="DR" size={72}/>
                  <span style={{ color:"rgba(255,255,255,0.7)", fontSize:13 }}>You (Doctor)</span>
                </div>
              )}
              <div style={{ position:"absolute", bottom:10, left:10, background:"rgba(0,0,0,0.6)",
                color:"#fff", fontSize:11, padding:"3px 8px", borderRadius:6 }}>Dr. Priya Sharma</div>
              {!cam && <div style={{ position:"absolute", inset:0, background:"#0D1F2D", display:"flex",
                alignItems:"center", justifyContent:"center", flexDirection:"column", gap:8 }}>
                <Avatar initials="DR" size={56}/>
                <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>Camera Off</span>
              </div>}
            </div>
            {/* Remote (patient) — simulated */}
            {!chatOpen && (
              <div style={{ background:"#0A1E2B", position:"relative", display:"flex",
                alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10 }}>
                <Avatar initials="PS" size={72}/>
                <span style={{ color:"rgba(255,255,255,0.8)", fontSize:13, fontWeight:600 }}>Priya Singh</span>
                <div style={{ position:"absolute", top:10, right:10, background:"#2ECC8F",
                  borderRadius:20, padding:"3px 10px", fontSize:11, color:"#fff", fontWeight:600 }}>● Live</div>
                <div style={{ position:"absolute", bottom:10, left:10, background:"rgba(0,0,0,0.6)",
                  color:"#fff", fontSize:11, padding:"3px 8px", borderRadius:6 }}>Patient</div>
              </div>
            )}
            {/* Chat panel */}
            {chatOpen && (
              <div style={{ background:"#0D1F2D", display:"flex", flexDirection:"column" }}>
                <div style={{ flex:1, overflowY:"auto", padding:12, display:"flex", flexDirection:"column", gap:8 }}>
                  {messages.map((m,i)=>(
                    <div key={i} style={{ display:"flex", justifyContent:m.from==="doctor"?"flex-end":"flex-start" }}>
                      <div style={{ maxWidth:"80%", padding:"8px 12px", borderRadius:10, fontSize:12,
                        background:m.from==="doctor"?"#1A6B8A":"#243B4E", color:"#fff", lineHeight:1.5 }}>
                        {m.text}
                      </div>
                    </div>
                  ))}
                  <div ref={chatEndRef}/>
                </div>
                <div style={{ display:"flex", gap:6, padding:"8px 10px", borderTop:"1px solid #1A3A50" }}>
                  <input value={chatMsg} onChange={e=>setChatMsg(e.target.value)}
                    onKeyDown={e=>e.key==="Enter"&&sendMsg()}
                    placeholder="Type message..."
                    style={{ flex:1, background:"#243B4E", border:"none", borderRadius:6,
                      padding:"8px 10px", color:"#fff", fontSize:12, outline:"none" }}/>
                  <button onClick={sendMsg} style={{ background:"#1A6B8A", color:"#fff", border:"none",
                    borderRadius:6, padding:"8px 12px", cursor:"pointer", fontSize:13 }}>➤</button>
                </div>
              </div>
            )}
          </div>
          {/* Controls */}
          <div style={{ display:"flex", justifyContent:"center", gap:10, padding:"16px 12px",
            background:"#0D1F2D", flexWrap:"wrap" }}>
            {[
              { icon:mic?"🎤":"🔇", label:mic?"Mute":"Unmute", fn:toggleMic, active:mic },
              { icon:cam?"📷":"🚫", label:cam?"Cam Off":"Cam On", fn:toggleCam, active:cam },
              { icon:"💬", label:"Chat", fn:()=>setChatOpen(c=>!c), active:chatOpen },
            ].map(c=>(
              <button key={c.label} onClick={c.fn} style={{
                background:c.active?"rgba(26,107,138,0.4)":"rgba(255,255,255,0.08)",
                border:`1px solid ${c.active?"#1A6B8A":"rgba(255,255,255,0.1)"}`,
                borderRadius:10, padding:"10px 18px", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:4,
                fontSize:10, color:"#fff", fontWeight:600, minWidth:64
              }}>
                <span style={{ fontSize:22 }}>{c.icon}</span>{c.label}
              </button>
            ))}
            <button onClick={endCall} style={{ background:"#E05252", color:"#fff", border:"none",
              borderRadius:10, padding:"10px 24px", cursor:"pointer", fontSize:14, fontWeight:700 }}>
              📵 End Call
            </button>
          </div>
        </div>
      )}
      <style>{`@keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.4;}}`}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// DOCTOR PRESCRIPTION WRITER — generates downloadable Rx
// ─────────────────────────────────────────────────────────────
function DoctorPrescriptions({ surface, text, muted, dark, onSave }) {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [notes, setNotes] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [medicines, setMedicines] = useState([{ name:"", dose:"", duration:"", instructions:"" }]);

  const addMed = () => setMedicines([...medicines, { name:"", dose:"", duration:"", instructions:"" }]);
  const updMed = (i,k,v) => setMedicines(medicines.map((m,idx)=>idx===i?{...m,[k]:v}:m));
  const delMed = (i) => setMedicines(medicines.filter((_,idx)=>idx!==i));

  const handleSave = () => {
    if(!selectedPatient||!diagnosis) return;
    const rx = {
      id: Date.now(),
      doctor: "Dr. Priya Sharma",
      qualification:"MD, DM (Cardiology), AIIMS Delhi",
      hospital:"Kokilaben Dhirubhai Ambani Hospital, Mumbai",
      date: new Date().toISOString().split("T")[0],
      patient: selectedPatient,
      age: 32,
      diagnosis,
      medicines: medicines.filter(m=>m.name).map(m=>({
        name: m.name||"—", dose: m.dose||"—", duration: m.duration||"—", instructions: m.instructions||"—"
      })),
      notes: notes||"No additional notes.",
      followUp: followUp||"To be scheduled",
      regNo:"MCI-PS-99201"
    };
    downloadPrescription(rx);
    onSave(rx);
  };

  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 6px" }}>Write Prescription</h2>
      <p style={{ color:muted, fontSize:14, marginBottom:20 }}>Fill details below — the prescription will auto-generate as a print-ready PDF and be sent to the patient.</p>
      <div style={{ background:surface, borderRadius:14, padding:24, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:14, marginBottom:18 }}>
          <div>
            <label style={{ display:"block", fontSize:12, fontWeight:700, color:muted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Patient</label>
            <select style={inp(dark)} value={selectedPatient} onChange={e=>setSelectedPatient(e.target.value)}>
              <option value="">Select patient</option>
              {["Rohit Sharma","Priya Singh","Suresh Kumar","Anita Desai"].map(p=><option key={p}>{p}</option>)}
            </select>
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, fontWeight:700, color:muted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Diagnosis</label>
            <input value={diagnosis} onChange={e=>setDiagnosis(e.target.value)} placeholder="e.g. Hypertension Stage 1" style={inp(dark)}/>
          </div>
          <div>
            <label style={{ display:"block", fontSize:12, fontWeight:700, color:muted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Follow-up Date</label>
            <input type="date" value={followUp} onChange={e=>setFollowUp(e.target.value)} style={inp(dark)}/>
          </div>
        </div>

        {/* Medicines builder */}
        <div style={{ marginBottom:18 }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
            <label style={{ fontSize:12, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.05em" }}>💊 Medicines</label>
            <button onClick={addMed} style={{ background:"#EBF4FA", color:"#1A6B8A", border:"none", borderRadius:7, padding:"5px 14px", fontSize:12, fontWeight:700, cursor:"pointer" }}>+ Add Medicine</button>
          </div>
          {medicines.map((m,i)=>(
            <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1fr 1fr 1fr auto", gap:8, marginBottom:8, alignItems:"center" }}>
              <input value={m.name} onChange={e=>updMed(i,"name",e.target.value)} placeholder="Medicine name & strength" style={{ ...inp(dark), fontSize:13 }}/>
              <input value={m.dose} onChange={e=>updMed(i,"dose",e.target.value)} placeholder="Dose (e.g. BD)" style={{ ...inp(dark), fontSize:13 }}/>
              <input value={m.duration} onChange={e=>updMed(i,"duration",e.target.value)} placeholder="Duration" style={{ ...inp(dark), fontSize:13 }}/>
              <input value={m.instructions} onChange={e=>updMed(i,"instructions",e.target.value)} placeholder="Instructions" style={{ ...inp(dark), fontSize:13 }}/>
              {medicines.length>1 && <button onClick={()=>delMed(i)} style={{ background:"#FEF2F2", color:"#E05252", border:"none", borderRadius:6, padding:"8px 10px", cursor:"pointer", fontSize:13 }}>✕</button>}
            </div>
          ))}
        </div>

        <div style={{ marginBottom:18 }}>
          <label style={{ display:"block", fontSize:12, fontWeight:700, color:muted, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.05em" }}>Doctor's Notes & Instructions</label>
          <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
            placeholder="Diet advice, lifestyle changes, precautions..."
            style={{ ...inp(dark), resize:"vertical", boxSizing:"border-box" }}/>
        </div>

        <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
          <button onClick={handleSave} style={{ background:"linear-gradient(135deg,#1A6B8A,#2ECC8F)", color:"#fff", border:"none",
            padding:"13px 28px", borderRadius:9, fontSize:14, fontWeight:700, cursor:"pointer",
            display:"flex", alignItems:"center", gap:8
          }}>
            <span style={{ fontSize:16 }}>⬇</span> Save & Download Prescription PDF
          </button>
          <button onClick={handleSave} style={{ background:"#EBF4FA", color:"#1A6B8A", border:"none", padding:"13px 20px", borderRadius:9, fontSize:14, fontWeight:600, cursor:"pointer" }}>
            📤 Send to Patient
          </button>
        </div>
      </div>
    </div>
  );
}

const PATIENT_HISTORIES = {
  "Rohit Sharma": {
    age:28, gender:"Male", blood:"B+", city:"Mumbai", phone:"9876543210", abha:"14-3456-7890-1234",
    allergies:"Penicillin", conditions:["URTI","Seasonal Allergies"],
    visits:[
      { date:"2026-06-08", doctor:"Dr. Kavitha Nair", specialty:"Pediatrics", diagnosis:"Acute URTI", notes:"Prescribed antibiotics. Advised rest.", fee:600 },
      { date:"2026-05-22", doctor:"Dr. Arjun Mehta", specialty:"Neurology", diagnosis:"Migraine without aura", notes:"Started Propranolol. Follow up in 4 weeks.", fee:1200 },
      { date:"2025-12-10", doctor:"Dr. Priya Sharma", specialty:"Cardiology", diagnosis:"Routine cardiac checkup", notes:"All parameters normal. Annual review advised.", fee:800 },
    ],
    vitals:{ bp:"118/76 mmHg", pulse:"72 bpm", weight:"68 kg", height:"175 cm", bmi:"22.2", temp:"98.4°F" }
  },
  "Priya Singh": {
    age:34, gender:"Female", blood:"A+", city:"Delhi", phone:"9811223344", abha:"14-9876-5432-1000",
    allergies:"Sulfa drugs", conditions:["Hypertension","Thyroid (Hypothyroid)"],
    visits:[
      { date:"2026-05-25", doctor:"Dr. Priya Sharma", specialty:"Cardiology", diagnosis:"Hypertension Stage 1", notes:"Started Amlodipine 5mg. Lifestyle modification advised.", fee:800 },
      { date:"2026-01-14", doctor:"Dr. Neha Gupta", specialty:"Endocrinology", diagnosis:"Hypothyroidism", notes:"Levothyroxine 50mcg. TFT repeat in 3 months.", fee:950 },
    ],
    vitals:{ bp:"142/90 mmHg", pulse:"80 bpm", weight:"62 kg", height:"162 cm", bmi:"23.6", temp:"98.6°F" }
  },
  "Suresh Kumar": {
    age:51, gender:"Male", blood:"O+", city:"Pune", phone:"9422001122", abha:"14-1111-2222-3333",
    allergies:"None known", conditions:["Chest Pain (under observation)","Diabetes Type 2"],
    visits:[
      { date:"2026-05-18", doctor:"Dr. Priya Sharma", specialty:"Cardiology", diagnosis:"Atypical chest pain", notes:"ECG normal. TMT scheduled. Advised low-fat diet.", fee:800 },
      { date:"2026-03-05", doctor:"Dr. Mohammed Rafi", specialty:"General Medicine", diagnosis:"Diabetes Type 2 – annual review", notes:"HbA1c 7.8%. Metformin dose increased.", fee:500 },
    ],
    vitals:{ bp:"132/84 mmHg", pulse:"78 bpm", weight:"82 kg", height:"168 cm", bmi:"29.1", temp:"98.2°F" }
  },
  "Anita Desai": {
    age:42, gender:"Female", blood:"AB+", city:"Mumbai", phone:"9920334455", abha:"14-4444-5555-6666",
    allergies:"Aspirin", conditions:["Diabetes Type 2","Obesity"],
    visits:[
      { date:"2026-05-10", doctor:"Dr. Mohammed Rafi", specialty:"General Medicine", diagnosis:"Diabetes management", notes:"HbA1c 6.9%. Continue Metformin. Diet chart given.", fee:500 },
      { date:"2025-11-20", doctor:"Dr. Priya Sharma", specialty:"Cardiology", diagnosis:"Routine cardiac screening", notes:"ECG normal. Advised weight management.", fee:800 },
    ],
    vitals:{ bp:"126/82 mmHg", pulse:"76 bpm", weight:"78 kg", height:"158 cm", bmi:"31.2", temp:"98.4°F" }
  },
};

function PatientRecordsTab({ surface, text, muted, dark }) {
  const [selected, setSelected] = useState(null);
  const patients = [
    { name:"Rohit Sharma", age:28, lastVisit:"2026-06-08", condition:"URTI", status:"stable", city:"Mumbai" },
    { name:"Priya Singh", age:34, lastVisit:"2026-05-25", condition:"Hypertension", status:"follow-up", city:"Delhi" },
    { name:"Suresh Kumar", age:51, lastVisit:"2026-05-18", condition:"Chest Pain", status:"monitor", city:"Pune" },
    { name:"Anita Desai", age:42, lastVisit:"2026-05-10", condition:"Diabetes Type 2", status:"stable", city:"Mumbai" },
  ];

  const hist = selected ? PATIENT_HISTORIES[selected.name] : null;

  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>Patient Records</h2>

      {/* Patient History Modal */}
      {selected && hist && (
        <div style={{ position:"fixed", inset:0, background:"rgba(13,31,45,0.7)", zIndex:1000,
          display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={()=>setSelected(null)}>
          <div style={{ background:dark?"#162837":"#fff", borderRadius:16, padding:0,
            maxWidth:680, width:"100%", maxHeight:"90vh", overflowY:"auto",
            boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }} onClick={e=>e.stopPropagation()}>
            {/* Modal header */}
            <div style={{ background:"linear-gradient(135deg,#1A6B8A,#0D4F6B)", padding:"20px 24px",
              display:"flex", justifyContent:"space-between", alignItems:"center", borderRadius:"16px 16px 0 0" }}>
              <div style={{ display:"flex", gap:12, alignItems:"center" }}>
                <Avatar initials={selected.name.split(" ").map(w=>w[0]).join("").substring(0,2)} size={48}/>
                <div>
                  <div style={{ color:"#fff", fontWeight:800, fontSize:18 }}>{selected.name}</div>
                  <div style={{ color:"rgba(255,255,255,0.7)", fontSize:13 }}>Age {hist.age} · {hist.gender} · Blood {hist.blood} · {hist.city}</div>
                </div>
              </div>
              <button onClick={()=>setSelected(null)} style={{ background:"rgba(255,255,255,0.15)", border:"none",
                color:"#fff", borderRadius:8, width:34, height:34, cursor:"pointer", fontSize:18 }}>×</button>
            </div>
            <div style={{ padding:"20px 24px" }}>
              {/* Vitals */}
              <div style={{ marginBottom:20 }}>
                <div style={{ fontSize:11, fontWeight:700, color:muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:10 }}>Last Recorded Vitals</div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
                  {Object.entries(hist.vitals).map(([k,v])=>(
                    <div key={k} style={{ background:dark?"#243B4E":"#F0F7FA", borderRadius:8, padding:"10px 12px" }}>
                      <div style={{ color:muted, fontSize:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>{k.toUpperCase()}</div>
                      <div style={{ color:text, fontWeight:700, fontSize:14, marginTop:3 }}>{v}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Conditions & Allergies */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:20 }}>
                <div style={{ background:"#FEF2F2", borderRadius:8, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#E05252", marginBottom:8, textTransform:"uppercase" }}>⚠ Known Allergies</div>
                  <div style={{ fontSize:13, color:"#0D2B3E", fontWeight:600 }}>{hist.allergies}</div>
                </div>
                <div style={{ background:"#EBF4FA", borderRadius:8, padding:"12px 14px" }}>
                  <div style={{ fontSize:11, fontWeight:700, color:"#1A6B8A", marginBottom:8, textTransform:"uppercase" }}>🩺 Conditions</div>
                  {hist.conditions.map(c=><div key={c} style={{ fontSize:12, color:"#0D2B3E", fontWeight:600, marginBottom:3 }}>• {c}</div>)}
                </div>
              </div>
              {/* Visit History */}
              <div>
                <div style={{ fontSize:11, fontWeight:700, color:muted, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:12 }}>Visit History ({hist.visits.length} visits)</div>
                {hist.visits.map((v,i)=>(
                  <div key={i} style={{ background:dark?"#243B4E":"#F8FBFD", borderRadius:10, padding:14,
                    marginBottom:10, borderLeft:"3px solid #1A6B8A" }}>
                    <div style={{ display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:6, marginBottom:6 }}>
                      <div>
                        <div style={{ fontWeight:700, color:text, fontSize:14 }}>{v.diagnosis}</div>
                        <div style={{ color:muted, fontSize:12 }}>{v.doctor} · {v.specialty}</div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <div style={{ color:muted, fontSize:12 }}>📅 {v.date}</div>
                        <div style={{ color:"#1A6B8A", fontWeight:700, fontSize:13 }}>₹{v.fee}</div>
                      </div>
                    </div>
                    <div style={{ background:dark?"#1A3A50":"#EBF4FA", borderRadius:6, padding:"8px 10px",
                      fontSize:12, color:text, lineHeight:1.6 }}>📋 {v.notes}</div>
                  </div>
                ))}
              </div>
              <div style={{ display:"flex", gap:10, marginTop:16 }}>
                <button onClick={()=>setSelected(null)} style={{ flex:1, background:"#1A6B8A", color:"#fff",
                  border:"none", padding:"11px", borderRadius:8, fontWeight:700, fontSize:14, cursor:"pointer" }}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {patients.map(p=>(
          <div key={p.name} style={{ background:surface, borderRadius:12, padding:20,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
            display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap", gap:12
          }}>
            <div style={{ display:"flex", gap:14, alignItems:"center" }}>
              <Avatar initials={p.name.split(" ").map(w=>w[0]).join("").substring(0,2)} size={44}/>
              <div>
                <div style={{ fontWeight:700, color:text, fontSize:15 }}>{p.name}</div>
                <div style={{ color:muted, fontSize:13 }}>Age {p.age} · {p.condition} · {p.city}</div>
                <div style={{ color:muted, fontSize:12, marginTop:2 }}>Last visit: {p.lastVisit}</div>
              </div>
            </div>
            <div style={{ display:"flex", gap:8, alignItems:"center" }}>
              <span style={{ background:p.status==="stable"?"#EBF8F4":p.status==="follow-up"?"#FFF7ED":"#FEF2F2",
                color:p.status==="stable"?"#2ECC8F":p.status==="follow-up"?"#F59E0B":"#E05252",
                padding:"4px 12px", borderRadius:20, fontSize:12, fontWeight:600, textTransform:"capitalize"
              }}>{p.status}</span>
              <button onClick={()=>setSelected(p)} style={{ background:"#1A6B8A", color:"#fff",
                border:"none", padding:"7px 16px", borderRadius:7, fontSize:12, fontWeight:700, cursor:"pointer" }}>
                👁 View History
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EarningsDashboard({ surface, text, muted, dark }) {
  const months = ["Jan","Feb","Mar","Apr","May","Jun"];
  const earn = [32000,41000,48000,38500,56000,64200];
  const maxE = Math.max(...earn);
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>Earnings Dashboard</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))", gap:14, marginBottom:22 }}>
        {[
          { label:"This Month",value:"₹64,200",icon:"💰",change:"+14.6%" },
          { label:"Total Earned",value:"₹2,79,700",icon:"📈",change:"+8.2%" },
          { label:"Avg Per Consult",value:"₹820",icon:"🩺",change:"+3.1%" },
          { label:"Pending Payout",value:"₹12,400",icon:"⏳",change:"" },
        ].map(s=>(
          <div key={s.label} style={{ background:surface, borderRadius:12, padding:16,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`
          }}>
            <div style={{ fontSize:22, marginBottom:8 }}>{s.icon}</div>
            <div style={{ fontSize:20, fontWeight:800, color:text }}>{s.value}</div>
            <div style={{ fontSize:11, color:muted, marginTop:4 }}>{s.label}</div>
            {s.change && <div style={{ color:"#2ECC8F", fontSize:11, fontWeight:700, marginTop:4 }}>{s.change}</div>}
          </div>
        ))}
      </div>
      <div style={{ background:surface, borderRadius:12, padding:24, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
        <h3 style={{ color:text, fontWeight:700, margin:"0 0 18px", fontSize:15 }}>Monthly Earnings (₹)</h3>
        <div style={{ display:"flex", alignItems:"flex-end", gap:14, height:140 }}>
          {months.map((m,i)=>(
            <div key={m} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
              <div style={{ fontSize:10, color:muted, fontWeight:700 }}>₹{(earn[i]/1000).toFixed(0)}k</div>
              <div style={{ width:"100%", borderRadius:"5px 5px 0 0", height:`${(earn[i]/maxE)*110}px`,
                background:i===5?"#1A6B8A":"rgba(26,107,138,0.35)"
              }}/>
              <div style={{ fontSize:11, color:muted }}>{m}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ADMIN DASHBOARD
// ─────────────────────────────────────────────────────────────
function AdminDashboard({ user, dark, onLogout }) {
  const [tab, setTab] = useState("analytics");
  const [toast, setToast] = useState(null);
  const surface = dark?"#162837":"#fff";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";

  const TABS = [
    { id:"analytics",icon:"📊",label:"Analytics" },
    { id:"doctors",icon:"🩺",label:"Doctors" },
    { id:"patients",icon:"👥",label:"Patients" },
    { id:"appointments",icon:"🗓️",label:"Appointments" },
    { id:"reports",icon:"📈",label:"Reports" },
    { id:"settings",icon:"⚙️",label:"Settings" },
  ];

  return (
    <div style={{ display:"flex", minHeight:"100vh", background:dark?"#0D1F2D":"#F0F7FA" }}>
      {toast && <Toast msg={toast} onClose={()=>setToast(null)}/>}
      <Sidebar tabs={TABS} active={tab} onChange={setTab} user={user} role="Admin" dark={dark} sideColor="#0D2B3E" onLogout={onLogout}/>
      <main style={{ flex:1, overflowY:"auto", padding:28, minWidth:0 }}>
        {tab==="analytics" && <AdminAnalytics surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="doctors" && <AdminDoctors surface={surface} text={text} muted={muted} dark={dark} onVerify={()=>setToast("Doctor verified!")}/>}
        {tab==="patients" && <AdminPatients surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="appointments" && <AdminAppointments surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="reports" && <AdminReports surface={surface} text={text} muted={muted} dark={dark}/>}
        {tab==="settings" && <AdminSettings surface={surface} text={text} muted={muted} dark={dark} onSave={()=>setToast("Settings saved!")}/>}
      </main>
    </div>
  );
}

function AdminAnalytics({ surface, text, muted, dark }) {
  const months=["Jan","Feb","Mar","Apr","May","Jun"];
  const appts=[1020,1240,1480,1180,1640,1842];
  const maxA=Math.max(...appts);
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 22px" }}>Analytics Overview</h2>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(190px,1fr))", gap:14, marginBottom:24 }}>
        {ADMIN_STATS.map(s=>(
          <div key={s.label} style={{ background:surface, borderRadius:12, padding:20,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, borderTop:`3px solid ${s.color}`
          }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
              <span style={{ fontSize:26 }}>{s.icon}</span>
              <span style={{ background:"#EBF8F4", color:"#2ECC8F", fontSize:11, fontWeight:700, padding:"3px 8px", borderRadius:20 }}>{s.change}</span>
            </div>
            <div style={{ fontSize:24, fontWeight:800, color:text }}>{s.value}</div>
            <div style={{ fontSize:13, color:muted, marginTop:4 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"2fr 1fr", gap:20 }}>
        <div style={{ background:surface, borderRadius:12, padding:22, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
          <h3 style={{ color:text, fontWeight:700, margin:"0 0 18px", fontSize:15 }}>Monthly Appointments – India</h3>
          <div style={{ display:"flex", alignItems:"flex-end", gap:12, height:130 }}>
            {months.map((m,i)=>(
              <div key={m} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:5 }}>
                <div style={{ fontSize:9, color:muted, fontWeight:700 }}>{appts[i]}</div>
                <div style={{ width:"100%", borderRadius:"4px 4px 0 0", height:`${(appts[i]/maxA)*100}px`,
                  background:i===5?"#1A6B8A":"rgba(26,107,138,0.35)"
                }}/>
                <div style={{ fontSize:10, color:muted }}>{m}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background:surface, borderRadius:12, padding:22, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}` }}>
          <h3 style={{ color:text, fontWeight:700, margin:"0 0 16px", fontSize:15 }}>Top Cities</h3>
          {[["Mumbai",32],["Delhi",24],["Bengaluru",18],["Chennai",12],["Others",14]].map(([city,pct])=>(
            <div key={city} style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:text, marginBottom:4 }}>
                <span style={{ fontWeight:600 }}>{city}</span><span style={{ color:muted }}>{pct}%</span>
              </div>
              <div style={{ background:dark?"#243B4E":"#E2EEF5", borderRadius:20, height:6 }}>
                <div style={{ width:`${pct}%`, height:6, borderRadius:20, background:"#1A6B8A" }}/>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminDoctors({ surface, text, muted, dark, onVerify }) {
  const [docs, setDocs] = useState(DOCTORS.map((d,i)=>({...d,verified:i%2===0})));
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
        <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:0 }}>Manage Doctors</h2>
        <span style={{ color:muted, fontSize:14 }}>{docs.length} registered doctors</span>
      </div>
      <div style={{ background:surface, borderRadius:12, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, overflow:"hidden" }}>
        {docs.map(d=>(
          <div key={d.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"14px 20px", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, flexWrap:"wrap", gap:10
          }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", flex:1, minWidth:0 }}>
              <Avatar initials={d.image} size={38}/>
              <div style={{ minWidth:0 }}>
                <div style={{ fontWeight:700, color:text, fontSize:14, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d.name}</div>
                <div style={{ color:muted, fontSize:12 }}>{d.specialty} · {d.location}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
              <StarRating rating={d.rating}/>
              <Badge status={d.verified?"verified":"unverified"}/>
              {!d.verified && (
                <button onClick={()=>{setDocs(docs.map(x=>x.id===d.id?{...x,verified:true}:x)); onVerify();}}
                  style={{ background:"#EBF8F4", color:"#2ECC8F", border:"none", padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>Verify</button>
              )}
              <button style={{ background:"#FEF2F2", color:"#E05252", border:"none", padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminPatients({ surface, text, muted, dark }) {
  const patients = [
    { name:"Rohit Sharma", city:"Mumbai", joined:"2025-01-12", appointments:5 },
    { name:"Priya Singh", city:"Delhi", joined:"2025-03-08", appointments:3 },
    { name:"Suresh Kumar", city:"Pune", joined:"2025-06-01", appointments:1 },
    { name:"Anita Desai", city:"Mumbai", joined:"2024-11-20", appointments:8 },
    { name:"Ramesh Gupta", city:"Jaipur", joined:"2025-02-14", appointments:4 },
  ];
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18 }}>
        <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:0 }}>Manage Patients</h2>
        <span style={{ color:muted, fontSize:14 }}>18,492 total (showing 5)</span>
      </div>
      <div style={{ background:surface, borderRadius:12, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, overflow:"hidden" }}>
        {patients.map(p=>(
          <div key={p.name} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"14px 20px", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, flexWrap:"wrap", gap:10
          }}>
            <div style={{ display:"flex", gap:12, alignItems:"center", flex:1 }}>
              <Avatar initials={p.name.split(" ").map(w=>w[0]).join("")} size={36}/>
              <div>
                <div style={{ fontWeight:700, color:text, fontSize:14 }}>{p.name}</div>
                <div style={{ color:muted, fontSize:12 }}>📍 {p.city} · Joined {p.joined}</div>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:10 }}>
              <span style={{ color:text, fontWeight:600, fontSize:13 }}>{p.appointments} visits</span>
              <Badge status="confirmed"/>
              <button style={{ background:"#EBF4FA", color:"#1A6B8A", border:"none", padding:"5px 12px", borderRadius:6, fontSize:11, fontWeight:700, cursor:"pointer" }}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminAppointments({ surface, text, muted, dark }) {
  const [selected, setSelected] = useState(null);
  const all=[
    { id:"APT001", patient:"Rohit Sharma", patientAge:28, patientPhone:"9876543210", patientCity:"Mumbai",
      doctor:"Dr. Priya Sharma", specialty:"Cardiology", hospital:"Kokilaben Dhirubhai Ambani Hospital",
      date:"Jun 18, 2026", time:"10:00 AM", status:"upcoming", fee:800, platform:49,
      reason:"Chest discomfort and shortness of breath during exercise",
      notes:"Patient requested follow-up after previous ECG. First-time cardiology consult." },
    { id:"APT002", patient:"Priya Singh", patientAge:34, patientPhone:"9811223344", patientCity:"Delhi",
      doctor:"Dr. Arjun Mehta", specialty:"Neurology", hospital:"AIIMS New Delhi",
      date:"Jun 18, 2026", time:"11:30 AM", status:"confirmed", fee:1200, platform:49,
      reason:"Recurring migraines for 3 months",
      notes:"Patient has tried OTC pain relief with partial response. Referred by GP." },
    { id:"APT003", patient:"Suresh Kumar", patientAge:51, patientPhone:"9422001122", patientCity:"Pune",
      doctor:"Dr. Kavitha Nair", specialty:"Pediatrics", hospital:"Manipal Hospital, Bengaluru",
      date:"Jun 17, 2026", time:"2:00 PM", status:"completed", fee:600, platform:49,
      reason:"Child (son, age 8) — fever and cough for 4 days",
      notes:"Consultation completed. Prescribed antibiotics. Follow-up in 1 week." },
    { id:"APT004", patient:"Anita Desai", patientAge:42, patientPhone:"9920334455", patientCity:"Mumbai",
      doctor:"Dr. Mohammed Rafi", specialty:"General Medicine", hospital:"Ruby Hall Clinic, Pune",
      date:"Jun 16, 2026", time:"4:00 PM", status:"cancelled", fee:500, platform:49,
      reason:"Annual health checkup",
      notes:"Patient cancelled 2 hours before appointment. Reason: personal emergency." },
    { id:"APT005", patient:"Ramesh Gupta", patientAge:58, patientPhone:"9414112233", patientCity:"Jaipur",
      doctor:"Dr. Sunita Agarwal", specialty:"Gynecology", hospital:"Santokba Durlabhji Memorial",
      date:"Jun 15, 2026", time:"9:00 AM", status:"completed", fee:750, platform:49,
      reason:"Spouse's gynecology follow-up after surgery",
      notes:"Consultation completed. Post-op recovery satisfactory." },
  ];

  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>Appointment Management</h2>

      {/* Details Modal */}
      {selected && (
        <div style={{ position:"fixed", inset:0, background:"rgba(13,31,45,0.72)", zIndex:1000,
          display:"flex", alignItems:"center", justifyContent:"center", padding:16 }} onClick={()=>setSelected(null)}>
          <div style={{ background:dark?"#162837":"#fff", borderRadius:16, maxWidth:600, width:"100%",
            maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.25)" }}
            onClick={e=>e.stopPropagation()}>
            {/* Header */}
            <div style={{ background:"linear-gradient(135deg,#1A6B8A,#0D4F6B)", padding:"18px 24px",
              borderRadius:"16px 16px 0 0", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <div>
                <div style={{ color:"#fff", fontWeight:800, fontSize:16 }}>Appointment Details</div>
                <div style={{ color:"rgba(255,255,255,0.65)", fontSize:12, marginTop:2 }}>ID: {selected.id}</div>
              </div>
              <button onClick={()=>setSelected(null)} style={{ background:"rgba(255,255,255,0.15)",
                border:"none", color:"#fff", borderRadius:8, width:32, height:32, cursor:"pointer", fontSize:17 }}>×</button>
            </div>
            <div style={{ padding:24 }}>
              {/* Status + fee */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:18, flexWrap:"wrap", gap:10 }}>
                <Badge status={selected.status}/>
                <div style={{ textAlign:"right" }}>
                  <div style={{ color:muted, fontSize:11 }}>Total Collected</div>
                  <div style={{ color:text, fontWeight:800, fontSize:20 }}>₹{selected.fee+selected.platform}</div>
                  <div style={{ color:muted, fontSize:11 }}>Consult ₹{selected.fee} + Platform ₹{selected.platform}</div>
                </div>
              </div>
              {/* Patient info */}
              <div style={{ background:dark?"#243B4E":"#F0F7FA", borderRadius:10, padding:14, marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#1A6B8A", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Patient Information</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[["Name",selected.patient],["Age",`${selected.patientAge} years`],["Phone",selected.patientPhone],["City",selected.patientCity]].map(([k,v])=>(
                    <div key={k}><div style={{ color:muted, fontSize:10, textTransform:"uppercase" }}>{k}</div>
                    <div style={{ color:text, fontWeight:700, fontSize:13, marginTop:2 }}>{v}</div></div>
                  ))}
                </div>
              </div>
              {/* Doctor info */}
              <div style={{ background:dark?"#243B4E":"#F0F7FA", borderRadius:10, padding:14, marginBottom:14 }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#1A6B8A", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Doctor & Schedule</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {[["Doctor",selected.doctor],["Specialty",selected.specialty],["Date",selected.date],["Time",selected.time]].map(([k,v])=>(
                    <div key={k}><div style={{ color:muted, fontSize:10, textTransform:"uppercase" }}>{k}</div>
                    <div style={{ color:text, fontWeight:700, fontSize:13, marginTop:2 }}>{v}</div></div>
                  ))}
                </div>
                <div style={{ marginTop:10 }}>
                  <div style={{ color:muted, fontSize:10, textTransform:"uppercase" }}>Hospital</div>
                  <div style={{ color:text, fontWeight:700, fontSize:13, marginTop:2 }}>🏥 {selected.hospital}</div>
                </div>
              </div>
              {/* Reason */}
              <div style={{ background:dark?"#0D2B3E":"#EBF4FA", borderRadius:8, padding:"12px 14px", marginBottom:10, borderLeft:"3px solid #1A6B8A" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#1A6B8A", marginBottom:5 }}>REASON FOR VISIT</div>
                <div style={{ fontSize:13, color:text, lineHeight:1.6 }}>{selected.reason}</div>
              </div>
              {/* Admin notes */}
              <div style={{ background:dark?"#243B4E":"#FFF7ED", borderRadius:8, padding:"12px 14px", borderLeft:"3px solid #F59E0B" }}>
                <div style={{ fontSize:11, fontWeight:700, color:"#F59E0B", marginBottom:5 }}>NOTES</div>
                <div style={{ fontSize:13, color:text, lineHeight:1.6 }}>{selected.notes}</div>
              </div>
              <button onClick={()=>setSelected(null)} style={{ width:"100%", background:"#1A6B8A", color:"#fff",
                border:"none", padding:"12px", borderRadius:8, fontWeight:700, fontSize:14, cursor:"pointer", marginTop:18 }}>Close</button>
            </div>
          </div>
        </div>
      )}

      <div style={{ background:surface, borderRadius:12, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, overflow:"hidden" }}>
        <div style={{ padding:"12px 20px", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
          display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr auto",
          fontSize:11, fontWeight:700, color:muted, textTransform:"uppercase", letterSpacing:"0.06em", gap:8 }}>
          <span>Patient</span><span>Doctor</span><span>Date & Time</span><span>Status</span><span>Action</span>
        </div>
        {all.map((a,i)=>(
          <div key={i} style={{ display:"grid", gridTemplateColumns:"2fr 1.5fr 1fr 1fr auto",
            padding:"14px 20px", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
            alignItems:"center", gap:8
          }}>
            <div>
              <div style={{ fontWeight:700, color:text, fontSize:14 }}>{a.patient}</div>
              <div style={{ color:muted, fontSize:11 }}>#{a.id}</div>
            </div>
            <div>
              <div style={{ color:text, fontSize:13, fontWeight:600 }}>{a.doctor}</div>
              <div style={{ color:muted, fontSize:11 }}>{a.specialty}</div>
            </div>
            <div style={{ color:muted, fontSize:12 }}>{a.date}<br/>{a.time}</div>
            <Badge status={a.status}/>
            <button onClick={()=>setSelected(a)} style={{ background:"#1A6B8A", color:"#fff",
              border:"none", padding:"7px 14px", borderRadius:6, fontSize:12, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
              👁 Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function generateReportHTML(title, tableHeaders, tableRows, summaryCards, notes) {
  const today = new Date().toLocaleDateString("en-IN",{day:"2-digit",month:"long",year:"numeric"});
  const rows = tableRows.map(r=>`<tr>${r.map(c=>`<td>${c}</td>`).join("")}</tr>`).join("");
  const cards = summaryCards.map(c=>`<div class="card"><div class="card-val">${c.val}</div><div class="card-lbl">${c.lbl}</div></div>`).join("");
  return `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{font-family:"Segoe UI",Arial,sans-serif;color:#0D2B3E;background:#fff;}
.page{max-width:900px;margin:0 auto;padding:40px 36px;}
.hdr{display:flex;justify-content:space-between;align-items:flex-start;
  padding-bottom:16px;border-bottom:3px solid #1A6B8A;margin-bottom:24px;}
.logo{font-size:22px;font-weight:800;color:#1A6B8A;} .logo span{color:#2ECC8F;}
.meta{text-align:right;font-size:12px;color:#888;line-height:1.8;}
h1{font-size:22px;font-weight:800;color:#1A6B8A;margin-bottom:6px;}
.sub{font-size:13px;color:#888;margin-bottom:24px;}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:28px;}
.card{background:#F0F7FA;border-radius:8px;padding:14px;border-top:3px solid #1A6B8A;}
.card-val{font-size:22px;font-weight:800;color:#0D2B3E;}
.card-lbl{font-size:11px;color:#6B8EA3;margin-top:4px;text-transform:uppercase;letter-spacing:.05em;}
table{width:100%;border-collapse:collapse;margin-bottom:24px;font-size:13px;}
th{background:#1A6B8A;color:#fff;padding:10px 14px;text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em;}
td{padding:10px 14px;border-bottom:1px solid #E2EEF5;vertical-align:top;}
tr:nth-child(even) td{background:#F8FBFD;}
.notes{background:#FFF7ED;border-left:4px solid #F59E0B;padding:14px 16px;border-radius:6px;font-size:13px;color:#555;line-height:1.7;}
.ftr{text-align:center;font-size:11px;color:#aaa;margin-top:28px;padding-top:14px;border-top:1px dashed #D1E8F0;}
@media print{@page{margin:1.5cm;}}
</style></head><body>
<div class="page">
<div class="hdr">
  <div><div class="logo">&#127973; Medi<span>Connect</span> India</div><div style="font-size:12px;color:#888;margin-top:4px;">admin@mediconnect.in</div></div>
  <div class="meta">Generated: ${today}<br>Report: ${title}<br>Period: June 2026</div>
</div>
<h1>${title}</h1>
<div class="sub">MediConnect India — Administrative Report · Confidential</div>
<div class="cards">${cards}</div>
<table><thead><tr>${tableHeaders.map(h=>`<th>${h}</th>`).join("")}</tr></thead><tbody>${rows}</tbody></table>
<div class="notes">&#9432; ${notes}</div>
<div class="ftr">MediConnect India · ABDM-Compliant · Generated on ${today} · For internal use only</div>
</div>
<script>window.onload=function(){window.print();}</script>
</body></html>`;
}

function downloadReport(type) {
  let html = "";
  if(type==="appointment") {
    html = generateReportHTML(
      "Appointment Summary Report – June 2026",
      ["Appt ID","Patient","Doctor","Specialty","Date","Time","Status","Fee (₹)"],
      [
        ["APT001","Rohit Sharma","Dr. Priya Sharma","Cardiology","Jun 18, 2026","10:00 AM","Upcoming","₹849"],
        ["APT002","Priya Singh","Dr. Arjun Mehta","Neurology","Jun 18, 2026","11:30 AM","Confirmed","₹1,249"],
        ["APT003","Suresh Kumar","Dr. Kavitha Nair","Pediatrics","Jun 17, 2026","2:00 PM","Completed","₹649"],
        ["APT004","Anita Desai","Dr. Mohammed Rafi","General Medicine","Jun 16, 2026","4:00 PM","Cancelled","₹0"],
        ["APT005","Ramesh Gupta","Dr. Sunita Agarwal","Gynecology","Jun 15, 2026","9:00 AM","Completed","₹799"],
        ["APT006","Deepak Rao","Dr. Vikram Bose","Psychiatry","Jun 14, 2026","3:00 PM","Completed","₹949"],
        ["APT007","Sunita Joshi","Dr. Anjali Verma","Orthopedics","Jun 13, 2026","1:00 PM","Completed","₹899"],
      ],
      [
        {val:"1,842",lbl:"Today's Appts"},{val:"1,392",lbl:"Completed"},{val:"284",lbl:"Cancelled"},{val:"₹28.4L",lbl:"Revenue MTD"}
      ],
      "This report covers all appointments registered on MediConnect India for June 2026. Cancelled appointments do not generate revenue. Data is ABDM-compliant and for internal administrative use only."
    );
  } else if(type==="revenue") {
    html = generateReportHTML(
      "Revenue Report – June 2026",
      ["Doctor","Specialty","City","Consultations","Avg Fee (₹)","Gross Revenue","Platform Fee","Net Payout"],
      [
        ["Dr. Priya Sharma","Cardiology","Mumbai","62","₹800","₹49,600","₹3,038","₹46,562"],
        ["Dr. Arjun Mehta","Neurology","Delhi","48","₹1,200","₹57,600","₹2,352","₹55,248"],
        ["Dr. Kavitha Nair","Pediatrics","Bengaluru","74","₹600","₹44,400","₹3,626","₹40,774"],
        ["Dr. Rajesh Iyer","Dermatology","Chennai","35","₹700","₹24,500","₹1,715","₹22,785"],
        ["Dr. Sunita Agarwal","Gynecology","Jaipur","56","₹750","₹42,000","₹2,744","₹39,256"],
        ["Dr. Vikram Bose","Psychiatry","Kolkata","29","₹900","₹26,100","₹1,421","₹24,679"],
        ["Dr. Mohammed Rafi","General Medicine","Pune","88","₹500","₹44,000","₹4,312","₹39,688"],
        ["TOTAL","—","All Cities","392","₹788 avg","₹2,87,200","₹19,208","₹2,67,992"],
      ],
      [
        {val:"₹2,87,200",lbl:"Gross Revenue"},{val:"₹2,67,992",lbl:"Doctor Payouts"},{val:"₹19,208",lbl:"Platform Earnings"},{val:"392",lbl:"Total Consults"}
      ],
      "Revenue figures are pre-GST. Platform fee is ₹49 per consultation. Doctor payouts are processed within 3 business days of consultation completion. UPI: mediconnect@icici"
    );
  } else if(type==="doctor") {
    html = generateReportHTML(
      "Doctor Performance Report – June 2026",
      ["Doctor","Specialty","Rating","Reviews","Consultations","Response Rate","Cancellations","Status"],
      [
        ["Dr. Priya Sharma","Cardiology","⭐ 4.9","412","62","98%","2","Verified"],
        ["Dr. Arjun Mehta","Neurology","⭐ 4.9","318","48","96%","1","Verified"],
        ["Dr. Kavitha Nair","Pediatrics","⭐ 4.8","556","74","99%","0","Verified"],
        ["Dr. Rajesh Iyer","Dermatology","⭐ 4.7","289","35","94%","3","Verified"],
        ["Dr. Sunita Agarwal","Gynecology","⭐ 4.8","374","56","97%","1","Verified"],
        ["Dr. Vikram Bose","Psychiatry","⭐ 4.6","201","29","92%","2","Verified"],
        ["Dr. Mohammed Rafi","General Med","⭐ 4.7","488","88","98%","0","Verified"],
      ],
      [
        {val:"4.77",lbl:"Avg Rating"},{val:"97%",lbl:"Acceptance Rate"},{val:"92%",lbl:"Patient Satisfaction"},{val:"7/12",lbl:"Verified Doctors"}
      ],
      "Doctor performance is measured across ratings, response rate, cancellations, and patient feedback. Doctors with rating below 4.0 or cancellation rate above 15% are flagged for review."
    );
  } else if(type==="patient") {
    html = generateReportHTML(
      "Patient Activity Report – June 2026",
      ["Patient","City","Joined","Total Visits","Last Visit","ABHA Linked","Status"],
      [
        ["Rohit Sharma","Mumbai","Jan 12, 2025","5","Jun 08, 2026","Yes","Active"],
        ["Priya Singh","Delhi","Mar 08, 2025","3","May 25, 2026","Yes","Active"],
        ["Suresh Kumar","Pune","Jun 01, 2025","1","May 18, 2026","No","Active"],
        ["Anita Desai","Mumbai","Nov 20, 2024","8","May 10, 2026","Yes","Active"],
        ["Ramesh Gupta","Jaipur","Feb 14, 2025","4","Jun 15, 2026","Yes","Active"],
        ["Deepak Rao","Chennai","Apr 05, 2025","2","Jun 14, 2026","No","Active"],
        ["Sunita Joshi","Bengaluru","Jul 18, 2024","11","Jun 13, 2026","Yes","Active"],
        ["Karan Mehta","Hyderabad","Sep 30, 2025","1","Jun 12, 2026","Yes","New"],
      ],
      [
        {val:"18,492",lbl:"Total Patients"},{val:"1,284",lbl:"New This Month"},{val:"68%",lbl:"ABHA-Linked"},{val:"4.2",lbl:"Avg Visits / User"}
      ],
      "Patient activity tracks all registered users on MediConnect India. ABHA linkage is encouraged for seamless health record portability. Data is ABDM-compliant and handled per IT Act 2000."
    );
  }
  const blob = new Blob([html],{type:"text/html;charset=utf-8"});
  const url = URL.createObjectURL(blob);
  try {
    const tab = window.open(url,"_blank");
    if(tab){ setTimeout(()=>URL.revokeObjectURL(url),60000); return; }
  } catch(e){}
  const a = document.createElement("a");
  a.href=url; a.download=`MediConnect_${type}_report_Jun2026.html`;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  setTimeout(()=>URL.revokeObjectURL(url),5000);
}

function AdminReports({ surface, text, muted, dark }) {
  const [downloading, setDownloading] = useState(null);
  const reports = [
    { id:"appointment", title:"Appointment Summary", desc:"Monthly breakdown of all appointments by status, specialty and city across India.", icon:"📅", color:"#1A6B8A" },
    { id:"revenue",     title:"Revenue Report",       desc:"Detailed ₹ earnings per doctor, city, platform fees, and net payouts.", icon:"💰", color:"#2ECC8F" },
    { id:"doctor",      title:"Doctor Performance",   desc:"Ratings, response rates, consultation counts and review metrics.", icon:"🩺", color:"#8B5CF6" },
    { id:"patient",     title:"Patient Activity",     desc:"Registrations, visit frequency, ABHA linkage and active user stats.", icon:"👥", color:"#F59E0B" },
  ];
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 8px" }}>Reports</h2>
      <p style={{ color:muted, fontSize:13, marginBottom:22 }}>Click Download to open a print-ready report. Use browser Print → Save as PDF to save locally.</p>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))", gap:18 }}>
        {reports.map(r=>(
          <div key={r.id} style={{ background:surface, borderRadius:14, padding:24,
            border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, borderTop:`3px solid ${r.color}` }}>
            <div style={{ fontSize:32, marginBottom:12 }}>{r.icon}</div>
            <h4 style={{ color:text, fontWeight:700, margin:"0 0 6px", fontSize:15 }}>{r.title}</h4>
            <p style={{ color:muted, fontSize:13, lineHeight:1.55, margin:"0 0 18px" }}>{r.desc}</p>
            <button
              onClick={()=>{ setDownloading(r.id); downloadReport(r.id); setTimeout(()=>setDownloading(null),2000); }}
              style={{ background:downloading===r.id?"#0D4F6B":"#1A6B8A", color:"#fff", border:"none",
                padding:"10px 20px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer",
                display:"flex", alignItems:"center", gap:8, width:"100%", justifyContent:"center" }}>
              {downloading===r.id ? "⏳ Opening…" : "⬇ Download PDF"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdminSettings({ surface, text, muted, dark, onSave }) {
  const [s, setS] = useState({ siteName:"MediConnect India", supportEmail:"support@mediconnect.in", upiId:"mediconnect@icici", emailNotif:true, smsNotif:true, autoVerify:false, maintenance:false });
  const Toggle = ({ val, on }) => (
    <div onClick={on} style={{ width:42, height:23, borderRadius:12, background:val?"#2ECC8F":"#ccc", position:"relative", cursor:"pointer", transition:"background 0.2s", flexShrink:0 }}>
      <div style={{ position:"absolute", top:3, left:val?21:3, width:17, height:17, borderRadius:"50%", background:"#fff", transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.3)" }}/>
    </div>
  );
  return (
    <div>
      <h2 style={{ color:text, fontWeight:800, fontSize:22, margin:"0 0 18px" }}>System Settings</h2>
      <div style={{ background:surface, borderRadius:12, padding:22, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, marginBottom:16 }}>
        <h3 style={{ color:text, fontWeight:700, margin:"0 0 14px", fontSize:15 }}>Platform Settings</h3>
        {[["Platform Name","siteName"],["Support Email","supportEmail"],["UPI ID","upiId"]].map(([lbl,key])=>(
          <div key={key} style={{ marginBottom:14 }}>
            <label style={{ display:"block", fontSize:12, fontWeight:600, color:muted, marginBottom:5, textTransform:"uppercase" }}>{lbl}</label>
            <input value={s[key]} onChange={e=>setS({...s,[key]:e.target.value})} style={inp(dark)}/>
          </div>
        ))}
      </div>
      <div style={{ background:surface, borderRadius:12, padding:22, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, marginBottom:16 }}>
        <h3 style={{ color:text, fontWeight:700, margin:"0 0 14px", fontSize:15 }}>Feature Toggles</h3>
        {[
          ["Email Notifications","emailNotif","Send automated email alerts to users"],
          ["SMS / WhatsApp Alerts","smsNotif","Send SMS and WhatsApp reminders"],
          ["Auto-verify Doctors","autoVerify","Skip manual MCI verification step"],
          ["Maintenance Mode","maintenance","Restrict platform to admin access only"],
        ].map(([lbl,key,desc])=>(
          <div key={key} style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
            padding:"12px 0", borderBottom:`1px solid ${dark?"#243B4E":"#E2EEF5"}`
          }}>
            <div>
              <div style={{ color:text, fontWeight:600, fontSize:14 }}>{lbl}</div>
              <div style={{ color:muted, fontSize:12 }}>{desc}</div>
            </div>
            <Toggle val={s[key]} on={()=>setS({...s,[key]:!s[key]})}/>
          </div>
        ))}
      </div>
      <button onClick={onSave} style={{ background:"#1A6B8A", color:"#fff", border:"none", padding:"12px 28px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer" }}>Save Settings</button>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HOME PAGE
// ─────────────────────────────────────────────────────────────
function HomePage({ onNavigate, dark }) {
  const bg = dark?"#0D1F2D":"#fff";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";
  const surface = dark?"#162837":"#F0F7FA";
  return (
    <div style={{ background:bg, color:text, minHeight:"100vh" }}>
      {/* Hero */}
      <div style={{ background:"linear-gradient(135deg,#1A6B8A 0%,#0D4F6B 55%,#2ECC8F 100%)",
        padding:"80px 24px 90px", textAlign:"center", position:"relative", overflow:"hidden"
      }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 15% 85%, rgba(46,204,143,0.18) 0%, transparent 50%), radial-gradient(circle at 85% 15%, rgba(255,255,255,0.05) 0%, transparent 50%)" }}/>
        <div style={{ position:"relative", zIndex:1 }}>
          <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:"rgba(46,204,143,0.2)", border:"1px solid rgba(46,204,143,0.4)", borderRadius:20, padding:"6px 16px", marginBottom:22, fontSize:13, color:"#2ECC8F" }}>
            🇮🇳 India's trusted online healthcare platform
          </div>
          <h1 style={{ fontSize:"clamp(2rem,5vw,3.4rem)", fontWeight:800, color:"#fff", lineHeight:1.15, margin:"0 0 18px", maxWidth:780, marginInline:"auto", letterSpacing:"-0.02em" }}>
            Doctor Consultations,<br/><span style={{ color:"#2ECC8F" }}>Right at Your Fingertips</span>
          </h1>
          <p style={{ fontSize:"clamp(0.95rem,2vw,1.15rem)", color:"rgba(255,255,255,0.8)", maxWidth:540, margin:"0 auto 38px", lineHeight:1.75 }}>
            Book appointments with verified Indian specialists. Consult online in Hindi, Tamil, Telugu and more. Get digital prescriptions instantly.
          </p>
          <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>onNavigate("register")} style={{ background:"#2ECC8F", color:"#fff", border:"none", padding:"14px 32px", borderRadius:10, fontSize:16, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px rgba(46,204,143,0.4)" }}>Get Started Free</button>
            <button onClick={()=>onNavigate("doctors")} style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"1px solid rgba(255,255,255,0.3)", padding:"14px 32px", borderRadius:10, fontSize:16, fontWeight:600, cursor:"pointer" }}>Browse Doctors</button>
          </div>
          <div style={{ display:"flex", gap:36, justifyContent:"center", marginTop:52, flexWrap:"wrap" }}>
            {[["18,000+","Patients Served"],["384+","Expert Doctors"],["25+","Indian Cities"],["10+","Languages"]].map(([v,l])=>(
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontSize:"clamp(1.3rem,3vw,1.9rem)", fontWeight:800, color:"#fff" }}>{v}</div>
                <div style={{ fontSize:13, color:"rgba(255,255,255,0.62)", marginTop:4 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Search */}
      <div style={{ background:dark?"#162837":"#fff", padding:"0 24px" }}>
        <div style={{ maxWidth:860, margin:"0 auto", background:dark?"#1A2F3F":"#fff",
          borderRadius:16, padding:20, boxShadow:"0 8px 40px rgba(26,107,138,0.12)",
          transform:"translateY(-40px)", display:"grid", gridTemplateColumns:"1fr 1fr auto", gap:12,
          border:dark?"1px solid #243B4E":"none"
        }}>
          <select style={{ padding:"12px 14px", borderRadius:8, border:"1px solid #D1E8F0", fontSize:14, color:dark?"#E2EEF5":"#0D2B3E", background:dark?"#243B4E":"#F0F7FA" }}>
            <option>🔬 Select Specialty</option>
            {SPECIALTIES.slice(1).map(s=><option key={s}>{s}</option>)}
          </select>
          <select style={{ padding:"12px 14px", borderRadius:8, border:"1px solid #D1E8F0", fontSize:14, color:dark?"#E2EEF5":"#0D2B3E", background:dark?"#243B4E":"#F0F7FA" }}>
            <option>📍 Select City</option>
            {INDIAN_CITIES.slice(1).map(c=><option key={c}>{c}</option>)}
          </select>
          <button onClick={()=>onNavigate("doctors")} style={{ background:"#1A6B8A", color:"#fff", border:"none", padding:"12px 22px", borderRadius:8, fontSize:14, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>Search</button>
        </div>
      </div>

      {/* Specialties */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px 60px" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <p style={{ color:"#2ECC8F", fontWeight:600, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase" }}>BROWSE BY SPECIALTY</p>
          <h2 style={{ fontSize:"clamp(1.5rem,3vw,2rem)", fontWeight:800, color:text, margin:"8px 0" }}>Find the Right Specialist</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(120px,1fr))", gap:14 }}>
          {[["❤️","Cardiology"],["🧠","Neurology"],["👶","Pediatrics"],["🦷","Dermatology"],["🦴","Orthopedics"],["🔬","Oncology"],["👁️","Ophthalmology"],["🫁","Pulmonology"]].map(([icon,name])=>(
            <div key={name} onClick={()=>onNavigate("doctors")} style={{ background:surface, borderRadius:12, padding:"18px 10px", textAlign:"center", cursor:"pointer", border:dark?"1px solid #243B4E":"1px solid #E2EEF5", transition:"all 0.2s" }}
            onMouseOver={e=>e.currentTarget.style.borderColor="#1A6B8A"}
            onMouseOut={e=>e.currentTarget.style.borderColor=dark?"#243B4E":"#E2EEF5"}>
              <div style={{ fontSize:26, marginBottom:8 }}>{icon}</div>
              <div style={{ fontSize:12, fontWeight:600, color:text }}>{name}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Doctors */}
      <div style={{ background:dark?"#0A1A27":"#F0F7FA", padding:"60px 24px" }}>
        <div style={{ maxWidth:1100, margin:"0 auto" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:28, flexWrap:"wrap", gap:10 }}>
            <div>
              <p style={{ color:"#2ECC8F", fontWeight:600, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase", margin:0 }}>TOP RATED</p>
              <h2 style={{ fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, color:text, margin:"4px 0 0" }}>Featured Indian Doctors</h2>
            </div>
            <button onClick={()=>onNavigate("doctors")} style={{ background:"none", border:"1px solid #1A6B8A", color:"#1A6B8A", padding:"8px 18px", borderRadius:8, cursor:"pointer", fontWeight:600, fontSize:14 }}>View All →</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(290px,1fr))", gap:20 }}>
            {DOCTORS.slice(0,3).map(d=><DoctorCard key={d.id} doctor={d} onBook={()=>onNavigate("login")} dark={dark}/>)}
          </div>
        </div>
      </div>

      {/* Health Tips */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"60px 24px" }}>
        <div style={{ textAlign:"center", marginBottom:36 }}>
          <p style={{ color:"#2ECC8F", fontWeight:600, fontSize:12, letterSpacing:"0.1em", textTransform:"uppercase" }}>WELLNESS</p>
          <h2 style={{ fontSize:"clamp(1.4rem,3vw,1.9rem)", fontWeight:800, color:text, margin:"8px 0" }}>Daily Health Habits</h2>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:18 }}>
          {HEALTH_TIPS.map(t=>(
            <div key={t.title} style={{ background:surface, borderRadius:12, padding:22, border:dark?"1px solid #243B4E":"1px solid #E2EEF5" }}>
              <div style={{ fontSize:30, marginBottom:12 }}>{t.icon}</div>
              <h4 style={{ margin:"0 0 8px", color:text, fontSize:15, fontWeight:700 }}>{t.title}</h4>
              <p style={{ color:muted, fontSize:13, lineHeight:1.65, margin:0 }}>{t.tip}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background:"linear-gradient(135deg,#1A6B8A,#2ECC8F)", padding:"60px 24px", textAlign:"center" }}>
        <h2 style={{ fontSize:"clamp(1.5rem,3vw,2.2rem)", fontWeight:800, color:"#fff", margin:"0 0 14px" }}>India's Health Is Our Priority</h2>
        <p style={{ color:"rgba(255,255,255,0.85)", fontSize:15, marginBottom:28 }}>Join 18,000+ patients already using MediConnect across India</p>
        <button onClick={()=>onNavigate("register")} style={{ background:"#fff", color:"#1A6B8A", border:"none", padding:"15px 38px", borderRadius:10, fontSize:16, fontWeight:800, cursor:"pointer", boxShadow:"0 4px 20px rgba(0,0,0,0.15)" }}>Create Free Account 🇮🇳</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────
function Navbar({ page, onNavigate, user, onLogout, dark, onToggleDark }) {
  if(["patient","doctor","admin"].includes(page)) return null;
  return (
    <nav style={{ background:dark?"#0D2B3E":"#fff",
      borderBottom:`1px solid ${dark?"#1A3A50":"#E2EEF5"}`,
      padding:"0 24px", display:"flex", alignItems:"center", justifyContent:"space-between",
      height:60, position:"sticky", top:0, zIndex:100,
      boxShadow:"0 2px 8px rgba(26,107,138,0.08)"
    }}>
      <button onClick={()=>onNavigate("home")} style={{ background:"none", border:"none", cursor:"pointer",
        display:"flex", alignItems:"center", gap:8, fontWeight:800, fontSize:18,
        color:dark?"#E2EEF5":"#0D2B3E"
      }}>
        <span style={{ fontSize:22 }}>🏥</span> MediConnect
        <span style={{ fontSize:11, color:"#2ECC8F", fontWeight:700, marginLeft:2 }}>India</span>
      </button>
      <div style={{ display:"flex", gap:24, alignItems:"center" }}>
        {[["home","Home"],["doctors","Find Doctors"],["about","About"]].map(([p,l])=>(
          <button key={p} onClick={()=>onNavigate(p)} style={{ background:"none", border:"none", cursor:"pointer",
            fontSize:14, color:page===p?"#1A6B8A":dark?"#8EAFC0":"#6B8EA3", fontWeight:page===p?700:500
          }}>{l}</button>
        ))}
      </div>
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <button onClick={onToggleDark} style={{ background:dark?"#1A3A50":"#F0F7FA", border:"none",
          borderRadius:20, padding:"6px 12px", cursor:"pointer", fontSize:13,
          color:dark?"#E2EEF5":"#6B8EA3"
        }}>{dark?"☀️":"🌙"}</button>
        {user ? (
          <>
            <button onClick={()=>onNavigate(user.role)} style={{ background:"#EBF4FA", color:"#1A6B8A", border:"none", padding:"7px 16px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>Dashboard</button>
            <button onClick={onLogout} style={{ background:"none", border:"1px solid #D1E8F0", color:"#6B8EA3", padding:"7px 14px", borderRadius:8, fontSize:13, cursor:"pointer" }}>Sign Out</button>
          </>
        ) : (
          <>
            <button onClick={()=>onNavigate("login")} style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:dark?"#8EAFC0":"#6B8EA3", fontWeight:600 }}>Sign In</button>
            <button onClick={()=>onNavigate("register")} style={{ background:"#1A6B8A", color:"#fff", border:"none", padding:"8px 18px", borderRadius:8, fontSize:13, fontWeight:700, cursor:"pointer" }}>Get Started</button>
          </>
        )}
      </div>
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────
// AI CHATBOT
// ─────────────────────────────────────────────────────────────
function AIChatbot({ dark, onClose }) {
  const [messages, setMessages] = useState([
    { role:"assistant", text:"नमस्ते! 👋 I'm MediBot, your AI health assistant. Ask me about symptoms, which specialist to see, or how to book an appointment. I can help in English and Hindi!" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const surface = dark?"#162837":"#fff";
  const bg = dark?"#0D1F2D":"#F0F7FA";
  const text = dark?"#E2EEF5":"#0D2B3E";
  const muted = dark?"#6B8EA3":"#6B8EA3";

  useEffect(()=>{ endRef.current?.scrollIntoView({behavior:"smooth"}); },[messages]);

  const send = async () => {
    if(!input.trim()||loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages(m=>[...m,{role:"user",text:userMsg}]);
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          model:"claude-sonnet-4-6",
          max_tokens:1000,
          system:"You are MediBot, an AI health assistant for MediConnect India — India's leading online healthcare platform. You help Indian users understand symptoms, suggest the right specialist to consult, share wellness tips relevant to India (monsoon health, summer precautions, common Indian diseases), and guide them through booking appointments. You can respond in English or Hindi as needed. Always recommend consulting a qualified MBBS/MD doctor. Never definitively diagnose. Mention relevant Indian healthcare context (ABHA, Ayushman Bharat, etc.) when helpful. Be warm, concise, and empathetic.",
          messages:[
            ...messages.map(m=>({role:m.role==="assistant"?"assistant":"user",content:m.text})),
            {role:"user",content:userMsg}
          ]
        })
      });
      const data = await res.json();
      const reply = data.content?.map(c=>c.text||"").join("")||"Sorry, I couldn't process that. Please try again.";
      setMessages(m=>[...m,{role:"assistant",text:reply}]);
    } catch {
      setMessages(m=>[...m,{role:"assistant",text:"Connection issue. Please try again shortly."}]);
    }
    setLoading(false);
  };

  return (
    <div style={{ position:"fixed", bottom:90, right:24, zIndex:1000, width:340, height:490,
      background:surface, borderRadius:16, boxShadow:"0 20px 60px rgba(0,0,0,0.2)",
      display:"flex", flexDirection:"column", overflow:"hidden",
      border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`
    }}>
      <div style={{ background:"linear-gradient(135deg,#1A6B8A,#2ECC8F)", padding:"13px 18px",
        display:"flex", justifyContent:"space-between", alignItems:"center"
      }}>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <span style={{ fontSize:20 }}>🤖</span>
          <div>
            <div style={{ color:"#fff", fontWeight:700, fontSize:14 }}>MediBot AI</div>
            <div style={{ color:"rgba(255,255,255,0.72)", fontSize:11 }}>Health Assistant · 🇮🇳 India</div>
          </div>
        </div>
        <button onClick={onClose} style={{ background:"none", border:"none", color:"#fff", cursor:"pointer", fontSize:18 }}>×</button>
      </div>
      <div style={{ flex:1, overflowY:"auto", padding:14, background:bg, display:"flex", flexDirection:"column", gap:10 }}>
        {messages.map((m,i)=>(
          <div key={i} style={{ display:"flex", justifyContent:m.role==="user"?"flex-end":"flex-start" }}>
            <div style={{ maxWidth:"84%", padding:"10px 13px",
              borderRadius:m.role==="user"?"14px 14px 2px 14px":"14px 14px 14px 2px",
              background:m.role==="user"?"#1A6B8A":surface,
              color:m.role==="user"?"#fff":text, fontSize:13, lineHeight:1.55,
              boxShadow:"0 1px 4px rgba(0,0,0,0.06)",
              border:m.role==="assistant"?`1px solid ${dark?"#243B4E":"#E2EEF5"}`:undefined
            }}>{m.text}</div>
          </div>
        ))}
        {loading && <div style={{ display:"flex", justifyContent:"flex-start" }}>
          <div style={{ background:surface, border:`1px solid ${dark?"#243B4E":"#E2EEF5"}`,
            borderRadius:"14px 14px 14px 2px", padding:"10px 14px", fontSize:16
          }}>💭</div>
        </div>}
        <div ref={endRef}/>
      </div>
      <div style={{ padding:"10px 12px", background:surface, borderTop:`1px solid ${dark?"#243B4E":"#E2EEF5"}`, display:"flex", gap:8 }}>
        <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==="Enter"&&send()}
          placeholder="Ask in English or Hindi..."
          style={{ flex:1, padding:"9px 12px", borderRadius:8, border:`1px solid ${dark?"#2A4A5E":"#D1E8F0"}`,
            fontSize:13, background:dark?"#243B4E":"#F8FBFD", color:text, outline:"none", fontFamily:"inherit"
          }}/>
        <button onClick={send} disabled={!input.trim()||loading} style={{ background:input.trim()&&!loading?"#1A6B8A":"#ccc",
          color:"#fff", border:"none", borderRadius:8, padding:"9px 14px",
          cursor:input.trim()&&!loading?"pointer":"not-allowed", fontSize:14
        }}>➤</button>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// ROOT APP
// ─────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [authMode, setAuthMode] = useState("login");
  const [user, setUser] = useState(null);
  const [dark, setDark] = useState(false);
  const [chat, setChat] = useState(false);

  const navigate = (p) => {
    if(p==="login"||p==="register"){ setAuthMode(p==="register"?"register":"login"); setPage("auth"); return; }
    setPage(p);
  };

  return (
    <div style={{ fontFamily:"'Inter',-apple-system,BlinkMacSystemFont,sans-serif", minHeight:"100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
        *{box-sizing:border-box;margin:0;padding:0;}
        input,select,textarea,button{font-family:inherit;}
        ::-webkit-scrollbar{width:5px;height:5px;}
        ::-webkit-scrollbar-thumb{background:#1A6B8A44;border-radius:3px;}
        @keyframes slideIn{from{opacity:0;transform:translateX(20px);}to{opacity:1;transform:none;}}
        @media(max-width:640px){.hide-mobile{display:none!important;}.show-mobile-flex{display:flex!important;}}
      `}</style>

      <Navbar page={page} onNavigate={navigate} user={user} onLogout={()=>{setUser(null);setPage("home");}} dark={dark} onToggleDark={()=>setDark(!dark)}/>

      {page==="home" && <HomePage onNavigate={navigate} dark={dark}/>}
      {page==="doctors" && <DoctorsPage onBook={()=>navigate("login")} dark={dark}/>}
      {page==="about" && (
        <div style={{ minHeight:"100vh", background:dark?"#0D1F2D":"#F0F7FA", padding:"60px 24px", textAlign:"center" }}>
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div style={{ fontSize:56, marginBottom:18 }}>🏥</div>
            <h1 style={{ fontSize:34, fontWeight:800, color:dark?"#E2EEF5":"#0D2B3E", margin:"0 0 14px" }}>About MediConnect India</h1>
            <p style={{ color:"#6B8EA3", lineHeight:1.8, fontSize:15 }}>MediConnect is India's modern telemedicine platform, bridging the gap between patients and doctors across the country. From Mumbai to Thiruvananthapuram, from AIIMS-trained specialists to local GPs — quality healthcare is now just a tap away.</p>
          </div>
        </div>
      )}
      {page==="auth" && (
        <AuthPage mode={authMode} onAuth={u=>{setUser(u);setPage(u.role);}} onToggle={()=>setAuthMode(authMode==="login"?"register":"login")} dark={dark}/>
      )}
      {page==="patient" && user && <PatientDashboard user={user} onNavigate={(p)=>{ if(p==="logout"){ setUser(null); setPage("home"); } else navigate(p); }} dark={dark}/>}
      {page==="doctor"  && user && <DoctorDashboard  user={user} dark={dark} onLogout={()=>{ setUser(null); setPage("home"); }}/>}
      {page==="admin"   && user && <AdminDashboard   user={user} dark={dark} onLogout={()=>{ setUser(null); setPage("home"); }}/>}

      {/* Floating chatbot */}
      {!chat && (
        <button onClick={()=>setChat(true)} title="MediBot AI" style={{ position:"fixed", bottom:24, right:24, zIndex:999,
          background:"linear-gradient(135deg,#1A6B8A,#2ECC8F)", color:"#fff", border:"none",
          borderRadius:"50%", width:56, height:56, fontSize:24, cursor:"pointer",
          boxShadow:"0 4px 20px rgba(26,107,138,0.4)", display:"flex", alignItems:"center", justifyContent:"center"
        }}>🤖</button>
      )}
      {chat && <AIChatbot dark={dark} onClose={()=>setChat(false)}/>}

      {/* Dark toggle inside dashboards */}
      {["patient","doctor","admin"].includes(page) && (
        <button onClick={()=>setDark(!dark)} style={{ position:"fixed", bottom:24, left:24, zIndex:999,
          background:dark?"#1A3A50":"#F0F7FA", border:`1px solid ${dark?"#243B4E":"#D1E8F0"}`,
          borderRadius:20, padding:"8px 14px", cursor:"pointer", fontSize:13,
          color:dark?"#E2EEF5":"#6B8EA3", fontWeight:600
        }}>{dark?"☀️ Light":"🌙 Dark"}</button>
      )}
    </div>
  );
}
