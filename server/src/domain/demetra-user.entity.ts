/* eslint-disable @typescript-eslint/no-unused-vars */
import { Entity, Column, PrimaryGeneratedColumn, JoinColumn, OneToOne, ManyToOne, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base/base.entity';

import { ApiModelProperty } from '@nestjs/swagger';
import { validate, Contains, IsInt, Length, IsEmail, IsFQDN, IsDate, Min, Max } from 'class-validator';

import SingleCourse from './single-course.entity';
import { Gender } from './enumeration/gender';
import { UserType } from './enumeration/user-type';

/**
 * A DemetraUser.
 */
@Entity('demetra_user')
export default class DemetraUser extends BaseEntity {
  @Column({ type: 'simple-enum', name: 'gender', enum: Gender })
  gender: Gender;

  @Column({ name: 'address' })
  address: string;

  @Column({ type: 'date', name: 'borndate' })
  borndate: any;

  @Column({ name: 'cf', unique: true })
  cf: string;

  @Column({ type: 'simple-enum', name: 'usertype', enum: UserType })
  usertype: UserType;

  @Column({ type: 'blob', name: 'profileimage', nullable: true })
  profileimage: any;

  @Column({ name: 'profileimage_content_type', nullable: true })
  profileimageContentType: string;

  @OneToMany(
    type => SingleCourse,
    other => other.cfteacher
  )
  singlecourseteachers: SingleCourse[];

  @ManyToMany(type => SingleCourse)
  @JoinTable({
    name: 'demetra_user_coursetitle',
    joinColumn: { name: 'demetra_user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'coursetitle_id', referencedColumnName: 'id' }
  })
  coursetitles: SingleCourse[];

  // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
}
