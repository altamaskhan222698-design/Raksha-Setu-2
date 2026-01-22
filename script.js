// Database URL
const DB_URL = 'database.json';

// Global Data Holder
let systemData = {};

// --- 1. LOAD SYSTEM (Fetch JSON) ---
window.onload = async function() {
    try {
        const response = await fetch(DB_URL);
        systemData = await response.json();
        
        // Update Public UI from JSON
        document.getElementById('userName').innerText = systemData.user_profile.name;
        document.getElementById('userID').innerText = systemData.user_profile.citizen_id;
        
        console.log("System Loaded:", systemData.version);
    } catch (error) {
        console.error("Database Error");
    }
};

// --- 2. SOS SIMULATION (Real Drama) ---
function startEmergencyProtocol() {
    // Stage 1: Blockchain Verification
    Swal.fire({
        title: 'CONNECTING...',
        html: 'Verifying Identity Block on Node #829<br><b>...</b>',
        timer: 1500,
        timerProgressBar: true,
        background: '#111', color: '#fff',
        didOpen: () => Swal.showLoading()
    }).then(() => {
        
        // Stage 2: Dispatch Countdown
        Swal.fire({
            title: 'EMERGENCY DISPATCH',
            html: `
                <div style="text-align:left; font-size:14px; margin-top:10px; line-height: 25px;">
                    <p>📡 <span style="color:orange">GPS Triangulation...</span> <b>LOCKED</b></p>
                    <p>🚓 <span style="color:#2ecc71">Police Control (112)...</span> <b>NOTIFIED</b></p>
                    <p>🚑 <span style="color:#2ecc71">Ambulance Unit...</span> <b>DISPATCHED</b></p>
                    <hr style="border-color:#333">
                    <p style="color:#777; font-size:12px;">❌ Family Notification: <b>RESTRICTED (Doctor Only)</b></p>
                </div>
            `,
            timer: 4000, // 4 seconds ka drama
            showConfirmButton: false,
            background: '#111', color: '#fff'
        }).then(() => {
            // Stage 3: Success
            Swal.fire({
                icon: 'success',
                title: 'HELP IS COMING!',
                text: 'Authorities have your live location.',
                confirmButtonColor: '#2ecc71',
                background: '#fff', color: '#000'
            });
        });
    });
}

// --- 3. DOCTOR LOGIN (Verify PIN) ---
async function doctorLogin() {
    const { value: pin } = await Swal.fire({
        title: 'Doctor Access',
        text: 'Enter Government Authorized PIN',
        input: 'password',
        inputPlaceholder: 'PIN',
        confirmButtonColor: '#333',
        background: '#fff', color: '#000'
    });

    // Check PIN against JSON Data
    if (pin === systemData.security.doctor_pin) {
        // Unlock Data UI
        document.getElementById('bloodGroup').innerText = systemData.medical_data.blood_group;
        document.getElementById('allergies').innerText = systemData.medical_data.allergies.join(", ");
        document.getElementById('history').innerText = systemData.medical_data.history.join(", ");
        document.getElementById('meds').innerText = systemData.medical_data.meds.join(", ");
        document.getElementById('hashVal').innerText = systemData.security.blockchain_hash;
        
        // Update Call Button
        document.getElementById('guardName').innerText = systemData.emergency_contacts.guardian_label;
        
        // Switch Screen
        document.getElementById('publicView').style.display = 'none';
        document.getElementById('doctorView').classList.remove('hidden');

        // Toast Notification
        const Toast = Swal.mixin({ toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        Toast.fire({ icon: 'success', title: 'Decrypted via Blockchain Key' });

    } else {
        Swal.fire({ icon: 'error', title: 'Access Denied', background: '#fff', color: '#000' });
    }
}

// --- 4. CALL GUARDIAN ---
function callGuardian() {
    window.location.href = "tel:" + systemData.emergency_contacts.guardian_number;
      }
          
