// Phishing Awareness Training — quiz engine
// 10 scenario questions. Each has options, the index of the correct
// option, and an explanation shown after submitting.

const QUESTIONS = [
  {
    q: "You get an SMS: \"Your bank account will be blocked today. Update KYC now: bit.ly/kyc-update\". What do you do?",
    options: [
      "Click the link and update KYC quickly",
      "Ignore the link, open your bank's official app or visit the branch to check",
      "Reply to the SMS asking if it is genuine",
      "Forward it to friends to warn them by sharing the link"
    ],
    answer: 1,
    why: "Banks never ask you to update KYC through random short links. Always go through the official app or branch."
  },
  {
    q: "An email from \"HR\" asks you to log in to view your new salary slip. The link opens a page that looks exactly like your company login. First thing to check?",
    options: [
      "The page design — if it looks perfect, it is real",
      "Whether the site has a padlock icon",
      "The actual web address (URL) in the address bar",
      "How fast the page loads"
    ],
    answer: 2,
    why: "Phishing pages copy design perfectly and even have HTTPS padlocks. Only the real domain in the address bar gives them away."
  },
  {
    q: "A caller says he is from your bank's fraud team and needs the OTP you just received to \"cancel a suspicious transaction\". You should:",
    options: [
      "Share the OTP — he is trying to help",
      "Share only the first three digits",
      "Never share it — banks never ask for OTPs; hang up and call the bank's official number",
      "Ask him to call back later"
    ],
    answer: 2,
    why: "That OTP authorises the transaction itself. Sharing it completes the fraud. No bank ever asks for a full OTP."
  },
  {
    q: "Which of these email addresses is most likely fake?",
    options: [
      "support@amazon.in",
      "no-reply@hdfcbank.com",
      "alerts@sbi-secure-verify.xyz",
      "admissions@university.ac.in"
    ],
    answer: 2,
    why: "Look-alike domains with extra words and unusual endings (.xyz) are a classic phishing sign. Real alerts come from the bank's own domain."
  },
  {
    q: "You receive a WhatsApp message about a part-time job paying ₹5,000/day for liking videos, asking you to first pay a ₹1,000 \"registration fee\". This is:",
    options: [
      "A genuine work-from-home offer",
      "A task scam — the fee and later \"unlock\" payments are the trap",
      "Safe if they show a company ID card",
      "Fine as long as the first payment is small"
    ],
    answer: 1,
    why: "Task/job scams start small, show fake earnings, then demand bigger deposits. No real job asks you to pay to start."
  },
  {
    q: "Your friend's account messages you: \"I'm stuck abroad, urgently send ₹20,000 to this new number.\" Best action?",
    options: [
      "Send immediately — friends come first",
      "Verify through a voice/video call or another channel before sending anything",
      "Send half now and half after confirmation",
      "Ask them a question only your friend would know, in the same chat"
    ],
    answer: 1,
    why: "Accounts get hacked and used for exactly this. Verify on a separate channel — the hacker controls the hacked account's chat."
  },
  {
    q: "An email attachment named \"Invoice.pdf.exe\" arrives from an unknown sender. Opening it could:",
    options: [
      "Do nothing — PDFs are always safe",
      "Install malware — the real extension is .exe, a program",
      "Only be risky on Windows, not on phones",
      "Be safe if your antivirus is a year old"
    ],
    answer: 1,
    why: "Double extensions hide the true file type. An .exe disguised as a PDF is a common malware delivery trick."
  },
  {
    q: "Which password habit protects you most if one site gets breached?",
    options: [
      "One strong password used everywhere",
      "A unique password for every account, ideally with a password manager and 2FA",
      "Changing the same password slightly each month",
      "Using your birthdate with a special character"
    ],
    answer: 1,
    why: "Unique passwords contain the damage to one account. Reused passwords let one breach unlock everything (credential stuffing)."
  },
  {
    q: "A login page you reached from an email link asks for your username, password AND card CVV \"for verification\". This is:",
    options: [
      "Normal extra security",
      "Phishing — a login page never needs your CVV",
      "Safe if the page mentions the bank's name",
      "Required after password expiry"
    ],
    answer: 1,
    why: "CVV is only for purchases, never for login or verification. Any page asking for it outside checkout is stealing it."
  },
  {
    q: "You clicked a phishing link and typed your password before realising. What is the correct order of actions?",
    options: [
      "Wait and watch — nothing may happen",
      "Delete the email and forget it",
      "Change that password from a clean device, enable 2FA, sign out other sessions, and report it",
      "Post about it on social media first"
    ],
    answer: 2,
    why: "Attackers use stolen passwords within minutes. Change it fast from a clean device, lock down 2FA, and report — in India, cybercrime.gov.in or helpline 1930."
  }
];

const container = document.getElementById("quiz-container");
const resultBox = document.getElementById("quiz-result");

QUESTIONS.forEach((item, qi) => {
  const div = document.createElement("div");
  div.className = "question";
  const p = document.createElement("p");
  p.textContent = (qi + 1) + ". " + item.q;
  div.appendChild(p);
  item.options.forEach((opt, oi) => {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.name = "q" + qi;
    input.value = oi;
    label.appendChild(input);
    label.appendChild(document.createTextNode(" " + opt));
    div.appendChild(label);
  });
  const fb = document.createElement("div");
  fb.className = "feedback";
  fb.id = "fb" + qi;
  div.appendChild(fb);
  container.appendChild(div);
});

document.getElementById("submit-quiz").addEventListener("click", () => {
  let score = 0;
  QUESTIONS.forEach((item, qi) => {
    const chosen = document.querySelector('input[name="q' + qi + '"]:checked');
    const fb = document.getElementById("fb" + qi);
    if (!chosen) {
      fb.textContent = "⚠️ Not answered. " + item.why;
      fb.className = "feedback wrong";
      return;
    }
    if (parseInt(chosen.value, 10) === item.answer) {
      score++;
      fb.textContent = "✅ Correct! " + item.why;
      fb.className = "feedback correct";
    } else {
      fb.textContent = "❌ Not quite. " + item.why;
      fb.className = "feedback wrong";
    }
  });
  let message;
  if (score >= 9) message = "🏆 Excellent — you're hard to phish!";
  else if (score >= 7) message = "👍 Good awareness — review the ones you missed above.";
  else if (score >= 4) message = "⚠️ Risky — re-read the red flags section and try again.";
  else message = "🚨 High risk — go through the training sections once more, then retake the quiz.";
  resultBox.textContent = "Your score: " + score + " / " + QUESTIONS.length + ". " + message;
});
