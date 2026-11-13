document.getElementById("rDate").innerText = new Date().toLocaleDateString();

let skills = [];

// =====================
// THEME TOGGLE
// =====================
const themeToggleBtn = document.getElementById("themeToggleBtn");
const themeIcon = document.getElementById("themeIcon");
const htmlElement = document.documentElement;

const savedTheme = localStorage.getItem("resumeTheme") || "light";
if (savedTheme === "dark") {
    htmlElement.setAttribute("data-theme", "dark");
    themeIcon.className = "bi bi-sun-fill text-warning";
}

themeToggleBtn.addEventListener("click", () => {
    const currentTheme = htmlElement.getAttribute("data-theme");
    if (currentTheme === "dark") {
        htmlElement.setAttribute("data-theme", "light");
        localStorage.setItem("resumeTheme", "light");
        themeIcon.className = "bi bi-moon-stars-fill";
    } else {
        htmlElement.setAttribute("data-theme", "dark");
        localStorage.setItem("resumeTheme", "dark");
        themeIcon.className = "bi bi-sun-fill text-warning";
    }
});

// =====================
// KEYBOARD NAVIGATION
// =====================
const formControls = Array.from(document.querySelectorAll('#formSection input, #formSection textarea'));

formControls.forEach((control, index) => {
    control.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            if (this.id === 'skillInput') {
                e.preventDefault();
                if (e.shiftKey) {
                    addSkill();
                } else {
                    focusNextControl(index);
                }
                return;
            }

            if (this.tagName === 'TEXTAREA') {
                if (e.shiftKey) {
                    return;
                } else {
                    e.preventDefault();
                    focusNextControl(index);
                }
            } else {
                e.preventDefault();
                focusNextControl(index);
            }
        }
    });
});

function focusNextControl(currentIndex) {
    for (let i = currentIndex + 1; i < formControls.length; i++) {
        if (formControls[i] && !formControls[i].disabled) {
            formControls[i].focus();
            break;
        }
    }
}

// =====================
// VALIDATION
// =====================
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", function() {
    this.value = this.value.replace(/\D/g, '').slice(0, 10);
    const val = this.value;

    if (val.length === 0) {
        this.classList.remove("is-invalid", "is-valid");
    } else if (/^[6-9]\d{9}$/.test(val)) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
    updateResume();
});

const emailInput = document.getElementById("email");
emailInput.addEventListener("input", function() {
    const val = this.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (val.length === 0) {
        this.classList.remove("is-invalid", "is-valid");
    } else if (emailRegex.test(val)) {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    } else {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    }
    updateResume();
});

// =====================
// LIVE UPDATE
// =====================
const inputs = document.querySelectorAll("input:not(#phone):not(#email), textarea");

inputs.forEach(input => {
    input.addEventListener("keyup", updateResume);
    input.addEventListener("change", updateResume);
});

function updateResume() {
    const nameVal = document.getElementById("name").value;
    const emailVal = emailInput.value;
    const phoneVal = phoneInput.value;
    const linkedinVal = document.getElementById("linkedin").value;
    const addressVal = document.getElementById("address").value;

    // PERSONAL DETAILS SECTION
    const hasPersonalDetails = nameVal || emailVal || phoneVal || linkedinVal || addressVal;
    if (hasPersonalDetails) {
        document.getElementById("secPersonalDetails").style.display = "block";
        document.getElementById("rPersonalDetails").innerHTML = `
            <p class="mb-1">Full Name : ${nameVal}</p>
            <p class="mb-1">Email Address : ${emailVal}</p>
            <p class="mb-1">Phone Number : ${phoneVal}</p>
            <p class="mb-1">LinkedIn Profile : ${linkedinVal}</p>
            <p class="mb-0">Address : ${addressVal}</p>
        `;
    } else {
        document.getElementById("secPersonalDetails").style.display = "none";
    }

    const objectiveVal = document.getElementById("objective").value;
    document.getElementById("rObjective").innerText = objectiveVal;
    document.getElementById("secObjective").style.display = objectiveVal ? "block" : "none";

    // EDUCATION (Degree/Qualification in normal black style)
    const degree = document.getElementById("degree").value;
    const college = document.getElementById("college").value;
    const year = document.getElementById("year").value;
    const cgpa = document.getElementById("cgpa").value;

    if (degree || college || year || cgpa) {
        document.getElementById("secEducation").style.display = "block";
        document.getElementById("rEducation").innerHTML = `
            <div>
                <h6 class="mb-1" style="font-weight: 400 !important;">Degree / Qualification : ${degree}</h6>
                <p class="mb-1">Institution Name : ${college}</p>
                <p class="mb-1">Passing Year : ${year}</p>
                <p class="mb-0">CGPA / Percentage : ${cgpa}</p>
            </div>
        `;
    } else {
        document.getElementById("secEducation").style.display = "none";
    }

    // PROJECT (Project Title in normal black style)
    const pTitle = document.getElementById("projectTitle").value;
    const pDesc = document.getElementById("projectDesc").value;
    const pTech = document.getElementById("projectTech").value;

    if (pTitle || pDesc || pTech) {
        document.getElementById("secProject").style.display = "block";
        document.getElementById("rProject").innerHTML = `
            <h6 class="mb-1" style="font-weight: 400 !important;">Project Title : ${pTitle}</h6>
            <p class="mb-1">Description : ${pDesc}</p>
            <p class="small mb-0">Technologies Used : ${pTech}</p>
        `;
    } else {
        document.getElementById("secProject").style.display = "none";
    }

    // WORK EXPERIENCE (Job Role in normal black style)
    const company = document.getElementById("company").value;
    const role = document.getElementById("role").value;
    const experience = document.getElementById("experience").value;

    if (company || role || experience) {
        document.getElementById("secExperience").style.display = "block";
        document.getElementById("rExperience").innerHTML = `
            <h6 class="mb-1" style="font-weight: 400 !important;">Job Role : ${role}</h6>
            <p class="mb-1">Company Name : ${company}</p>
            <p class="mb-0">Work Description : ${experience}</p>
        `;
    } else {
        document.getElementById("secExperience").style.display = "none";
    }

    createList("certifications", "rCertifications", "secCertifications");
    createList("strengths", "rStrengths", "secStrengths");
    createList("languages", "rLanguages", "secLanguages");
    createList("hobbies", "rHobbies", "secHobbies");
}

function createList(source, target, sectionId) {
    let items = document.getElementById(source).value.split("\n");
    let html = "";
    let hasContent = false;

    items.forEach(item => {
        if (item.trim() !== "") {
            html += `<li>${item.trim()}</li>`;
            hasContent = true;
        }
    });

    document.getElementById(target).innerHTML = html;
    document.getElementById(sectionId).style.display = hasContent ? "block" : "none";
}

// =====================
// SKILLS
// =====================
document.getElementById("addSkillBtn").addEventListener("click", addSkill);

function addSkill() {
    let skillInput = document.getElementById("skillInput");
    let skill = skillInput.value.trim();

    if (skill === "") return;

    skills.push(skill);
    skillInput.value = "";
    renderSkills();
    updateResume();
}

function renderSkills() {
    let rSkillsHtml = "";
    skills.forEach(skill => {
        rSkillsHtml += `<li>${skill}</li>`;
    });
    document.getElementById("rSkills").innerHTML = rSkillsHtml;
    document.getElementById("secSkills").style.display = skills.length > 0 ? "block" : "none";

    let listHTML = "";
    skills.forEach((skill, index) => {
        listHTML += `
            <li>
                <span>${skill}</span>
                <button class="btn btn-sm text-danger p-0 ms-1 border-0 bg-transparent" onclick="removeSkill(${index})">
                    <i class="bi bi-x-circle-fill"></i>
                </button>
            </li>
        `;
    });
    document.getElementById("skillList").innerHTML = listHTML;
}

function removeSkill(index) {
    skills.splice(index, 1);
    renderSkills();
    updateResume();
}

// =====================
// SAVE & LOAD
// =====================
document.getElementById("saveBtn").addEventListener("click", () => {
    const data = {
        name: document.getElementById("name").value,
        email: emailInput.value,
        phone: phoneInput.value,
        linkedin: document.getElementById("linkedin").value,
        address: document.getElementById("address").value,
        objective: document.getElementById("objective").value,
        degree: document.getElementById("degree").value,
        college: document.getElementById("college").value,
        year: document.getElementById("year").value,
        cgpa: document.getElementById("cgpa").value,
        projectTitle: document.getElementById("projectTitle").value,
        projectDesc: document.getElementById("projectDesc").value,
        projectTech: document.getElementById("projectTech").value,
        company: document.getElementById("company").value,
        role: document.getElementById("role").value,
        experience: document.getElementById("experience").value,
        certifications: document.getElementById("certifications").value,
        strengths: document.getElementById("strengths").value,
        languages: document.getElementById("languages").value,
        hobbies: document.getElementById("hobbies").value,
        skills: skills
    };
    localStorage.setItem("resumeData", JSON.stringify(data));
    alert("Resume data saved successfully!");
});

window.onload = function() {
    const data = JSON.parse(localStorage.getItem("resumeData"));
    if (data) {
        for (let key in data) {
            const field = document.getElementById(key);
            if (field) field.value = data[key];
        }
        if (phoneInput.value) phoneInput.dispatchEvent(new Event('input'));
        if (emailInput.value) emailInput.dispatchEvent(new Event('input'));

        skills = data.skills || [];
        renderSkills();
        updateResume();
    }
};

// =====================
// PDF DOWNLOAD (Strict Solid Black Typography Hierarchy & Anti-Clipping)
// =====================
document.getElementById("downloadBtn").addEventListener("click", () => {
    updateResume();
    const resume = document.getElementById("resume");

    const originalStyle = resume.getAttribute("style") || "";
    
    resume.style.background = "#ffffff";
    resume.style.color = "#000000";
    resume.style.boxShadow = "none";
    resume.style.border = "none";
    resume.style.padding = "30px 40px 40px 40px";
    resume.style.fontFamily = "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif";

    // Main Resume Heading: Extra Bold
    const mainHeading = resume.querySelector(".resume-main-heading");
    if (mainHeading) {
        mainHeading.style.color = "#000000";
        mainHeading.style.fontSize = "24px";
        mainHeading.style.fontWeight = "900";
        mainHeading.style.letterSpacing = "2px";
    }

    // Section Headings: Extra-bold + Line
    const headings = resume.querySelectorAll(".resume-heading");
    headings.forEach(h => {
        h.style.color = "#000000";
        h.style.fontSize = "13px";
        h.style.fontWeight = "900";
        h.style.textTransform = "uppercase";
        h.style.letterSpacing = "1.5px";
        h.style.marginTop = "20px";
        h.style.marginBottom = "8px";
        h.style.borderBottom = "2px solid #000000";
        h.style.paddingBottom = "4px";
        h.style.pageBreakAfter = "avoid";
    });

    // Subheadings (Degree, Project Title, Job Role) explicitly forced to Normal Black (weight 400)
    const subheadings = resume.querySelectorAll(".resume-section h6");
    subheadings.forEach(sh => {
        sh.style.color = "#000000";
        sh.style.fontWeight = "400";
        sh.style.fontSize = "12px";
        sh.style.pageBreakAfter = "avoid";
    });

    // All body text, lists, declaration, and details: Pure Solid Black (weight 400)
    const normalTexts = resume.querySelectorAll(".resume-section p, .resume-section span, .resume-section li, .resume-section strong, .resume-section div, .declaration-text, .signature-footer");
    normalTexts.forEach(t => {
        if (!t.classList.contains("resume-main-heading") && !t.classList.contains("resume-heading") && !t.closest("h6") && t.children.length === 0) {
            t.style.color = "#000000";
            t.style.fontWeight = "400";
            t.style.fontSize = "12px";
            t.style.lineHeight = "1.5";
        }
    });

    // Prevent sections from splitting across pages
    const sections = resume.querySelectorAll(".resume-section");
    sections.forEach(sec => {
        sec.style.pageBreakInside = "avoid";
    });

    const declarationLine = resume.querySelector(".declaration-line");
    if (declarationLine) declarationLine.style.borderTop = "1px solid #000000";

    const options = {
        margin: 0.35,
        filename: "Professional_Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { 
            scale: 2.5, 
            useCORS: true, 
            letterRendering: true,
            scrollY: 0
        },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" }
    };

    setTimeout(() => {
        html2pdf()
            .set(options)
            .from(resume)
            .save()
            .then(() => {
                resume.setAttribute("style", originalStyle);
                if (mainHeading) mainHeading.removeAttribute("style");
                if (declarationLine) declarationLine.removeAttribute("style");
                
                headings.forEach(h => h.removeAttribute("style"));
                subheadings.forEach(sh => sh.removeAttribute("style"));
                normalTexts.forEach(t => t.removeAttribute("style"));
                sections.forEach(sec => sec.removeAttribute("style"));
            });
    }, 400);
});