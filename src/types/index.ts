import { z } from "zod";

/* AUTH */

const authSchema = z.object({
   name: z.string(),
   email: z.string(),
   current_password: z.string(),
   password: z.string(),
   password_confirmation: z.string(),
   token: z.string(),
})

type Auth = z.infer<typeof authSchema>
export type UserLoginForm = Pick<Auth, 'email' | 'password' >
export type UserRegisterForm = Pick<Auth,  'name' | 'email' | 'password' | 'password_confirmation'>
export type RequestConfirmationCodeForm = Pick<Auth, 'email'>
export type ForgotPasswordForm = Pick<Auth, 'email'>
export type NewPasswordForm = Pick<Auth, 'password' | 'password_confirmation'>
export type updatePasswordForm = Pick<Auth,  'current_password' | 'password' | 'password_confirmation' >
export type checkPasswordForm = Pick<Auth, 'password'>
export type ConfirmToken = Pick<Auth, 'token' >
export type ValidateToken = Pick<Auth, 'token' >



/* USER */

export const userSchema = authSchema.pick({
   name: true, 
   email: true
}).extend({
   _id: z.string()
})
export type User = z.infer<typeof userSchema>
export type UserProfileForm = Pick<User,'name' | 'email'>



/* NOTE */

const noteSchema = z.object({
   _id: z.string(),
   content: z.string(),
   createdBy: userSchema,
   task: z.string(),
   createdAt: z.string(),
})
export type Note = z.infer<typeof noteSchema>
export type NoteFormData = Pick<Note, 'content'>



/* TASK */

export const taskStatusSchema = z.enum([
   "pending",
   "onHold",
   "inProgress",
   "underReview",
   "completed",
]);
export type TaskStatus = z.infer<typeof taskStatusSchema>

export const taskSchema = z.object({
   _id: z.string(),
   name: z.string(),
   description: z.string(),
   project: z.object({
      _id: z.string(),
      manager: z.string()
   }),
   status: taskStatusSchema,
   completedBy: z.array(
      z.object({
         user: userSchema.or(z.null()),
         status: taskStatusSchema
      })
   ),
   notes: z.array(
      noteSchema.extend({
         createdBy: userSchema
      })
   ),
   createdAt: z.string(),
   updatedAt: z.string(),
});

export const taskProjectSchema = taskSchema.pick({
   _id: true, 
   name: true,
   status: true,
   description: true,
})

export type Task = z.infer<typeof taskSchema>;
export type TaskFormData = Pick<Task, "name" | "description">;
export type TaskProject = z.infer<typeof taskProjectSchema>



/* PROJECT */

export const projectSchema = z.object({
   _id: z.string(),
   projectName: z.string(),
   clientName: z.string(),
   description: z.string(),
   manager: z.string(userSchema.pick({_id: true})),
   tasks: z.array(taskProjectSchema),
   team: z.array(z.string(userSchema.pick({_id: true})))
});

export const dashboardProjectsSchema = z.array(
   projectSchema.pick({
      _id: true,
      projectName: true,
      clientName: true,
      description: true, 
      manager: true
   })
);

export const dashboardProjectSchema = 
   projectSchema.pick({
      _id: true,
      projectName: true,
      clientName: true,
      description: true, 
      manager: true
   })


export const editProjectSchema = projectSchema.pick({
   projectName: true,
   clientName: true,
   description: true,
   manager: true,
})
export type Project = z.infer<typeof projectSchema>;
export type ProjectDashboard = z.infer<typeof dashboardProjectSchema>
export type ProjectFormData = Pick<
   Project,
   "clientName" | "projectName" | "description"
>;

/* TEAM */

const teamMemberSchema = userSchema.pick({
   name: true, 
   email: true,
   _id: true
})
export const TeamMembersSchema = z.array(teamMemberSchema)
export type TeamMember = z.infer<typeof teamMemberSchema>;
export type TeamMemberForm = Pick<TeamMember, 'email'>
