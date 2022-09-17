
 namespace org.ehr.basic

 concept InsuranceMap {
     o string personId
     o Double amountInsured
 }
 
 //Name of companies considered for for providing insurance claims
 enum InsuranceProviders{
     o NICL
     o PVT
 }
 //Name of hospitals used for this project
 enum Hospitals{
     o ASTHA
     o REGENCY
     o NOVA
     o KABEER
     o CONTACARE_EYE
 }
 //List of medicines in circulations city-wide
 //enum Medicine {
     // o ASTAMINOPHIN
     // o ASPIRIN
     // o PARACETAMOL
     // o AMLODIPINE
     // o FLUOXETINE
     // o ALPRAZOLAM
     //}
     // List of pathological tests considered for this project
     enum tests{
         o LFT
         o URINALYSIS
         o INR
         o  BLOODTEST
         }
         // Disease-infected part of human body
         enum DiseaseCategory{
             o EYE
             o HEART
             o EAR
             o SKIN
             o GENITAL
             o MISC
         }
 
         //Transaction to get appointment
         transaction confirmAppoint{
             --> Patient Patient
             --> Doctor doctor
             --> Appointment appoint
         }
         //Transaction for recording interaction between doctor and patient during appointment
         transaction consult{
             -->Patient Patient
             -->Doctor doctor
             --> Appointment appoint
             -->Prescreption Prescreption
             -->MedPresc medicine 
         }
         }
         // Transaction to record purchase of medicine by patient from drugstore
         transaction buyMed{
             --> Patient Patient
             -->Chemist chemist
         }
 // Transaction to record test conducted by pathology lab on patient
  transaction buyTest{
      --> Patient Patient
      -->Pathlab pathlab
 }
 //Medical instructions is considered as an asset of this buisness asset of this buisness logic
 asset MedPresc identified by MedPrescId{
     o String medPrescId                           //Medicine prescreption ID
     // o Medicine medicineType                    //Type of medicine
     o Long mgs                                    //Strength of medicine
     o String instruction                          //Intake instructions
     o Long perDay                                 //Number od tablets/tbsp/tsp medicine has to be taken
 }
 // Appointment is considered as an asset for this buisness logic
 aaset appointment identified by appointmentId{
     o String appointmentId                        //Appointment ID
     o String status                               //Status of appointment
     o Boolean isInsured                           // Whether patient is insured
     o String description                          //Description of appointment
     o Diseasecategory group                       // Disease area reported by patient
     --> Doctor assigned optional                  //Annoted doctor
     --> Patient patient optional                  //Patient details                   
     --> Insurance insureId optional               //Insurance company
     o Double consultanceFee optional              // Consultance Fee
 }
 //Insurance claim is considered as an asset for this buisness logic
 asset Insurance identified by InsuranceId{
     o String InsuranceId                          //Insurance personal ID
     o InsuranceProviders provider                 //personal's company
     o--> Patient patient                          //Record of patient
     o Double ensureAmount                         //Amount of Insurance
 }
 // Receipt is considered as an asset for this buisnesss logic
 asset Reciept identified by RecieptID{
     o String receiptID                            //Receipt Id
     o String providerID                           //Reciept provider ID
     o String providedTo                           //Receipt provided to ID
     o Double amountPaid                           //Amount paid against service and/or goods                
     o DateTime logTime                            //Log time
 }
 //Prescreption is considered as an asset of this buisness logic
 asset Prescription identified by prescreption{
     o String prescreptionId                       //Prescription ID
     o Boolean isMedPrescribed patient             // Whether medicine was prescribed to
     o MedPrescribed optional                      //List of medicine prescribed
     o Boolean isTestPrescribed to patient         //Whether medical tests was prescribed
     o Tests test optional                         //Test conducted on patient
     --> Appointment appoint Prescreption          //Appointment associated with this
     o String[] test_report optional pathology lab //Lists of test report given by
     o Receipt[] receipt optional phase            // list of all reports during treatment
     phase
 }
 
 abstract participants citizens identified by ID
 {
     o String ID                                    
     o String firstname                            
     o String lastname                              
 }